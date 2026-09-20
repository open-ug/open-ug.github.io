import AuthShell from "../AuthShell";
import { updatePassword } from "../actions";
import { buttonClass, inputClass, labelClass } from "@/lib/forms";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <AuthShell
      title="Choose a new password"
      intro="Use at least eight characters and keep it unique to this account."
    >
      {error && (
        <p
          role="alert"
          className="mb-5 border border-red-200 bg-red-50 p-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}
      <form action={updatePassword} className="space-y-5">
        <label className={labelClass}>
          New password
          <input
            className={inputClass}
            type="password"
            name="password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>
        <label className={labelClass}>
          Confirm password
          <input
            className={inputClass}
            type="password"
            name="confirm_password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>
        <button className={`${buttonClass} w-full`}>Update password</button>
      </form>
    </AuthShell>
  );
}
