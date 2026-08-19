"use client";

import { FormEvent, useEffect, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import {
  APPLICATION_DEADLINE,
  APPLICATION_DEADLINE_LABEL,
  applicationsAreClosed,
} from "@/lib/application";

type FormState = {
  fullName: string;
  email: string;
  course: string;
  year: string;
  studentNumber: string;
  registrationNumber: string;
  bio: string;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  course: "",
  year: "",
  studentNumber: "",
  registrationNumber: "",
  bio: "",
};

function timeRemaining() {
  const difference = new Date(APPLICATION_DEADLINE).getTime() - Date.now();
  if (difference <= 0) return "Applications are closed";

  const days = Math.floor(difference / 86_400_000);
  const hours = Math.floor((difference % 86_400_000) / 3_600_000);
  if (days > 0) return `${days} day${days === 1 ? "" : "s"} remaining`;

  const minutes = Math.max(1, Math.floor(difference / 60_000));
  return `${hours}h ${minutes % 60}m remaining`;
}

export default function ApplicationForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [closed, setClosed] = useState(false);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const updateDeadline = () => {
      setClosed(applicationsAreClosed());
      setCountdown(timeRemaining());
    };

    updateDeadline();
    const timer = window.setInterval(updateDeadline, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (status === "error") setStatus("idle");
  }

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (closed || status === "submitting") return;

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        success: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "We could not submit your application.");
      }

      setStatus("success");
      setMessage(result.message || "Your application has been received.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  const inputClasses =
    "mt-2 w-full rounded-[8px] border border-slate-300 bg-white px-3.5 py-3 text-[15px] text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-sky-600 focus:ring-2 focus:ring-sky-100";
  const labelClasses = "block text-sm font-medium text-slate-800";

  if (closed) {
    return (
      <div className="rounded-[16px] border border-slate-200 bg-white p-8 shadow-sm md:p-12" role="status">
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700">
          <Clock3 aria-hidden="true" size={20} />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">Applications are closed</h2>
        <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600">
          This application window ended on {APPLICATION_DEADLINE_LABEL}. Thank
          you for your interest in the project.
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="rounded-[16px] border border-slate-200 bg-white p-8 shadow-sm md:p-12" role="status">
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 aria-hidden="true" size={21} />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">Application received</h2>
        <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600">{message}</p>
        <p className="mt-6 border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500">
          We will review your application and contact you using the email address
          you provided.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submitApplication} className="overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Application details</h2>
          <p className="mt-1 text-sm text-slate-500">All fields are required.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-sky-700">
          <Clock3 aria-hidden="true" size={15} />
          <span>{countdown || "Deadline: 28 August 2026"}</span>
        </div>
      </div>

      <div className="space-y-10 px-6 py-8 md:px-8">
        <fieldset>
          <legend className="text-base font-semibold text-slate-950">Personal information</legend>
          <p className="mt-1 text-sm text-slate-500">How the project team can identify and contact you.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className={labelClasses}>
              Full name
              <input className={inputClasses} type="text" autoComplete="name" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} placeholder="Your full name" maxLength={120} required />
            </label>
            <label className={labelClasses}>
              Email address
              <input className={inputClasses} type="email" autoComplete="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@example.com" maxLength={160} required />
            </label>
          </div>
        </fieldset>

        <div className="h-px bg-slate-200" />

        <fieldset>
          <legend className="text-base font-semibold text-slate-950">Academic information</legend>
          <p className="mt-1 text-sm text-slate-500">Tell us about your current studies at Makerere.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className={labelClasses}>
              Programme or course
              <input className={inputClasses} type="text" value={form.course} onChange={(event) => updateField("course", event.target.value)} placeholder="e.g. BSc. Computer Science" maxLength={120} required />
            </label>
            <label className={labelClasses}>
              Year of study
              <select className={inputClasses} value={form.year} onChange={(event) => updateField("year", event.target.value)} required>
                <option value="" disabled>Select your year</option>
                <option>Year 1</option>
                <option>Year 2</option>
                <option>Year 3</option>
                <option>Year 4</option>
              </select>
            </label>
            <label className={labelClasses}>
              Student number
              <input className={inputClasses} type="text" value={form.studentNumber} onChange={(event) => updateField("studentNumber", event.target.value)} placeholder="e.g. 2100000000" maxLength={40} required />
            </label>
            <label className={labelClasses}>
              Registration number
              <input className={inputClasses} type="text" value={form.registrationNumber} onChange={(event) => updateField("registrationNumber", event.target.value)} placeholder="e.g. 21/U/0000" maxLength={60} required />
            </label>
          </div>
        </fieldset>

        <div className="h-px bg-slate-200" />

        <fieldset>
          <legend className="text-base font-semibold text-slate-950">Your interest</legend>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Share why you want to join, relevant experience, and where you would
            like to contribute. Technical experience is not required.
          </p>
          <label className={`${labelClasses} mt-5`}>
            About your application
            <textarea className={`${inputClasses} min-h-44 resize-y leading-6`} value={form.bio} onChange={(event) => updateField("bio", event.target.value)} placeholder="Tell us what interests you about the project and what you would bring to the team…" maxLength={2000} required />
            <span className="mt-2 block text-right text-xs font-normal text-slate-400">{form.bio.length} / 2000</span>
          </label>
        </fieldset>

        {status === "error" && (
          <div className="flex items-start gap-3 rounded-[8px] border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
            <AlertCircle className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
            <span>{message}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 border-t border-slate-200 bg-slate-50 px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p className="max-w-sm text-xs leading-5 text-slate-500">
          By submitting, you confirm that your information is accurate and that
          you are available for the full academic year.
        </p>
        <button className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-wait disabled:opacity-60" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting…" : "Submit application"}
          {status !== "submitting" && <ArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" size={17} />}
        </button>
      </div>
    </form>
  );
}
