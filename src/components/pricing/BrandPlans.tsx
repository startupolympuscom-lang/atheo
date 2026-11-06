"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { BRAND_PLANS, COMPARISON_FEATURES } from "@/lib/pricing-data";
import { ROUTES } from "@/lib/routes";

function formatGBP(value: number) {
  return `£${value.toLocaleString("en-GB")}`;
}

export function BrandPlans() {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-atheo-line bg-atheo-white p-1">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-2 font-display text-sm font-semibold transition-colors ${
              !annual ? "bg-atheo-blush text-atheo-coral" : "text-atheo-aubergine-mute"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-semibold transition-colors ${
              annual ? "bg-atheo-blush text-atheo-coral" : "text-atheo-aubergine-mute"
            }`}
          >
            Annual
            <span className="rounded-full bg-atheo-aubergine px-2 py-0.5 text-[10px] font-semibold text-atheo-white">
              Save ~17%
            </span>
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-4">
        {BRAND_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-[2rem] border bg-atheo-white p-7 ${
              plan.highlighted
                ? "border-atheo-coral shadow-[0_30px_70px_-40px_rgba(255,69,80,0.45)]"
                : "border-atheo-line"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-atheo-coral px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-wide text-atheo-white">
                Most popular
              </span>
            )}

            <p className="font-display text-lg font-bold text-atheo-aubergine">{plan.name}</p>
            <p className="mt-1.5 text-sm text-atheo-aubergine-soft">{plan.tagline}</p>

            <div className="mt-6">
              {plan.custom ? (
                <>
                  <p className="font-display text-3xl font-bold text-atheo-aubergine">From £899</p>
                  <p className="mt-1 text-xs text-atheo-aubergine-mute">Custom quote required</p>
                </>
              ) : plan.monthly === 0 ? (
                <>
                  <p className="font-display text-3xl font-bold text-atheo-aubergine">£0</p>
                  <p className="mt-1 text-xs text-atheo-aubergine-mute">Free, always</p>
                </>
              ) : (
                <>
                  <p className="font-display text-3xl font-bold text-atheo-aubergine">
                    {formatGBP(annual ? Math.round((plan.annual ?? 0) / 12) : (plan.monthly ?? 0))}
                    <span className="text-base font-medium text-atheo-aubergine-mute">/mo</span>
                  </p>
                  <p className="mt-1 text-xs text-atheo-aubergine-mute">
                    {annual ? `${formatGBP(plan.annual ?? 0)} billed annually` : "Billed monthly"}
                  </p>
                </>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t border-atheo-hairline pt-4 text-xs text-atheo-aubergine-mute">
              <span>{plan.seats}</span>
              <span>·</span>
              <span>{plan.campaigns}</span>
              <span>·</span>
              <span>{plan.shortlist} shortlist</span>
            </div>

            <ul className="mt-5 flex flex-1 flex-col gap-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-atheo-aubergine-soft">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-atheo-coral" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href={ROUTES.brandsContact}
              className={`mt-7 w-full text-center ${plan.highlighted ? "btn-primary" : "btn-secondary"}`}
            >
              {plan.custom ? "Talk to sales" : "Get started"}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-atheo-aubergine-mute">
        Prices shown exclude VAT/tax, campaign compensation, Atheo deal fees, and separately disclosed
        payment-processing charges. Proposed launch pricing, pending final approval.
      </p>

      <div className="mt-16 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-b border-atheo-line py-3 pr-4 text-left font-display text-sm font-semibold text-atheo-aubergine">
                Compare plans
              </th>
              {BRAND_PLANS.map((plan) => (
                <th
                  key={plan.id}
                  className="border-b border-atheo-line px-4 py-3 text-left font-display text-sm font-semibold text-atheo-aubergine"
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_FEATURES.map((row) => (
              <tr key={row.label} className="border-b border-atheo-hairline">
                <td className="py-3 pr-4 text-atheo-aubergine-soft">{row.label}</td>
                {row.values.map((value, i) => (
                  <td key={i} className="px-4 py-3">
                    {typeof value === "boolean" ? (
                      value ? (
                        <Check className="h-4 w-4 text-atheo-coral" />
                      ) : (
                        <Minus className="h-4 w-4 text-atheo-aubergine-mute/50" />
                      )
                    ) : (
                      <span className="text-atheo-aubergine-soft">{value}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-atheo-aubergine-mute">*Unlimited shortlisting is subject to fair use.</p>
      </div>
    </div>
  );
}
