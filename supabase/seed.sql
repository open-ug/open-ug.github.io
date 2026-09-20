insert into public.programs (title, slug, summary, description, eligibility, status, applications_open_at, applications_close_at, stipend_description)
values
  ('HTTP Network Performance Support', 'http-network-performance-support', 'Support practical research into HTTP and network performance.', 'Work with Open UG Labs on measurement, tooling, documentation, and open-source contributions related to HTTP network performance.', 'Open to university students interested in systems, networking, Linux, or open-source software.', 'applications_open', now() - interval '1 day', now() + interval '90 days', 'Stipend details will be communicated to selected applicants.'),
  ('Makerere CS Website Team', 'makerere-cs-website', 'Join the undergraduate team improving the Department of Computer Science website.', 'A one-academic-year multidisciplinary project maintaining and improving the Makerere University Department of Computer Science website.', 'Open to undergraduate students. Prior PHP or CodeIgniter experience is helpful but not required.', 'applications_open', now() - interval '1 day', '2026-08-28 20:59:59.999+00', null)
on conflict (slug) do nothing;

with program as (select id from public.programs where slug = 'http-network-performance-support')
insert into public.program_questions (program_id, label, description, field_type, required, position, configuration)
select program.id, q.label, q.description, q.field_type::public.question_type, q.required, q.position, q.configuration from program cross join (values
  ('Why are you interested in this program?', null, 'long_text', true, 10, '{"max_length":3000}'::jsonb),
  ('Describe your Linux experience.', null, 'long_text', true, 20, '{"max_length":3000}'::jsonb),
  ('Describe your experience with containers.', 'It is fine to say that you are new to containers.', 'long_text', false, 30, '{"max_length":3000}'::jsonb),
  ('GitHub profile', null, 'url', false, 40, '{}'::jsonb),
  ('What do you hope to accomplish during the program?', null, 'long_text', true, 50, '{"max_length":3000}'::jsonb)
) as q(label, description, field_type, required, position, configuration)
on conflict (program_id, position) do nothing;

with program as (select id from public.programs where slug = 'makerere-cs-website')
insert into public.program_questions (program_id, label, description, field_type, required, position, configuration)
select program.id, 'About your application', 'Tell us what interests you about the project, relevant experience, and what you would bring to the team.', 'long_text', true, 10, '{"max_length":2000}'::jsonb from program
on conflict (program_id, position) do nothing;
