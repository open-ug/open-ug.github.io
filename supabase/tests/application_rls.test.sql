begin;
select plan(18);

select ok(has_schema_privilege('authenticated', 'private', 'usage'), 'authenticated can resolve safe RLS helpers');
select ok(has_function_privilege('authenticated', 'private.current_user_is_admin()', 'execute'), 'authenticated can execute current-user admin helper');
select ok(not has_function_privilege('authenticated', 'private.is_admin(uuid)', 'execute'), 'parameterized admin helper remains private');

insert into auth.users (id, email, raw_user_meta_data, aud, role)
values
  ('10000000-0000-0000-0000-000000000001', 'applicant@example.test', '{"full_name":"Applicant One","student_number":"S001","registration_number":"R001"}', 'authenticated', 'authenticated'),
  ('10000000-0000-0000-0000-000000000002', 'other@example.test', '{"full_name":"Applicant Two","student_number":"S002","registration_number":"R002"}', 'authenticated', 'authenticated'),
  ('10000000-0000-0000-0000-000000000003', 'admin@example.test', '{"full_name":"Admin User","student_number":"S003","registration_number":"R003"}', 'authenticated', 'authenticated');
update public.user_roles set role = 'admin' where user_id = '10000000-0000-0000-0000-000000000003';
insert into public.programs (id, title, slug, status, applications_open_at, applications_close_at)
values ('20000000-0000-0000-0000-000000000001', 'Test Program', 'test-program', 'applications_open', now() - interval '1 day', now() + interval '1 day');
insert into public.program_questions (id, program_id, label, field_type, required, position)
values ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Required answer', 'short_text', true, 10);

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000001","role":"authenticated"}', true);
select lives_ok($$insert into public.applications (id, program_id, applicant_id) values ('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001')$$, 'applicant creates own draft');
select throws_ok($$insert into public.applications (program_id, applicant_id) values ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002')$$, '42501', null, 'applicant cannot create another user application');
select is((select count(*)::integer from public.profiles), 1, 'applicant sees only own profile');
select is((select count(*)::integer from public.applications), 1, 'applicant sees only own application');
select throws_ok($$update public.applications set status = 'accepted' where id = '40000000-0000-0000-0000-000000000001'$$, null, null, 'applicant cannot accept self');
select lives_ok($$insert into public.application_answers (application_id, question_id, answer) values ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '"Ready"')$$, 'applicant answers own draft');
select lives_ok($$select public.submit_application('40000000-0000-0000-0000-000000000001')$$, 'applicant submits complete draft');
select lives_ok($$update public.application_answers set answer = '"Changed"' where application_id = '40000000-0000-0000-0000-000000000001'$$, 'blocked answer updates do not leak row existence');
select is((select answer #>> '{}' from public.application_answers where application_id = '40000000-0000-0000-0000-000000000001'), 'Ready', 'submitted answer remains immutable');
select is((select status::text from public.applications where id = '40000000-0000-0000-0000-000000000001'), 'submitted', 'submission changes status');
select is((select profile_snapshot ->> 'full_name' from public.applications where id = '40000000-0000-0000-0000-000000000001'), 'Applicant One', 'submission records profile snapshot');
select is((select count(*)::integer from public.application_reviews), 0, 'applicant cannot see reviews');

select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000003","role":"authenticated"}', true);
select is((select count(*)::integer from public.applications), 1, 'admin sees applications');
select lives_ok($$select public.admin_set_application_status('40000000-0000-0000-0000-000000000001', 'shortlisted')$$, 'admin can advance application status');
select is((select status::text from public.applications where id = '40000000-0000-0000-0000-000000000001'), 'shortlisted', 'admin decision is persisted');

select * from finish();
rollback;
