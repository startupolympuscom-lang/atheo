"use client";

import { useMemo, useState } from "react";

const PROCESSING_RATE = 0.029;
const PROCESSING_FIXED = 0.3;

function formatGBP(value: number) {
  return value.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });
}

export function FeeCalculator() {
  const [amount, setAmount] = useState(1000);
  const [represented, setRepresented] = useState(false);

  const { atheoFee, processing, brandTotal } = useMemo(() => {
    const feeRate = represented ? 0.2 : 0.1;
    const fee = amount * feeRate;
    const proc = amount * PROCESSING_RATE + PROCESSING_FIXED;
    return { atheoFee: fee, processing: proc, brandTotal: amount + fee + proc };
  }, [amount, represented]);

  return (
    <div className="rounded-[2rem] border border-atheo-line bg-atheo-white p-7 sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <label className="block text-left">
            <span className="mb-2 block text-xs font-medium text-atheo-aubergine-mute">
              Negotiated creator compensation
            </span>
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl font-bold text-atheo-aubergine">£</span>
              <input
                type="number"
                min={0}
                step={50}
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
                className="w-full rounded-xl border border-atheo-line bg-atheo-white px-4 py-2.5 font-display text-2xl font-bold text-atheo-aubergine focus:border-atheo-coral focus:outline-none"
              />
            </div>
            <input
              type="range"
              min={100}
              max={20000}
              step={50}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-4 w-full accent-[color:var(--atheo-coral)]"
            />
          </label>

          <div className="mt-6">
            <span className="mb-2 block text-xs font-medium text-atheo-aubergine-mute">Deal type</span>
            <div className="inline-flex items-center gap-1 rounded-full border border-atheo-line bg-atheo-white p-1">
              <button
                type="button"
                onClick={() => setRepresented(false)}
                className={`rounded-full px-4 py-2 font-display text-sm font-semibold transition-colors ${
                  !represented ? "bg-atheo-blush text-atheo-coral" : "text-atheo-aubergine-mute"
                }`}
              >
                Independent · 10%
              </button>
              <button
                type="button"
                onClick={() => setRepresented(true)}
                className={`rounded-full px-4 py-2 font-display text-sm font-semibold transition-colors ${
                  represented ? "bg-atheo-blush text-atheo-coral" : "text-atheo-aubergine-mute"
                }`}
              >
                Represented · 20%
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-atheo-blush/50 p-6">
          <div className="flex flex-col gap-3">
            <Row label="Creator compensation" value={formatGBP(amount)} />
            <Row label={`Atheo fee (${represented ? "20" : "10"}%, brand-paid)`} value={formatGBP(atheoFee)} />
            <Row label="Est. tax & processing*" value={formatGBP(processing)} />
            <div className="my-1 border-t border-atheo-line" />
            <Row label="Brand pays in total" value={formatGBP(brandTotal)} strong />
            <Row label="Creator receives" value={formatGBP(amount)} strong accent />
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-atheo-aubergine-mute">
        *Illustrative estimate only — actual payment-processing and tax charges depend on your provider,
        country and campaign, and are confirmed before payment. Figures above exclude any applicable VAT.
        All numbers on this page are proposed launch terms, not live billing.
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
  accent,
}: {
  label: string;
  value: string;
  strong?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={`text-sm ${strong ? "font-semibold text-atheo-aubergine" : "text-atheo-aubergine-soft"}`}>
        {label}
      </span>
      <span
        className={`font-display text-sm font-bold ${accent ? "text-atheo-coral" : "text-atheo-aubergine"} ${
          strong ? "text-base" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
