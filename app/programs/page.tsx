import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { createClient } from "@/lib/supabase/server";
import type { ProgramStatus } from "@/lib/supabase/database.types";

export const metadata: Metadata = {
  title: "Programs | Open UG Labs",
  description:
    "Explore active and past Open UG Labs programs for undergraduate students.",
};

const publicStatuses: ProgramStatus[] = [
  "published",
  "applications_open",
  "reviewing",
  "completed",
];

function formatDate(value: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-UG", {
    dateStyle: "medium",
    timeZone: "Africa/Kampala",
  }).format(new Date(value));
}

type Program = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  status: ProgramStatus;
  applications_close_at: string | null;
  program_start_date: string | null;
  program_end_date: string | null;
};

function ProgramList({ programs }: { programs: Program[] }) {
  if (!programs.length) {
    return (
      <p className="border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-500">
        No programs to show here yet.
      </p>
    );
  }

  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {programs.map((program) => {
        const dateRange = [
          formatDate(program.program_start_date),
          formatDate(program.program_end_date),
        ].filter(Boolean);
        return (
          <Link
            key={program.id}
            href={`/programs/${program.slug}`}
            className="group grid gap-5 py-8 transition md:grid-cols-[1fr_1.2fr_32px] md:items-center"
          >
            <div>
              <StatusBadge status={program.status} />
              <h3 className="mt-4 text-xl font-semibold tracking-tight md:text-2xl">
                {program.title}
              </h3>
              {(dateRange.length > 0 || program.applications_close_at) && (
                <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                  <CalendarDays size={15} aria-hidden="true" />
                  {dateRange.length > 0
                    ? dateRange.join(" – ")
                    : `Applications close ${formatDate(program.applications_close_at)}`}
                </p>
              )}
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              {program.summary}
            </p>
            <ArrowRight
              className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-600"
              size={20}
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </div>
  );
}

export default async function ProgramsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("programs")
    .select(
      "id,title,slug,summary,status,applications_close_at,program_start_date,program_end_date",
    )
    .in("status", publicStatuses)
    .order("program_start_date", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("Public programs query failed", {
      code: error.code,
      message: error.message,
    });
  }

  const programs = data ?? [];
  const activePrograms = programs.filter(
    (program) => program.status !== "completed",
  );
  const pastPrograms = programs.filter(
    (program) => program.status === "completed",
  );

  return (
    <main className="bg-white text-slate-950">
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="mb-5 text-sm font-semibold text-sky-600">Programs</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
            Learn, contribute, and build with Open UG Labs.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            Explore current opportunities for undergraduate students and the
            programs our community has completed.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {error ? (
          <p className="border border-red-200 bg-red-50 p-5 text-sm text-red-800">
            Programs are temporarily unavailable. Please try again shortly.
          </p>
        ) : (
          <div className="space-y-20">
            <section>
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-sky-700">Now</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                    Active programs
                  </h2>
                </div>
                <span className="text-sm text-slate-500">
                  {activePrograms.length} total
                </span>
              </div>
              <ProgramList programs={activePrograms} />
            </section>

            <section>
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Archive</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                    Past programs
                  </h2>
                </div>
                <span className="text-sm text-slate-500">
                  {pastPrograms.length} total
                </span>
              </div>
              <ProgramList programs={pastPrograms} />
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
