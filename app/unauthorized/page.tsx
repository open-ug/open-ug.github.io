import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="mx-auto min-h-[65vh] max-w-3xl px-6 py-20">
      <p className="text-sm font-semibold text-sky-700">403 · Unauthorized</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        You do not have access to this area.
      </h1>
      <p className="mt-5 text-slate-600">
        If you believe your role is incorrect, contact an Open UG Labs
        administrator.
      </p>
      <Link
        className="mt-8 inline-flex font-semibold text-sky-700"
        href="/dashboard"
      >
        Return to dashboard
      </Link>
    </main>
  );
}
