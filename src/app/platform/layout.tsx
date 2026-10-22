import type { Metadata } from "next";
import { PlatformProvider } from "@/lib/platform/store";
import { PlatformShell } from "@/components/platform/PlatformShell";

export const metadata: Metadata = {
  title: "Atheo Platform (Demo)",
  description: "A demo of the Atheo creator platform — profile, brands, and creative space. No account needed.",
};

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <PlatformProvider>
      <PlatformShell>{children}</PlatformShell>
    </PlatformProvider>
  );
}
