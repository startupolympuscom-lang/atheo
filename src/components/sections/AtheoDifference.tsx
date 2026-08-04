import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { MomentumArc } from "@/components/brand/MomentumArc";
import { CornerPeel } from "@/components/brand/CornerPeel";
import { CAREER_JOURNEY } from "@/lib/data";
import { SECTION_IDS } from "@/lib/routes";

export function AtheoDifference() {
  return (
    <Section id={SECTION_IDS.approach} tone="blush" className="py-24 md:py-32">
      <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
        <div>
          <p className="eyebrow">The Atheo Difference</p>
          <h2 className="mt-4 max-w-lg font-display text-3xl font-bold leading-tight text-atheo-aubergine sm:text-4xl lg:text-5xl">
            Representation is only the beginning.
          </h2>

          <MomentumArc
            className="mt-16"
            items={CAREER_JOURNEY.map((step) => ({
              content: (
                <div key={step.index}>
                  <p className="font-display text-2xl font-bold text-atheo-coral">{step.index}</p>
                  <p className="mt-1 font-display font-semibold text-atheo-aubergine">{step.label}</p>
                </div>
              ),
            }))}
          />

          <p className="mt-10 max-w-md text-atheo-aubergine-soft">
            One trusted partner across every stage of a creator&rsquo;s career.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-atheo-aubergine p-8 text-atheo-white shadow-[0_40px_80px_-40px_rgba(40,24,47,0.55)] sm:p-10 lg:mt-4">
          <CornerPeel corner="tl" tone="blush" />
          <p className="eyebrow-onDark">For Brands</p>
          <h3 className="mt-4 font-display text-2xl font-bold leading-snug sm:text-3xl">
            Authentic talent. Reliable execution.
          </h3>
          <Link
            href={`#${SECTION_IDS.forBrands}`}
            className="mt-8 inline-flex items-center gap-2 font-display font-semibold text-atheo-apricot transition-colors hover:text-atheo-white"
          >
            Discover partnerships <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
