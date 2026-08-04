import { Section } from "@/components/layout/Section";
import { MomentumArc } from "@/components/brand/MomentumArc";
import { PROOF_POINTS, TRUSTED_BRANDS } from "@/lib/data";

export function Traction() {
  return (
    <Section tone="blush" className="py-24 md:py-32">
      <p className="eyebrow">Proof, Not Promises</p>
      <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-atheo-aubergine sm:text-4xl lg:text-5xl">
        Built with creators. Validated in the real world.
      </h2>

      <MomentumArc
        className="mt-16"
        items={PROOF_POINTS.map((point, i) => ({
          content: (
            <div key={point.label}>
              <p
                className={`font-display text-2xl font-bold sm:text-3xl ${
                  i === 0 ? "text-atheo-coral" : "text-atheo-aubergine"
                }`}
              >
                {point.value}
              </p>
              <p className="eyebrow mt-2 !text-atheo-aubergine-mute">{point.label}</p>
            </div>
          ),
        }))}
      />

      <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-atheo-hairline pt-10">
        {TRUSTED_BRANDS.map((brand, i) => (
          <span key={brand} className="flex items-center gap-x-8">
            {i > 0 && <span className="hidden h-6 w-px bg-atheo-line sm:block" aria-hidden="true" />}
            <span className="font-display text-xl font-semibold tracking-tight text-atheo-aubergine sm:text-2xl">
              {brand}
            </span>
          </span>
        ))}
      </div>
      <p className="mt-6 max-w-md text-sm text-atheo-aubergine-mute">
        Partnership experience across beauty, lifestyle and commerce.
      </p>
    </Section>
  );
}
