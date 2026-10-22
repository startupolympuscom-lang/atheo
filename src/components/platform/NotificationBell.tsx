"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Building2, CheckCircle2, Sparkles, Clock, Star, type LucideIcon } from "lucide-react";
import { usePlatform } from "@/lib/platform/store";
import { formatRelativeTime } from "@/lib/platform/format";
import type { NotificationType } from "@/lib/platform/types";

const TYPE_ICON: Record<NotificationType, LucideIcon> = {
  brand_interest: Building2,
  brand_reply: CheckCircle2,
  deal_offer: Sparkles,
  rating: Star,
  reminder: Clock,
  system: Bell,
};

export function NotificationBell() {
  const { state, markNotificationRead, markAllNotificationsRead } = usePlatform();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-atheo-line text-atheo-aubergine-soft transition-colors hover:border-atheo-coral hover:text-atheo-coral"
      >
        <Bell className="h-[18px] w-[18px]" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-atheo-coral px-1 font-display text-[10px] font-bold text-atheo-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 max-h-[28rem] w-80 overflow-y-auto rounded-2xl border border-atheo-line bg-atheo-white shadow-[0_30px_60px_-30px_rgba(40,24,47,0.4)] sm:w-96">
          <div className="flex items-center justify-between border-b border-atheo-hairline px-4 py-3">
            <p className="font-display text-sm font-semibold text-atheo-aubergine">Notifications</p>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsRead}
                className="text-xs font-medium text-atheo-coral hover:text-atheo-aubergine"
              >
                Mark all read
              </button>
            )}
          </div>

          {state.notifications.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-atheo-aubergine-mute">No notifications yet.</p>
          ) : (
            <ul>
              {state.notifications.map((n) => {
                const Icon = TYPE_ICON[n.type];
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => markNotificationRead(n.id)}
                      className={`flex w-full items-start gap-3 border-b border-atheo-hairline px-4 py-3 text-left transition-colors hover:bg-atheo-blush/40 ${
                        n.read ? "" : "bg-atheo-blush/60"
                      }`}
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-atheo-blush text-atheo-coral">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-2">
                          <span className="text-sm font-semibold text-atheo-aubergine">{n.title}</span>
                          {!n.read && <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-atheo-coral" />}
                        </span>
                        <span className="mt-0.5 block text-xs text-atheo-aubergine-soft">{n.body}</span>
                        <span className="mt-1 block text-[11px] text-atheo-aubergine-mute">
                          {formatRelativeTime(n.createdAt)}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
