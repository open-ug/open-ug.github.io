"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  pendingLabel,
  className,
}: {
  children: React.ReactNode;
  pendingLabel: string;
  className: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} disabled={pending} aria-live="polite">
      {pending && <LoaderCircle className="mr-2 size-4 animate-spin" aria-hidden="true" />}
      {pending ? pendingLabel : children}
    </button>
  );
}
