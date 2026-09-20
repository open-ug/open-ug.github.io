import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { signOutFromDashboard } from "./actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = await requireUser();
  return (
    <main className="min-h-[75vh] bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-5 border-b border-slate-200 pb-5 text-sm font-semibold">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/profile">Profile</Link>
          {(role === "admin" || role === "reviewer") && (
            <Link className="text-sky-700" href="/admin">
              Administration
            </Link>
          )}
          <form action={signOutFromDashboard} className="ml-auto">
            <button className="text-slate-500 hover:text-slate-950">
              Sign out
            </button>
          </form>
        </div>
        {children}
      </div>
    </main>
  );
}
