"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, requireStaff } from "@/lib/auth";
import { formString } from "@/lib/forms";
import type { ApplicationStatus, Json, ProgramStatus, QuestionType, ReviewRecommendation } from "@/lib/supabase/database.types";

function nullableDate(value: string) { return value ? new Date(value).toISOString() : null; }

export async function saveProgram(formData: FormData) {
  const { supabase, user } = await requireAdmin();
  const id = formString(formData, "id");
  const values = {
    title: formString(formData, "title"), slug: formString(formData, "slug").toLowerCase(), summary: formString(formData, "summary"), description: formString(formData, "description"),
    eligibility: formString(formData, "eligibility") || null, stipend_description: formString(formData, "stipend_description") || null,
    status: formString(formData, "status") as ProgramStatus, applications_open_at: nullableDate(formString(formData, "applications_open_at")), applications_close_at: nullableDate(formString(formData, "applications_close_at")),
    program_start_date: formString(formData, "program_start_date") || null, program_end_date: formString(formData, "program_end_date") || null,
  };
  const result = id ? await supabase.from("programs").update(values).eq("id", id).select("id").single() : await supabase.from("programs").insert({ ...values, created_by: user.id }).select("id").single();
  if (result.error) redirect(`/admin/programs/${id || "new"}?error=${encodeURIComponent("Check the program fields, slug, and date ranges.")}`);
  revalidatePath("/admin");
  redirect(`/admin/programs/${result.data.id}?saved=1`);
}

export async function saveQuestion(formData: FormData) {
  const { supabase } = await requireAdmin();
  const programId = formString(formData, "program_id"); const id = formString(formData, "id");
  const fieldType = formString(formData, "field_type") as QuestionType;
  const options = formString(formData, "options").split(",").map((value) => value.trim()).filter(Boolean);
  const maxLength = Number(formString(formData, "max_length"));
  const configuration: Json = { ...(options.length ? { options } : {}), ...(Number.isInteger(maxLength) && maxLength > 0 ? { max_length: maxLength } : {}) };
  const values = { program_id: programId, label: formString(formData, "label"), description: formString(formData, "description") || null, field_type: fieldType, required: formData.get("required") === "on", position: Number(formString(formData, "position")), configuration };
  const result = id ? await supabase.from("program_questions").update(values).eq("id", id) : await supabase.from("program_questions").insert(values);
  if (result.error) redirect(`/admin/programs/${programId}?error=${encodeURIComponent("The question could not be saved. Positions must be unique.")}`);
  revalidatePath(`/admin/programs/${programId}`);
  redirect(`/admin/programs/${programId}?saved=1`);
}

export async function deleteQuestion(formData: FormData) {
  const { supabase } = await requireAdmin();
  const programId = formString(formData, "program_id"); const id = formString(formData, "id");
  const { error } = await supabase.from("program_questions").delete().eq("id", id).eq("program_id", programId);
  if (error) redirect(`/admin/programs/${programId}?error=Questions with historical answers cannot be deleted.`);
  revalidatePath(`/admin/programs/${programId}`); redirect(`/admin/programs/${programId}`);
}

export async function saveReview(formData: FormData) {
  const { supabase, user, role } = await requireStaff();
  const applicationId = formString(formData, "application_id");
  const recommendation = formString(formData, "recommendation") as ReviewRecommendation;
  const { error } = await supabase.from("application_reviews").upsert({ application_id: applicationId, reviewer_id: user.id, recommendation, notes: formString(formData, "notes") || null }, { onConflict: "application_id,reviewer_id" });
  if (error) redirect(`/admin/applications/${applicationId}?error=You are not assigned to review this application.`);
  const nextStatus = formString(formData, "status") as ApplicationStatus;
  if (role === "admin" && nextStatus) {
    const statusResult = await supabase.rpc("admin_set_application_status", { target_application_id: applicationId, next_status: nextStatus });
    if (statusResult.error) redirect(`/admin/applications/${applicationId}?error=The application status could not be updated.`);
  }
  revalidatePath(`/admin/applications/${applicationId}`); revalidatePath("/admin");
  redirect(`/admin/applications/${applicationId}?saved=1`);
}

export async function assignReviewer(formData: FormData) {
  const { supabase, user } = await requireAdmin();
  const applicationId = formString(formData, "application_id");
  const reviewerId = formString(formData, "reviewer_id");
  const { error } = await supabase.from("reviewer_assignments").upsert({ application_id: applicationId, reviewer_id: reviewerId, assigned_by: user.id }, { onConflict: "application_id,reviewer_id" });
  if (error) redirect(`/admin/applications/${applicationId}?error=The reviewer could not be assigned.`);
  revalidatePath(`/admin/applications/${applicationId}`);
}

export async function removeReviewer(formData: FormData) {
  const { supabase } = await requireAdmin();
  const applicationId = formString(formData, "application_id");
  const assignmentId = formString(formData, "assignment_id");
  await supabase.from("reviewer_assignments").delete().eq("id", assignmentId).eq("application_id", applicationId);
  revalidatePath(`/admin/applications/${applicationId}`);
}
