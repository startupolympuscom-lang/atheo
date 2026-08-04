import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { CornerPeel } from "@/components/brand/CornerPeel";
import { ContinuousPath } from "@/components/brand/ContinuousPath";
import { AtheoLogo } from "@/components/brand/AtheoLogo";
import { Footer } from "@/components/layout/Footer";
import { ROUTES } from "@/lib/routes";

export function FinalCTA() {
  return (
    <Section
      tone="aubergine"
      className="-mt-8 overflow-hidden rounded-t-[3rem] pb-10 pt-24 md:-mt-14 md:rounded-t-[4.5rem] md:pt-32"
    >
      <CornerPeel corner="tl" tone="white" size={96} />

      <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <h2 className="font-display text-3xl font-bold leading-tight text-atheo-white sm:text-4xl lg:text-5xl">
            Your next chapter starts here.
          </h2>
          <p className="mt-6 max-w-md text-atheo-white/70">
            Whether you create culture or build the brands shaping it, Atheo helps move the
            partnership forward.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={ROUTES.creatorsApply} className="btn-primary">
              Join as a creator
            </Link>
            <Link href={ROUTES.brandsContact} className="btn-secondary btn-secondary-onDark">
              Partner with Atheo
            </Link>
          </div>
          <p className="mt-6 text-sm font-medium text-atheo-white/50">
            Creator-first. Transparent by design.
          </p>
        </div>

        <div className="relative flex h-40 items-center justify-center lg:h-full lg:justify-end">
          <ContinuousPath
            d="M 0 80 C 25 80, 30 40, 55 35 C 75 31, 78 20, 85 15"
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 h-full w-full"
            onDark
          />
          <AtheoLogo variant="light" size={40} className="relative z-10 scale-125 lg:scale-150" />
        </div>
      </div>

      <div className="relative mt-20 md:mt-24">
        <Footer />
      </div>
    </Section>
  );
}
