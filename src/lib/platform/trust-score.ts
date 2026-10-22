import type { BrandDeal } from "./types";

export interface TrustScore {
  average: number | null;
  count: number;
}

/** Average star rating across every deal a brand has rated (mid or final), most-recent rating per deal counts. */
export function computeTrustScore(deals: BrandDeal[]): TrustScore {
  const rated = deals.filter((d) => d.rating !== null);
  if (rated.length === 0) return { average: null, count: 0 };
  const total = rated.reduce((sum, d) => sum + (d.rating?.stars ?? 0), 0);
  return { average: Math.round((total / rated.length) * 10) / 10, count: rated.length };
}
