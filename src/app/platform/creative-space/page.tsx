"use client";

import { useState } from "react";
import { Upload, Wand2, CalendarClock, Handshake, Flame } from "lucide-react";
import { UploadPanel } from "@/components/platform/creative/UploadPanel";
import { CaptionsPanel } from "@/components/platform/creative/CaptionsPanel";
import { SchedulePanel } from "@/components/platform/creative/SchedulePanel";
import { DealsPanel } from "@/components/platform/creative/DealsPanel";
import { InspirationPanel } from "@/components/platform/creative/InspirationPanel";

const TABS = [
  { id: "upload", label: "Upload & Edit", icon: Upload },
  { id: "captions", label: "Captions", icon: Wand2 },
  { id: "inspiration", label: "Inspiration", icon: Flame },
  { id: "schedule", label: "Schedule", icon: CalendarClock },
  { id: "deals", label: "Brand Deals", icon: Handshake },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function CreativeSpacePage() {
  const [tab, setTab] = useState<TabId>("upload");
  const [captionTarget, setCaptionTarget] = useState<string | null>(null);

  return (
    <div>
      <p className="eyebrow">Creative Space</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-atheo-aubergine sm:text-3xl">
        Make, caption, schedule, deliver.
      </h1>
      <p className="mt-2 max-w-xl text-sm text-atheo-aubergine-soft">
        Upload raw footage for Atheo to edit, get caption ideas, schedule posts with reminders, and track
        what you owe brands.
      </p>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-atheo-hairline pb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              tab === t.id
                ? "border-atheo-coral bg-atheo-blush text-atheo-coral"
                : "border-atheo-line text-atheo-aubergine-mute hover:border-atheo-coral"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "upload" && (
          <UploadPanel
            onRequestCaptions={(contentId) => {
              setCaptionTarget(contentId);
              setTab("captions");
            }}
          />
        )}
        {tab === "captions" && <CaptionsPanel key={captionTarget ?? "none"} selectedContentId={captionTarget} />}
        {tab === "inspiration" && <InspirationPanel />}
        {tab === "schedule" && <SchedulePanel />}
        {tab === "deals" && <DealsPanel />}
      </div>
    </div>
  );
}
