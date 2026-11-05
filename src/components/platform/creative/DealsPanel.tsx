"use client";

import { useEffect, useRef, useState } from "react";
import { Send, MessageCircle, Clock3, CheckCircle2, Receipt } from "lucide-react";
import { usePlatform } from "@/lib/platform/store";
import { formatUntil, formatRelativeTime } from "@/lib/platform/format";
import { StarRating } from "@/components/platform/StarRating";
import type { Brand, BrandDeal } from "@/lib/platform/types";

const STATUS_LABEL: Record<string, string> = {
  offered: "Offered",
  in_progress: "In progress",
  completed: "Completed",
};

export function DealsPanel() {
  const { state } = usePlatform();

  if (state.deals.length === 0) {
    return (
      <p className="rounded-2xl border border-atheo-line bg-atheo-white px-5 py-8 text-center text-sm text-atheo-aubergine-mute">
        No deals yet — accept a brand&apos;s interest from the Brands page to see deliverables here.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {state.deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} brand={state.brands.find((b) => b.id === deal.brandId)} />
      ))}
    </div>
  );
}

function DealCard({ deal, brand }: { deal: BrandDeal; brand?: Brand }) {
  const { toggleDeliverable, sendDealMessage, markDealInvoiced } = usePlatform();
  const [showMessages, setShowMessages] = useState(false);
  const [draft, setDraft] = useState("");
  const threadRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!showMessages) return;
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [showMessages, deal.messages.length]);

  const done = deal.deliverables.filter((d) => d.done).length;
  const progress = Math.round((done / deal.deliverables.length) * 100);

  function handleSend() {
    if (!draft.trim()) return;
    sendDealMessage(deal.id, draft.trim());
    setDraft("");
  }

  return (
    <div className="rounded-2xl border border-atheo-line bg-atheo-white p-5">
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

      {deal.amount > 0 && (
        <div className="mt-4">
          {deal.paymentStatus === "unbilled" && deal.status === "completed" && (
            <button
              type="button"
              onClick={() => markDealInvoiced(deal.id)}
              className="btn-secondary inline-flex w-full items-center justify-center !py-2 text-xs"
            >
              <Receipt className="mr-1.5 h-3.5 w-3.5" />
              Send invoice · ${deal.amount.toLocaleString()}
            </button>
          )}
          {deal.paymentStatus === "unbilled" && deal.status !== "completed" && (
            <p className="flex items-center gap-1.5 text-xs text-atheo-aubergine-mute">
              <Receipt className="h-3.5 w-3.5" />
              Invoice available once all deliverables are done.
            </p>
          )}
          {deal.paymentStatus === "invoiced" && (
            <p className="flex items-center gap-1.5 rounded-xl bg-atheo-blush/50 px-3 py-2 text-xs font-medium text-atheo-aubergine">
              <Clock3 className="h-3.5 w-3.5" />
              Invoice sent · ${deal.amount.toLocaleString()} awaiting payment
            </p>
          )}
          {deal.paymentStatus === "paid" && (
            <p className="flex items-center gap-1.5 rounded-xl bg-atheo-coral/10 px-3 py-2 text-xs font-semibold text-atheo-coral">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Paid · ${deal.amount.toLocaleString()}
            </p>
          )}
        </div>
      )}

      <div className="mt-4 border-t border-atheo-hairline pt-3">
        <button
          type="button"
          onClick={() => setShowMessages((v) => !v)}
          className="flex items-center gap-1.5 text-xs font-medium text-atheo-aubergine-soft hover:text-atheo-coral"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Messages {deal.messages.length > 0 && `(${deal.messages.length})`}
        </button>

        {showMessages && (
          <div className="mt-3">
            {deal.messages.length > 0 && (
              <ul ref={threadRef} className="flex max-h-48 flex-col gap-2 overflow-y-auto pr-1">
                {deal.messages.map((m) => (
                  <li key={m.id} className={`flex ${m.sender === "creator" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-xs ${
                        m.sender === "creator" ? "bg-atheo-coral text-atheo-white" : "bg-atheo-blush text-atheo-aubergine"
                      }`}
                    >
                      <p>{m.text}</p>
                      <p
                        className={`mt-1 text-[10px] ${m.sender === "creator" ? "text-atheo-white/70" : "text-atheo-aubergine-mute"}`}
                      >
                        {formatRelativeTime(m.sentAt)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder={`Message ${brand?.name ?? "the brand"}…`}
                className="min-w-0 flex-1 rounded-xl border border-atheo-line bg-atheo-white px-3 py-2 text-xs text-atheo-aubergine placeholder:text-atheo-aubergine-mute focus:border-atheo-coral focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSend}
                aria-label="Send message"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-atheo-coral text-atheo-white hover:bg-atheo-aubergine"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
