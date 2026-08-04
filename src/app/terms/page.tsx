import type { Metadata } from "next";
import { PlaceholderShell } from "@/components/layout/PlaceholderShell";

export const metadata: Metadata = { title: "Terms of Service — Atheo" };

export default function TermsPage() {
  return (
    <PlaceholderShell
      eyebrow="Terms"
      title="Terms of Service"
      description="Our terms of service are being finalized alongside our launch. Check back soon for the full agreement covering creators and brand partners."
    />
  );
}
