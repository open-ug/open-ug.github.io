export const inputClass =
  "mt-2 w-full border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-2 focus:ring-sky-100";
export const labelClass = "block text-sm font-medium text-slate-800";
export const buttonClass =
  "inline-flex min-h-11 items-center justify-center bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60";
export const secondaryButtonClass =
  "inline-flex min-h-11 items-center justify-center border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:border-slate-950";

export function formString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}
