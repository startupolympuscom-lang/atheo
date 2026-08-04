import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { CreatorFrame } from "@/components/brand/CreatorFrame";
import { MomentumArc } from "@/components/brand/MomentumArc";
import { ContinuousPath } from "@/components/brand/ContinuousPath";
import { CREATOR_PORTRAITS } from "@/lib/creators";
import { SERVICE_MOMENTS } from "@/lib/data";
import { ROUTES, SECTION_IDS } from "@/lib/routes";

const PORTRAITS = [CREATOR_PORTRAITS.atelier1, CREATOR_PORTRAITS.atelier2, CREATOR_PORTRAITS.atelier3];

export function ForCreators() {
  return (
    <Section id={SECTION_IDS.forCreators} tone="white" className="py-24 md:py-32">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="eyebrow">For Creators</p>
          <h2 className="mt-4 max-w-lg font-display text-3xl font-bold leading-tight text-atheo-aubergine sm:text-4xl lg:text-5xl">
            Build a career, not a collection of deals.
          </h2>
          <p className="mt-6 max-w-md text-atheo-aubergine-soft">
            From first brief to long-term strategy, Atheo brings the business structure behind your
            creativity.
          </p>

          {/* Mobile / tablet: horizontal scroll-snap gallery */}
          <div className="mt-12 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 lg:hidden">
            {PORTRAITS.map((portrait, i) => (
              <div key={portrait.id} className="w-[68%] shrink-0 snap-center">
                <CreatorFrame
                  src={portrait.src}
                  alt={portrait.alt}
                  corner="tl"
                  className="aspect-[3/4]"
                  sizes="70vw"
                >
                  {i === 1 && <NextOpportunityBadge />}
                </CreatorFrame>
              </div>
            ))}
          </div>

          {/* Desktop: overlapping fanned portraits along the path */}
          <div className="relative mt-16 hidden pl-4 pb-10 lg:block">
            <ContinuousPath
              d="M 0 92 C 15 92, 20 70, 35 68 C 55 65, 60 92, 82 92"
              viewBox="0 0 100 100"
              className="pointer-events-none absolute -bottom-2 left-0 h-24 w-full"
              showTrack={false}
              strokeWidth={1.2}
            />
            <div className="flex items-end">
              <CreatorFrame
                src={PORTRAITS[0].src}
                alt={PORTRAITS[0].alt}
                corner="tl"
                peelTone="white"
                className="z-10 aspect-[3/4] w-[40%]"
                sizes="24vw"
              />
              <CreatorFrame
                src={PORTRAITS[1].src}
                alt={PORTRAITS[1].alt}
                corner="tl"
                peelTone="white"
                className="z-20 -ml-8 aspect-[3/4] w-[46%] -translate-y-6"
                sizes="28vw"
              >
                <NextOpportunityBadge />
              </CreatorFrame>
              <CreatorFrame
                src={PORTRAITS[2].src}
                alt={PORTRAITS[2].alt}
                corner="tl"
                peelTone="white"
                className="z-10 -ml-8 aspect-[3/4] w-[40%] translate-y-4"
                sizes="24vw"
              />
            </div>
          </div>
        </div>

        <div className="lg:pt-4">
          <MomentumArc
            orientation="vertical"
            items={SERVICE_MOMENTS.map((moment) => ({
              content: (
                <div key={moment.title}>
                  <p className="eyebrow">{moment.title}</p>
                  <p className="mt-1 text-atheo-aubergine-soft">{moment.description}</p>
                </div>
              ),
            }))}
          />

          <Link
            href={ROUTES.creatorsApply}
            className="mt-10 inline-flex items-center gap-2 font-display font-semibold text-atheo-coral transition-colors hover:text-atheo-aubergine"
          >
            Explore creator representation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

function NextOpportunityBadge() {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-2 rounded-full bg-atheo-white/95 px-3 py-2 text-xs shadow-[0_10px_30px_-15px_rgba(40,24,47,0.5)]">
      <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-atheo-coral to-atheo-apricot" />
      <span className="truncate font-display font-semibold text-atheo-aubergine">Next opportunity</span>
      <span className="truncate text-atheo-aubergine-mute">· In review</span>
    </div>
  );
}
