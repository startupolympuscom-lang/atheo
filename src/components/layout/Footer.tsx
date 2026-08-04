import Link from "next/link";
import { FOOTER_LINKS, LEGAL_LINKS, SOCIAL_LINKS } from "@/lib/data";

/**
 * Rendered inside FinalCTA's dark field rather than as its own section —
 * the brief asks for the footer to feel like part of that closing panel,
 * not a generic rectangle bolted underneath it.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-atheo-line-on-dark/60 pt-6">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {FOOTER_LINKS.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="text-atheo-white/70 transition-colors hover:text-atheo-apricot">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <span className="hidden h-4 w-px bg-atheo-line-on-dark sm:block" aria-hidden="true" />

        <ul className="flex items-center gap-x-6">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-atheo-white/70 transition-colors hover:text-atheo-apricot"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <span className="hidden h-4 w-px bg-atheo-line-on-dark md:block" aria-hidden="true" />

        <p className="text-atheo-white/50">© {year} Atheo. All rights reserved.</p>

        <span className="hidden h-4 w-px bg-atheo-line-on-dark lg:block" aria-hidden="true" />

        <ul className="flex items-center gap-x-6">
          {LEGAL_LINKS.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="text-atheo-white/50 transition-colors hover:text-atheo-apricot">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
