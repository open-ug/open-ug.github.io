import { requireUser } from "@/lib/auth";
import { buttonClass, inputClass, labelClass } from "@/lib/forms";
import { updateProfile } from "../actions";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { supabase, user } = await requireUser("/dashboard/profile");
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  const params = await searchParams;
  if (error) {
    console.error("Profile query failed", {
      code: error.code,
      message: error.message,
    });
    return (
      <p>
        We could not load your profile right now. Please try again or contact
        Open UG Labs if the problem continues.
      </p>
    );
  }
  if (!profile)
    return (
      <p>
        Your account exists, but its profile setup is incomplete. Please contact
        Open UG Labs.
      </p>
    );
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold text-sky-700">Account</p>
      <h1 className="mt-2 text-3xl font-semibold">Your profile</h1>
      <p className="mt-3 text-sm text-slate-600">
        Submission creates a historical snapshot of these details.
      </p>
      {(params.error || params.saved) && (
        <p
          className={`mt-6 border p-3 text-sm ${params.error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}
        >
          {params.error ?? "Profile saved."}
        </p>
      )}
      <form
        action={updateProfile}
        className="mt-7 space-y-7 border border-slate-200 bg-white p-6 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Full name
            <input
              className={inputClass}
              name="full_name"
              defaultValue={profile.full_name}
              maxLength={120}
              required
            />
          </label>
          <label className={labelClass}>
            Email
            <input
              className={`${inputClass} bg-slate-50`}
              value={profile.email ?? user.email ?? ""}
              disabled
            />
          </label>
          <label className={labelClass}>
            Student number
            <input
              className={inputClass}
              name="student_number"
              defaultValue={profile.student_number}
              maxLength={40}
              required
            />
          </label>
          <label className={labelClass}>
            Registration number
            <input
              className={inputClass}
              name="registration_number"
              defaultValue={profile.registration_number}
              maxLength={60}
              required
            />
          </label>
          <label className={labelClass}>
            University
            <input
              className={inputClass}
              name="university"
              defaultValue={profile.university ?? ""}
              maxLength={160}
            />
          </label>
          <label className={labelClass}>
            Course
            <input
              className={inputClass}
              name="course"
              defaultValue={profile.course ?? ""}
              maxLength={160}
            />
          </label>
          <label className={labelClass}>
            Year of study
            <input
              className={inputClass}
              name="year_of_study"
              type="number"
              min="1"
              max="8"
              defaultValue={profile.year_of_study ?? ""}
            />
          </label>
          <label className={labelClass}>
            GitHub URL
            <input
              className={inputClass}
              name="github_url"
              type="url"
              defaultValue={profile.github_url ?? ""}
              placeholder="https://github.com/…"
            />
          </label>
          <label className={labelClass}>
            LinkedIn URL
            <input
              className={inputClass}
              name="linkedin_url"
              type="url"
              defaultValue={profile.linkedin_url ?? ""}
              placeholder="https://linkedin.com/in/…"
            />
          </label>
        </div>
        <label className={labelClass}>
          Bio
          <textarea
            className={`${inputClass} min-h-32`}
            name="bio"
            maxLength={2000}
            defaultValue={profile.bio ?? ""}
          />
        </label>
        <button className={buttonClass}>Save profile</button>
      </form>
    </div>
  );
}
