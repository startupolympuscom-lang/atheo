/**
 * Simulated brand ratings — stands in for a real post-deal review system.
 * Stars skew positive (brands that reach deal stage are usually satisfied),
 * with review text that reads differently at the mid-deal check-in vs. the
 * final review.
 */
const MID_REVIEWS_POSITIVE = [
  "Loving what we've seen so far — right tone, right energy.",
  "Great start. Exactly the kind of content we hoped for.",
  "Really happy with the first deliverables. Keep it up.",
  "On track and on-brand so far — appreciate the communication.",
];

const MID_REVIEWS_MIXED = [
  "Good so far, a couple of small tweaks requested via message.",
  "Solid progress — let's align on the remaining deliverables.",
];

const FINAL_REVIEWS_POSITIVE = [
  "Fantastic to work with from brief to delivery. Would partner again in a heartbeat.",
  "Every deliverable landed exactly on-brand. One of our best creator partnerships this quarter.",
  "Professional, creative, and genuinely good at this. Already planning a next campaign together.",
  "Our audience engagement on this one exceeded expectations — thank you!",
];

const FINAL_REVIEWS_MIXED = [
  "Delivered everything, slightly later than planned, but the quality made up for it.",
  "Good collaboration overall — a few rounds of revisions but a strong final result.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRating(stage: "mid" | "final"): { stars: 1 | 2 | 3 | 4 | 5; review: string } {
  // Weighted toward 5, occasionally 4 — brands that reach this stage are
  // generally satisfied, same spirit as the interest-acceptance odds.
  const stars = (Math.random() < 0.72 ? 5 : 4) as 4 | 5;
  const pool = stage === "mid" ? MID_REVIEWS_POSITIVE : FINAL_REVIEWS_POSITIVE;
  const mixedPool = stage === "mid" ? MID_REVIEWS_MIXED : FINAL_REVIEWS_MIXED;
  const review = stars === 5 ? pick(pool) : pick(mixedPool);
  return { stars, review };
}
