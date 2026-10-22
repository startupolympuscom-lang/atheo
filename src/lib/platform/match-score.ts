import type { Brand } from "./types";

export interface MatchScore {
  score: number;
  label: string;
}

/**
 * A deterministic "how good a fit is this brand" score — niche overlap
 * plus a stable per-brand variance (hashed from the brand id) so the
 * numbers don't look suspiciously round, without being random on every
 * render.
 */
export function computeMatchScore(brand: Brand, niches: string[]): MatchScore {
  const overlap = niches.includes(brand.category);
  const base = overlap ? 82 : 58;

  let hash = 7;
  for (const char of brand.id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  const jitter = (hash % 15) - 5; // -5..+9

  const score = Math.max(40, Math.min(99, base + jitter));
  const label =
    score >= 90 ? "Excellent match" : score >= 75 ? "Great match" : score >= 60 ? "Good match" : "Fair match";

  return { score, label };
}
