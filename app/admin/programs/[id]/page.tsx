import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import {
  buttonClass,
  inputClass,
  labelClass,
  secondaryButtonClass,
} from "@/lib/forms";
import { deleteQuestion, saveProgram, saveQuestion } from "../../actions";
import type { Json } from "@/lib/supabase/database.types";
import SubmitButton from "@/components/SubmitButton";

const statuses = [
  "draft",
  "published",
  "applications_open",
  "reviewing",
  "completed",
  "archived",
];
const fieldTypes = [
  "short_text",
  "long_text",
  "url",
  "number",
  "boolean",
  "single_select",
  "multi_select",
];
function localDateTime(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
}
function config(config: Json) {
  return config && typeof config === "object" && !Array.isArray(config)
    ? config
    : {};
}

export default async function ProgramEditor({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const { supabase, role } = await requireStaff();
  const isNew = id === "new";
  const { data: program } = isNew
    ? { data: null }
    : await supabase.from("programs").select("*").eq("id", id).single();
  if (!isNew && !program) notFound();
  if (isNew && role !== "admin") notFound();
  const { data: questions } = program
    ? await supabase
        .from("program_questions")
        .select("*")
        .eq("program_id", program.id)
        .order("position")
    : { data: [] };
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <Link href="/admin" className="text-sm font-semibold text-sky-700">
            ← Programs
          </Link>
          <h1 className="mt-3 text-3xl font-semibold">
            {isNew ? "Create program" : program?.title}
          </h1>
        </div>
        {program && (
          <Link
            className={secondaryButtonClass}
            href={`/admin/programs/${program.id}/applications`}
          >
            View applications
          </Link>
        )}
      </div>
      {(query.error || query.saved) && (
        <p
          className={`mt-6 border p-3 text-sm ${query.error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}
        >
          {query.error ?? "Changes saved."}
        </p>
      )}
      {role === "admin" ? (
        <form
          action={saveProgram}
          className="mt-7 space-y-6 border border-slate-200 bg-white p-6"
        >
          <input type="hidden" name="id" value={program?.id ?? ""} />
          <div className="grid gap-5 md:grid-cols-2">
            <label className={labelClass}>
              Title
              <input
                className={inputClass}
                name="title"
                defaultValue={program?.title}
                required
              />
            </label>
            <label className={labelClass}>
              Slug
              <input
                className={inputClass}
                name="slug"
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                defaultValue={program?.slug}
                required
              />
            </label>
          </div>
          <label className={labelClass}>
            Summary
            <textarea
              className={inputClass}
              name="summary"
              maxLength={500}
              defaultValue={program?.summary}
              required
            />
          </label>
          <label className={labelClass}>
            Description
            <textarea
              className={`${inputClass} min-h-40`}
              name="description"
              maxLength={20000}
              defaultValue={program?.description}
              required
            />
          </label>
          <label className={labelClass}>
            Eligibility
            <textarea
              className={inputClass}
              name="eligibility"
              defaultValue={program?.eligibility ?? ""}
            />
          </label>
          <label className={labelClass}>
            Stipend information
            <textarea
              className={inputClass}
              name="stipend_description"
              defaultValue={program?.stipend_description ?? ""}
            />
          </label>
          <div className="grid gap-5 md:grid-cols-3">
            <label className={labelClass}>
              Status
              <select
                className={inputClass}
                name="status"
                defaultValue={program?.status ?? "draft"}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Applications open
              <input
                className={inputClass}
                type="datetime-local"
                name="applications_open_at"
                defaultValue={localDateTime(
                  program?.applications_open_at ?? null,
                )}
              />
            </label>
            <label className={labelClass}>
              Applications close
              <input
                className={inputClass}
                type="datetime-local"
                name="applications_close_at"
                defaultValue={localDateTime(
                  program?.applications_close_at ?? null,
                )}
              />
            </label>
            <label className={labelClass}>
              Program starts
              <input
                className={inputClass}
                type="date"
                name="program_start_date"
                defaultValue={program?.program_start_date ?? ""}
              />
            </label>
            <label className={labelClass}>
              Program ends
              <input
                className={inputClass}
                type="date"
                name="program_end_date"
                defaultValue={program?.program_end_date ?? ""}
              />
            </label>
          </div>
          <SubmitButton
            className={buttonClass}
            pendingLabel={isNew ? "Creating program…" : "Saving program…"}
          >
            {isNew ? "Create program" : "Save program"}
          </SubmitButton>
        </form>
      ) : (
        <p className="mt-6 text-sm text-slate-600">
          Reviewers can inspect assigned applications but cannot edit program
          configuration.
        </p>
      )}
      {program && role === "admin" && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Application questions</h2>
          <div className="mt-5 space-y-5">
            {questions?.map((question) => {
              const values = config(question.configuration);
              return (
                <form
                  action={saveQuestion}
                  key={question.id}
                  className="border border-slate-200 bg-white p-5"
                >
                  <input type="hidden" name="id" value={question.id} />
                  <input type="hidden" name="program_id" value={program.id} />
                  <div className="grid gap-4 md:grid-cols-[80px_1fr_180px]">
                    <label className={labelClass}>
                      Position
                      <input
                        className={inputClass}
                        name="position"
                        type="number"
                        min="0"
                        defaultValue={question.position}
                        required
                      />
                    </label>
                    <label className={labelClass}>
                      Question
                      <input
                        className={inputClass}
                        name="label"
                        defaultValue={question.label}
                        required
                      />
                    </label>
                    <label className={labelClass}>
                      Type
                      <select
                        className={inputClass}
                        name="field_type"
                        defaultValue={question.field_type}
                      >
                        {fieldTypes.map((type) => (
                          <option key={type}>{type}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className={`${labelClass} mt-4`}>
                    Help text
                    <input
                      className={inputClass}
                      name="description"
                      defaultValue={question.description ?? ""}
                    />
                  </label>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className={labelClass}>
                      Options (comma-separated)
                      <input
                        className={inputClass}
                        name="options"
                        defaultValue={
                          Array.isArray(values.options)
                            ? values.options.join(", ")
                            : ""
                        }
                      />
                    </label>
                    <label className={labelClass}>
                      Maximum length
                      <input
                        className={inputClass}
                        name="max_length"
                        type="number"
                        min="1"
                        defaultValue={
                          typeof values.max_length === "number"
                            ? values.max_length
                            : ""
                        }
                      />
                    </label>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <input
                        type="checkbox"
                        name="required"
                        defaultChecked={question.required}
                      />{" "}
                      Required
                    </label>
                    <SubmitButton
                      className={buttonClass}
                      name="question_action"
                      value="save"
                      pendingLabel="Saving question…"
                    >
                      Save question
                    </SubmitButton>
                    <SubmitButton
                      formAction={deleteQuestion}
                      className="inline-flex min-h-11 items-center text-sm font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                      name="question_action"
                      value="delete"
                      pendingLabel="Deleting…"
                    >
                      Delete
                    </SubmitButton>
                  </div>
                </form>
              );
            })}
            <form
              action={saveQuestion}
              className="border border-dashed border-slate-300 bg-white p-5"
            >
              <input type="hidden" name="program_id" value={program.id} />
              <h3 className="font-semibold">Add a question</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-[80px_1fr_180px]">
                <label className={labelClass}>
                  Position
                  <input
                    className={inputClass}
                    name="position"
                    type="number"
                    min="0"
                    defaultValue={(questions?.at(-1)?.position ?? 0) + 10}
                    required
                  />
                </label>
                <label className={labelClass}>
                  Question
                  <input className={inputClass} name="label" required />
                </label>
                <label className={labelClass}>
                  Type
                  <select className={inputClass} name="field_type">
                    {fieldTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className={`${labelClass} mt-4`}>
                Help text
                <input className={inputClass} name="description" />
              </label>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className={labelClass}>
                  Options (comma-separated)
                  <input className={inputClass} name="options" />
                </label>
                <label className={labelClass}>
                  Maximum length
                  <input
                    className={inputClass}
                    name="max_length"
                    type="number"
                    min="1"
                  />
                </label>
              </div>
              <div className="mt-5 flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input type="checkbox" name="required" /> Required
                </label>
                <SubmitButton className={buttonClass} pendingLabel="Adding question…">
                  Add question
                </SubmitButton>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}
