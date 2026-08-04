import type { Metadata } from "next";
import { PlaceholderShell } from "@/components/layout/PlaceholderShell";

export const metadata: Metadata = { title: "Privacy Policy — Atheo" };

export default function PrivacyPage() {
  return (
    <PlaceholderShell
      eyebrow="Privacy"
      title="Privacy Policy"
      description="Atheo's full privacy policy is being finalized alongside our launch. Check back soon for details on how creator and brand data is handled."
    />
  );
}
