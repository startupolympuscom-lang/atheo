import type { Metadata } from "next";
import { PlaceholderShell } from "@/components/layout/PlaceholderShell";

export const metadata: Metadata = { title: "Contact — Atheo" };

export default function ContactPage() {
  return (
    <PlaceholderShell
      eyebrow="Contact"
      title="We'd love to hear from you."
      description="For creator or brand inquiries, use the applications linked across the site. For everything else, a dedicated contact form is coming soon."
    />
  );
}
