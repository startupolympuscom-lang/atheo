import Link from "next/link";
import { AtheoMark } from "./AtheoMark";
import { ROUTES } from "@/lib/routes";

interface AtheoLogoProps {
  /** "dark" wordmark for light backgrounds, "light" (reversed) for dark backgrounds. */
  variant?: "dark" | "light";
  size?: number;
  className?: string;
  asLink?: boolean;
}

export function AtheoLogo({ variant = "dark", size = 28, className = "", asLink = true }: AtheoLogoProps) {
  const wordmarkColor = variant === "light" ? "text-atheo-white" : "text-atheo-aubergine";

  const content = (
    <span className={`inline-flex items-center gap-2 font-display font-semibold ${className}`}>
      <AtheoMark size={size} />
      <span className={`text-xl tracking-tight ${wordmarkColor}`}>atheo</span>
    </span>
  );

  if (!asLink) return content;

  return (
    <Link href={ROUTES.home} aria-label="Atheo home" className="inline-flex">
      {content}
    </Link>
  );
}
