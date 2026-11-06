import { PRICING_FAQ } from "@/lib/pricing-data";

export function PricingFAQ() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3">
      {PRICING_FAQ.map((item) => (
        <details
          key={item.q}
          className="group rounded-2xl border border-atheo-line bg-atheo-white p-5 open:border-atheo-coral/40"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-sm font-semibold text-atheo-aubergine marker:content-none">
            {item.q}
            <span className="shrink-0 text-atheo-coral transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm text-atheo-aubergine-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
