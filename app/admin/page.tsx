import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import StatusBadge from "@/components/StatusBadge";

export default async function AdminPage() {
  const { supabase, role } = await requireStaff();
  const [{ data: programs }, { data: applications }] = await Promise.all([
    supabase
      .from("programs")
      .select("id,title,status,applications_close_at")
      .order("created_at", { ascending: false }),
    supabase.from("applications").select("id,program_id,status"),
  ]);
  const counts = new Map<string, { submitted: number; drafts: number }>();
  for (const application of applications ?? []) {
    const current = counts.get(application.program_id) ?? {
      submitted: 0,
      drafts: 0,
    };
    if (application.status === "draft") current.drafts++;
    else current.submitted++;
    counts.set(application.program_id, current);
  }
  return (
    <>
      <div className="flex items-end justify-between gap-5">
        <div>
          <p className="text-sm font-semibold text-sky-700">Administration</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Programs
          </h1>
        </div>
        {role === "admin" && (
          <Link
            href="/admin/programs/new"
            className="bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Create program
          </Link>
        )}
      </div>
      <div className="mt-8 overflow-x-auto border border-slate-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="p-4">Program</th>
              <th className="p-4">Status</th>
              <th className="p-4">Applications</th>
              <th className="p-4">Drafts</th>
              <th className="p-4">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {programs?.map((program) => (
              <tr
                key={program.id}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="p-4 font-semibold">
                  <Link
                    className="hover:text-sky-700"
                    href={`/admin/programs/${program.id}`}
                  >
                    {program.title}
                  </Link>
                </td>
                <td className="p-4">
                  <StatusBadge status={program.status} />
                </td>
                <td className="p-4">
                  <Link
                    className="text-sky-700"
                    href={`/admin/programs/${program.id}/applications`}
                  >
                    {counts.get(program.id)?.submitted ?? 0} submitted
                  </Link>
                </td>
                <td className="p-4 text-slate-500">
                  {counts.get(program.id)?.drafts ?? 0}
                </td>
                <td className="p-4 text-slate-600">
                  {program.applications_close_at
                    ? new Intl.DateTimeFormat("en-UG", {
                        dateStyle: "medium",
                      }).format(new Date(program.applications_close_at))
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!programs?.length && (
          <p className="p-8 text-sm text-slate-500">No programs yet.</p>
        )}
      </div>
    </>
  );
}
