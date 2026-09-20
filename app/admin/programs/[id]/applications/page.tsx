import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import StatusBadge from "@/components/StatusBadge";
import type { Json } from "@/lib/supabase/database.types";
import ApplicationFilters from "./ApplicationFilters";

function snapshot(value: Json | null) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value
    : {};
}

export default async function ApplicationsList({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { id } = await params;
  const filters = await searchParams;
  const { supabase } = await requireStaff();
  const { data: program } = await supabase
    .from("programs")
    .select("id,title")
    .eq("id", id)
    .single();
  if (!program) notFound();
  let request = supabase
    .from("applications")
    .select("id,status,submitted_at,profile_snapshot")
    .eq("program_id", id)
    .neq("status", "draft")
    .order("submitted_at", { ascending: false });
  if (filters.status) request = request.eq("status", filters.status as never);
  const { data: applications } = await request;
  const term = filters.q?.trim().toLowerCase();
  const visible = (applications ?? []).filter((application) => {
    if (!term) return true;
    const profile = snapshot(application.profile_snapshot);
    return [
      profile.full_name,
      profile.student_number,
      profile.registration_number,
      profile.course,
    ].some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(term),
    );
  });
  return (
    <div>
      <Link
        href={`/admin/programs/${id}`}
        className="text-sm font-semibold text-sky-700"
      >
        ← {program.title}
      </Link>
      <h1 className="mt-3 text-3xl font-semibold">Applications</h1>
      <ApplicationFilters query={filters.q} status={filters.status} />
      <div className="mt-6 overflow-x-auto border border-slate-200 bg-white">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="p-4">Applicant</th>
              <th className="p-4">Student number</th>
              <th className="p-4">Registration</th>
              <th className="p-4">Course / year</th>
              <th className="p-4">Submitted</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((application) => {
              const profile = snapshot(application.profile_snapshot);
              return (
                <tr key={application.id} className="border-b border-slate-100">
                  <td className="p-4 font-semibold">
                    <Link
                      className="hover:text-sky-700"
                      href={`/admin/applications/${application.id}`}
                    >
                      {String(profile.full_name ?? "Historical applicant")}
                    </Link>
                  </td>
                  <td className="p-4">
                    {String(profile.student_number ?? "—")}
                  </td>
                  <td className="p-4">
                    {String(profile.registration_number ?? "—")}
                  </td>
                  <td className="p-4">
                    {String(profile.course ?? "—")}
                    {profile.year_of_study
                      ? ` · Year ${profile.year_of_study}`
                      : ""}
                  </td>
                  <td className="p-4">
                    {application.submitted_at
                      ? new Intl.DateTimeFormat("en-UG", {
                          dateStyle: "medium",
                        }).format(new Date(application.submitted_at))
                      : "—"}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={application.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!visible.length && (
          <p className="p-8 text-sm text-slate-500">
            No applications match these filters.
          </p>
        )}
      </div>
    </div>
  );
}
