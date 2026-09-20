import AuthShell from "../AuthShell";

export default async function CheckEmailPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const { email } = await searchParams;
  return <AuthShell title="Confirm your email" intro={`We sent a confirmation link${email ? ` to ${email}` : ""}. Open it in this browser to finish creating your account.`}><p className="text-sm leading-6 text-slate-600">If it is not visible after a few minutes, check spam or try signing up again.</p></AuthShell>;
}
