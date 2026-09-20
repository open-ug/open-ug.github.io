"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { formString } from "@/lib/forms";

export async function updateProfile(formData: FormData) {
  const { supabase, user } = await requireUser("/dashboard/profile");
  const yearValue = formString(formData, "year_of_study");
  const values = {
    full_name: formString(formData, "full_name"), student_number: formString(formData, "student_number"), registration_number: formString(formData, "registration_number"),
    university: formString(formData, "university") || null, course: formString(formData, "course") || null, year_of_study: yearValue ? Number(yearValue) : null,
    bio: formString(formData, "bio") || null, github_url: formString(formData, "github_url") || null, linkedin_url: formString(formData, "linkedin_url") || null,
  };
  const { error } = await supabase.from("profiles").update(values).eq("id", user.id);
  if (error) {
    const message = error.code === "23505" ? "That student or registration number belongs to another account." : "We could not update your profile. Check the fields and try again.";
    redirect(`/dashboard/profile?error=${encodeURIComponent(message)}`);
  }
  revalidatePath("/dashboard");
  redirect("/dashboard/profile?saved=1");
}

export async function signOutFromDashboard() {
  const { supabase } = await requireUser();
  await supabase.auth.signOut();
  redirect("/");
}
