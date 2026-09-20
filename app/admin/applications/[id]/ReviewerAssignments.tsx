import { requireAdmin } from "@/lib/auth";
import { buttonClass, inputClass } from "@/lib/forms";
import { assignReviewer, removeReviewer } from "../../actions";
import SubmitButton from "@/components/SubmitButton";

export default async function ReviewerAssignments({
  applicationId,
}: {
  applicationId: string;
}) {
  const { supabase } = await requireAdmin();
  const [{ data: roles }, { data: assignments }] = await Promise.all([
    supabase
      .from("user_roles")
      .select("user_id,role")
      .in("role", ["reviewer", "admin"]),
    supabase
      .from("reviewer_assignments")
      .select("id,reviewer_id")
      .eq("application_id", applicationId),
  ]);
  const ids = roles?.map((role) => role.user_id) ?? [];
  const { data: profiles } = ids.length
    ? await supabase.from("profiles").select("id,full_name,email").in("id", ids)
    : { data: [] };
  const profileMap = new Map(
    (profiles ?? []).map((profile) => [profile.id, profile]),
  );
  const assigned = new Set(
    (assignments ?? []).map((assignment) => assignment.reviewer_id),
  );
  return (
    <section className="mt-6 border border-slate-200 bg-white p-5">
      <h2 className="font-semibold">Reviewer assignments</h2>
      <div className="mt-4 space-y-2">
        {assignments?.map((assignment) => (
          <form
            action={removeReviewer}
            key={assignment.id}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <input type="hidden" name="application_id" value={applicationId} />
            <input type="hidden" name="assignment_id" value={assignment.id} />
            <span>
              {profileMap.get(assignment.reviewer_id)?.full_name ??
                assignment.reviewer_id}
            </span>
            <SubmitButton
              className="inline-flex items-center font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              pendingLabel="Removing…"
            >
              Remove
            </SubmitButton>
          </form>
        ))}
        {!assignments?.length && (
          <p className="text-sm text-slate-500">No reviewers assigned.</p>
        )}
      </div>
      <form
        action={assignReviewer}
        className="mt-4 space-y-3 border-t border-slate-100 pt-4"
      >
        <input type="hidden" name="application_id" value={applicationId} />
        <select
          className={inputClass}
          name="reviewer_id"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Select reviewer
          </option>
          {roles
            ?.filter((role) => !assigned.has(role.user_id))
            .map((role) => (
              <option key={role.user_id} value={role.user_id}>
                {profileMap.get(role.user_id)?.full_name ?? role.user_id} (
                {role.role})
              </option>
            ))}
        </select>
        <SubmitButton className={`${buttonClass} w-full`} pendingLabel="Assigning reviewer…">
          Assign reviewer
        </SubmitButton>
      </form>
    </section>
  );
}
