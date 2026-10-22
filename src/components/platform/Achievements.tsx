"use client";

import {
  Target,
  Sparkles,
  Handshake,
  CheckCircle2,
  Star,
  ShieldCheck,
  Users,
  TrendingUp,
  Film,
  CalendarClock,
  Lock,
  type LucideIcon,
} from "lucide-react";
import type { Achievement } from "@/lib/platform/achievements";

const ICON: Record<string, LucideIcon> = {
  "first-pitch": Target,
  "in-demand": Sparkles,
  "first-deal": Handshake,
  "deal-closer": CheckCircle2,
  "five-star": Star,
  "trusted-partner": ShieldCheck,
  "multi-platform": Users,
  "rising-reach": TrendingUp,
  "content-machine": Film,
  scheduler: CalendarClock,
};

export function Achievements({ achievements }: { achievements: Achievement[] }) {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-semibold text-atheo-aubergine">Achievements</p>
        <span className="text-xs font-medium text-atheo-aubergine-mute">
          {unlockedCount} / {achievements.length} unlocked
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {achievements.map((a) => {
          const Icon = ICON[a.id] ?? Star;
          return (
            <div
              key={a.id}
              title={a.description}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-colors ${
                a.unlocked
                  ? "border-atheo-coral/40 bg-atheo-blush/40"
                  : "border-atheo-line bg-atheo-white opacity-60"
              }`}
            >
              <span
                className={`relative flex h-10 w-10 items-center justify-center rounded-full ${
                  a.unlocked ? "bg-atheo-coral text-atheo-white" : "bg-atheo-blush text-atheo-aubergine-mute"
                }`}
              >
                <Icon className="h-5 w-5" />
                {!a.unlocked && (
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-atheo-white text-atheo-aubergine-mute ring-1 ring-atheo-line">
                    <Lock className="h-2.5 w-2.5" />
                  </span>
                )}
              </span>
              <p
                className={`text-xs font-semibold ${
                  a.unlocked ? "text-atheo-aubergine" : "text-atheo-aubergine-mute"
                }`}
              >
                {a.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
