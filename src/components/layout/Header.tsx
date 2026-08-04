"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AtheoLogo } from "@/components/brand/AtheoLogo";
import { NAV_LINKS } from "@/lib/data";
import { ROUTES } from "@/lib/routes";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-atheo-line bg-atheo-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <AtheoLogo />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-display text-sm font-medium text-atheo-aubergine-soft transition-colors hover:text-atheo-coral"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={ROUTES.signIn}
            className="font-display text-sm font-medium text-atheo-aubergine-soft transition-colors hover:text-atheo-coral"
          >
            Sign in
          </Link>
          <Link href={ROUTES.creatorsApply} className="btn-primary !px-6 !py-2.5 text-sm">
            Join Atheo
          </Link>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-atheo-aubergine lg:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-atheo-line bg-atheo-white px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-base font-medium text-atheo-aubergine"
              >
                {link.label}
              </a>
            ))}
            <Link
              href={ROUTES.signIn}
              onClick={() => setMenuOpen(false)}
              className="font-display text-base font-medium text-atheo-aubergine"
            >
              Sign in
            </Link>
            <Link
              href={ROUTES.creatorsApply}
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              Join Atheo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
