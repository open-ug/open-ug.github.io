import Link from "next/link";

export default function AuthShell({ title, intro, children, footer }: { title: string; intro: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-14 text-slate-950">
      <div className="mx-auto max-w-md border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
        <Link href="/" className="text-xs font-bold uppercase tracking-widest text-sky-700">Open UG Labs</Link>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{intro}</p>
        <div className="mt-8">{children}</div>
        {footer && <div className="mt-7 border-t border-slate-200 pt-6 text-sm text-slate-600">{footer}</div>}
      </div>
    </main>
  );
}
