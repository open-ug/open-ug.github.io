create or replace function public.admin_list_users(
  search_term text default null,
  result_limit integer default 50,
  result_offset integer default 0
)
returns table (
  total_count bigint,
  user_id uuid,
  email text,
  full_name text,
  student_number text,
  registration_number text,
  university text,
  course text,
  year_of_study integer,
  role public.user_role,
  email_confirmed boolean,
  suspended boolean,
  account_created_at timestamptz,
  last_sign_in_at timestamptz,
  application_count bigint,
  submitted_application_count bigint
)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  normalized_search text := nullif(trim(coalesce(search_term, '')), '');
  safe_limit integer := least(greatest(coalesce(result_limit, 50), 1), 100);
  safe_offset integer := greatest(coalesce(result_offset, 0), 0);
begin
  if not exists (
    select 1
    from public.user_roles ur_check
    where ur_check.user_id = (select auth.uid())
      and ur_check.role = 'admin'
  ) then
    raise exception using errcode = '42501', message = 'Administrator access required';
  end if;

  return query
  with application_counts as (
    select
      a.applicant_id,
      count(*)::bigint as total,
      count(*) filter (where a.status <> 'draft')::bigint as submitted
    from public.applications a
    where a.applicant_id is not null
    group by a.applicant_id
  ), matching_users as (
    select
      u.id,
      u.email,
      u.email_confirmed_at,
      u.banned_until,
      u.created_at,
      u.last_sign_in_at,
      p.full_name,
      p.student_number,
      p.registration_number,
      p.university,
      p.course,
      p.year_of_study,
      coalesce(ur.role, 'user'::public.user_role) as account_role,
      coalesce(ac.total, 0::bigint) as applications,
      coalesce(ac.submitted, 0::bigint) as submitted_applications
    from auth.users u
    left join public.profiles p on p.id = u.id
    left join public.user_roles ur on ur.user_id = u.id
    left join application_counts ac on ac.applicant_id = u.id
    where normalized_search is null
      or u.email ilike '%' || normalized_search || '%'
      or p.full_name ilike '%' || normalized_search || '%'
      or p.student_number ilike '%' || normalized_search || '%'
      or p.registration_number ilike '%' || normalized_search || '%'
  )
  select
    count(*) over()::bigint,
    m.id,
    m.email,
    m.full_name,
    m.student_number,
    m.registration_number,
    m.university,
    m.course,
    m.year_of_study,
    m.account_role,
    m.email_confirmed_at is not null,
    m.banned_until > now(),
    m.created_at,
    m.last_sign_in_at,
    m.applications,
    m.submitted_applications
  from matching_users m
  order by m.created_at desc, m.id
  limit safe_limit
  offset safe_offset;
end;
$$;

revoke all on function public.admin_list_users(text, integer, integer) from public, anon, authenticated, service_role;
grant execute on function public.admin_list_users(text, integer, integer) to authenticated;
