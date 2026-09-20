import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import UserSearch from "./UserSearch";

const pageSize = 50;

function count(value: number | undefined) {
  return new Intl.NumberFormat("en-UG").format(value ?? 0);
}

function dateTime(value: string | null) {
  if (!value) return "Never";
  return new Intl.DateTimeFormat("en-UG", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Kampala",
  }).format(new Date(value));
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const params = await searchParams;
  const query = params.q?.trim().slice(0, 120) || undefined;
  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const [{ data: metricsRows, error: metricsError }, { data: users, error: usersError }] =
    await Promise.all([
      supabase.rpc("admin_user_metrics"),
      supabase.rpc("admin_list_users", {
        search_term: query ?? null,
        result_limit: pageSize,
        result_offset: (page - 1) * pageSize,
      }),
    ]);

  const metrics = metricsRows?.[0];
  const totalResults = users?.[0]?.total_count ?? (query ? 0 : metrics?.total_accounts ?? 0);
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  const querySuffix = query ? `&q=${encodeURIComponent(query)}` : "";
  const cards = [
    ["Total accounts", metrics?.total_accounts, "All registered Auth users"],
    ["Confirmed", metrics?.confirmed_accounts, "Verified email addresses"],
    ["Active in 30 days", metrics?.active_accounts_30d, "Recently signed in"],
    ["New in 30 days", metrics?.new_accounts_30d, "Recently registered"],
    ["Complete profiles", metrics?.completed_profiles, "Course, university and year added"],
    ["Applicants", metrics?.accounts_with_applications, "Started at least one application"],
  ] as const;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-sm font-semibold text-sky-700">Administration</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Users</h1>
          <p className="mt-3 text-sm text-slate-600">
            Account activity, profile completion and application participation.
          </p>
        </div>
        <p className="text-sm text-slate-500">Updated when this page loads</p>
      </div>

      {(metricsError || usersError) && (
        <p className="mt-7 border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          User reporting could not be loaded. Confirm the latest database migration is applied.
        </p>
      )}

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value, description]) => (
          <div key={label} className="border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{count(value)}</p>
            <p className="mt-2 text-xs text-slate-500">{description}</p>
          </div>
        ))}
      </section>

      <section className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <p className="border border-slate-200 bg-white p-4"><span className="text-slate-500">Unconfirmed</span><strong className="float-right">{count(metrics?.unconfirmed_accounts)}</strong></p>
        <p className="border border-slate-200 bg-white p-4"><span className="text-slate-500">Reviewers</span><strong className="float-right">{count(metrics?.reviewer_accounts)}</strong></p>
        <p className="border border-slate-200 bg-white p-4"><span className="text-slate-500">Administrators</span><strong className="float-right">{count(metrics?.administrator_accounts)}</strong></p>
        <p className="border border-slate-200 bg-white p-4"><span className="text-slate-500">Suspended</span><strong className="float-right">{count(metrics?.suspended_accounts)}</strong></p>
      </section>

      <UserSearch query={query} />

      <div className="mt-6 overflow-x-auto border border-slate-200 bg-white">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="p-4">Account</th>
              <th className="p-4">Identifiers</th>
              <th className="p-4">Course / year</th>
              <th className="p-4">Role</th>
              <th className="p-4">Applications</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Last sign-in</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.user_id} className="border-b border-slate-100 align-top last:border-0">
                <td className="p-4">
                  <p className="font-semibold">{user.full_name ?? "Profile unavailable"}</p>
                  <p className="mt-1 text-xs text-slate-500">{user.email ?? "No email"}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className={`px-2 py-1 text-[11px] font-semibold ${user.email_confirmed ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"}`}>
                      {user.email_confirmed ? "Confirmed" : "Unconfirmed"}
                    </span>
                    {user.suspended && <span className="bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-700">Suspended</span>}
                  </div>
                </td>
                <td className="p-4 text-slate-600">
                  <p>{user.student_number ?? "—"}</p>
                  <p className="mt-1 text-xs">{user.registration_number ?? "—"}</p>
                </td>
                <td className="p-4 text-slate-600">
                  <p>{user.course ?? "Not added"}</p>
                  <p className="mt-1 text-xs">{user.university ?? "University not added"}{user.year_of_study ? ` · Year ${user.year_of_study}` : ""}</p>
                </td>
                <td className="p-4"><span className="bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-700">{user.role}</span></td>
                <td className="p-4 text-slate-600">
                  <p>{count(user.application_count)} total</p>
                  <p className="mt-1 text-xs">{count(user.submitted_application_count)} submitted</p>
                </td>
                <td className="p-4 text-xs text-slate-600">{dateTime(user.account_created_at)}</td>
                <td className="p-4 text-xs text-slate-600">{dateTime(user.last_sign_in_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!users?.length && !usersError && (
          <p className="p-8 text-sm text-slate-500">
            {query ? "No accounts match this search." : "No accounts yet."}
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <nav className="mt-6 flex items-center justify-between text-sm" aria-label="User list pagination">
          {page > 1 ? <Link className="font-semibold text-sky-700" href={`?page=${page - 1}${querySuffix}`}>← Previous</Link> : <span />}
          <span className="text-slate-500">Page {Math.min(page, totalPages)} of {totalPages} · {count(totalResults)} accounts</span>
          {page < totalPages ? <Link className="font-semibold text-sky-700" href={`?page=${page + 1}${querySuffix}`}>Next →</Link> : <span />}
        </nav>
      )}
    </div>
  );
}
