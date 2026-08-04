import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { CreatorFrame } from "@/components/brand/CreatorFrame";
import { CornerPeel } from "@/components/brand/CornerPeel";
import { ContinuousPath } from "@/components/brand/ContinuousPath";
import { CREATOR_PORTRAITS } from "@/lib/creators";
import { BRAND_CREATOR_TAGS, CAMPAIGN_PATH } from "@/lib/data";
import { ROUTES, SECTION_IDS } from "@/lib/routes";

export function ForBrands() {
  return (
    <Section
      id={SECTION_IDS.forBrands}
      tone="aubergine"
      className="-mt-8 overflow-hidden rounded-t-[3rem] py-24 md:-mt-14 md:rounded-t-[4.5rem] md:py-32"
    >
      <CornerPeel corner="tl" tone="white" size={96} />

      <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="eyebrow-onDark">For Brands</p>
          <h2 className="mt-4 max-w-lg font-display text-3xl font-bold leading-tight text-atheo-white sm:text-4xl lg:text-5xl">
            The right creator changes everything.
          </h2>
          <p className="mt-6 max-w-md text-atheo-white/70">
            Curated talent, thoughtful matching and reliable campaign execution—from first conversation
            to final delivery.
          </p>

          <div className="mt-10">
            <p className="eyebrow-onDark">Campaign Path</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 font-display font-semibold text-atheo-white">
              {CAMPAIGN_PATH.map((step, i) => (
                <span key={step} className="flex items-center gap-3">
                  {i > 0 && (
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-atheo-coral to-atheo-apricot"
                      aria-hidden="true"
                    />
                  )}
                  {step}
                </span>
              ))}
            </div>
          </div>

          <Link href={ROUTES.brandsContact} className="btn-primary mt-10">
            Start a partnership
          </Link>

          <p className="mt-6 max-w-sm text-sm text-atheo-white/50">
            Trusted on campaigns with Estée Lauder, Hacoo and Dieti Natura.
          </p>
        </div>

        <div className="relative">
          <ContinuousPath
            d="M 25 22 C 45 30, 40 45, 62 45 C 30 55, 45 68, 25 78 C 55 62, 60 78, 68 88"
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 h-full w-full"
            onDark
            showTrack
          />
          <div className="relative grid grid-cols-2 gap-4 sm:gap-6">
            {BRAND_CREATOR_TAGS.map(({ creatorId, tag }, i) => {
              const portrait = CREATOR_PORTRAITS[creatorId];
              return (
                <div key={creatorId} className={i % 2 === 1 ? "mt-10 sm:mt-14" : ""}>
                  <CreatorFrame
                    src={portrait.src}
                    alt={portrait.alt}
                    corner={i % 2 === 0 ? "tl" : "tr"}
                    peelTone="aubergine"
                    className="aspect-[3/4]"
                    sizes="(min-width: 1024px) 22vw, 44vw"
                  >
                    <span className="absolute right-3 top-3 z-20 rounded-full bg-atheo-white/90 px-3 py-1 font-display text-[11px] font-semibold tracking-wide text-atheo-aubergine">
                      {tag}
                    </span>
                  </CreatorFrame>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
