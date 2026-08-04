import { ROUTES, SECTION_IDS } from "./routes";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "For Creators", href: `#${SECTION_IDS.forCreators}` },
  { label: "For Brands", href: `#${SECTION_IDS.forBrands}` },
  { label: "Our Approach", href: `#${SECTION_IDS.approach}` },
  { label: "About", href: `#${SECTION_IDS.about}` },
];

export const FOOTER_LINKS: NavLink[] = [
  ...NAV_LINKS,
  { label: "Contact", href: ROUTES.contact },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Privacy", href: ROUTES.privacy },
  { label: "Terms", href: ROUTES.terms },
];

/** Centralized so social handles only need updating in one place. */
export const SOCIAL_LINKS: NavLink[] = [
  { label: "Instagram", href: "https://instagram.com/atheo" },
  { label: "LinkedIn", href: "https://linkedin.com/company/atheo" },
];

export const HERO_ANNOTATIONS = ["Fair terms", "Right-fit brands", "Long-term growth"];

export const HERO_PARTNERSHIP = {
  label: "PARTNERSHIP CONFIRMED",
  brand: "Estée Lauder",
};

export const HERO_PROOF_LINE = "10+ creators represented";

export interface JourneyStep {
  index: string;
  label: string;
}

export const CAREER_JOURNEY: JourneyStep[] = [
  { index: "01", label: "Position" },
  { index: "02", label: "Negotiate" },
  { index: "03", label: "Grow" },
  { index: "04", label: "Scale" },
];

export interface ServiceMoment {
  title: string;
  description: string;
}

export const SERVICE_MOMENTS: ServiceMoment[] = [
  { title: "Deal Desk", description: "Pricing, contracts and negotiation" },
  { title: "Career Direction", description: "Positioning and long-term strategy" },
  { title: "Brand Match", description: "Partnerships built on genuine fit" },
  { title: "Creator Operations", description: "Briefs, deadlines and communication" },
];

export const CAMPAIGN_PATH = ["Discover", "Match", "Launch", "Deliver"];

export interface BrandCreatorTag {
  creatorId: "beauty" | "lifestyle" | "fashion" | "ugc";
  tag: string;
}

export const BRAND_CREATOR_TAGS: BrandCreatorTag[] = [
  { creatorId: "beauty", tag: "BEAUTY" },
  { creatorId: "lifestyle", tag: "LIFESTYLE" },
  { creatorId: "fashion", tag: "FASHION" },
  { creatorId: "ugc", tag: "UGC" },
];

export const TRUSTED_BRANDS = ["Hacoo", "Estée Lauder", "Dieti Natura"];

export interface ProofPoint {
  value: string;
  label: string;
  detail: string;
}

export const PROOF_POINTS: ProofPoint[] = [
  { value: "10+", label: "Creators supported", detail: "" },
  { value: "Paid + gifting", label: "Campaigns completed", detail: "" },
  { value: "Early revenue", label: "Before full launch", detail: "" },
  { value: "3 markets", label: "France · UK · MENA experience", detail: "" },
];

export interface Principle {
  title: string;
  description: string;
}

export const TRANSPARENCY_PRINCIPLES: Principle[] = [
  { title: "Clear fees", description: "Know how every deal is structured." },
  { title: "Shared visibility", description: "Follow every decision and deadline." },
  { title: "Creator consent", description: "Nothing moves forward without alignment." },
];

export interface EcosystemNode {
  title: string;
  description: string;
}

export const ECOSYSTEM_NODES: EcosystemNode[] = [
  { title: "Talent", description: "Careers built to last" },
  { title: "Brands", description: "Partnerships built on fit" },
  { title: "Technology", description: "Operations built to scale" },
];

export const TECHNOLOGY_PRODUCTS = ["Creator OS", "Campaign Automation", "Digital Personalities"];
