import type {
  AppNotification,
  Brand,
  BrandDeal,
  ContentItem,
  CreatorProfile,
  Interest,
  ScheduledPost,
} from "./types";

export const SEED_BRANDS: Brand[] = [
  {
    id: "estee-lauder",
    name: "Estée Lauder",
    category: "Beauty",
    description: "Global prestige beauty house looking for long-term skincare ambassadors.",
    budgetRange: "$$$$",
    location: "New York, US",
  },
  {
    id: "dieti-natura",
    name: "Dieti Natura",
    category: "Beauty",
    description: "Natural wellness and skincare, sourced and formulated in-house.",
    budgetRange: "$$",
    location: "Milan, IT",
  },
  {
    id: "lumen-skincare",
    name: "Lumen Skincare",
    category: "Beauty",
    description: "Clean-beauty startup looking for early creator partners to grow with.",
    budgetRange: "$",
    location: "Austin, US",
  },
  {
    id: "hacoo",
    name: "Hacoo",
    category: "Lifestyle",
    description: "Everyday home and lifestyle goods, designed for real routines.",
    budgetRange: "$$",
    location: "Paris, FR",
  },
  {
    id: "marrow-co",
    name: "Marrow & Co.",
    category: "Lifestyle",
    description: "Slow-living home goods for people who like their mornings quiet.",
    budgetRange: "$$",
    location: "Copenhagen, DK",
  },
  {
    id: "verlaine-atelier",
    name: "Verlaine Atelier",
    category: "Fashion",
    description: "Contemporary ready-to-wear with a small, seasonal drop calendar.",
    budgetRange: "$$$",
    location: "Paris, FR",
  },
  {
    id: "solstice-denim",
    name: "Solstice Denim",
    category: "Fashion",
    description: "Sustainably produced denim, looking for creators who live in it.",
    budgetRange: "$$",
    location: "Los Angeles, US",
  },
  {
    id: "glow-theory",
    name: "Glow Theory",
    category: "UGC",
    description: "DTC skincare brand that runs almost entirely on creator UGC.",
    budgetRange: "$",
    location: "Remote",
  },
  {
    id: "kindred-home",
    name: "Kindred Home",
    category: "UGC",
    description: "DTC home goods looking for authentic unboxing and daily-use content.",
    budgetRange: "$",
    location: "Remote",
  },
];

export const SEED_PROFILE: CreatorProfile = {
  name: "Maya Chen",
  handle: "@mayacreates",
  avatarInitials: "MC",
  location: "Los Angeles, US",
  niches: ["Beauty", "Lifestyle"],
  bio: "Beauty and lifestyle creator. I make the kind of content I'd actually stop scrolling for — real routines, honest reviews, no overproduced nonsense.",
  lookingFor:
    "Long-term partnerships with beauty and lifestyle brands I'd use anyway — skincare, clean self-care, slow-living home goods. Open to UGC-only deals too.",
  socialAccounts: [
    { platform: "Instagram", handle: "@mayacreates", followers: 84200, verified: true },
    { platform: "TikTok", handle: "@mayacreates", followers: 212500, verified: true },
    { platform: "YouTube", handle: "Maya Chen", followers: 31800, verified: false },
  ],
};

const now = Date.now();
const day = 86_400_000;

export const SEED_INTERESTS: Interest[] = [
  {
    id: "interest-seed-1",
    brandId: "dieti-natura",
    initiatedBy: "creator",
    status: "accepted",
    message: "Would love to create a routine video featuring your new serum line.",
    createdAt: now - 6 * day,
    respondedAt: now - 5 * day,
  },
];

export const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-seed-1",
    type: "system",
    title: "Welcome to Atheo",
    body: "This is a live demo. Try expressing interest in a brand from the Brands page — replies show up right here.",
    createdAt: now - 7 * day,
    read: true,
  },
  {
    id: "notif-seed-2",
    type: "brand_reply",
    title: "Dieti Natura accepted your interest",
    body: "\"We'd love to have you — let's get a deal brief over to you.\"",
    createdAt: now - 5 * day,
    read: true,
    brandId: "dieti-natura",
  },
  {
    id: "notif-seed-3",
    type: "deal_offer",
    title: "New brand deal: Dieti Natura",
    body: "A deliverables checklist has been added to your Creative Space.",
    createdAt: now - 5 * day,
    read: false,
    brandId: "dieti-natura",
  },
];

export const SEED_DEALS: BrandDeal[] = [
  {
    id: "deal-seed-1",
    brandId: "dieti-natura",
    title: "Serum launch — routine video",
    compensation: "$1,800 + product",
    deliverables: [
      { label: "1 Instagram Reel", done: true },
      { label: "2 Instagram Stories", done: true },
      { label: "1 TikTok video", done: false },
    ],
    deadline: now + 9 * day,
    status: "in_progress",
  },
];

export const SEED_CONTENT: ContentItem[] = [
  {
    id: "content-seed-1",
    kind: "video",
    title: "Morning routine — new serum",
    previewUrl: null,
    status: "ready",
    createdAt: now - 4 * day,
    captionSuggestions: [],
  },
  {
    id: "content-seed-2",
    kind: "video",
    title: "Get ready with me — weekend edit",
    previewUrl: null,
    status: "editing",
    createdAt: now - 1 * day,
    captionSuggestions: [],
  },
];

export const SEED_SCHEDULED_POSTS: ScheduledPost[] = [
  {
    id: "scheduled-seed-1",
    platform: "Instagram",
    caption: "New serum, same honest review you came here for 🤍",
    scheduledAt: now + 2 * day,
    reminder: true,
    status: "scheduled",
    contentId: "content-seed-1",
  },
];
