-- RLS policies run as the caller and therefore need EXECUTE access to any
-- helper functions they invoke. Expose only current-user wrappers; keep the
-- parameterized internal helpers private so callers cannot probe other users.

create or replace function private.current_user_is_admin() returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null and exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role = 'admin'
  )
$$;

create or replace function private.current_user_is_staff() returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null and exists (
    select 1 from public.user_roles
    where user_id = (select auth.uid()) and role in ('admin', 'reviewer')
  )
$$;

create or replace function private.current_user_can_review(target_application uuid) returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select (select auth.uid()) is not null and (
    exists (
      select 1 from public.user_roles
      where user_id = (select auth.uid()) and role = 'admin'
    )
    or (
      exists (
        select 1 from public.user_roles
        where user_id = (select auth.uid()) and role = 'reviewer'
      )
      and exists (
        select 1 from public.reviewer_assignments
        where application_id = target_application
          and reviewer_id = (select auth.uid())
      )
    )
  )
$$;

revoke all on function private.current_user_is_admin() from public, anon, authenticated, service_role;
revoke all on function private.current_user_is_staff() from public, anon, authenticated, service_role;
revoke all on function private.current_user_can_review(uuid) from public, anon, authenticated, service_role;
grant usage on schema private to authenticated;
grant execute on function private.current_user_is_admin() to authenticated;
grant execute on function private.current_user_is_staff() to authenticated;
grant execute on function private.current_user_can_review(uuid) to authenticated;

alter policy "admins create programs" on public.programs
with check ((select private.current_user_is_admin()) and created_by = (select auth.uid()));
alter policy "authenticated reads visible programs" on public.programs
using (status in ('published', 'applications_open', 'reviewing', 'completed') or (select private.current_user_is_staff()));
alter policy "admins update programs" on public.programs
using ((select private.current_user_is_admin()))
with check ((select private.current_user_is_admin()));
alter policy "admins delete draft programs" on public.programs
using ((select private.current_user_is_admin()) and status = 'draft');

alter policy "authenticated reads visible or staff questions" on public.program_questions
using ((select private.current_user_is_staff()) or exists (
  select 1 from public.programs p
  where p.id = program_id and p.status in ('published', 'applications_open', 'reviewing', 'completed')
));
alter policy "admins create questions" on public.program_questions
with check ((select private.current_user_is_admin()));
alter policy "admins update questions" on public.program_questions
using ((select private.current_user_is_admin()))
with check ((select private.current_user_is_admin()));
alter policy "admins delete questions" on public.program_questions
using ((select private.current_user_is_admin()));

alter policy "users read own profile" on public.profiles
using (id = (select auth.uid()) or (select private.current_user_is_admin()));
alter policy "users read own role" on public.user_roles
using (user_id = (select auth.uid()) or (select private.current_user_is_admin()));

alter policy "applicants and staff read applications" on public.applications
using (applicant_id = (select auth.uid()) or (select private.current_user_can_review(id)));
alter policy "authorized application transitions" on public.applications
using (
  (applicant_id = (select auth.uid()) and status in ('draft', 'submitted', 'under_review', 'shortlisted'))
  or (select private.current_user_is_admin())
)
with check (
  (applicant_id = (select auth.uid()) and status in ('draft', 'submitted', 'withdrawn'))
  or (select private.current_user_is_admin())
);

alter policy "applicants and staff read answers" on public.application_answers
using (exists (
  select 1 from public.applications a
  where a.id = application_id
    and (a.applicant_id = (select auth.uid()) or (select private.current_user_can_review(a.id)))
));

alter policy "reviewers read own assignments" on public.reviewer_assignments
using (reviewer_id = (select auth.uid()) or (select private.current_user_is_admin()));
alter policy "admins create assignments" on public.reviewer_assignments
with check ((select private.current_user_is_admin()) and assigned_by = (select auth.uid()));
alter policy "admins delete assignments" on public.reviewer_assignments
using ((select private.current_user_is_admin()));

alter policy "reviewers read authorized reviews" on public.application_reviews
using ((select private.current_user_can_review(application_id)));
alter policy "reviewers create own reviews" on public.application_reviews
with check (reviewer_id = (select auth.uid()) and (select private.current_user_can_review(application_id)));
alter policy "reviewers update own reviews" on public.application_reviews
using (reviewer_id = (select auth.uid()) and (select private.current_user_can_review(application_id)))
with check (reviewer_id = (select auth.uid()) and (select private.current_user_can_review(application_id)));
