"use client";

import { useState } from "react";
import { Wand2, Copy, Check } from "lucide-react";
import { usePlatform } from "@/lib/platform/store";
import { generateCaptionSuggestions } from "@/lib/platform/caption-generator";

export function CaptionsPanel({ selectedContentId }: { selectedContentId: string | null }) {
  const { state, setCaptionSuggestions } = usePlatform();
  const [contentId, setContentId] = useState<string>(selectedContentId ?? "");
  const [topic, setTopic] = useState("");
  const [localSuggestions, setLocalSuggestions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const selectedContent = state.content.find((c) => c.id === contentId);
  const suggestions = selectedContent ? selectedContent.captionSuggestions : localSuggestions;

  function handleGenerate() {
    const subject = selectedContent?.title || topic;
    const generated = generateCaptionSuggestions(subject, state.profile.niches);
    if (selectedContent) setCaptionSuggestions(selectedContent.id, generated);
    else setLocalSuggestions(generated);
  }

  function handleCopy(text: string, index: number) {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-2xl border border-atheo-line bg-atheo-white p-5 sm:flex-row sm:items-end">
        <label className="block flex-1 text-left">
          <span className="mb-1.5 block text-xs font-medium text-atheo-aubergine-mute">
            Which upload is this for? (optional)
          </span>
          <select
            value={contentId}
            onChange={(e) => setContentId(e.target.value)}
            className="w-full rounded-xl border border-atheo-line bg-atheo-white px-4 py-2.5 text-sm text-atheo-aubergine focus:border-atheo-coral focus:outline-none"
          >
            <option value="">None — just describe the topic</option>
            {state.content.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>

        {!contentId && (
          <label className="block flex-1 text-left">
            <span className="mb-1.5 block text-xs font-medium text-atheo-aubergine-mute">Topic</span>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. new serum routine"
              className="w-full rounded-xl border border-atheo-line bg-atheo-white px-4 py-2.5 text-sm text-atheo-aubergine placeholder:text-atheo-aubergine-mute focus:border-atheo-coral focus:outline-none"
            />
          </label>
        )}

        <button type="button" onClick={handleGenerate} className="btn-primary inline-flex shrink-0 !py-2.5">
          <Wand2 className="mr-1.5 h-4 w-4" />
          Suggest captions
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {suggestions.map((s, i) => (
            <div key={i} className="flex flex-col rounded-2xl border border-atheo-line bg-atheo-white p-4">
              <p className="flex-1 whitespace-pre-line text-sm text-atheo-aubergine">{s}</p>
              <button
                type="button"
                onClick={() => handleCopy(s, i)}
                className="mt-3 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-atheo-coral hover:text-atheo-aubergine"
              >
                {copiedIndex === i ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedIndex === i ? "Copied" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
