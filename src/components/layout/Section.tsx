import type { ElementType, ReactNode } from "react";

type Tone = "white" | "blush" | "aubergine";

interface SectionProps {
  id?: string;
  tone?: Tone;
  as?: ElementType;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

const TONE_CLASSES: Record<Tone, string> = {
  white: "bg-atheo-white text-atheo-aubergine",
  blush: "bg-atheo-blush text-atheo-aubergine",
  aubergine: "bg-atheo-aubergine text-atheo-white",
};

/** Shared full-bleed section shell with a constrained, padded content column. */
export function Section({
  id,
  tone = "white",
  as: Component = "section",
  className = "",
  innerClassName = "",
  children,
}: SectionProps) {
  return (
    <Component id={id} className={`relative ${TONE_CLASSES[tone]} ${className}`}>
      <div className={`mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16 ${innerClassName}`}>{children}</div>
    </Component>
  );
}
