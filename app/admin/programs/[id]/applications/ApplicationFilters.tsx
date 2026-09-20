"use client";

import { LoaderCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { inputClass } from "@/lib/forms";

export default function ApplicationFilters({
  query,
  status,
}: {
  query?: string;
  status?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function submit(formData: FormData) {
    const params = new URLSearchParams();
    const nextQuery = String(formData.get("q") ?? "").trim();
    const nextStatus = String(formData.get("status") ?? "");
    if (nextQuery) params.set("q", nextQuery);
    if (nextStatus) params.set("status", nextStatus);
    startTransition(() => {
      router.push(params.size ? `${pathname}?${params}` : pathname);
    });
  }

  return (
    <form
      action={submit}
      className="mt-6 grid gap-3 border border-slate-200 bg-white p-4 sm:grid-cols-[1fr_220px_auto]"
    >
      <input
        className={inputClass}
        name="q"
        defaultValue={query}
        placeholder="Search applicant or identifier"
      />
      <select className={inputClass} name="status" defaultValue={status}>
        <option value="">All statuses</option>
        {["submitted", "under_review", "shortlisted", "accepted", "rejected", "withdrawn"].map(
          (item) => <option key={item}>{item}</option>,
        )}
      </select>
      <button
        className="mt-2 inline-flex min-h-11 items-center justify-center bg-slate-950 px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        aria-live="polite"
      >
        {pending && <LoaderCircle className="mr-2 size-4 animate-spin" aria-hidden="true" />}
        {pending ? "Filtering…" : "Filter"}
      </button>
    </form>
  );
}
