import Link from "next/link";
import { requireStaff } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { role } = await requireStaff();
  return <main className="min-h-[75vh] bg-slate-50 text-slate-950"><div className="mx-auto max-w-7xl px-5 py-8 md:px-8"><div className="mb-8 flex flex-wrap items-center gap-6 border-b border-slate-200 pb-5 text-sm font-semibold"><Link href="/admin">Programs</Link><span className="text-slate-400">{role === "admin" ? "Administrator" : "Reviewer"}</span><Link className="ml-auto text-sky-700" href="/dashboard">Applicant dashboard</Link></div>{children}</div></main>;
}
