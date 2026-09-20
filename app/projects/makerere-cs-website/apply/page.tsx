import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply — Makerere CS Website Project | Open UG Labs",
  description: "Apply to join the undergraduate team working on the Makerere Computer Science website.",
};

export default function ApplyPage() {
  redirect("/programs/makerere-cs-website/apply");
}
