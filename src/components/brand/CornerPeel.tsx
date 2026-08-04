type Corner = "tl" | "tr" | "bl" | "br";

export interface CornerPeelProps {
  corner?: Corner;
  tone?: "white" | "blush" | "aubergine";
  size?: number;
  className?: string;
}

const CORNER_POSITION: Record<Corner, string> = {
  tl: "top-0 left-0",
  tr: "top-0 right-0",
  bl: "bottom-0 left-0",
  br: "bottom-0 right-0",
};

const CORNER_CLIP: Record<Corner, string> = {
  tl: "polygon(0% 0%, 100% 0%, 0% 100%)",
  tr: "polygon(100% 0%, 0% 0%, 100% 100%)",
  bl: "polygon(0% 100%, 0% 0%, 100% 100%)",
  br: "polygon(100% 100%, 100% 0%, 0% 100%)",
};

const CORNER_LINE_ANGLE: Record<Corner, number> = {
  tl: -45,
  br: -45,
  tr: 45,
  bl: 45,
};

const PEEL_TONE: Record<NonNullable<CornerPeelProps["tone"]>, string> = {
  white: "bg-atheo-white",
  blush: "bg-atheo-blush",
  aubergine: "bg-atheo-aubergine",
};

/**
 * The "opened corner" accent shared by CreatorFrame and any non-photo panel
 * that wants the same agreement-page-peeling-open geometry (the Transparency
 * frame, the For Brands teaser card). Parent must be `position: relative`.
 */
export function CornerPeel({ corner = "tl", tone = "white", size = 56, className = "" }: CornerPeelProps) {
  return (
    <div
      className={`pointer-events-none absolute z-10 ${CORNER_POSITION[corner]} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 ${PEEL_TONE[tone]}`}
        style={{
          clipPath: CORNER_CLIP[corner],
          filter: "drop-shadow(3px 4px 6px rgba(40,24,47,0.28))",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[2px] bg-gradient-to-r from-atheo-coral to-atheo-apricot"
        style={{
          width: size * 1.42,
          transform: `translate(-50%, -50%) rotate(${CORNER_LINE_ANGLE[corner]}deg)`,
        }}
      />
    </div>
  );
}
