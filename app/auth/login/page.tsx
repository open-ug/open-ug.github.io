import Link from "next/link";
import AuthShell from "../AuthShell";
import { login } from "../actions";
import { buttonClass, inputClass, labelClass } from "@/lib/forms";
import { safeNext } from "@/lib/auth";
import SubmitButton from "@/components/SubmitButton";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string; message?: string }>;
}) {
  const params = await searchParams;
  const next = safeNext(params.next ?? null);
  return (
    <AuthShell
      title="Sign in"
      intro="Access your profile, applications, and application status."
      footer={
        <>
          New to Open UG Labs?{" "}
          <Link
            className="font-semibold text-sky-700"
            href={`/auth/signup?next=${encodeURIComponent(next)}`}
          >
            Create an account
          </Link>
        </>
      }
    >
      {(params.error || params.message) && (
        <p
          role="alert"
          className={`mb-5 border p-3 text-sm ${params.error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}
        >
          {params.error ?? params.message}
        </p>
      )}
      <form action={login} className="space-y-5">
        <input type="hidden" name="next" value={next} />
        <label className={labelClass}>
          Email
          <input
            className={inputClass}
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </label>
        <label className={labelClass}>
          Password
          <input
            className={inputClass}
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </label>
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-sky-700"
          >
            Forgot password?
          </Link>
          <SubmitButton className={buttonClass} pendingLabel="Signing in…">
            Sign in
          </SubmitButton>
        </div>
      </form>
    </AuthShell>
  );
}
