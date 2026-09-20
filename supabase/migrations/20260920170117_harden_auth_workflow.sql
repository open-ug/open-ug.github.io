-- Harden signup provisioning, workflow transitions, RLS performance, and FK indexes.

create or replace function private.handle_new_user() returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_full_name text := trim(coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  new_student text := upper(regexp_replace(trim(coalesce(new.raw_user_meta_data ->> 'student_number', '')), '\s+', '', 'g'));
  new_registration text := upper(regexp_replace(trim(coalesce(new.raw_user_meta_data ->> 'registration_number', '')), '\s+', '', 'g'));
begin
  if char_length(new_full_name) not between 2 and 120 then
    raise exception using errcode = 'check_violation', message = 'full_name is required and must contain 2 to 120 characters';
  end if;
  if new_student = '' or char_length(new_student) > 40 then
    raise exception using errcode = 'check_violation', message = 'student_number is required and must not exceed 40 characters';
  end if;
  if new_registration = '' or char_length(new_registration) > 60 then
    raise exception using errcode = 'check_violation', message = 'registration_number is required and must not exceed 60 characters';
  end if;

  insert into public.profiles (id, full_name, email, student_number, registration_number)
  values (new.id, new_full_name, lower(new.email), new_student, new_registration);

  insert into public.user_roles (user_id, role)
  values (new.id, 'user')
  on conflict (user_id) do nothing;

  return new;
exception
  when unique_violation then
    raise exception using errcode = 'unique_violation', message = 'student_number or registration_number is already registered';
end;
$$;

create or replace function private.protect_profile_fields() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.id = old.id;
  new.email = old.email;
  new.created_at = old.created_at;
  new.student_number = upper(regexp_replace(trim(new.student_number), '\s+', '', 'g'));
  new.registration_number = upper(regexp_replace(trim(new.registration_number), '\s+', '', 'g'));
  new.full_name = trim(new.full_name);
  return new;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass and conname = 'profiles_student_number_length'
  ) then
    alter table public.profiles add constraint profiles_student_number_length
      check (char_length(student_number) between 1 and 40) not valid;
  end if;
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.profiles'::regclass and conname = 'profiles_registration_number_length'
  ) then
    alter table public.profiles add constraint profiles_registration_number_length
      check (char_length(registration_number) between 1 and 60) not valid;
  end if;
end;
$$;
alter table public.profiles validate constraint profiles_student_number_length;
alter table public.profiles validate constraint profiles_registration_number_length;

create or replace function private.validate_application_change() returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_id uuid := (select auth.uid());
  actor_is_admin boolean := (select private.is_admin(actor_id));
  actor_is_service boolean := coalesce(current_setting('request.jwt.claim.role', true), '') = 'service_role';
  applicant_profile public.profiles;
begin
  if tg_op = 'INSERT' then
    if not actor_is_admin and not actor_is_service then
      if new.applicant_id is distinct from actor_id
        or new.status <> 'draft'
        or new.submitted_at is not null
        or new.profile_snapshot is not null
        or new.legacy_applicant is not null then
        raise exception 'Invalid application owner or initial state';
      end if;
      if not exists (
        select 1 from public.programs p
        where p.id = new.program_id
          and p.status = 'applications_open'
          and (p.applications_open_at is null or now() >= p.applications_open_at)
          and (p.applications_close_at is null or now() <= p.applications_close_at)
      ) then
        raise exception 'Applications are not open for this program';
      end if;
    end if;
    return new;
  end if;

  if new.id <> old.id
    or new.program_id <> old.program_id
    or new.applicant_id is distinct from old.applicant_id
    or new.legacy_applicant is distinct from old.legacy_applicant
    or new.created_at <> old.created_at then
    raise exception 'Application ownership and program are immutable';
  end if;

  if actor_is_admin or actor_is_service then
    return new;
  end if;

  if old.applicant_id is distinct from actor_id then
    raise exception 'Application owner required';
  end if;

  if old.status = 'draft' and new.status = 'submitted' then
    if not exists (
      select 1 from public.programs p
      where p.id = old.program_id
        and p.status = 'applications_open'
        and (p.applications_open_at is null or now() >= p.applications_open_at)
        and (p.applications_close_at is null or now() <= p.applications_close_at)
    ) then
      raise exception 'The application window is closed';
    end if;
    if exists (
      select 1
      from public.program_questions q
      where q.program_id = old.program_id
        and q.required
        and not exists (
          select 1 from public.application_answers a
          where a.application_id = old.id
            and a.question_id = q.id
            and a.answer not in ('null'::jsonb, '""'::jsonb, '[]'::jsonb)
        )
    ) then
      raise exception 'Complete all required questions';
    end if;

    select * into applicant_profile from public.profiles where id = actor_id;
    if applicant_profile.id is null then
      raise exception 'Complete your profile before submitting';
    end if;

    new.submitted_at = now();
    new.profile_snapshot = jsonb_build_object(
      'full_name', applicant_profile.full_name,
      'email', applicant_profile.email,
      'student_number', applicant_profile.student_number,
      'registration_number', applicant_profile.registration_number,
      'university', applicant_profile.university,
      'course', applicant_profile.course,
      'year_of_study', applicant_profile.year_of_study,
      'github_url', applicant_profile.github_url,
      'linkedin_url', applicant_profile.linkedin_url
    );
    return new;
  end if;

  if old.status in ('submitted', 'under_review', 'shortlisted') and new.status = 'withdrawn' then
    new.submitted_at = old.submitted_at;
    new.profile_snapshot = old.profile_snapshot;
    return new;
  end if;

  if new.status is distinct from old.status
    or new.submitted_at is distinct from old.submitted_at
    or new.profile_snapshot is distinct from old.profile_snapshot then
    raise exception 'Use an allowed application workflow transition';
  end if;

  return new;
end;
$$;

create or replace function private.validate_answer() returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  q public.program_questions;
  app public.applications;
  max_length integer;
begin
  select * into app from public.applications where id = new.application_id;
  select * into q from public.program_questions where id = new.question_id;
  if app.id is null or q.id is null or app.program_id <> q.program_id then raise exception 'Question does not belong to the application program'; end if;
  if app.status <> 'draft'
    and coalesce(current_setting('request.jwt.claim.role', true), '') <> 'service_role'
    and not (select private.is_admin((select auth.uid()))) then raise exception 'Submitted answers are read-only'; end if;
  max_length := coalesce((q.configuration ->> 'max_length')::integer, case when q.field_type = 'long_text' then 5000 else 500 end);
  if q.field_type in ('short_text', 'long_text', 'url') and jsonb_typeof(new.answer) <> 'string' then raise exception 'Answer must be text'; end if;
  if q.field_type in ('short_text', 'long_text', 'url') and char_length(new.answer #>> '{}') > max_length then raise exception 'Answer is too long'; end if;
  if q.field_type = 'url' and new.answer #>> '{}' !~* '^https?://' then raise exception 'Answer must be a valid URL'; end if;
  if q.field_type = 'number' and jsonb_typeof(new.answer) <> 'number' then raise exception 'Answer must be a number'; end if;
  if q.field_type = 'boolean' and jsonb_typeof(new.answer) <> 'boolean' then raise exception 'Answer must be a boolean'; end if;
  if q.field_type = 'single_select' and (jsonb_typeof(new.answer) <> 'string' or not (q.configuration -> 'options' ? (new.answer #>> '{}'))) then raise exception 'Select a valid option'; end if;
  if q.field_type = 'multi_select' and (jsonb_typeof(new.answer) <> 'array' or exists (select 1 from jsonb_array_elements_text(new.answer) item where not (q.configuration -> 'options' ? item))) then raise exception 'Select valid options'; end if;
  return new;
end;
$$;

create or replace function public.submit_application(target_application_id uuid) returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  update public.applications
  set status = 'submitted'
  where id = target_application_id
    and applicant_id = (select auth.uid())
    and status = 'draft';
  if not found then raise exception 'Application not found or not editable'; end if;
end;
$$;

create or replace function public.withdraw_application(target_application_id uuid) returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  update public.applications
  set status = 'withdrawn'
  where id = target_application_id
    and applicant_id = (select auth.uid())
    and status in ('submitted', 'under_review', 'shortlisted');
  if not found then raise exception 'Application cannot be withdrawn'; end if;
end;
$$;

create or replace function public.admin_set_application_status(target_application_id uuid, next_status public.application_status) returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if not exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = 'admin'
  ) then raise exception 'Administrator access required'; end if;
  if next_status not in ('under_review', 'shortlisted', 'accepted', 'rejected') then raise exception 'Invalid review status'; end if;
  update public.applications set status = next_status where id = target_application_id and status <> 'draft';
  if not found then raise exception 'Application not found or still a draft'; end if;
end;
$$;

drop policy if exists "admins create programs" on public.programs;
create policy "admins create programs" on public.programs for insert to authenticated
with check ((select private.is_admin((select auth.uid()))) and created_by = (select auth.uid()));

drop policy if exists "authenticated reads visible programs" on public.programs;
create policy "authenticated reads visible programs" on public.programs for select to authenticated
using (status in ('published', 'applications_open', 'reviewing', 'completed') or (select private.is_staff((select auth.uid()))));

drop policy if exists "admins update programs" on public.programs;
create policy "admins update programs" on public.programs for update to authenticated
using ((select private.is_admin((select auth.uid()))))
with check ((select private.is_admin((select auth.uid()))));

drop policy if exists "admins delete draft programs" on public.programs;
create policy "admins delete draft programs" on public.programs for delete to authenticated
using ((select private.is_admin((select auth.uid()))) and status = 'draft');

drop policy if exists "authenticated reads visible or staff questions" on public.program_questions;
create policy "authenticated reads visible or staff questions" on public.program_questions for select to authenticated
using ((select private.is_staff((select auth.uid()))) or exists (
  select 1 from public.programs p
  where p.id = program_id and p.status in ('published', 'applications_open', 'reviewing', 'completed')
));

drop policy if exists "admins create questions" on public.program_questions;
create policy "admins create questions" on public.program_questions for insert to authenticated
with check ((select private.is_admin((select auth.uid()))));
drop policy if exists "admins update questions" on public.program_questions;
create policy "admins update questions" on public.program_questions for update to authenticated
using ((select private.is_admin((select auth.uid()))))
with check ((select private.is_admin((select auth.uid()))));
drop policy if exists "admins delete questions" on public.program_questions;
create policy "admins delete questions" on public.program_questions for delete to authenticated
using ((select private.is_admin((select auth.uid()))));

drop policy if exists "users read own profile" on public.profiles;
create policy "users read own profile" on public.profiles for select to authenticated
using (id = (select auth.uid()) or (select private.is_admin((select auth.uid()))));
drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile" on public.profiles for update to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));
drop policy if exists "users read own role" on public.user_roles;
create policy "users read own role" on public.user_roles for select to authenticated
using (user_id = (select auth.uid()) or (select private.is_admin((select auth.uid()))));

drop policy if exists "applicants and staff read applications" on public.applications;
create policy "applicants and staff read applications" on public.applications for select to authenticated
using (applicant_id = (select auth.uid()) or (select private.can_review(id, (select auth.uid()))));
drop policy if exists "applicants create drafts" on public.applications;
create policy "applicants create drafts" on public.applications for insert to authenticated
with check (applicant_id = (select auth.uid()) and status = 'draft');
drop policy if exists "applicants update own drafts" on public.applications;
drop policy if exists "admins update applications" on public.applications;
create policy "authorized application transitions" on public.applications for update to authenticated
using (
  (applicant_id = (select auth.uid()) and status in ('draft', 'submitted', 'under_review', 'shortlisted'))
  or (select private.is_admin((select auth.uid())))
)
with check (
  (applicant_id = (select auth.uid()) and status in ('draft', 'submitted', 'withdrawn'))
  or (select private.is_admin((select auth.uid())))
);

drop policy if exists "applicants and staff read answers" on public.application_answers;
create policy "applicants and staff read answers" on public.application_answers for select to authenticated
using (exists (
  select 1 from public.applications a
  where a.id = application_id
    and (a.applicant_id = (select auth.uid()) or (select private.can_review(a.id, (select auth.uid()))))
));
drop policy if exists "applicants create draft answers" on public.application_answers;
create policy "applicants create draft answers" on public.application_answers for insert to authenticated
with check (exists (
  select 1 from public.applications a
  where a.id = application_id and a.applicant_id = (select auth.uid()) and a.status = 'draft'
));
drop policy if exists "applicants update draft answers" on public.application_answers;
create policy "applicants update draft answers" on public.application_answers for update to authenticated
using (exists (
  select 1 from public.applications a
  where a.id = application_id and a.applicant_id = (select auth.uid()) and a.status = 'draft'
))
with check (exists (
  select 1 from public.applications a
  where a.id = application_id and a.applicant_id = (select auth.uid()) and a.status = 'draft'
));
drop policy if exists "applicants delete draft answers" on public.application_answers;
create policy "applicants delete draft answers" on public.application_answers for delete to authenticated
using (exists (
  select 1 from public.applications a
  where a.id = application_id and a.applicant_id = (select auth.uid()) and a.status = 'draft'
));
drop policy if exists "admins manage answers" on public.application_answers;

drop policy if exists "reviewers read own assignments" on public.reviewer_assignments;
create policy "reviewers read own assignments" on public.reviewer_assignments for select to authenticated
using (reviewer_id = (select auth.uid()) or (select private.is_admin((select auth.uid()))));
drop policy if exists "admins create assignments" on public.reviewer_assignments;
create policy "admins create assignments" on public.reviewer_assignments for insert to authenticated
with check ((select private.is_admin((select auth.uid()))) and assigned_by = (select auth.uid()));
drop policy if exists "admins delete assignments" on public.reviewer_assignments;
create policy "admins delete assignments" on public.reviewer_assignments for delete to authenticated
using ((select private.is_admin((select auth.uid()))));

drop policy if exists "reviewers read authorized reviews" on public.application_reviews;
create policy "reviewers read authorized reviews" on public.application_reviews for select to authenticated
using ((select private.can_review(application_id, (select auth.uid()))));
drop policy if exists "reviewers create own reviews" on public.application_reviews;
create policy "reviewers create own reviews" on public.application_reviews for insert to authenticated
with check (reviewer_id = (select auth.uid()) and (select private.can_review(application_id, (select auth.uid()))));
drop policy if exists "reviewers update own reviews" on public.application_reviews;
create policy "reviewers update own reviews" on public.application_reviews for update to authenticated
using (reviewer_id = (select auth.uid()) and (select private.can_review(application_id, (select auth.uid()))))
with check (reviewer_id = (select auth.uid()) and (select private.can_review(application_id, (select auth.uid()))));

create index if not exists programs_created_by_idx on public.programs (created_by) where created_by is not null;
create index if not exists application_answers_question_idx on public.application_answers (question_id);
create index if not exists reviewer_assignments_reviewer_idx on public.reviewer_assignments (reviewer_id);
create index if not exists reviewer_assignments_assigned_by_idx on public.reviewer_assignments (assigned_by);
create index if not exists application_reviews_reviewer_idx on public.application_reviews (reviewer_id);

revoke all on all functions in schema private from public, anon, authenticated, service_role;
