# Supabase application platform

## Environment

Copy `.env.example` to `.env.local` and set:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`SUPABASE_SERVICE_ROLE_KEY` is not used by the website. It is only accepted by the opt-in historical import script and must remain server-side.

The former `GOOGLE_APPS_SCRIPT_URL` and `GOOGLE_APPS_SCRIPT_SECRET` variables are obsolete for application intake. Remove them from the website deployment after confirming no separate service uses them.

## Database setup

Migrations are applied in timestamp order. `20260920175652_fix_rls_helper_permissions.sql` repairs authenticated RLS access by granting access only to current-user authorization wrappers; the parameterized role helpers remain private.

Install the Supabase CLI, link the existing project, and apply the checked-in migration:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

For a disposable local stack:

```bash
supabase start
supabase db reset
supabase test db
pnpm dev
```

`supabase db reset --local` is destructive and is intended only for the local Supabase instance. The seed creates two ordinary programs and configurable questions; neither program has custom application code.

Regenerate TypeScript types after every schema change:

```bash
supabase gen types typescript --linked > lib/supabase/database.types.ts
```

## Auth dashboard settings

In **Authentication → URL Configuration**:

- Site URL: `http://localhost:3000` locally; use the canonical HTTPS site URL in production.
- Redirect URLs: add `http://localhost:3000/auth/confirm` and `https://YOUR_DOMAIN/auth/confirm`. Add preview deployment origins deliberately rather than using a broad wildcard.
- Keep email confirmation enabled.

The confirmation route supports Supabase's default PKCE callback (`code`) as well as token-hash links. You may keep the default templates. If the project has custom SMTP and editable templates, use this **Confirm signup** link:

```html
<a href="{{ .RedirectTo }}&token_hash={{ .TokenHash }}&type=email">Confirm email</a>
```

Update **Reset password** separately:

```html
<a href="{{ .RedirectTo }}&token_hash={{ .TokenHash }}&type=recovery">Reset password</a>
```

The app always supplies a redirect containing an existing `next` query parameter, hence the `&token_hash`. The resulting links must reach `/auth/confirm` with either a PKCE `code`, or `token_hash` and `type`. Test signup and recovery messages after changing templates. Newer Free-plan projects require custom SMTP before Auth templates can be customized.

For production, configure custom SMTP so auth mail is not constrained by the development mail service. Set the production site URL and redirect allow-list before launch.

## Production signup troubleshooting

The signup transaction creates `auth.users`, `profiles`, and the default `user_roles` row together. The hardening migration validates and normalizes signup metadata and returns a specific constraint error for duplicate student/registration identifiers.

If the UI says **Account setup failed**:

1. Confirm `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_SITE_URL=https://YOUR_DOMAIN` are set on the production deployment, then redeploy.
2. In **Logs → Auth**, inspect the failed signup at its timestamp. Then inspect **Logs → Postgres** for an error from `private.handle_new_user`.
3. Verify both checked-in migrations are applied with `supabase migration list --linked`; apply pending migrations with `supabase db push --dry-run`, review the output, then `supabase db push`.
4. Confirm the profile trigger exists:

```sql
select tgname, tgenabled
from pg_trigger
where tgrelid = 'auth.users'::regclass and not tgisinternal;
```

5. Test using a new email, student number, and registration number. Supabase intentionally may obscure whether an email already exists.

Do not remove the `auth.users` trigger to make signup pass; it prevents authenticated accounts without the required application profile.

## Starting over safely

Do not run a destructive reset against the production project. Database resets do not provide the same clean slate as replacing a project because Supabase also manages Auth, Storage, configuration, secrets, and logs outside the application schema.

### Recommended: replace the project

This is the safest complete restart when there is no production data to retain:

1. Create a new Supabase project. Keep the old project available until verification is complete.
2. From this repository, link the new project and review/apply migrations:

```bash
supabase link --project-ref NEW_PROJECT_REF
supabase db push --dry-run
supabase db push
```

3. Do not seed production unless the sample programs are intentionally wanted. Create the first real program from `/admin` after bootstrapping the administrator.
4. Configure Site URL, exact redirect URLs, email confirmation, custom SMTP, and production rate limits on the new project.
5. Replace the deployment's public URL and publishable key, set `NEXT_PUBLIC_SITE_URL`, and redeploy.
6. Complete a smoke test: signup → email confirmation → login → profile → draft → submit → admin review → password reset.
7. Export anything needed from the old project. Only then pause or delete it from the Supabase dashboard. Project deletion is irreversible.

### Disposable local or staging reset

Local reset recreates the database from migrations and seed data:

```bash
supabase db reset --local
supabase test db
```

For a linked **disposable development/staging project only**, take a backup, verify the currently linked project by name/ref, and run:

```bash
supabase db dump --linked --file before-reset-schema.sql
supabase db dump --linked --data-only --use-copy --file before-reset-data.sql
supabase projects list
supabase db reset --linked --no-seed
```

The CLI dumps are logical backups of the included database schemas, not complete project backups of managed Auth/Storage/configuration. `db reset --linked` is destructive. Never use it for production, and do not rely on it to erase every managed Auth/Storage artifact. Use a replacement project when a complete restart is required.

## First administrator

1. Sign up normally and confirm the account.
2. In the Supabase SQL editor, verify the exact account, then promote its UUID:

```sql
select id, email from auth.users where email = 'admin@example.org';

update public.user_roles
set role = 'admin'
where user_id = 'PASTE-THE-VERIFIED-UUID';
```

Check that exactly one row was updated. This is intentionally not available to normal clients. The migration grants no client `INSERT`, `UPDATE`, or `DELETE` privilege on `user_roles`.

To create a reviewer, use the same verified-UUID process with `role = 'reviewer'`. An administrator can then assign that reviewer from an application's review page; unassigned reviewers cannot read the application.

## Historical spreadsheet migration

The removed route sent `fullName`, `email`, `course`, `year`, `studentNumber`, `registrationNumber`, and `bio` to Google Apps Script. No workbook or export exists in this repository, so no data was imported automatically.

Export the sheet as a JSON array, review/massage its keys, back up the Supabase database, and run in a controlled shell:

```bash
NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
  node scripts/import-legacy-applications.mjs ./legacy-applications.json makerere-cs-website
```

The importer deliberately creates `legacy_applicant` records with no `applicant_id`; it never fabricates Auth users. It maps `bio` to the only configured question for the legacy Makerere program, or accepts an `answers` object keyed by exact question label. Run first against local/staging data and inspect warnings. Re-running creates duplicates, so treat it as a one-off operation.

## Security model

- Every application table has RLS enabled and explicit grants.
- Anonymous access is limited to visible programs/questions.
- Applicants can read only their profile/applications, create only their own draft, and edit answers only while that draft exists.
- Submission and withdrawal use narrowly scoped database functions that derive identity from `auth.uid()`; submission validates deadlines/required answers and captures a profile snapshot.
- Application ownership/program fields are immutable. Clients cannot promote their own status.
- Reviewers see only assigned applications. Admins can see all applications and make decisions. Review notes have no applicant policy.
- Roles live in `user_roles`; frontend email addresses are never authorization inputs.
- The service-role key bypasses RLS and is never used by Next.js runtime code.

## Deployment checklist

Run `pnpm typecheck`, `pnpm lint`, and `pnpm build`. Then run `supabase db push --dry-run`, review and apply migrations with `supabase db push`, configure the production environment variables, set Auth URLs/templates/SMTP, promote the first administrator, and test signup, confirmation, reset, draft, submission, review, and denial paths against the production configuration.
