import Image from "next/image";
import type { ReactNode } from "react";
import { CornerPeel } from "./CornerPeel";

type Corner = "tl" | "tr" | "bl" | "br";

interface CreatorFrameProps {
  src: string;
  alt: string;
  corner?: Corner;
  /** Matches whatever sits behind the frame, so the "peel" reads as a cut-away rather than a patch. */
  peelTone?: "white" | "blush" | "aubergine";
  rounded?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  peelSize?: number;
  children?: ReactNode;
}

/**
 * The Atheo "creator frame": an editorial portrait card with one corner cut
 * away on a diagonal, as if the page behind it is showing through — the
 * visual seam where the Creator's Path emerges from or resolves into the
 * portrait. The cut itself is CSS clip-path (see CornerPeel), no raster
 * overlay.
 *
 * Parent controls size/aspect ratio (e.g. `aspect-[4/5] w-full`).
 */
export function CreatorFrame({
  src,
  alt,
  corner = "tl",
  peelTone = "white",
  rounded = "rounded-[2rem]",
  className = "",
  imageClassName = "",
  sizes = "(min-width: 1024px) 40vw, 90vw",
  priority = false,
  peelSize = 56,
  children,
}: CreatorFrameProps) {
  return (
    <div className={`relative ${rounded} ${className}`}>
      <div
        className={`relative h-full w-full overflow-hidden ${rounded} border border-atheo-line shadow-[0_30px_60px_-30px_rgba(40,24,47,0.35)]`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imageClassName}`}
        />
      </div>

      <CornerPeel corner={corner} tone={peelTone} size={peelSize} />

      {children}
    </div>
  );
}
