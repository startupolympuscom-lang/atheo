"use client";

import { usePlatform } from "@/lib/platform/store";
import { formatUntil } from "@/lib/platform/format";
import { StarRating } from "@/components/platform/StarRating";

const STATUS_LABEL: Record<string, string> = {
  offered: "Offered",
  in_progress: "In progress",
  completed: "Completed",
};

export function DealsPanel() {
  const { state, toggleDeliverable } = usePlatform();

  if (state.deals.length === 0) {
    return (
      <p className="rounded-2xl border border-atheo-line bg-atheo-white px-5 py-8 text-center text-sm text-atheo-aubergine-mute">
        No deals yet — accept a brand&apos;s interest from the Brands page to see deliverables here.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {state.deals.map((deal) => {
        const brand = state.brands.find((b) => b.id === deal.brandId);
        const done = deal.deliverables.filter((d) => d.done).length;
        const progress = Math.round((done / deal.deliverables.length) * 100);

        return (
          <div key={deal.id} className="rounded-2xl border border-atheo-line bg-atheo-white p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-atheo-coral">{brand?.name}</p>
                <p className="mt-0.5 font-display text-sm font-semibold text-atheo-aubergine">{deal.title}</p>
              </div>
              <span className="shrink-0 rounded-full border border-atheo-line px-2.5 py-0.5 text-xs font-medium text-atheo-aubergine-mute">
                {STATUS_LABEL[deal.status]}
              </span>
            </div>

            <p className="mt-3 text-sm text-atheo-aubergine-soft">{deal.compensation}</p>
            <p className="mt-1 text-xs text-atheo-aubergine-mute">Due {formatUntil(deal.deadline)}</p>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-atheo-blush">
              <div className="h-full rounded-full bg-gradient-to-r from-atheo-coral to-atheo-apricot" style={{ width: `${progress}%` }} />
            </div>

            <ul className="mt-4 flex flex-col gap-2">
              {deal.deliverables.map((item, i) => (
                <li key={i}>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => toggleDeliverable(deal.id, i)}
                      className="h-4 w-4 accent-[color:var(--atheo-coral)]"
                    />
                    <span className={item.done ? "text-atheo-aubergine-mute line-through" : "text-atheo-aubergine"}>
                      {item.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>

            {deal.rating && (
              <div className="mt-4 rounded-xl bg-atheo-blush/50 p-3">
                <div className="flex items-center justify-between">
                  <StarRating value={deal.rating.stars} size={14} />
                  <span className="text-[11px] font-medium uppercase tracking-wide text-atheo-aubergine-mute">
                    {deal.rating.stage === "mid" ? "Mid-deal check-in" : "Final review"}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-atheo-aubergine-soft">&ldquo;{deal.rating.review}&rdquo;</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
