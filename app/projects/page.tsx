import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Open UG Labs",
  description: "Explore software, research, and digital infrastructure projects at Open UG Labs.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-white text-slate-950">
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="mb-5 text-sm font-semibold text-sky-600">Our work</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
            Projects that turn ideas into useful infrastructure.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            Open UG Labs develops open-source software, conducts applied research,
            and partners with institutions on digital systems that matter.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-10 flex items-center justify-between border-b border-slate-200 pb-5">
          <h2 className="text-lg font-semibold">Current projects</h2>
          <span className="text-sm text-slate-500">{projects.length} projects</span>
        </div>
        <div className="divide-y divide-slate-200">
          {projects.map((project, index) => (
            <Link
              key={project.name}
              href={project.href}
              target={project.external ? "_blank" : undefined}
              rel={project.external ? "noreferrer" : undefined}
              className="group grid gap-5 py-9 transition md:grid-cols-[64px_1fr_1fr_32px] md:items-center"
            >
              <span className="font-mono text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{project.name}</h3>
                  {project.status === "Recruiting" && (
                    <span className="bg-sky-100 px-2 py-1 text-[11px] font-semibold text-sky-800">Recruiting</span>
                  )}
                </div>
                <p className="text-sm text-slate-500">{project.category}</p>
              </div>
              <p className="max-w-lg text-sm leading-6 text-slate-600">{project.description}</p>
              {project.external ? (
                <ArrowUpRight className="text-slate-400 group-hover:text-sky-600" size={20} aria-hidden="true" />
              ) : (
                <ArrowRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-600" size={20} aria-hidden="true" />
              )}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
