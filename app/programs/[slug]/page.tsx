import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import StatusBadge from "@/components/StatusBadge";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: program } = await supabase
    .from("programs")
    .select("*")
    .eq("slug", slug)
    .single();
  if (!program) notFound();
  const now = Date.now();
  const open =
    program.status === "applications_open" &&
    (!program.applications_open_at ||
      new Date(program.applications_open_at).getTime() <= now) &&
    (!program.applications_close_at ||
      new Date(program.applications_close_at).getTime() >= now);
  return (
    <main className="bg-white text-slate-950">
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <StatusBadge status={program.status} />
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.045em] md:text-7xl">
            {program.title}
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-slate-600">
            {program.summary}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            {open ? (
              <Link
                href={`/programs/${program.slug}/apply`}
                className="inline-flex items-center gap-2 bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Apply now <ArrowRight size={17} />
              </Link>
            ) : (
              <span className="border border-slate-300 bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-500">
                Applications closed
              </span>
            )}
            {program.applications_close_at && (
              <span className="inline-flex items-center gap-2 text-sm text-slate-600">
                <Calendar size={17} /> Deadline{" "}
                {new Intl.DateTimeFormat("en-UG", {
                  dateStyle: "long",
                  timeStyle: "short",
                  timeZone: "Africa/Kampala",
                }).format(new Date(program.applications_close_at))}
              </span>
            )}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold">About the program</h2>
          <div className="mt-5 whitespace-pre-wrap leading-8 text-slate-600">
            {program.description}
          </div>
        </div>
        <aside className="space-y-8 border-l border-slate-200 pl-7">
          {program.eligibility && (
            <div>
              <h2 className="font-semibold">Eligibility</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {program.eligibility}
              </p>
            </div>
          )}
          {program.stipend_description && (
            <div>
              <h2 className="font-semibold">Stipend</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {program.stipend_description}
              </p>
            </div>
          )}
          {(program.program_start_date || program.program_end_date) && (
            <div>
              <h2 className="font-semibold">Program dates</h2>
              <p className="mt-2 text-sm text-slate-600">
                {program.program_start_date ?? "TBA"} –{" "}
                {program.program_end_date ?? "TBA"}
              </p>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
