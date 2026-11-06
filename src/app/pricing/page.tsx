import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Section } from "@/components/layout/Section";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { BrandPlans } from "@/components/pricing/BrandPlans";
import { CreatorPlans } from "@/components/pricing/CreatorPlans";
import { FeeCalculator } from "@/components/pricing/FeeCalculator";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";

export const metadata: Metadata = { title: "Pricing — Atheo" };

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <Section tone="blush" className="pb-16 pt-16 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Pricing</p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-atheo-aubergine sm:text-4xl lg:text-5xl">
              Plans built for how partnerships actually work.
            </h1>
            <p className="mt-6 text-atheo-aubergine-soft">
              One transparent fee structure for brands and creators alike. Every deal — on every plan —
              still goes through the same Atheo Deal Desk review, agreement and payment verification
              before it activates.
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-atheo-coral">
              Proposed launch pricing · pending final approval
            </p>
          </div>
        </Section>

        <Section tone="white" className="py-16 md:py-24">
          <p className="eyebrow text-center">For Brands</p>
          <h2 className="mt-3 text-center font-display text-2xl font-bold text-atheo-aubergine sm:text-3xl">
            Pick a workspace that fits how you run campaigns.
          </h2>
          <div className="mt-12">
            <BrandPlans />
          </div>
        </Section>

        <Section tone="blush" className="py-16 md:py-24">
          <p className="eyebrow text-center">For Creators</p>
          <h2 className="mt-3 text-center font-display text-2xl font-bold text-atheo-aubergine sm:text-3xl">
            Two paths. Always free to join.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-atheo-aubergine-soft">
            No subscription, no minimum follower count. You only ever pay through the deals you do, and
            the brand covers Atheo&apos;s fee on top of your negotiated rate.
          </p>
          <div className="mx-auto mt-12 max-w-3xl">
            <CreatorPlans />
          </div>
        </Section>

        <Section tone="white" className="py-16 md:py-24">
          <p className="eyebrow text-center">Fee Calculator</p>
          <h2 className="mt-3 text-center font-display text-2xl font-bold text-atheo-aubergine sm:text-3xl">
            See exactly where the money goes.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-atheo-aubergine-soft">
            Move the slider or switch deal type — the breakdown updates live. Illustrative figures only.
          </p>
          <div className="mx-auto mt-12 max-w-3xl">
            <FeeCalculator />
          </div>
        </Section>

        <Section tone="blush" className="py-16 md:py-24">
          <p className="eyebrow text-center">FAQ</p>
          <h2 className="mt-3 text-center font-display text-2xl font-bold text-atheo-aubergine sm:text-3xl">
            Taxes, fees and payment cadence.
          </h2>
          <div className="mt-12">
            <PricingFAQ />
          </div>
        </Section>

        <FinalCTA />
      </main>
    </>
  );
}
