"use client";

import { LoaderCircle } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  pendingLabel,
  className,
  disabled,
  name,
  value,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  pendingLabel: string;
}) {
  const { data, pending } = useFormStatus();
  const isInvokedAction = !name || data?.get(name) === value;
  const showPending = pending && isInvokedAction;

  return (
    <button
      {...props}
      type="submit"
      className={className}
      disabled={disabled || pending}
      name={name}
      value={value}
      aria-live="polite"
    >
      {showPending && <LoaderCircle className="mr-2 size-4 animate-spin" aria-hidden="true" />}
      {showPending ? pendingLabel : children}
    </button>
  );
}
