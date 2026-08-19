import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Check } from "lucide-react";
import ApplicationForm from "@/app/applications/ApplicationForm";
import { APPLICATION_DEADLINE_LABEL } from "@/lib/application";

export const metadata: Metadata = {
  title: "Apply — Makerere CS Website Project | Open UG Labs",
  description: "Apply to join the undergraduate team working on the Makerere Computer Science website.",
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-slate-950">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-16">
        <Link href="/projects/makerere-cs-website" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-950">
          <ArrowLeft size={16} aria-hidden="true" /> Back to project
        </Link>

        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 text-sm font-semibold text-sky-700">Project application</p>
            <h1 className="text-3xl font-semibold tracking-[-0.035em] md:text-4xl">Join the Makerere CS website team</h1>
            <p className="mt-5 text-sm leading-7 text-slate-600">We are selecting undergraduate students to work together for one full academic year.</p>

            <div className="mt-8 border-y border-slate-200 py-6">
              <div className="flex gap-3"><Calendar className="mt-0.5 shrink-0 text-sky-700" size={18} /><div><p className="text-sm font-semibold">Application deadline</p><p className="mt-1 text-sm leading-6 text-slate-600">{APPLICATION_DEADLINE_LABEL}</p></div></div>
            </div>

            <ul className="mt-7 space-y-4 text-sm text-slate-600">
              {["Open to undergraduate students", "No CodeIgniter or PHP experience required", "Engineering and non-engineering roles available"].map((item) => (
                <li key={item} className="flex gap-3"><Check className="mt-0.5 shrink-0 text-sky-700" size={17} /><span className="leading-6">{item}</span></li>
              ))}
            </ul>
          </aside>

          <ApplicationForm />
        </div>
      </div>
    </main>
  );
}
