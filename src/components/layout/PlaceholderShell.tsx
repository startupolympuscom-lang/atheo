import Link from "next/link";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { ROUTES } from "@/lib/routes";

interface PlaceholderShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

/** Shared shell for the utility routes (apply, contact, sign in, legal) so no CTA ever 404s. */
export function PlaceholderShell({ eyebrow, title, description, children }: PlaceholderShellProps) {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center bg-atheo-blush px-6 py-20 md:py-28">
        <div className="w-full max-w-lg rounded-[2rem] border border-atheo-line bg-atheo-white p-10 text-center shadow-[0_40px_90px_-55px_rgba(40,24,47,0.4)] sm:p-12">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 font-display text-2xl font-bold text-atheo-aubergine sm:text-3xl">{title}</h1>
          <p className="mt-4 text-atheo-aubergine-soft">{description}</p>
          {children}
          <Link href={ROUTES.home} className="btn-secondary mt-8 inline-flex">
            Back to Atheo
          </Link>
        </div>
      </main>
    </>
  );
}
