// Generates abstract, on-brand duotone "editorial portrait" placeholders.
// These stand in for real creator photography until real assets are dropped
// into public/creators (see src/lib/creators.ts for the swap-in map).
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "creators");

/**
 * One continuous line-art bust silhouette, drawn as a single stroked path so
 * it echoes the "continuous path" motif used across the site.
 */
function bustPath(seed) {
  const tilt = seed % 2 === 0 ? 1 : -1;
  const jaw = 150 + (seed % 4) * 6;
  return `M ${140 - tilt * 8} 210
    C ${120 - tilt * 10} 170, ${132 - tilt * 6} 118, ${200} 112
    C ${268 + tilt * 6} 118, ${280 + tilt * 10} 170, ${260 + tilt * 8} 210
    C ${256 + tilt * 8} 230, ${jaw} 246, 200 250
    C ${jaw} 246, ${144 - tilt * 8} 230, ${140 - tilt * 8} 210 Z
    M 200 250
    C 150 260, 92 288, 78 340
    L 78 430
    C 78 430, 200 452, 322 430
    L 322 340
    C 308 288, 250 260, 200 250 Z`;
}

const palettes = [
  { bg: ["#FFF3EE", "#FCEAE2"], line: "#28182F", accentFrom: "#FF4550", accentTo: "#FF9A45" },
  { bg: ["#FFF0EC", "#FFE3D8"], line: "#28182F", accentFrom: "#FF9A45", accentTo: "#FF4550" },
  { bg: ["#FBEFEC", "#F3DED8"], line: "#28182F", accentFrom: "#FF4550", accentTo: "#FF9A45" },
];

const creators = [
  { file: "creator-hero.svg", seed: 1, label: "Hero — lead creator portrait" },
  { file: "creator-atelier-1.svg", seed: 2, label: "For Creators — portrait 1" },
  { file: "creator-atelier-2.svg", seed: 3, label: "For Creators — portrait 2" },
  { file: "creator-atelier-3.svg", seed: 4, label: "For Creators — portrait 3" },
  { file: "creator-beauty.svg", seed: 5, label: "For Brands — Beauty" },
  { file: "creator-lifestyle.svg", seed: 6, label: "For Brands — Lifestyle" },
  { file: "creator-fashion.svg", seed: 7, label: "For Brands — Fashion" },
  { file: "creator-ugc.svg", seed: 8, label: "For Brands — UGC" },
];

function svgFor({ seed, label }) {
  const palette = palettes[seed % palettes.length];
  const gradId = `bg-${seed}`;
  const lineGradId = `line-${seed}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" role="img" aria-label="${label} (placeholder illustration)">
  <title>${label} (placeholder illustration)</title>
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.bg[0]}" />
      <stop offset="100%" stop-color="${palette.bg[1]}" />
    </linearGradient>
    <linearGradient id="${lineGradId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.accentFrom}" />
      <stop offset="100%" stop-color="${palette.accentTo}" />
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="url(#${gradId})" />
  <circle cx="${200 + (seed % 3) * 20 - 20}" cy="150" r="150" fill="${palette.accentFrom}" opacity="0.06" />
  <path d="${bustPath(seed)}" fill="none" stroke="${palette.line}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.85" />
  <path d="M 40 470 C 140 440, 260 440, 360 470" fill="none" stroke="url(#${lineGradId})" stroke-width="3" stroke-linecap="round" opacity="0.9" />
</svg>`;
}

for (const c of creators) {
  writeFileSync(join(outDir, c.file), svgFor(c), "utf8");
  console.log("wrote", c.file);
}
