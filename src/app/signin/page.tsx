import type { Metadata } from "next";
import { PlaceholderShell } from "@/components/layout/PlaceholderShell";

export const metadata: Metadata = { title: "Sign in — Atheo" };

export default function SignInPage() {
  return (
    <PlaceholderShell
      eyebrow="Sign in"
      title="Account access is on its way."
      description="Creator and brand dashboards are launching soon. In the meantime, reach out through the creator or brand application to get started."
    />
  );
}
