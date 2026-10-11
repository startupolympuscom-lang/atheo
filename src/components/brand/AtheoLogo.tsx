import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

interface AtheoLogoProps {
  /** "dark" wordmark for light backgrounds (default), "light" (reversed) for dark backgrounds. */
  variant?: "dark" | "light";
  /** Rendered height in px — width follows the lockup's fixed aspect ratio. */
  size?: number;
  className?: string;
  asLink?: boolean;
}

/**
 * The official Atheo lockup (mark + wordmark), supplied as a single
 * transparent PNG. Swap the two files below to update the logo everywhere
 * without touching Header, FinalCTA, or any other call site.
 */
const LOGO_SRC: Record<NonNullable<AtheoLogoProps["variant"]>, string> = {
  dark: "/brand/atheo-logo-light-bg.png", // dark-aubergine wordmark — for light backgrounds
  light: "/brand/atheo-logo-dark-bg.png", // white wordmark — for dark backgrounds
};

// Source lockup is 1755x454.
const LOGO_ASPECT_RATIO = 1755 / 454;

export function AtheoLogo({ variant = "dark", size = 28, className = "", asLink = true }: AtheoLogoProps) {
  const content = (
    <Image
      src={LOGO_SRC[variant]}
      alt="Atheo"
      width={Math.round(size * LOGO_ASPECT_RATIO)}
      height={size}
      className={className}
    />
  );

  if (!asLink) return content;

  return (
    <Link href={ROUTES.home} aria-label="Atheo home" className="inline-flex">
      {content}
    </Link>
  );
}
