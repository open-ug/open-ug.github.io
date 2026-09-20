"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formString } from "@/lib/forms";
import { safeNext } from "@/lib/auth";
import { getSiteUrl } from "@/lib/site-url";

function authError(path: string, message: string, next?: string) {
  const params = new URLSearchParams({ error: message });
  if (next) params.set("next", next);
  redirect(`${path}?${params}`);
}

export async function login(formData: FormData) {
  const email = formString(formData, "email").toLowerCase();
  const password = formString(formData, "password");
  const next = safeNext(formData.get("next"));
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error)
    authError(
      "/auth/login",
      "Email or password is incorrect, or the account is not confirmed.",
      next,
    );
  redirect(next);
}

export async function signup(formData: FormData) {
  const fullName = formString(formData, "full_name");
  const email = formString(formData, "email").toLowerCase();
  const password = formString(formData, "password");
  const studentNumber = formString(formData, "student_number");
  const registrationNumber = formString(formData, "registration_number");
  const next = safeNext(formData.get("next"));
  if (
    !fullName ||
    !email ||
    email.length > 254 ||
    password.length < 8 ||
    !studentNumber ||
    !registrationNumber
  ) {
    authError(
      "/auth/signup",
      "Complete every field. Passwords must contain at least 8 characters.",
      next,
    );
  }

  const origin = await getSiteUrl();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm?next=${encodeURIComponent(next)}`,
      data: {
        full_name: fullName,
        student_number: studentNumber,
        registration_number: registrationNumber,
      },
    },
  });

  if (error) {
    const duplicateAccount = /already registered|user already exists/i.test(
      error.message,
    );
    const duplicateIdentifier =
      /student_number or registration_number|duplicate key|unique/i.test(
        error.message,
      );
    const message = duplicateAccount
      ? "An account with this email is already registered."
      : duplicateIdentifier
        ? "That student number or registration number is already registered."
        : "Account setup failed. Please try again; contact Open UG Labs if the problem continues.";
    authError("/auth/signup", message, next);
  }
  if (data.session) redirect(next);
  redirect(`/auth/check-email?email=${encodeURIComponent(email)}`);
}

export async function requestPasswordReset(formData: FormData) {
  const email = formString(formData, "email").toLowerCase();
  const origin = await getSiteUrl();
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm?next=/auth/reset-password`,
  });
  redirect("/auth/forgot-password?sent=1");
}

export async function updatePassword(formData: FormData) {
  const password = formString(formData, "password");
  const confirmPassword = formString(formData, "confirm_password");
  if (password.length < 8 || password !== confirmPassword) {
    authError(
      "/auth/reset-password",
      "Passwords must match and contain at least 8 characters.",
    );
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error)
    authError(
      "/auth/reset-password",
      "This reset link is invalid or expired. Request a new one.",
    );
  await supabase.auth.signOut({ scope: "global" });
  redirect("/auth/login?message=Password updated. You can now sign in.");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
