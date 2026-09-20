"use client";

import { LoaderCircle, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { inputClass } from "@/lib/forms";

export default function UserSearch({ query }: { query?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function search(formData: FormData) {
    const nextQuery = String(formData.get("q") ?? "").trim();
    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    startTransition(() => {
      router.push(params.size ? `${pathname}?${params}` : pathname);
    });
  }

  return (
    <form action={search} className="mt-7 flex gap-3 border border-slate-200 bg-white p-4">
      <label className="relative flex-1">
        <span className="sr-only">Search accounts</span>
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          className={`${inputClass} mt-0 pl-10`}
          name="q"
          defaultValue={query}
          placeholder="Search name, email, student or registration number"
        />
      </label>
      <button
        className="inline-flex min-h-11 items-center justify-center bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        aria-live="polite"
      >
        {pending && <LoaderCircle className="mr-2 size-4 animate-spin" aria-hidden="true" />}
        {pending ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
