import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/supabase/database.types";

export const getAuthContext = cache(async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, role: null };

  const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
  return { supabase, user, role: (data?.role ?? "user") as UserRole };
});

export async function requireUser(returnTo = "/dashboard") {
  const context = await getAuthContext();
  if (!context.user) redirect(`/auth/login?next=${encodeURIComponent(returnTo)}`);
  return { ...context, user: context.user };
}

export async function requireStaff() {
  const context = await requireUser("/admin");
  if (context.role !== "admin" && context.role !== "reviewer") redirect("/unauthorized");
  return context;
}

export async function requireAdmin() {
  const context = await requireUser("/admin");
  if (context.role !== "admin") redirect("/unauthorized");
  return context;
}

export function safeNext(value: FormDataEntryValue | string | null, fallback = "/dashboard") {
  const path = typeof value === "string" ? value : "";
  return path.startsWith("/") && !path.startsWith("//") ? path : fallback;
}
