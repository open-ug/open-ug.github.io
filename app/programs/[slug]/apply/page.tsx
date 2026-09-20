import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { buttonClass, secondaryButtonClass } from "@/lib/forms";
import ApplicationQuestion from "@/components/ApplicationQuestion";
import { saveApplication, startApplication } from "../../actions";

export default async function ApplyPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { slug } = await params;
  const { supabase, user } = await requireUser(`/programs/${slug}/apply`);
  const { data: program } = await supabase
    .from("programs")
    .select("id,title,slug,status,applications_open_at,applications_close_at")
    .eq("slug", slug)
    .single();
  if (!program) notFound();
  const now = Date.now();
  const isOpen =
    program.status === "applications_open" &&
    (!program.applications_open_at ||
      new Date(program.applications_open_at).getTime() <= now) &&
    (!program.applications_close_at ||
      new Date(program.applications_close_at).getTime() >= now);
  const { data: application } = await supabase
    .from("applications")
    .select("id,status")
    .eq("program_id", program.id)
    .eq("applicant_id", user.id)
    .maybeSingle();
  if (application && application.status !== "draft")
    redirect(`/dashboard/applications/${application.id}`);
  if (!application) {
    if (!isOpen) redirect(`/programs/${slug}?closed=1`);
    return (
      <main className="min-h-[75vh] bg-slate-50 px-5 py-12 text-slate-950">
        <div className="mx-auto max-w-3xl">
          <Link
            className="text-sm font-semibold text-sky-700"
            href={`/programs/${slug}`}
          >
            ← Program details
          </Link>
          <div className="mt-6 border border-slate-200 bg-white p-6 sm:p-8">
            <h1 className="text-3xl font-semibold tracking-tight">
              Start your application
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              A private draft will be created for {program.title}. You can save
              it and return before submitting.
            </p>
            <form action={startApplication} className="mt-6">
              <input type="hidden" name="program_slug" value={slug} />
              <button className={buttonClass}>Create application draft</button>
            </form>
          </div>
        </div>
      </main>
    );
  }
  const [{ data: questions }, { data: answers }] = await Promise.all([
    supabase
      .from("program_questions")
      .select("id,label,description,field_type,required,position,configuration")
      .eq("program_id", program.id)
      .order("position"),
    supabase
      .from("application_answers")
      .select("question_id,answer")
      .eq("application_id", application.id),
  ]);
  const answerMap = new Map(
    (answers ?? []).map((answer) => [answer.question_id, answer.answer]),
  );
  const query = await searchParams;
  return (
    <main className="min-h-[75vh] bg-slate-50 px-5 py-12 text-slate-950">
      <div className="mx-auto max-w-3xl">
        <Link
          className="text-sm font-semibold text-sky-700"
          href={`/programs/${slug}`}
        >
          ← Program details
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">
          Apply to {program.title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Save a draft at any time. Your answers become read-only after
          submission.
        </p>
        {(query.error || query.saved) && (
          <p
            className={`mt-6 border p-3 text-sm ${query.error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}
          >
            {query.error ?? "Draft saved."}
          </p>
        )}
        <form
          action={saveApplication}
          className="mt-8 space-y-7 border border-slate-200 bg-white p-6 sm:p-8"
        >
          <input type="hidden" name="application_id" value={application.id} />
          {questions?.map((question) => (
            <ApplicationQuestion
              key={question.id}
              question={question}
              answer={answerMap.get(question.id)}
            />
          ))}
          {!questions?.length && (
            <p className="text-sm text-slate-500">
              This program has no additional questions.
            </p>
          )}
          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              className={secondaryButtonClass}
              name="intent"
              value="draft"
            >
              Save draft
            </button>
            <button
              className={buttonClass}
              name="intent"
              value="submit"
              disabled={!isOpen}
            >
              Submit application
            </button>
          </div>
          <p className="text-xs leading-5 text-slate-500">
            By submitting, you confirm the information is accurate. Applying to
            an Open UG Labs program registers you as a member of the Open UG
            Labs group.
          </p>
        </form>
      </div>
    </main>
  );
}
