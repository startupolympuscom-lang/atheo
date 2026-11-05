"use client";

import { Music2, Hash, Clapperboard, Flame, type LucideIcon } from "lucide-react";
import { usePlatform } from "@/lib/platform/store";
import { trendsForNiches, type TrendType } from "@/lib/platform/trends";

const TYPE_ICON: Record<TrendType, LucideIcon> = {
  audio: Music2,
  hashtag: Hash,
  format: Clapperboard,
};

const TYPE_LABEL: Record<TrendType, string> = {
  audio: "Trending audio",
  hashtag: "Trending hashtag",
  format: "Trending format",
};

export function InspirationPanel() {
  const { state } = usePlatform();
  const trends = trendsForNiches(state.profile.niches);

  return (
    <div>
      <p className="text-sm text-atheo-aubergine-soft">
        What&apos;s moving right now in your niches — use it to shape your next upload.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {trends.map((trend) => {
          const Icon = TYPE_ICON[trend.type];
          const inNiche = state.profile.niches.includes(trend.niche);
          return (
            <div
              key={trend.id}
              className={`rounded-2xl border p-5 ${inNiche ? "border-atheo-coral/40 bg-atheo-blush/30" : "border-atheo-line bg-atheo-white"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-atheo-coral">
                  <Icon className="h-3.5 w-3.5" />
                  {TYPE_LABEL[trend.type]}
                </span>
                <span className="rounded-full border border-atheo-line px-2 py-0.5 text-[11px] font-medium text-atheo-aubergine-mute">
                  {trend.niche}
                </span>
              </div>
              <p className="mt-3 font-display text-sm font-semibold text-atheo-aubergine">{trend.label}</p>
              <p className="mt-1.5 text-xs text-atheo-aubergine-soft">{trend.detail}</p>
              {inNiche && (
                <p className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-atheo-coral">
                  <Flame className="h-3 w-3" />
                  In your niche
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
