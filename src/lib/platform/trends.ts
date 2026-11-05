import type { BrandCategory } from "./types";

export type TrendType = "audio" | "hashtag" | "format";

export interface TrendItem {
  id: string;
  niche: BrandCategory;
  type: TrendType;
  label: string;
  detail: string;
}

export const TRENDING: TrendItem[] = [
  {
    id: "trend-beauty-1",
    niche: "Beauty",
    type: "audio",
    label: "Soft piano + whispered voiceover",
    detail: "Showing up in 40%+ of top skincare routine Reels this week.",
  },
  {
    id: "trend-beauty-2",
    niche: "Beauty",
    type: "hashtag",
    label: "#SlowSkincare",
    detail: "Steady climb over the last two weeks — pairs well with routine videos.",
  },
  {
    id: "trend-beauty-3",
    niche: "Beauty",
    type: "format",
    label: "\"Get ready with me\" + product swap mid-video",
    detail: "Viewers stick around for the reveal — strong completion rate.",
  },
  {
    id: "trend-fashion-1",
    niche: "Fashion",
    type: "audio",
    label: "Upbeat synth transition cue",
    detail: "The go-to sound for outfit-change Reels right now.",
  },
  {
    id: "trend-fashion-2",
    niche: "Fashion",
    type: "hashtag",
    label: "#CapsuleWardrobe",
    detail: "Resonates with budget-conscious, sustainability-minded audiences.",
  },
  {
    id: "trend-fashion-3",
    niche: "Fashion",
    type: "format",
    label: "Single outfit, three ways to style it",
    detail: "High save rate — people come back to reference it later.",
  },
  {
    id: "trend-lifestyle-1",
    niche: "Lifestyle",
    type: "audio",
    label: "Lo-fi morning ambience",
    detail: "Dominant sound on slow-living and routine content this month.",
  },
  {
    id: "trend-lifestyle-2",
    niche: "Lifestyle",
    type: "hashtag",
    label: "#QuietMornings",
    detail: "Low competition, high engagement — good niche-building tag.",
  },
  {
    id: "trend-lifestyle-3",
    niche: "Lifestyle",
    type: "format",
    label: "Day-in-the-life with a single on-screen caption hook",
    detail: "Minimal editing, strong watch-through on TikTok and Reels.",
  },
  {
    id: "trend-ugc-1",
    niche: "UGC",
    type: "audio",
    label: "Trending original-sound duet template",
    detail: "Brands are actively briefing creators to use this sound.",
  },
  {
    id: "trend-ugc-2",
    niche: "UGC",
    type: "hashtag",
    label: "#HonestReview",
    detail: "Signals authenticity — brands running UGC campaigns are favoring it.",
  },
  {
    id: "trend-ugc-3",
    niche: "UGC",
    type: "format",
    label: "Unboxing with first-impression voiceover, no music",
    detail: "Performs well as raw ad creative — easy for brands to repurpose.",
  },
];

export function trendsForNiches(niches: string[]): TrendItem[] {
  const inNiche = TRENDING.filter((t) => niches.includes(t.niche));
  const rest = TRENDING.filter((t) => !niches.includes(t.niche));
  return [...inNiche, ...rest];
}
