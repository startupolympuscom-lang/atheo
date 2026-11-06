export interface BrandPlan {
  id: string;
  name: string;
  monthly: number | null;
  annual: number | null;
  seats: string;
  campaigns: string;
  shortlist: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
  custom?: boolean;
}

export const BRAND_PLANS: BrandPlan[] = [
  {
    id: "brand_discover",
    name: "Discover",
    monthly: 0,
    annual: 0,
    seats: "1 seat",
    campaigns: "1 active campaign",
    shortlist: "10 creators",
    tagline: "A verified workspace to run your first campaign.",
    features: [
      "Verified brand workspace",
      "Creator search & discovery",
      "Shortlist up to 10 creators",
      "Publish 1 active campaign",
      "Bilateral interest & proposals",
      "Atheo Deal Desk review on every deal",
      "Full & milestone payment flow",
      "Basic collaboration history",
    ],
  },
  {
    id: "brand_studio",
    name: "Studio",
    monthly: 99,
    annual: 990,
    seats: "3 seats",
    campaigns: "5 active campaigns",
    shortlist: "Fair-use unlimited",
    tagline: "For teams running a steady stream of campaigns.",
    features: [
      "Everything in Discover",
      "Saved searches",
      "Reusable brief templates",
      "Expanded collaboration workspace",
      "Team member access",
      "Basic reporting & exports",
    ],
    highlighted: true,
  },
  {
    id: "brand_scale",
    name: "Scale",
    monthly: 299,
    annual: 2990,
    seats: "10 seats",
    campaigns: "20 active campaigns",
    shortlist: "Fair-use unlimited",
    tagline: "Multi-market programs with real team controls.",
    features: [
      "Everything in Studio",
      "Multi-market campaign workspaces",
      "Advanced exports",
      "Team roles & spending controls",
      "Portfolio-level reporting",
      "Priority support requests",
    ],
  },
  {
    id: "brand_enterprise",
    name: "Enterprise",
    monthly: null,
    annual: null,
    seats: "Up to 40 seats",
    campaigns: "Contracted volume",
    shortlist: "Fair-use unlimited",
    tagline: "Custom terms for global, high-volume programs.",
    features: [
      "Everything in Scale",
      "Named account contact & onboarding",
      "Tailored reporting",
      "Integration assessment",
      "Bespoke terms in a signed order",
    ],
    custom: true,
  },
];

export interface CreatorPlan {
  id: string;
  name: string;
  price: string;
  eligibility: string;
  fee: string;
  feeNote: string;
  entitlements: string[];
  applicationOnly?: boolean;
}

export const CREATOR_PLANS: CreatorPlan[] = [
  {
    id: "creator_open",
    name: "Open Creator",
    price: "£0",
    eligibility: "Any creator, any follower count — subject to lawful verification.",
    fee: "10%",
    feeNote: "Brand-paid marketplace fee. You keep 100% of your negotiated fee.",
    entitlements: [
      "Media kit & public profile",
      "Brand & campaign discovery",
      "Express interest & apply",
      "In-platform messaging",
      "Deal, earnings & payout history",
      "Signed documents on file",
    ],
  },
  {
    id: "creator_represented",
    name: "Represented Talent",
    price: "£0",
    eligibility: "By application only — a separate representation agreement is reviewed and signed before activation.",
    fee: "20%",
    feeNote: "Brand-paid managed fee, instead of the 10% marketplace fee — never both. You still keep 100% of your negotiated fee.",
    entitlements: [
      "Everything in Open Creator",
      "Assigned talent manager",
      "Proactive brand outreach",
      "Pitch & negotiation support",
      "Brand coordination",
      "Career advice",
    ],
    applicationOnly: true,
  },
];

export interface ComparisonRow {
  label: string;
  values: (boolean | string)[];
}

export const COMPARISON_FEATURES: ComparisonRow[] = [
  { label: "Team seats", values: ["1", "3", "10", "Up to 40"] },
  { label: "Active campaigns", values: ["1", "5", "20", "Contracted volume"] },
  { label: "Creator shortlist", values: ["10", "Unlimited*", "Unlimited*", "Unlimited*"] },
  { label: "Atheo Deal Desk review on every deal", values: [true, true, true, true] },
  { label: "Saved searches & brief templates", values: [false, true, true, true] },
  { label: "Team roles & spending controls", values: [false, false, true, true] },
  { label: "Portfolio-level reporting", values: [false, false, true, true] },
  { label: "Named account contact", values: [false, false, false, true] },
  { label: "Bespoke contract terms", values: [false, false, false, true] },
];

export interface PricingFaqItem {
  q: string;
  a: string;
}

export const PRICING_FAQ: PricingFaqItem[] = [
  {
    q: "Is this real, billable pricing?",
    a: "No. These are proposed launch terms pending Atheo's final commercial and legal approval. Nothing on this page charges a card — it's a preview of how plans, fees and contracts will work at launch.",
  },
  {
    q: "What do brand plan prices include?",
    a: "Plan prices are workspace subscription fees only, shown excluding VAT/tax. They don't include campaign compensation paid to creators, Atheo's deal commission, or separately disclosed payment-processing charges.",
  },
  {
    q: "How is the Atheo fee calculated?",
    a: "The brand pays a service fee on top of the creator's negotiated compensation — 10% for independent marketplace deals, or 20% for deals involving Atheo-represented talent. Atheo never charges both fees on the same deal, and the creator receives their full negotiated fee by default.",
  },
  {
    q: "When are brands charged, and how?",
    a: "Smaller collaborations can be paid in full upfront. Larger campaigns can use milestone-based installments. Every payment is intended to route through Atheo's approved marketplace payment flow — no payment happens outside the platform, and availability depends on payment-provider and country eligibility.",
  },
  {
    q: "Can I change or cancel my plan?",
    a: "Plan changes go through a formal quote and acceptance step so you see the new entitlements, effective date and any proration before confirming. Canceling never deletes signed agreements or affects deals already in progress.",
  },
  {
    q: "Does a paid plan make deal approval optional?",
    a: "No. Every package — free or paid — requires the same Atheo Deal Desk review, signed agreement and verified funding before a deal activates.",
  },
];
