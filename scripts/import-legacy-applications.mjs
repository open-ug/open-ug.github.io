#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const [inputPath, programSlug] = process.argv.slice(2);
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!inputPath || !programSlug || !url || !serviceKey) {
  console.error("Usage: NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/import-legacy-applications.mjs export.json program-slug");
  process.exit(1);
}

const records = JSON.parse(await readFile(inputPath, "utf8"));
if (!Array.isArray(records)) throw new Error("The input must be a JSON array. Export the old sheet with one object per row.");
const supabase = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
const { data: program, error: programError } = await supabase.from("programs").select("id").eq("slug", programSlug).single();
if (programError) throw programError;
const { data: questions, error: questionError } = await supabase.from("program_questions").select("id,label").eq("program_id", program.id);
if (questionError) throw questionError;
const questionsByLabel = new Map(questions.map((question) => [question.label.toLowerCase(), question.id]));

let imported = 0;
for (const [index, row] of records.entries()) {
  const profile = {
    full_name: String(row.fullName ?? row.full_name ?? "").trim(),
    email: String(row.email ?? "").trim().toLowerCase() || null,
    student_number: String(row.studentNumber ?? row.student_number ?? "").trim() || null,
    registration_number: String(row.registrationNumber ?? row.registration_number ?? "").trim() || null,
    course: String(row.course ?? "").trim() || null,
    year_of_study: Number(String(row.year ?? row.year_of_study ?? "").replace(/\D/g, "")) || null,
    source: "legacy_spreadsheet",
  };
  if (!profile.full_name) { console.warn(`Skipping row ${index + 1}: full name missing`); continue; }
  const submittedAt = row.submitted_at ?? row.timestamp ?? new Date().toISOString();
  const { data: application, error } = await supabase.from("applications").insert({
    program_id: program.id, applicant_id: null, legacy_applicant: profile, profile_snapshot: profile, status: "submitted", submitted_at: new Date(submittedAt).toISOString(),
  }).select("id").single();
  if (error) { console.warn(`Skipping row ${index + 1}: ${error.message}`); continue; }

  const explicitAnswers = row.answers && typeof row.answers === "object" ? row.answers : {};
  if (row.bio && !Object.keys(explicitAnswers).length && questions.length === 1) explicitAnswers[questions[0].label] = row.bio;
  const answers = Object.entries(explicitAnswers).flatMap(([label, answer]) => {
    const questionId = questionsByLabel.get(label.toLowerCase());
    return questionId && answer !== undefined && answer !== null && answer !== "" ? [{ application_id: application.id, question_id: questionId, answer }] : [];
  });
  if (answers.length) {
    const { error: answerError } = await supabase.from("application_answers").insert(answers);
    if (answerError) console.warn(`Application ${application.id} imported without answers: ${answerError.message}`);
  }
  imported++;
}
console.log(`Imported ${imported} of ${records.length} historical applications. No Auth users were created.`);
