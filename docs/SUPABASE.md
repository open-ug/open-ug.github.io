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

`supabase db reset` is destructive and is intended only for a local Supabase instance. The seed creates two ordinary programs and configurable questions; neither program has custom application code.

Regenerate TypeScript types after every schema change:

```bash
supabase gen types typescript --linked > lib/supabase/database.types.ts
```

## Auth dashboard settings

In **Authentication → URL Configuration**:

- Site URL: `http://localhost:3000` locally; use the canonical HTTPS site URL in production.
- Redirect URLs: add `http://localhost:3000/auth/confirm` and `https://YOUR_DOMAIN/auth/confirm`. Add preview deployment origins deliberately rather than using a broad wildcard.
- Keep email confirmation enabled.

In **Authentication → Email Templates**, update the **Confirm signup** link for SSR/PKCE:

```html
<a href="{{ .RedirectTo }}&token_hash={{ .TokenHash }}&type=email">Confirm email</a>
```

Update **Reset password** separately:

```html
<a href="{{ .RedirectTo }}&token_hash={{ .TokenHash }}&type=recovery">Reset password</a>
```

The app always supplies a redirect containing an existing `next` query parameter, hence the `&token_hash`. The resulting links must reach `/auth/confirm` with `token_hash` and `type`. Test both messages after editing templates.

For production, configure custom SMTP so auth mail is not constrained by the development mail service. Set the production site URL and redirect allow-list before launch.

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

Run `pnpm lint` and `pnpm build`, apply migrations with `supabase db push`, configure the production environment variables, set Auth URLs/templates/SMTP, promote the first administrator, and test signup, confirmation, reset, draft, submission, review, and denial paths against the production configuration.
