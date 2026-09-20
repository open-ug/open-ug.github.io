alter function public.admin_user_metrics() set schema private;
alter function public.admin_list_users(text, integer, integer) set schema private;

revoke all on function private.admin_user_metrics() from public, anon, authenticated, service_role;
revoke all on function private.admin_list_users(text, integer, integer) from public, anon, authenticated, service_role;
grant usage on schema private to authenticated;
grant execute on function private.admin_user_metrics() to authenticated;
grant execute on function private.admin_list_users(text, integer, integer) to authenticated;

create function public.admin_user_metrics()
returns table (
  total_accounts bigint,
  confirmed_accounts bigint,
  unconfirmed_accounts bigint,
  new_accounts_30d bigint,
  active_accounts_30d bigint,
  completed_profiles bigint,
  accounts_with_applications bigint,
  administrator_accounts bigint,
  reviewer_accounts bigint,
  suspended_accounts bigint
)
language sql
stable
security invoker
set search_path = ''
as $$
  select * from private.admin_user_metrics()
$$;

create function public.admin_list_users(
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
language sql
stable
security invoker
set search_path = ''
as $$
  select * from private.admin_list_users(search_term, result_limit, result_offset)
$$;

revoke all on function public.admin_user_metrics() from public, anon, authenticated, service_role;
revoke all on function public.admin_list_users(text, integer, integer) from public, anon, authenticated, service_role;
grant execute on function public.admin_user_metrics() to authenticated;
grant execute on function public.admin_list_users(text, integer, integer) to authenticated;
