import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNext } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const rawType = request.nextUrl.searchParams.get("type");
  const code = request.nextUrl.searchParams.get("code");
  const flowId = request.nextUrl.searchParams.get("sb_flow_id") ?? undefined;
  const next = safeNext(request.nextUrl.searchParams.get("next"));
  const allowedTypes = new Set<EmailOtpType>(["signup", "invite", "magiclink", "recovery", "email", "email_change"]);
  const type = rawType && allowedTypes.has(rawType as EmailOtpType) ? rawType as EmailOtpType : null;
  const supabase = await createClient();

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) return NextResponse.redirect(new URL(next, request.url));
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code, flowId ? { flowId } : undefined);
    if (!error) return NextResponse.redirect(new URL(next, request.url));
  }
  return NextResponse.redirect(new URL("/auth/login?error=This confirmation link is invalid or expired.", request.url));
}
