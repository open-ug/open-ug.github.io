import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { buttonClass } from "@/lib/forms";
import StatusBadge from "@/components/StatusBadge";
import ApplicationQuestion from "@/components/ApplicationQuestion";
import { withdrawApplication } from "@/app/programs/actions";

export default async function ApplicationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    error?: string;
    submitted?: string;
    withdrawn?: string;
  }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const { supabase, user } = await requireUser(`/dashboard/applications/${id}`);
  const { data: application } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .eq("applicant_id", user.id)
    .single();
  if (!application) notFound();
  const [{ data: program }, { data: questions }, { data: answers }] =
    await Promise.all([
      supabase
        .from("programs")
        .select("title,slug")
        .eq("id", application.program_id)
        .single(),
      supabase
        .from("program_questions")
        .select(
          "id,label,description,field_type,required,position,configuration",
        )
        .eq("program_id", application.program_id)
        .order("position"),
      supabase
        .from("application_answers")
        .select("question_id,answer")
        .eq("application_id", application.id),
    ]);
  if (application.status === "draft" && program)
    redirect(`/programs/${program.slug}/apply`);
  const answerMap = new Map(
    (answers ?? []).map((answer) => [answer.question_id, answer.answer]),
  );
  return (
    <div className="mx-auto max-w-3xl">
      <Link className="text-sm font-semibold text-sky-700" href="/dashboard">
        ← Dashboard
      </Link>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">
            {program?.title ?? "Application"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {application.submitted_at
              ? `Submitted ${new Intl.DateTimeFormat("en-UG", { dateStyle: "long" }).format(new Date(application.submitted_at))}`
              : "Application"}
          </p>
        </div>
        <StatusBadge status={application.status} />
      </div>
      {(query.error || query.submitted || query.withdrawn) && (
        <p
          className={`mt-6 border p-3 text-sm ${query.error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}
        >
          {query.error ??
            (query.submitted
              ? "Application submitted successfully."
              : "Application withdrawn.")}
        </p>
      )}
      <div className="mt-8 space-y-7 border border-slate-200 bg-white p-6 sm:p-8">
        {questions?.map((question) => (
          <ApplicationQuestion
            key={question.id}
            question={question}
            answer={answerMap.get(question.id)}
            disabled
          />
        ))}
      </div>
      {["submitted", "under_review", "shortlisted"].includes(
        application.status,
      ) && (
        <form action={withdrawApplication} className="mt-6 text-right">
          <input type="hidden" name="application_id" value={application.id} />
          <button className={buttonClass}>Withdraw application</button>
        </form>
      )}
    </div>
  );
}
