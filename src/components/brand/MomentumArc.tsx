import { Fragment, type CSSProperties, type ReactNode } from "react";
import { ContinuousPath } from "./ContinuousPath";

export interface MomentumArcItem {
  content: ReactNode;
  marker?: ReactNode;
}

interface MomentumArcProps {
  items: MomentumArcItem[];
  orientation?: "horizontal" | "vertical";
  onDark?: boolean;
  className?: string;
}

/**
 * A short stretch of the Creator's Path used to connect a row (or column)
 * of related moments — proof stats, career stages, service moments,
 * ecosystem nodes. The line is a ContinuousPath segment; markers are plain
 * HTML so they stay perfectly round regardless of the segment's aspect
 * ratio.
 */
export function MomentumArc({ items, orientation = "horizontal", onDark = false, className = "" }: MomentumArcProps) {
  const n = items.length;

  if (orientation === "horizontal") {
    return (
      <div className={className}>
        <div className="relative h-9 md:h-11">
          <ContinuousPath
            d="M 0 10 L 100 10"
            viewBox="0 0 100 20"
            className="absolute inset-0 h-full w-full"
            onDark={onDark}
          />
          <div className="absolute inset-0 flex items-center">
            {items.map((item, i) => (
              <span key={i} className="flex flex-1 items-center justify-center first:justify-start last:justify-end">
                {item.marker ?? <Dot onDark={onDark} />}
              </span>
            ))}
          </div>
        </div>
        <div
          className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:[grid-template-columns:repeat(var(--marc-cols),minmax(0,1fr))]"
          style={{ "--marc-cols": n } as CSSProperties}
        >
          {items.map((item, i) => (
            <div key={i}>{item.content}</div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative grid grid-cols-[20px_1fr] gap-x-5 gap-y-8 ${className}`}>
      <ContinuousPath
        d="M 10 0 L 10 100"
        viewBox="0 0 20 100"
        className="absolute left-0 top-1 h-[calc(100%-1.5rem)] w-5"
        onDark={onDark}
      />
      {items.map((item, i) => (
        <Fragment key={i}>
          <div className="relative z-10 flex justify-center pt-1">{item.marker ?? <Dot onDark={onDark} />}</div>
          <div className="relative z-10">{item.content}</div>
        </Fragment>
      ))}
    </div>
  );
}

function Dot({ onDark }: { onDark?: boolean }) {
  return (
    <span
      className={`block h-3 w-3 rounded-full border-2 ${
        onDark ? "border-atheo-apricot bg-atheo-aubergine" : "border-atheo-coral bg-atheo-white"
      }`}
    />
  );
}
