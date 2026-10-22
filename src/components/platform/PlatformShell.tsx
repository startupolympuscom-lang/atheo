"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, Building2, Sparkles, Menu, X, ArrowLeft } from "lucide-react";
import { AtheoLogo } from "@/components/brand/AtheoLogo";
import { NotificationBell } from "./NotificationBell";
import { Avatar } from "./Avatar";
import { usePlatform } from "@/lib/platform/store";

const NAV_ITEMS = [
  { href: "/platform", label: "Dashboard", icon: LayoutDashboard },
  { href: "/platform/profile", label: "Profile", icon: User },
  { href: "/platform/brands", label: "Brands", icon: Building2 },
  { href: "/platform/creative-space", label: "Creative Space", icon: Sparkles },
];

function isActive(pathname: string, href: string) {
  return href === "/platform" ? pathname === href : pathname.startsWith(href);
}

export function PlatformShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state } = usePlatform();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeItem = NAV_ITEMS.find((item) => isActive(pathname, item.href));

  return (
    <div className="flex min-h-screen bg-atheo-white">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-atheo-line bg-atheo-blush/30 lg:flex">
        <div className="px-6 py-6">
          <AtheoLogo />
        </div>
        <nav className="flex-1 space-y-1 px-4">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 font-display text-sm font-medium transition-colors ${
                  active
                    ? "bg-atheo-white text-atheo-coral shadow-[0_8px_20px_-12px_rgba(40,24,47,0.3)]"
                    : "text-atheo-aubergine-soft hover:bg-atheo-white/60 hover:text-atheo-aubergine"
                }`}
              >
                <item.icon className="h-[18px] w-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-atheo-hairline px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-atheo-aubergine-mute transition-colors hover:text-atheo-coral"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-atheo-line bg-atheo-white px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
              className="flex h-10 w-10 items-center justify-center rounded-full text-atheo-aubergine lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <p className="font-display text-lg font-bold text-atheo-aubergine sm:text-xl">
              {activeItem?.label ?? "Platform"}
            </p>
            <span className="hidden rounded-full border border-atheo-line px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-atheo-aubergine-mute sm:inline-block">
              Demo
            </span>
          </div>

          <div className="flex items-center gap-3">
            <NotificationBell />
            <div className="hidden items-center gap-2 rounded-full border border-atheo-line py-1 pl-1 pr-3 sm:flex">
              <Avatar url={state.profile.avatarUrl} initials={state.profile.avatarInitials} size={28} />
              <span className="font-display text-sm font-medium text-atheo-aubergine">{state.profile.name}</span>
            </div>
          </div>
        </header>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="absolute inset-0 bg-atheo-aubergine/40" onClick={() => setMobileOpen(false)} />
            <div className="relative flex w-72 flex-col bg-atheo-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <AtheoLogo />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-atheo-aubergine"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 font-display text-sm font-medium ${
                        active ? "bg-atheo-blush text-atheo-coral" : "text-atheo-aubergine-soft"
                      }`}
                    >
                      <item.icon className="h-[18px] w-[18px]" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <Link
                href="/"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-atheo-aubergine-mute"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to site
              </Link>
            </div>
          </div>
        )}

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
