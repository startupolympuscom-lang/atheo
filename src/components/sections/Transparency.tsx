import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { MomentumArc } from "@/components/brand/MomentumArc";
import { CornerPeel } from "@/components/brand/CornerPeel";
import { TRANSPARENCY_PRINCIPLES } from "@/lib/data";
import { ROUTES } from "@/lib/routes";

export function Transparency() {
  return (
    <Section tone="white" className="py-24 md:py-32">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-atheo-line bg-atheo-blush/50 p-8 shadow-[0_40px_90px_-55px_rgba(40,24,47,0.4)] sm:p-12 lg:p-16">
        <CornerPeel corner="tr" tone="white" size={80} />

        <p className="eyebrow">The Open-Book Standard</p>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight text-atheo-aubergine sm:text-4xl lg:text-5xl">
          No hidden terms. No black box.
        </h2>
        <p className="mt-6 max-w-md text-atheo-aubergine-soft">
          Creators see the opportunity, the economics and the process—clearly, from the first message
          to final payment.
        </p>

        <MomentumArc
          className="mt-14 max-w-2xl"
          items={TRANSPARENCY_PRINCIPLES.map((principle) => ({
            content: (
              <div key={principle.title}>
                <p className="eyebrow">{principle.title}</p>
                <p className="mt-2 text-sm text-atheo-aubergine-soft">{principle.description}</p>
              </div>
            ),
          }))}
        />

        <Link
          href={ROUTES.creatorsApply}
          className="mt-12 inline-flex items-center gap-2 font-display font-semibold text-atheo-coral transition-colors hover:text-atheo-aubergine"
        >
          Read our creator promise <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
