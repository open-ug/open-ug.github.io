import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { buttonClass, inputClass, labelClass } from "@/lib/forms";
import StatusBadge from "@/components/StatusBadge";
import { saveReview } from "../../actions";
import type { Json } from "@/lib/supabase/database.types";
import ReviewerAssignments from "./ReviewerAssignments";

function object(value: Json | null) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value
    : {};
}
function answerText(value: Json) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value ?? "—");
}

export default async function ReviewApplication({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const { supabase, user, role } = await requireStaff();
  const { data: application } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .single();
  if (!application) notFound();
  const [
    { data: program },
    { data: questions },
    { data: answers },
    { data: reviews },
  ] = await Promise.all([
    supabase
      .from("programs")
      .select("id,title")
      .eq("id", application.program_id)
      .single(),
    supabase
      .from("program_questions")
      .select("id,label,position")
      .eq("program_id", application.program_id)
      .order("position"),
    supabase
      .from("application_answers")
      .select("question_id,answer")
      .eq("application_id", id),
    supabase
      .from("application_reviews")
      .select("id,reviewer_id,recommendation,notes,updated_at")
      .eq("application_id", id),
  ]);
  const profile = object(
    application.profile_snapshot ?? application.legacy_applicant,
  );
  const answerMap = new Map(
    (answers ?? []).map((answer) => [answer.question_id, answer.answer]),
  );
  const ownReview = reviews?.find((review) => review.reviewer_id === user.id);
  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href={`/admin/programs/${application.program_id}/applications`}
        className="text-sm font-semibold text-sky-700"
      >
        ← {program?.title ?? "Applications"}
      </Link>
      <div className="mt-5 flex flex-wrap items-start justify-between gap-5">
        <div>
          <h1 className="text-3xl font-semibold">
            {String(profile.full_name ?? "Applicant")}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Submitted{" "}
            {application.submitted_at
              ? new Intl.DateTimeFormat("en-UG", {
                  dateStyle: "long",
                  timeStyle: "short",
                }).format(new Date(application.submitted_at))
              : "—"}
          </p>
        </div>
        <StatusBadge status={application.status} />
      </div>
      {(query.error || query.saved) && (
        <p
          className={`mt-6 border p-3 text-sm ${query.error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}
        >
          {query.error ?? "Review saved."}
        </p>
      )}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Profile at submission</h2>
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              {[
                ["Student number", profile.student_number],
                ["Registration number", profile.registration_number],
                ["Email", profile.email],
                ["University", profile.university],
                ["Course", profile.course],
                ["Year", profile.year_of_study],
                ["GitHub", profile.github_url],
                ["LinkedIn", profile.linkedin_url],
              ].map(([label, value]) => (
                <div key={String(label)}>
                  <dt className="text-slate-500">{String(label)}</dt>
                  <dd className="mt-1 break-words">{String(value ?? "—")}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Application answers</h2>
            <div className="mt-5 space-y-6">
              {questions?.map((question) => (
                <div
                  key={question.id}
                  className="border-t border-slate-100 pt-4"
                >
                  <h3 className="text-sm font-semibold">{question.label}</h3>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {answerMap.has(question.id)
                      ? answerText(answerMap.get(question.id)!)
                      : "No answer"}
                  </p>
                </div>
              ))}
            </div>
          </section>
          {reviews && reviews.length > 0 && (
            <section className="border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold">Private reviews</h2>
              <div className="mt-4 space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-t border-slate-100 pt-4 text-sm"
                  >
                    <p className="font-semibold capitalize">
                      {review.recommendation}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-slate-600">
                      {review.notes || "No notes."}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <aside>
          <form
            action={saveReview}
            className="sticky top-28 space-y-5 border border-slate-200 bg-white p-5"
          >
            <input type="hidden" name="application_id" value={application.id} />
            <h2 className="font-semibold">Review decision</h2>
            <label className={labelClass}>
              Recommendation
              <select
                className={inputClass}
                name="recommendation"
                defaultValue={ownReview?.recommendation ?? "pending"}
              >
                {["pending", "shortlist", "accept", "reject"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Private notes
              <textarea
                className={`${inputClass} min-h-40`}
                name="notes"
                maxLength={10000}
                defaultValue={ownReview?.notes ?? ""}
              />
            </label>
            {role === "admin" && (
              <label className={labelClass}>
                Application status
                <select className={inputClass} name="status" defaultValue="">
                  <option value="">Keep current status</option>
                  {["under_review", "shortlisted", "accepted", "rejected"].map(
                    (item) => (
                      <option key={item}>{item}</option>
                    ),
                  )}
                </select>
              </label>
            )}
            <button className={`${buttonClass} w-full`}>Save review</button>
            <p className="text-xs leading-5 text-slate-500">
              Review notes are visible only to assigned reviewers and
              administrators.
            </p>
          </form>
          {role === "admin" && (
            <ReviewerAssignments applicationId={application.id} />
          )}
        </aside>
      </div>
    </div>
  );
}
