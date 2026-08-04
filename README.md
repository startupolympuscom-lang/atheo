# Atheo

Landing page for Atheo — a creator management and brand-partnership studio. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and GSAP ScrollTrigger.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other useful commands:

```bash
npm run lint     # ESLint
npx tsc --noEmit # type-check
npm run build    # production build
npm run start    # serve the production build
```

## Structure

```
src/
  app/                    routes (home, /creators/apply, /brands/contact, /signin, /contact, /privacy, /terms)
  components/
    brand/                AtheoLogo, AtheoMark, CornerPeel, ContinuousPath, CreatorFrame, MomentumArc
    layout/                Header, Footer, Section, PlaceholderShell
    sections/              the nine landing-page sections
  lib/
    data.ts, creators.ts, routes.ts   typed content + central image map
scripts/
  generate-placeholder-portraits.mjs  regenerates the placeholder creator SVGs in public/creators
```

## Replacing placeholder content

- **Creator photography**: drop real images into `public/creators` and update the `src` paths in `src/lib/creators.ts`. Every portrait on the site is looked up from that one file.
- **Logo**: `src/components/brand/AtheoMark.tsx` holds the symbol's `<path>` data in isolation — swap it for a real vector export without touching `AtheoLogo.tsx` or any page.
- **Copy and stats**: all section copy lives in `src/lib/data.ts` as typed arrays/objects.

## The Creator's Path

The site's continuous coral-to-apricot line is built from small, section-scoped `ContinuousPath` SVG segments (not one document-spanning SVG). Each segment animates its `stroke-dasharray`/`stroke-dashoffset` via GSAP ScrollTrigger as its section scrolls into view, and falls back to a fully-drawn, static line when `prefers-reduced-motion` is set.
