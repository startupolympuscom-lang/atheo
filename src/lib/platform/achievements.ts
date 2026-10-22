import type { PlatformState } from "./types";
import { computeTrustScore } from "./trust-score";

export interface Achievement {
  id: string;
  label: string;
  description: string;
  unlocked: boolean;
}

export function computeAchievements(state: PlatformState): Achievement[] {
  const totalFollowers = state.profile.socialAccounts.reduce((sum, a) => sum + a.followers, 0);
  const trust = computeTrustScore(state.deals);
  const creatorInterests = state.interests.filter((i) => i.initiatedBy === "creator").length;
  const brandInitiated = state.interests.some((i) => i.initiatedBy === "brand");
  const fiveStar = state.deals.some((d) => d.rating?.stars === 5);
  const completedDeals = state.deals.filter((d) => d.status === "completed").length;

  return [
    {
      id: "first-pitch",
      label: "First Pitch",
      description: "Express interest in a brand for the first time.",
      unlocked: creatorInterests >= 1,
    },
    {
      id: "in-demand",
      label: "In Demand",
      description: "Get noticed — a brand reaches out to you first.",
      unlocked: brandInitiated,
    },
    {
      id: "first-deal",
      label: "First Deal",
      description: "Land your first brand deal.",
      unlocked: state.deals.length >= 1,
    },
    {
      id: "deal-closer",
      label: "Deal Closer",
      description: "Complete every deliverable on a brand deal.",
      unlocked: completedDeals >= 1,
    },
    {
      id: "five-star",
      label: "Five-Star Favorite",
      description: "Earn a 5-star rating from a brand.",
      unlocked: fiveStar,
    },
    {
      id: "trusted-partner",
      label: "Trusted Partner",
      description: "Keep a 4.5+ Trust Score across 2 or more brand reviews.",
      unlocked: trust.average !== null && trust.average >= 4.5 && trust.count >= 2,
    },
    {
      id: "multi-platform",
      label: "Multi-Platform",
      description: "Connect accounts on 3 or more social platforms.",
      unlocked: state.profile.socialAccounts.length >= 3,
    },
    {
      id: "rising-reach",
      label: "Rising Reach",
      description: "Cross 250K followers across all platforms.",
      unlocked: totalFollowers >= 250_000,
    },
    {
      id: "content-machine",
      label: "Content Machine",
      description: "Upload 3 or more pieces of content to Creative Space.",
      unlocked: state.content.length >= 3,
    },
    {
      id: "scheduler",
      label: "Scheduler",
      description: "Schedule a post with a reminder turned on.",
      unlocked: state.scheduledPosts.some((p) => p.reminder),
    },
  ];
}
