/** Central route map — used by every CTA and nav link so nothing 404s. */
export const ROUTES = {
  home: "/",
  creatorsApply: "/creators/apply",
  brandsContact: "/brands/contact",
  signIn: "/signin",
  about: "/#about",
  pricing: "/pricing",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  platformDemo: "/platform",
} as const;

/** In-page anchors the sticky header and footer scroll to. */
export const SECTION_IDS = {
  hero: "hero",
  approach: "approach",
  forCreators: "for-creators",
  forBrands: "for-brands",
  about: "about",
} as const;
