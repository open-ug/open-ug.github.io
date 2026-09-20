import Link from "next/link";
import { requireUser } from "@/lib/auth";
import StatusBadge from "@/components/StatusBadge";

export default async function DashboardPage() {
  const { supabase, user } = await requireUser();
  const [{ data: profile }, { data: applications }, { data: programs }] = await Promise.all([
    supabase.from("profiles").select("full_name,student_number,registration_number,course,year_of_study").eq("id", user.id).single(),
    supabase.from("applications").select("id,program_id,status,submitted_at,updated_at").eq("applicant_id", user.id).order("updated_at", { ascending: false }),
    supabase.from("programs").select("id,title,slug,summary,applications_close_at,status").order("applications_close_at"),
  ]);
  const programMap = new Map((programs ?? []).map((program) => [program.id, program]));
  const applied = new Set((applications ?? []).map((application) => application.program_id));

  return <div className="space-y-12"><header><p className="text-sm font-semibold text-sky-700">Applicant dashboard</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Welcome, {profile?.full_name ?? "applicant"}</h1></header>
    <section className="grid gap-5 md:grid-cols-[1fr_2fr]"><div className="border border-slate-200 bg-white p-6"><div className="flex items-center justify-between"><h2 className="font-semibold">Your profile</h2><Link className="text-sm font-semibold text-sky-700" href="/dashboard/profile">Edit</Link></div><dl className="mt-5 space-y-3 text-sm"><div><dt className="text-slate-500">Student number</dt><dd>{profile?.student_number}</dd></div><div><dt className="text-slate-500">Registration number</dt><dd>{profile?.registration_number}</dd></div><div><dt className="text-slate-500">Course / year</dt><dd>{profile?.course || "Not added"}{profile?.year_of_study ? ` · Year ${profile.year_of_study}` : ""}</dd></div></dl></div>
      <div><h2 className="text-xl font-semibold">My applications</h2><div className="mt-4 space-y-3">{applications?.length ? applications.map((application) => { const program = programMap.get(application.program_id); return <Link key={application.id} href={`/dashboard/applications/${application.id}`} className="flex flex-col gap-3 border border-slate-200 bg-white p-5 transition hover:border-slate-400 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-semibold">{program?.title ?? "Program application"}</h3><p className="mt-1 text-xs text-slate-500">{application.submitted_at ? `Submitted ${new Intl.DateTimeFormat("en-UG", { dateStyle: "medium" }).format(new Date(application.submitted_at))}` : "Last saved as a draft"}</p></div><StatusBadge status={application.status} /></Link>; }) : <p className="border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">You have not started an application yet.</p>}</div></div></section>
    <section><h2 className="text-xl font-semibold">Active programs</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{programs?.filter((p) => p.status === "applications_open" && !applied.has(p.id)).map((program) => <div key={program.id} className="border border-slate-200 bg-white p-6"><h3 className="font-semibold">{program.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{program.summary}</p><Link href={`/programs/${program.slug}`} className="mt-5 inline-flex text-sm font-semibold text-sky-700">View program →</Link></div>)}</div></section>
  </div>;
}
