import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

export default function ProjectsSection() {
  return (
    <section id="projects" className="border-b border-slate-200 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-sky-600">
              Selected work
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              Projects at the lab
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-sky-600"
          >
            Explore all projects <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2">
          {projects.map((project, index) => (
            <Link
              key={project.name}
              href={project.href}
              target={project.external ? "_blank" : undefined}
              rel={project.external ? "noreferrer" : undefined}
              className="group flex min-h-72 flex-col bg-white p-8 transition-colors hover:bg-slate-50 md:p-10"
            >
              <div className="mb-12 flex items-start justify-between">
                <span className="font-mono text-xs text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {project.external ? (
                  <ArrowUpRight className="text-slate-400 transition group-hover:text-sky-600" size={20} />
                ) : (
                  <ArrowRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-600" size={20} />
                )}
              </div>
              <div className="mt-auto">
                <div className="mb-4 flex flex-wrap gap-2 text-xs font-medium">
                  <span className="bg-slate-100 px-2.5 py-1 text-slate-600">{project.category}</span>
                  <span className={project.status === "Recruiting" ? "bg-sky-100 px-2.5 py-1 text-sky-800" : "bg-slate-100 px-2.5 py-1 text-slate-600"}>
                    {project.status}
                  </span>
                </div>
                <h3 className="mb-3 text-2xl font-semibold tracking-tight text-slate-950">
                  {project.name}
                </h3>
                <p className="max-w-xl text-sm leading-6 text-slate-600">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
