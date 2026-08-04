import Link from "next/link";
import { ChevronDown, Check } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { CreatorFrame } from "@/components/brand/CreatorFrame";
import { MomentumArc } from "@/components/brand/MomentumArc";
import { CREATOR_PORTRAITS } from "@/lib/creators";
import { HERO_ANNOTATIONS, HERO_PARTNERSHIP, HERO_PROOF_LINE } from "@/lib/data";
import { ROUTES, SECTION_IDS } from "@/lib/routes";

export function Hero() {
  return (
    <Section id={SECTION_IDS.hero} tone="blush" className="overflow-hidden pb-24 pt-14 md:pb-32 md:pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-atheo-blush via-atheo-blush to-atheo-white" />

      <div className="hidden lg:flex absolute left-6 top-28 bottom-16 w-6 flex-col items-center gap-4 xl:left-10">
        <span className="h-2 w-2 shrink-0 rounded-full border-2 border-atheo-coral bg-atheo-white" />
        <div className="w-px flex-1 bg-atheo-line" />
        <span
          className="font-display text-[11px] font-semibold tracking-[0.28em] text-atheo-aubergine-mute"
          style={{ writingMode: "vertical-rl" }}
        >
          SCROLL TO FOLLOW THE PATH
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-atheo-aubergine-mute" aria-hidden="true" />
      </div>

      <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-8 lg:pl-10 xl:pl-16">
        <div className="max-w-xl">
          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-atheo-aubergine sm:text-5xl lg:text-6xl">
            Your talent deserves a <span className="text-gradient">business behind it.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-atheo-aubergine-soft sm:text-lg">
            Atheo handles the deals, strategy and operations behind your career—so you can focus on
            creating what moves people.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={ROUTES.creatorsApply} className="btn-primary">
              Join as a creator
            </Link>
            <Link href={ROUTES.brandsContact} className="btn-secondary">
              Partner with Atheo
            </Link>
          </div>

          <p className="mt-6 text-sm font-medium text-atheo-aubergine-mute">Creator-first. Transparent by design.</p>
        </div>

        <div className="relative mx-auto w-full max-w-md pb-16 lg:max-w-none lg:pb-24">
          <div className="lg:flex lg:items-start lg:gap-8">
            <div className="relative aspect-square w-full lg:flex-1">
              <CreatorFrame
                src={CREATOR_PORTRAITS.hero.src}
                alt={CREATOR_PORTRAITS.hero.alt}
                corner="tl"
                peelTone="blush"
                priority
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="h-full"
              >
                <div className="absolute -bottom-6 left-4 right-4 z-20 flex items-center justify-between gap-3 rounded-2xl bg-atheo-white/95 p-4 shadow-[0_20px_45px_-20px_rgba(40,24,47,0.4)] backdrop-blur sm:left-6 sm:right-8">
                  <div>
                    <p className="eyebrow">Partnership confirmed</p>
                    <p className="mt-1 font-display text-lg font-semibold text-atheo-aubergine">
                      {HERO_PARTNERSHIP.brand}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-atheo-blush text-atheo-coral">
                    <Check className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                </div>

                <div className="absolute -bottom-24 left-4 z-10 flex items-center gap-3 rounded-2xl border border-atheo-line bg-atheo-white/95 px-4 py-3 shadow-[0_20px_45px_-25px_rgba(40,24,47,0.35)] sm:-bottom-20 sm:left-6">
                  <span className="flex -space-x-2" aria-hidden="true">
                    {[CREATOR_PORTRAITS.atelier1, CREATOR_PORTRAITS.atelier2, CREATOR_PORTRAITS.atelier3].map((p) => (
                      <span
                        key={p.id}
                        className="h-7 w-7 overflow-hidden rounded-full border-2 border-atheo-white bg-atheo-blush"
                      >
                        {/* decorative avatar swatch, gradient stand-in for tiny thumbnails */}
                        <span className="block h-full w-full bg-gradient-to-br from-atheo-coral/70 to-atheo-apricot/70" />
                      </span>
                    ))}
                  </span>
                  <p className="font-display text-sm font-semibold text-atheo-aubergine">{HERO_PROOF_LINE}</p>
                </div>
              </CreatorFrame>
            </div>

            <div className="hidden w-40 shrink-0 pt-10 lg:block xl:w-48">
              <MomentumArc
                orientation="vertical"
                items={HERO_ANNOTATIONS.map((label) => ({
                  content: (
                    <p key={label} className="font-display text-sm font-semibold text-atheo-aubergine">
                      {label}
                    </p>
                  ),
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
