import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function ProgramCta({ compact = false }: { compact?: boolean }) {
  const supabase = await createClient();
  const { data: program } = await supabase.from("programs").select("status,applications_open_at,applications_close_at").eq("slug", "makerere-cs-website").maybeSingle();
  const now = Date.now();
  const open = program?.status === "applications_open" && (!program.applications_open_at || new Date(program.applications_open_at).getTime() <= now) && (!program.applications_close_at || new Date(program.applications_close_at).getTime() >= now);
  const href = open ? "/programs/makerere-cs-website/apply" : "/programs/makerere-cs-website";
  if (compact) return <Link href={href} className="inline-flex items-center justify-center gap-2 bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white hover:bg-sky-600">{open ? "Start application" : "View program status"}<ArrowRight size={17} /></Link>;
  return <><p className="text-sm font-semibold">{open ? "Applications are open" : "Applications are closed"}</p><p className="mt-2 text-sm leading-6 text-slate-600">{program?.applications_close_at ? `Deadline: ${new Intl.DateTimeFormat("en-UG", { dateStyle: "long", timeStyle: "short", timeZone: "Africa/Kampala" }).format(new Date(program.applications_close_at))}` : "View the program record for current application dates."}</p><Link href={href} className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-600">{open ? "Apply to join" : "View program"}<ArrowRight size={17} aria-hidden="true" /></Link></>;
}
