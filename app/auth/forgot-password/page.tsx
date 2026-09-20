import AuthShell from "../AuthShell";
import { requestPasswordReset } from "../actions";
import { buttonClass, inputClass, labelClass } from "@/lib/forms";
import SubmitButton from "@/components/SubmitButton";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;
  return (
    <AuthShell
      title="Reset your password"
      intro="We will email reset instructions if an account exists for this address."
    >
      {sent ? (
        <p className="border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Check your inbox for a password reset link.
        </p>
      ) : (
        <form action={requestPasswordReset} className="space-y-5">
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
          <SubmitButton className={`${buttonClass} w-full`} pendingLabel="Sending reset link…">
            Send reset link
          </SubmitButton>
        </form>
      )}
    </AuthShell>
  );
}
