create extension if not exists pgcrypto;
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create type public.program_status as enum ('draft', 'published', 'applications_open', 'reviewing', 'completed', 'archived');
create type public.question_type as enum ('short_text', 'long_text', 'url', 'number', 'boolean', 'single_select', 'multi_select');
create type public.application_status as enum ('draft', 'submitted', 'under_review', 'shortlisted', 'accepted', 'rejected', 'withdrawn');
create type public.user_role as enum ('user', 'reviewer', 'admin');
create type public.review_recommendation as enum ('pending', 'shortlist', 'accept', 'reject');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  email text,
  student_number text not null,
  registration_number text not null,
  university text check (university is null or char_length(university) <= 160),
  course text check (course is null or char_length(course) <= 160),
  year_of_study integer check (year_of_study is null or year_of_study between 1 and 8),
  bio text check (bio is null or char_length(bio) <= 2000),
  github_url text check (github_url is null or github_url ~* '^https://(www\.)?github\.com/'),
  linkedin_url text check (linkedin_url is null or linkedin_url ~* '^https://(www\.)?linkedin\.com/'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index profiles_student_number_unique on public.profiles (upper(regexp_replace(student_number, '\s+', '', 'g')));
create unique index profiles_registration_number_unique on public.profiles (upper(regexp_replace(registration_number, '\s+', '', 'g')));

create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'user',
  created_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 3 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  summary text not null default '' check (char_length(summary) <= 500),
  description text not null default '' check (char_length(description) <= 20000),
  eligibility text check (eligibility is null or char_length(eligibility) <= 5000),
  status public.program_status not null default 'draft',
  applications_open_at timestamptz,
  applications_close_at timestamptz,
  program_start_date date,
  program_end_date date,
  stipend_description text check (stipend_description is null or char_length(stipend_description) <= 1000),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint program_application_window check (applications_open_at is null or applications_close_at is null or applications_open_at < applications_close_at),
  constraint program_date_window check (program_start_date is null or program_end_date is null or program_start_date <= program_end_date)
);
create index programs_public_listing_idx on public.programs (status, applications_close_at);

create table public.program_questions (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  label text not null check (char_length(trim(label)) between 2 and 300),
  description text check (description is null or char_length(description) <= 1000),
  field_type public.question_type not null,
  required boolean not null default false,
  position integer not null default 0 check (position >= 0),
  configuration jsonb not null default '{}'::jsonb check (jsonb_typeof(configuration) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (program_id, position),
  constraint select_questions_have_options check (
    field_type not in ('single_select', 'multi_select')
    or (jsonb_typeof(configuration -> 'options') = 'array' and jsonb_array_length(configuration -> 'options') > 0)
  )
);
create index program_questions_program_idx on public.program_questions (program_id, position);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete restrict,
  applicant_id uuid references auth.users(id) on delete restrict,
  legacy_applicant jsonb,
  status public.application_status not null default 'draft',
  submitted_at timestamptz,
  profile_snapshot jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint application_owner check ((applicant_id is not null) <> (legacy_applicant is not null)),
  constraint submitted_timestamp check ((status = 'draft' and submitted_at is null) or status <> 'draft'),
  unique (program_id, applicant_id)
);
create index applications_applicant_idx on public.applications (applicant_id, updated_at desc);
create index applications_program_status_idx on public.applications (program_id, status, submitted_at desc);

create table public.application_answers (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  question_id uuid not null references public.program_questions(id) on delete restrict,
  answer jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (application_id, question_id)
);
create index application_answers_application_idx on public.application_answers (application_id);

create table public.reviewer_assignments (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  reviewer_id uuid not null references auth.users(id) on delete cascade,
  assigned_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  unique (application_id, reviewer_id)
);

create table public.application_reviews (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  reviewer_id uuid not null references auth.users(id) on delete restrict,
  recommendation public.review_recommendation not null default 'pending',
  notes text check (notes is null or char_length(notes) <= 10000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (application_id, reviewer_id)
);
create index application_reviews_application_idx on public.application_reviews (application_id);

create function private.touch_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger profiles_updated before update on public.profiles for each row execute function private.touch_updated_at();
create trigger programs_updated before update on public.programs for each row execute function private.touch_updated_at();
create trigger questions_updated before update on public.program_questions for each row execute function private.touch_updated_at();
create trigger applications_updated before update on public.applications for each row execute function private.touch_updated_at();
create trigger answers_updated before update on public.application_answers for each row execute function private.touch_updated_at();
create trigger reviews_updated before update on public.application_reviews for each row execute function private.touch_updated_at();

create function private.is_admin(check_user uuid default auth.uid()) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.user_roles where user_id = check_user and role = 'admin')
$$;
create function private.is_staff(check_user uuid default auth.uid()) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.user_roles where user_id = check_user and role in ('admin', 'reviewer'))
$$;
create function private.can_review(target_application uuid, check_user uuid default auth.uid()) returns boolean
language sql stable security definer set search_path = '' as $$
  select private.is_admin(check_user) or exists (
    select 1 from public.reviewer_assignments where application_id = target_application and reviewer_id = check_user
  )
$$;
revoke all on all functions in schema private from public, anon, authenticated;

create function private.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  new_full_name text := trim(coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  new_student text := upper(regexp_replace(trim(coalesce(new.raw_user_meta_data ->> 'student_number', '')), '\s+', '', 'g'));
  new_registration text := upper(regexp_replace(trim(coalesce(new.raw_user_meta_data ->> 'registration_number', '')), '\s+', '', 'g'));
begin
  if char_length(new_full_name) < 2 or new_student = '' or new_registration = '' then
    raise exception 'Required profile fields are missing';
  end if;
  insert into public.profiles (id, full_name, email, student_number, registration_number)
  values (new.id, new_full_name, lower(new.email), new_student, new_registration);
  insert into public.user_roles (user_id, role) values (new.id, 'user');
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute function private.handle_new_user();

create function private.protect_profile_fields() returns trigger language plpgsql set search_path = '' as $$
begin
  new.id = old.id;
  new.email = old.email;
  new.student_number = upper(regexp_replace(trim(new.student_number), '\s+', '', 'g'));
  new.registration_number = upper(regexp_replace(trim(new.registration_number), '\s+', '', 'g'));
  new.full_name = trim(new.full_name);
  return new;
end;
$$;
create trigger protect_profile_fields before update on public.profiles for each row execute function private.protect_profile_fields();

create function private.validate_application_change() returns trigger language plpgsql set search_path = '' as $$
begin
  if tg_op = 'UPDATE' then
    if new.id <> old.id or new.program_id <> old.program_id or new.applicant_id is distinct from old.applicant_id or new.legacy_applicant is distinct from old.legacy_applicant or new.created_at <> old.created_at then
      raise exception 'Application ownership and program are immutable';
    end if;
    if not private.is_admin(auth.uid()) and coalesce(current_setting('app.application_workflow', true), '') = '' and new.status is distinct from old.status then
      raise exception 'Use the protected application workflow to change status';
    end if;
  end if;
  if tg_op = 'INSERT' and not private.is_admin(auth.uid()) and coalesce(auth.role(), '') <> 'service_role' then
    if new.applicant_id is distinct from auth.uid() or new.status <> 'draft' or new.submitted_at is not null or new.profile_snapshot is not null then
      raise exception 'Invalid application owner or initial state';
    end if;
    if not exists (select 1 from public.programs p where p.id = new.program_id and p.status = 'applications_open' and (p.applications_open_at is null or now() >= p.applications_open_at) and (p.applications_close_at is null or now() <= p.applications_close_at)) then
      raise exception 'Applications are not open for this program';
    end if;
  end if;
  return new;
end;
$$;
create trigger validate_application_change before insert or update on public.applications for each row execute function private.validate_application_change();

create function private.validate_answer() returns trigger language plpgsql set search_path = '' as $$
declare q public.program_questions; app public.applications; max_length integer;
begin
  select * into app from public.applications where id = new.application_id;
  select * into q from public.program_questions where id = new.question_id;
  if app.id is null or q.id is null or app.program_id <> q.program_id then raise exception 'Question does not belong to the application program'; end if;
  if app.status <> 'draft' and not private.is_admin(auth.uid()) then raise exception 'Submitted answers are read-only'; end if;
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
create trigger validate_answer before insert or update on public.application_answers for each row execute function private.validate_answer();

revoke all on all functions in schema private from public, anon, authenticated;
alter default privileges in schema private revoke execute on functions from public;

create or replace function public.submit_application(target_application_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare app public.applications; profile public.profiles;
begin
  select * into app from public.applications where id = target_application_id for update;
  if app.id is null or app.applicant_id is distinct from auth.uid() then raise exception 'Application not found'; end if;
  if app.status <> 'draft' then raise exception 'Only draft applications can be submitted'; end if;
  if not exists (select 1 from public.programs p where p.id = app.program_id and p.status = 'applications_open' and (p.applications_open_at is null or now() >= p.applications_open_at) and (p.applications_close_at is null or now() <= p.applications_close_at)) then raise exception 'The application window is closed'; end if;
  if exists (
    select 1 from public.program_questions q where q.program_id = app.program_id and q.required
    and not exists (select 1 from public.application_answers a where a.application_id = app.id and a.question_id = q.id and a.answer not in ('null'::jsonb, '""'::jsonb, '[]'::jsonb))
  ) then raise exception 'Complete all required questions'; end if;
  select * into profile from public.profiles where id = auth.uid();
  if profile.id is null then raise exception 'Complete your profile before submitting'; end if;
  perform set_config('app.application_workflow', 'submit', true);
  update public.applications set status = 'submitted', submitted_at = now(), profile_snapshot = jsonb_build_object(
    'full_name', profile.full_name, 'email', profile.email, 'student_number', profile.student_number,
    'registration_number', profile.registration_number, 'university', profile.university, 'course', profile.course,
    'year_of_study', profile.year_of_study, 'github_url', profile.github_url, 'linkedin_url', profile.linkedin_url
  ) where id = app.id;
end;
$$;

create or replace function public.withdraw_application(target_application_id uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform set_config('app.application_workflow', 'withdraw', true);
  update public.applications set status = 'withdrawn'
  where id = target_application_id and applicant_id = auth.uid() and status in ('submitted', 'under_review', 'shortlisted');
  if not found then raise exception 'Application cannot be withdrawn'; end if;
end;
$$;

create or replace function public.admin_set_application_status(target_application_id uuid, next_status public.application_status) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not private.is_admin(auth.uid()) then raise exception 'Administrator access required'; end if;
  if next_status not in ('under_review', 'shortlisted', 'accepted', 'rejected') then raise exception 'Invalid review status'; end if;
  update public.applications set status = next_status where id = target_application_id and status <> 'draft';
  if not found then raise exception 'Application not found or still a draft'; end if;
end;
$$;
revoke all on function public.submit_application(uuid) from public, anon;
revoke all on function public.withdraw_application(uuid) from public, anon;
revoke all on function public.admin_set_application_status(uuid, public.application_status) from public, anon;
grant execute on function public.submit_application(uuid), public.withdraw_application(uuid), public.admin_set_application_status(uuid, public.application_status) to authenticated;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.programs enable row level security;
alter table public.program_questions enable row level security;
alter table public.applications enable row level security;
alter table public.application_answers enable row level security;
alter table public.reviewer_assignments enable row level security;
alter table public.application_reviews enable row level security;

revoke all on all tables in schema public from anon, authenticated;
grant select on public.programs, public.program_questions to anon;
grant select on public.programs, public.program_questions to authenticated;
grant select, update on public.profiles to authenticated;
grant select on public.user_roles to authenticated;
grant select, insert, update on public.applications to authenticated;
grant select, insert, update, delete on public.application_answers to authenticated;
grant select on public.reviewer_assignments to authenticated;
grant select, insert, update on public.application_reviews to authenticated;
grant insert, update, delete on public.programs, public.program_questions to authenticated;
grant insert, delete on public.reviewer_assignments to authenticated;

create policy "public reads visible programs" on public.programs for select to anon using (status in ('published', 'applications_open', 'reviewing', 'completed'));
create policy "authenticated reads visible programs" on public.programs for select to authenticated using (status in ('published', 'applications_open', 'reviewing', 'completed') or private.is_staff());
create policy "admins create programs" on public.programs for insert to authenticated with check (private.is_admin() and created_by = auth.uid());
create policy "admins update programs" on public.programs for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "admins delete draft programs" on public.programs for delete to authenticated using (private.is_admin() and status = 'draft');

create policy "public reads questions for visible programs" on public.program_questions for select to anon using (exists (select 1 from public.programs p where p.id = program_id and p.status in ('published', 'applications_open', 'reviewing', 'completed')));
create policy "authenticated reads visible or staff questions" on public.program_questions for select to authenticated using (private.is_staff() or exists (select 1 from public.programs p where p.id = program_id and p.status in ('published', 'applications_open', 'reviewing', 'completed')));
create policy "admins create questions" on public.program_questions for insert to authenticated with check (private.is_admin());
create policy "admins update questions" on public.program_questions for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy "admins delete questions" on public.program_questions for delete to authenticated using (private.is_admin());

create policy "users read own profile" on public.profiles for select to authenticated using (id = auth.uid() or private.is_admin());
create policy "users update own profile" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "users read own role" on public.user_roles for select to authenticated using (user_id = auth.uid() or private.is_admin());

create policy "applicants and staff read applications" on public.applications for select to authenticated using (applicant_id = auth.uid() or private.can_review(id));
create policy "applicants create drafts" on public.applications for insert to authenticated with check (applicant_id = auth.uid() and status = 'draft');
create policy "applicants update own drafts" on public.applications for update to authenticated using (applicant_id = auth.uid() and status = 'draft') with check (applicant_id = auth.uid());
create policy "admins update applications" on public.applications for update to authenticated using (private.is_admin()) with check (private.is_admin());

create policy "applicants and staff read answers" on public.application_answers for select to authenticated using (exists (select 1 from public.applications a where a.id = application_id and (a.applicant_id = auth.uid() or private.can_review(a.id))));
create policy "applicants create draft answers" on public.application_answers for insert to authenticated with check (exists (select 1 from public.applications a where a.id = application_id and a.applicant_id = auth.uid() and a.status = 'draft'));
create policy "applicants update draft answers" on public.application_answers for update to authenticated using (exists (select 1 from public.applications a where a.id = application_id and a.applicant_id = auth.uid() and a.status = 'draft')) with check (exists (select 1 from public.applications a where a.id = application_id and a.applicant_id = auth.uid() and a.status = 'draft'));
create policy "applicants delete draft answers" on public.application_answers for delete to authenticated using (exists (select 1 from public.applications a where a.id = application_id and a.applicant_id = auth.uid() and a.status = 'draft'));
create policy "admins manage answers" on public.application_answers for all to authenticated using (private.is_admin()) with check (private.is_admin());

create policy "reviewers read own assignments" on public.reviewer_assignments for select to authenticated using (reviewer_id = auth.uid() or private.is_admin());
create policy "admins create assignments" on public.reviewer_assignments for insert to authenticated with check (private.is_admin() and assigned_by = auth.uid());
create policy "admins delete assignments" on public.reviewer_assignments for delete to authenticated using (private.is_admin());

create policy "reviewers read authorized reviews" on public.application_reviews for select to authenticated using (private.can_review(application_id));
create policy "reviewers create own reviews" on public.application_reviews for insert to authenticated with check (reviewer_id = auth.uid() and private.can_review(application_id));
create policy "reviewers update own reviews" on public.application_reviews for update to authenticated using (reviewer_id = auth.uid() and private.can_review(application_id)) with check (reviewer_id = auth.uid() and private.can_review(application_id));

comment on table public.applications is 'Current applications use applicant_id; legacy_applicant is reserved for explicit historical imports without fabricated Auth accounts.';
