"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import type { Json, QuestionType } from "@/lib/supabase/database.types";
import { formString } from "@/lib/forms";

function parseAnswer(formData: FormData, id: string, type: QuestionType): Json | undefined {
  const name = `question_${id}`;
  if (type === "multi_select") {
    const values = formData.getAll(name).filter((value): value is string => typeof value === "string" && value !== "");
    return values.length ? values : undefined;
  }
  const raw = formData.get(name);
  if (typeof raw !== "string" || raw.trim() === "") return undefined;
  if (type === "number") { const value = Number(raw); return Number.isFinite(value) ? value : undefined; }
  if (type === "boolean") return raw === "true";
  return raw.trim();
}

export async function saveApplication(formData: FormData) {
  const applicationId = String(formData.get("application_id") ?? "");
  const intent = formData.get("intent") === "submit" ? "submit" : "draft";
  const { supabase, user } = await requireUser();
  const { data: application } = await supabase.from("applications").select("id,program_id,status").eq("id", applicationId).eq("applicant_id", user.id).single();
  if (!application || application.status !== "draft") redirect("/dashboard?error=This application can no longer be edited.");
  const { data: questions } = await supabase.from("program_questions").select("id,field_type,required").eq("program_id", application.program_id).order("position");

  const answersToUpsert: { application_id: string; question_id: string; answer: Json }[] = [];
  const questionIdsToDelete: string[] = [];
  for (const question of questions ?? []) {
    const answer = parseAnswer(formData, question.id, question.field_type);
    if (answer === undefined) {
      if (intent === "submit" && question.required) redirect(`/dashboard/applications/${application.id}?error=${encodeURIComponent("Complete all required questions before submitting.")}`);
      questionIdsToDelete.push(question.id);
      continue;
    }
    answersToUpsert.push({ application_id: application.id, question_id: question.id, answer });
  }

  if (questionIdsToDelete.length) {
    const { error } = await supabase.from("application_answers").delete().eq("application_id", application.id).in("question_id", questionIdsToDelete);
    if (error) redirect(`/dashboard/applications/${application.id}?error=${encodeURIComponent("Your draft could not be saved.")}`);
  }
  if (answersToUpsert.length) {
    const { error } = await supabase.from("application_answers").upsert(answersToUpsert, { onConflict: "application_id,question_id" });
    if (error) redirect(`/dashboard/applications/${application.id}?error=${encodeURIComponent("An answer is invalid or could not be saved.")}`);
  }

  if (intent === "submit") {
    const { error } = await supabase.rpc("submit_application", { target_application_id: application.id });
    if (error) redirect(`/dashboard/applications/${application.id}?error=${encodeURIComponent(error.message.includes("window") ? "The application deadline has passed." : "Complete all required questions and check your profile before submitting.")}`);
    revalidatePath("/dashboard");
    redirect(`/dashboard/applications/${application.id}?submitted=1`);
  }
  revalidatePath(`/dashboard/applications/${application.id}`);
  redirect(`/dashboard/applications/${application.id}?saved=1`);
}

export async function startApplication(formData: FormData) {
  const slug = formString(formData, "program_slug");
  const returnPath = `/programs/${encodeURIComponent(slug)}`;
  const { supabase, user } = await requireUser(`${returnPath}/apply`);
  const { data: program } = await supabase
    .from("programs")
    .select("id,slug")
    .eq("slug", slug)
    .single();
  if (!program) redirect("/projects?error=Program not found.");

  const { data: existing } = await supabase
    .from("applications")
    .select("id,status")
    .eq("program_id", program.id)
    .eq("applicant_id", user.id)
    .maybeSingle();
  if (existing) {
    redirect(existing.status === "draft" ? `${returnPath}/apply` : `/dashboard/applications/${existing.id}`);
  }

  const { data, error } = await supabase
    .from("applications")
    .insert({ program_id: program.id, applicant_id: user.id })
    .select("id")
    .single();
  if (data) redirect(`${returnPath}/apply`);

  // A double click or another tab may win the unique (program, applicant) race.
  if (error?.code === "23505") {
    const { data: raced } = await supabase
      .from("applications")
      .select("id,status")
      .eq("program_id", program.id)
      .eq("applicant_id", user.id)
      .single();
    if (raced) redirect(raced.status === "draft" ? `${returnPath}/apply` : `/dashboard/applications/${raced.id}`);
  }
  redirect(`${returnPath}?error=${encodeURIComponent("Unable to start an application. Check that applications are still open.")}`);
}

export async function withdrawApplication(formData: FormData) {
  const applicationId = String(formData.get("application_id") ?? "");
  const { supabase } = await requireUser();
  const { error } = await supabase.rpc("withdraw_application", { target_application_id: applicationId });
  if (error) redirect(`/dashboard/applications/${applicationId}?error=This application cannot be withdrawn.`);
  revalidatePath("/dashboard");
  redirect(`/dashboard/applications/${applicationId}?withdrawn=1`);
}
