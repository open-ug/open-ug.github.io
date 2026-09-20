import Link from "next/link";
import AuthShell from "../AuthShell";
import { signup } from "../actions";
import { buttonClass, inputClass, labelClass } from "@/lib/forms";
import { safeNext } from "@/lib/auth";
import SubmitButton from "@/components/SubmitButton";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next = safeNext(params.next ?? null);
  return (
    <AuthShell
      title="Create your account"
      intro="Use your own academic identifiers. You can add course and profile details later."
      footer={
        <>
          Already registered?{" "}
          <Link
            className="font-semibold text-sky-700"
            href={`/auth/login?next=${encodeURIComponent(next)}`}
          >
            Sign in
          </Link>
        </>
      }
    >
      {params.error && (
        <p
          role="alert"
          className="mb-5 border border-red-200 bg-red-50 p-3 text-sm text-red-800"
        >
          {params.error}
        </p>
      )}
      <form action={signup} className="space-y-5">
        <input type="hidden" name="next" value={next} />
        <label className={labelClass}>
          Full name
          <input
            className={inputClass}
            name="full_name"
            autoComplete="name"
            maxLength={120}
            required
          />
        </label>
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
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Student number
            <input
              className={inputClass}
              name="student_number"
              maxLength={40}
              required
            />
          </label>
          <label className={labelClass}>
            Registration number
            <input
              className={inputClass}
              name="registration_number"
              maxLength={60}
              required
            />
          </label>
        </div>
        <label className={labelClass}>
          Password
          <input
            className={inputClass}
            type="password"
            name="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
          <span className="mt-1 block text-xs font-normal text-slate-500">
            At least 8 characters.
          </span>
        </label>
        <SubmitButton
          className={`${buttonClass} w-full`}
          pendingLabel="Creating account…"
        >
          Create account
        </SubmitButton>
      </form>
    </AuthShell>
  );
}
