"use client";

import { useState } from "react";
import { CalendarClock, Bell, Trash2, Zap, List, Calendar as CalendarIcon } from "lucide-react";
import { usePlatform } from "@/lib/platform/store";
import { formatDateTime, formatUntil } from "@/lib/platform/format";
import { ContentCalendar } from "@/components/platform/creative/ContentCalendar";
import type { SocialPlatform } from "@/lib/platform/types";

const PLATFORMS: SocialPlatform[] = ["Instagram", "TikTok", "YouTube", "X"];

function toLocalInputValue(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function SchedulePanel() {
  const { state, schedulePost, deleteScheduledPost } = usePlatform();
  const [platform, setPlatform] = useState<SocialPlatform>("Instagram");
  const [caption, setCaption] = useState("");
  const [when, setWhen] = useState(() => toLocalInputValue(new Date(Date.now() + 3600_000)));
  const [reminder, setReminder] = useState(true);
  const [view, setView] = useState<"list" | "calendar">("list");

  const upcoming = [...state.scheduledPosts].sort((a, b) => a.scheduledAt - b.scheduledAt);

  function handleSchedule(scheduledAt: number) {
    if (!caption.trim()) return;
    schedulePost({ platform, caption: caption.trim(), scheduledAt, reminder });
    setCaption("");
  }

  return (
    <div>
      <div className="rounded-2xl border border-atheo-line bg-atheo-white p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-left">
            <span className="mb-1.5 block text-xs font-medium text-atheo-aubergine-mute">Platform</span>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as SocialPlatform)}
              className="w-full rounded-xl border border-atheo-line bg-atheo-white px-4 py-2.5 text-sm text-atheo-aubergine focus:border-atheo-coral focus:outline-none"
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-left">
            <span className="mb-1.5 block text-xs font-medium text-atheo-aubergine-mute">Date & time</span>
            <input
              type="datetime-local"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              className="w-full rounded-xl border border-atheo-line bg-atheo-white px-4 py-2.5 text-sm text-atheo-aubergine focus:border-atheo-coral focus:outline-none"
            />
          </label>
        </div>

        <label className="mt-4 block text-left">
          <span className="mb-1.5 block text-xs font-medium text-atheo-aubergine-mute">Caption</span>
          <textarea
            rows={2}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Paste a caption from the Captions tab, or write your own…"
            className="w-full rounded-xl border border-atheo-line bg-atheo-white px-4 py-2.5 text-sm text-atheo-aubergine placeholder:text-atheo-aubergine-mute focus:border-atheo-coral focus:outline-none"
          />
        </label>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm font-medium text-atheo-aubergine-soft">
            <input
              type="checkbox"
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
              className="h-4 w-4 accent-[color:var(--atheo-coral)]"
            />
            <Bell className="h-4 w-4" />
            Remind me before it goes live
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleSchedule(Date.now() + 90_000)}
              className="btn-secondary inline-flex !px-3 !py-2 text-xs"
              title="Schedules 90 seconds from now so you can see the reminder fire live"
            >
              <Zap className="mr-1.5 h-3.5 w-3.5" />
              Demo: remind me in 90s
            </button>
            <button
              type="button"
              onClick={() => handleSchedule(new Date(when).getTime())}
              className="btn-primary !px-4 !py-2 text-sm"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="font-display text-sm font-semibold text-atheo-aubergine">Upcoming</p>
        <div className="flex gap-1 rounded-full border border-atheo-line p-1">
          <button
            type="button"
            onClick={() => setView("list")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              view === "list" ? "bg-atheo-blush text-atheo-coral" : "text-atheo-aubergine-mute"
            }`}
          >
            <List className="h-3.5 w-3.5" />
            List
          </button>
          <button
            type="button"
            onClick={() => setView("calendar")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              view === "calendar" ? "bg-atheo-blush text-atheo-coral" : "text-atheo-aubergine-mute"
            }`}
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            Calendar
          </button>
        </div>
      </div>

      {view === "calendar" ? (
        <div className="mt-3">
          <ContentCalendar posts={state.scheduledPosts} deals={state.deals} brands={state.brands} />
        </div>
      ) : upcoming.length === 0 ? (
        <p className="mt-3 text-sm text-atheo-aubergine-mute">Nothing scheduled yet.</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-3">
          {upcoming.map((post) => (
            <li
              key={post.id}
              className="flex items-start justify-between gap-3 rounded-2xl border border-atheo-line bg-atheo-white p-4"
            >
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-atheo-aubergine">
                  {post.platform}{" "}
                  <span className="font-normal text-atheo-aubergine-mute">· {formatUntil(post.scheduledAt)}</span>
                </p>
                <p className="mt-1 truncate text-sm text-atheo-aubergine-soft">{post.caption}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-atheo-aubergine-mute">
                  <CalendarClock className="h-3.5 w-3.5" />
                  {formatDateTime(post.scheduledAt)}
                  {post.reminder && (
                    <>
                      <Bell className="ml-1 h-3.5 w-3.5" />
                      reminder on
                    </>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => deleteScheduledPost(post.id)}
                aria-label="Remove scheduled post"
                className="shrink-0 text-atheo-aubergine-mute hover:text-atheo-coral"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
