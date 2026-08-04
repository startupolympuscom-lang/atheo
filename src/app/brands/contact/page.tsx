import type { Metadata } from "next";
import { PlaceholderShell } from "@/components/layout/PlaceholderShell";

export const metadata: Metadata = { title: "Partner with Atheo" };

export default function BrandsContactPage() {
  return (
    <PlaceholderShell
      eyebrow="Partner with Atheo"
      title="Let's find your right-fit creators."
      description="Share your brand and campaign goals and our partnerships team will follow up with curated talent recommendations. The full intake form is coming soon."
    />
  );
}
