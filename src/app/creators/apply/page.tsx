import type { Metadata } from "next";
import { PlaceholderShell } from "@/components/layout/PlaceholderShell";

export const metadata: Metadata = { title: "Join as a creator — Atheo" };

export default function CreatorsApplyPage() {
  return (
    <PlaceholderShell
      eyebrow="Join as a creator"
      title="Let's build your next chapter."
      description="Tell us about your work and we'll follow up about representation, brand fit and next steps. The full application flow is coming soon."
    />
  );
}
