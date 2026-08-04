"use client";

import { useId, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One segment of the site-wide "Creator's Path". Each section renders its
 * own small ContinuousPath rather than one giant document-spanning SVG, so
 * segments stay cheap to lay out and never fight page reflow. Visually they
 * read as a single line because consecutive segments share position,
 * stroke weight and gradient.
 *
 * The track (faint, always-visible line) sits behind a gradient stroke that
 * draws in via stroke-dashoffset as the segment's section scrolls into view.
 * `prefers-reduced-motion` skips the animation and shows the finished line.
 */
export interface PathNode {
  x: number;
  y: number;
}

interface ContinuousPathProps {
  d: string;
  viewBox?: string;
  className?: string;
  onDark?: boolean;
  start?: string;
  end?: string;
  scrub?: boolean;
  nodes?: PathNode[];
  showTrack?: boolean;
  strokeWidth?: number;
}

export function ContinuousPath({
  d,
  viewBox = "0 0 100 100",
  className = "",
  onDark = false,
  start = "top 88%",
  end = "bottom 60%",
  scrub = true,
  nodes = [],
  showTrack = true,
  strokeWidth = 1.5,
}: ContinuousPathProps) {
  const rawId = useId();
  const gradientId = `path-gradient-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<SVGGElement>(null);

  useLayoutEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const length = path.getTotalLength();
    const dots = nodesRef.current ? Array.from(nodesRef.current.children) : [];

    if (reduceMotion) {
      path.style.strokeDasharray = "none";
      path.style.strokeDashoffset = "0";
      dots.forEach((dot) => ((dot as SVGElement).style.opacity = "1"));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    dots.forEach((dot) => ((dot as SVGElement).style.opacity = "0"));

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: svg,
          start,
          end,
          scrub: scrub ? 0.6 : false,
          toggleActions: scrub ? undefined : "play none none reverse",
        },
      });

      if (dots.length) {
        gsap.to(dots, {
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: svg,
            start,
            toggleActions: "play none none reverse",
          },
        });
      }
    }, svg);

    return () => ctx.revert();
  }, [d, start, end, scrub, nodes.length]);

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--atheo-coral)" />
          <stop offset="100%" stopColor="var(--atheo-apricot)" />
        </linearGradient>
      </defs>
      {showTrack && (
        <path d={d} className={`path-line ${onDark ? "path-track-onDark" : "path-track"}`} />
      )}
      <path
        ref={pathRef}
        d={d}
        className="path-line"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        fill="none"
      />
      {nodes.length > 0 && (
        <g ref={nodesRef}>
          {nodes.map((node, i) => (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r={3.2}
              className={onDark ? "node-dot-onDark" : "node-dot"}
            />
          ))}
        </g>
      )}
    </svg>
  );
}
