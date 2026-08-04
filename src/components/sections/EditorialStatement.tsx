import { Section } from "@/components/layout/Section";
import { ContinuousPath } from "@/components/brand/ContinuousPath";

export function EditorialStatement() {
  return (
    <Section tone="white" className="overflow-hidden py-20 md:py-28">
      <ContinuousPath
        d="M 50 0 L 50 100"
        viewBox="0 0 100 100"
        className="pointer-events-none absolute left-6 top-0 hidden h-full w-4 md:block xl:left-10"
        showTrack
      />
      <p className="mx-auto max-w-4xl text-center font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        <span className="text-atheo-aubergine">Create freely. We&rsquo;ll </span>
        <span className="text-gradient">handle the complexity.</span>
      </p>
    </Section>
  );
}
