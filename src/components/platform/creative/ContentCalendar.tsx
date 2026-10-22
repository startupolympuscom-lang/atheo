"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ScheduledPost, BrandDeal, Brand } from "@/lib/platform/types";

interface CalendarItem {
  id: string;
  kind: "post" | "deadline";
  label: string;
  sublabel: string;
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function ContentCalendar({
  posts,
  deals,
  brands,
}: {
  posts: ScheduledPost[];
  deals: BrandDeal[];
  brands: Brand[];
}) {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));

  const monthLabel = cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const firstWeekday = cursor.getDay();
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();

  const itemsByDay = new Map<number, CalendarItem[]>();
  for (const post of posts) {
    const d = new Date(post.scheduledAt);
    if (d.getFullYear() === cursor.getFullYear() && d.getMonth() === cursor.getMonth()) {
      const arr = itemsByDay.get(d.getDate()) ?? [];
      arr.push({
        id: post.id,
        kind: "post",
        label: post.platform,
        sublabel: d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
      });
      itemsByDay.set(d.getDate(), arr);
    }
  }
  for (const deal of deals) {
    const d = new Date(deal.deadline);
    if (d.getFullYear() === cursor.getFullYear() && d.getMonth() === cursor.getMonth()) {
      const brand = brands.find((b) => b.id === deal.brandId);
      const arr = itemsByDay.get(d.getDate()) ?? [];
      arr.push({ id: deal.id, kind: "deadline", label: brand?.name ?? "Brand deal", sublabel: deal.title });
      itemsByDay.set(d.getDate(), arr);
    }
  }

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === cursor.getFullYear() && today.getMonth() === cursor.getMonth();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="rounded-2xl border border-atheo-line bg-atheo-white p-5">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-semibold text-atheo-aubergine">{monthLabel}</p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            aria-label="Previous month"
            className="flex h-7 w-7 items-center justify-center rounded-full text-atheo-aubergine-mute hover:bg-atheo-blush hover:text-atheo-coral"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setCursor(startOfMonth(new Date()))}
            className="rounded-full px-2.5 py-1 text-xs font-medium text-atheo-aubergine-mute hover:bg-atheo-blush hover:text-atheo-coral"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            aria-label="Next month"
            className="flex h-7 w-7 items-center justify-center rounded-full text-atheo-aubergine-mute hover:bg-atheo-blush hover:text-atheo-coral"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-atheo-aubergine-mute">
        {WEEKDAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const items = itemsByDay.get(day) ?? [];
          const isToday = isCurrentMonth && today.getDate() === day;
          return (
            <div
              key={day}
              className={`min-h-[72px] rounded-lg border p-1.5 text-left ${
                isToday ? "border-atheo-coral bg-atheo-blush/40" : "border-atheo-hairline"
              }`}
            >
              <p className={`text-xs font-semibold ${isToday ? "text-atheo-coral" : "text-atheo-aubergine-mute"}`}>{day}</p>
              <div className="mt-1 flex flex-col gap-0.5">
                {items.slice(0, 2).map((item) => (
                  <span
                    key={item.id}
                    title={`${item.label} · ${item.sublabel}`}
                    className={`truncate rounded px-1 py-0.5 text-[10px] font-medium ${
                      item.kind === "post" ? "bg-atheo-coral/15 text-atheo-coral" : "bg-atheo-aubergine/10 text-atheo-aubergine"
                    }`}
                  >
                    {item.kind === "post" ? item.label : `Due: ${item.label}`}
                  </span>
                ))}
                {items.length > 2 && (
                  <span className="text-[10px] text-atheo-aubergine-mute">+{items.length - 2} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex gap-4 text-[11px] text-atheo-aubergine-mute">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-atheo-coral" /> Scheduled post
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-atheo-aubergine" /> Deal deadline
        </span>
      </div>
    </div>
  );
}
