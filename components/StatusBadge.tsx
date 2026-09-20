const colors: Record<string, string> = {
  draft: "bg-slate-100 text-slate-700", published: "bg-blue-50 text-blue-700", applications_open: "bg-emerald-50 text-emerald-700",
  submitted: "bg-blue-50 text-blue-700", under_review: "bg-amber-50 text-amber-800", shortlisted: "bg-violet-50 text-violet-700",
  accepted: "bg-emerald-50 text-emerald-700", rejected: "bg-red-50 text-red-700", withdrawn: "bg-slate-100 text-slate-500",
  reviewing: "bg-amber-50 text-amber-800", completed: "bg-slate-100 text-slate-700", archived: "bg-slate-100 text-slate-500",
};

export default function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-flex px-2.5 py-1 text-xs font-semibold capitalize ${colors[status] ?? colors.draft}`}>{status.replaceAll("_", " ")}</span>;
}
