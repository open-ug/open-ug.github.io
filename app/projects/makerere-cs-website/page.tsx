import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Code2, Users } from "lucide-react";
import { APPLICATION_DEADLINE_LABEL } from "@/lib/application";

export const metadata: Metadata = {
  title: "Makerere CS Website Project | Open UG Labs",
  description: "Learn about the Open UG Labs project maintaining Makerere University's Computer Science website.",
};

const contributionAreas = [
  ["Engineering", "Maintain features, improve reliability, and support the CodeIgniter/PHP codebase."],
  ["Content", "Keep departmental information clear, accurate, structured, and up to date."],
  ["Design & accessibility", "Improve usability, visual consistency, mobile layouts, and inclusive access."],
  ["Quality & coordination", "Test changes, document work, organise tasks, and help the team deliver consistently."],
];

export default function MakerereCsWebsiteProjectPage() {
  return (
    <main className="bg-white text-slate-950">
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-950">
            <ArrowLeft size={16} aria-hidden="true" /> All projects
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-20">
          <div>
            <div className="mb-6 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="bg-slate-100 px-3 py-1.5 text-slate-600">Digital infrastructure</span>
              <span className="bg-sky-100 px-3 py-1.5 text-sky-800">Recruiting</span>
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.045em] md:text-7xl">
              Makerere Computer Science website
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-8 text-slate-600">
              An Open UG Labs project bringing together undergraduate students to
              maintain and improve the Department of Computer Science website.
            </p>
          </div>

          <aside className="border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold">Applications are open</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Deadline: {APPLICATION_DEADLINE_LABEL}</p>
            <Link href="/projects/makerere-cs-website/apply" className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-600">
              Apply to join <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-px bg-slate-200 md:grid-cols-3">
          <div className="flex gap-4 bg-slate-50 p-6 md:p-8"><Calendar className="shrink-0 text-sky-600" size={21} /><div><p className="text-sm font-semibold">Duration</p><p className="mt-1 text-sm text-slate-600">One full academic year</p></div></div>
          <div className="flex gap-4 bg-slate-50 p-6 md:p-8"><Users className="shrink-0 text-sky-600" size={21} /><div><p className="text-sm font-semibold">Team</p><p className="mt-1 text-sm text-slate-600">Undergraduate, multidisciplinary</p></div></div>
          <div className="flex gap-4 bg-slate-50 p-6 md:p-8"><Code2 className="shrink-0 text-sky-600" size={21} /><div><p className="text-sm font-semibold">Stack</p><p className="mt-1 text-sm text-slate-600">CodeIgniter and PHP</p></div></div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="mb-3 text-sm font-semibold text-sky-600">About the project</p>
          <h2 className="text-3xl font-semibold tracking-tight">A useful, dependable departmental platform.</h2>
        </div>
        <div className="space-y-6 text-base leading-8 text-slate-600">
          <p>The website serves students, staff, researchers, prospective applicants, and the wider university community. The team will keep its information current, improve the experience, and support its long-term reliability.</p>
          <p>The current platform uses CodeIgniter and PHP. Experience with those technologies is helpful for engineering contributors, but it is not required to apply. The project includes several roles, and students can learn the stack while contributing in their strongest area.</p>
          <Link href="https://cs.mak.ac.ug/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-slate-950 hover:text-sky-600">Visit the department website <ArrowUpRight size={17} /></Link>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="mb-3 text-sm font-semibold text-sky-600">Contribution areas</p>
          <h2 className="mb-10 text-3xl font-semibold tracking-tight">Different strengths belong on this team.</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {contributionAreas.map(([title, description]) => (
              <div key={title} className="border border-slate-200 bg-white p-7">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-5 border-t border-slate-200 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="text-2xl font-semibold">Interested in joining?</h2><p className="mt-2 text-sm text-slate-600">Tell us how you would like to contribute.</p></div>
            <Link href="/projects/makerere-cs-website/apply" className="inline-flex items-center justify-center gap-2 bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white hover:bg-sky-600">Start application <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
