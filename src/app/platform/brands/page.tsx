"use client";

import { useState } from "react";
import { Send, Clock, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { usePlatform } from "@/lib/platform/store";
import { computeMatchScore } from "@/lib/platform/match-score";
import type { Brand, BrandCategory, Interest } from "@/lib/platform/types";

const CATEGORIES: (BrandCategory | "All")[] = ["All", "Beauty", "Fashion", "Lifestyle", "UGC"];

export default function BrandsPage() {
  const { state } = usePlatform();
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");

  const brands = state.brands
    .filter((b) => filter === "All" || b.category === filter)
    .map((b) => ({ brand: b, match: computeMatchScore(b, state.profile.niches) }))
    .sort((a, b) => b.match.score - a.match.score);

  return (
    <div>
      <p className="eyebrow">Collaborate</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-atheo-aubergine sm:text-3xl">
        Brands open to pitches.
      </h1>
      <p className="mt-2 max-w-xl text-sm text-atheo-aubergine-soft">
        Sorted by match to your niches — express interest and brands reply right here, replies and offers
        also show up in your notifications.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              filter === c
                ? "border-atheo-coral bg-atheo-blush text-atheo-coral"
                : "border-atheo-line text-atheo-aubergine-mute hover:border-atheo-coral"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map(({ brand, match }) => (
          <BrandCard
            key={brand.id}
            brand={brand}
            match={match}
            interest={state.interests.find((i) => i.brandId === brand.id)}
          />
        ))}
      </div>
    </div>
  );
}

function BrandCard({
  brand,
  match,
  interest,
}: {
  brand: Brand;
  match: { score: number; label: string };
  interest?: Interest;
}) {
  const { expressInterest, resolveInterest } = usePlatform();
  const [composing, setComposing] = useState(false);
  const [message, setMessage] = useState(
    `Hi! I'd love to put together a collaboration with ${brand.name} — happy to share examples of my work.`,
  );

  const brandInitiatedPending = interest?.initiatedBy === "brand" && interest.status === "pending";

  return (
    <div
      className={`flex flex-col rounded-2xl border bg-atheo-white p-5 ${
        brandInitiatedPending ? "border-atheo-coral shadow-[0_20px_45px_-28px_rgba(255,69,80,0.45)]" : "border-atheo-line"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-base font-semibold text-atheo-aubergine">{brand.name}</p>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-atheo-coral">{brand.category}</p>
        </div>
        <span className="shrink-0 rounded-full border border-atheo-line px-2.5 py-0.5 text-xs font-medium text-atheo-aubergine-mute">
          {brand.budgetRange}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm text-atheo-aubergine-soft">{brand.description}</p>
      <p className="mt-3 text-xs text-atheo-aubergine-mute">{brand.location}</p>

      <div className="mt-3 flex items-center gap-2 rounded-xl bg-atheo-blush/50 px-3 py-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-atheo-white">
          <div
            className="h-full rounded-full bg-gradient-to-r from-atheo-coral to-atheo-apricot"
            style={{ width: `${match.score}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-semibold text-atheo-aubergine">{match.score}% match</span>
      </div>

      <div className="mt-4">
        {brandInitiatedPending ? (
          <div className="rounded-xl bg-atheo-blush/60 p-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-atheo-coral">
              <Sparkles className="h-3.5 w-3.5" />
              {brand.name} wants to collaborate
            </p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => resolveInterest(interest!.id, "accepted")}
                className="btn-primary !px-3 !py-1.5 text-xs"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => resolveInterest(interest!.id, "declined")}
                className="btn-secondary !px-3 !py-1.5 text-xs"
              >
                Decline
              </button>
            </div>
          </div>
        ) : interest ? (
          <StatusBadge interest={interest} />
        ) : composing ? (
          <div className="flex flex-col gap-2">
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-atheo-line bg-atheo-white px-3 py-2 text-sm text-atheo-aubergine focus:border-atheo-coral focus:outline-none"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  expressInterest(brand.id, message);
                  setComposing(false);
                }}
                className="btn-primary inline-flex !px-3 !py-1.5 text-xs"
              >
                <Send className="mr-1.5 h-3.5 w-3.5" />
                Send
              </button>
              <button type="button" onClick={() => setComposing(false)} className="btn-secondary !px-3 !py-1.5 text-xs">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => setComposing(true)} className="btn-secondary w-full !py-2 text-sm">
            Express interest
          </button>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ interest }: { interest: Interest }) {
  if (interest.status === "pending") {
    return (
      <p className="flex items-center gap-1.5 text-sm font-medium text-atheo-aubergine-mute">
        <Clock className="h-4 w-4" />
        {interest.initiatedBy === "creator" ? "Pending reply…" : "Pending your response"}
      </p>
    );
  }
  if (interest.status === "accepted") {
    return (
      <p className="flex items-center gap-1.5 text-sm font-medium text-atheo-coral">
        <CheckCircle2 className="h-4 w-4" />
        Accepted — check Creative Space
      </p>
    );
  }
  return (
    <p className="flex items-center gap-1.5 text-sm font-medium text-atheo-aubergine-mute">
      <XCircle className="h-4 w-4" />
      Declined
    </p>
  );
}
