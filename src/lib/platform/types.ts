export type SocialPlatform = "Instagram" | "TikTok" | "YouTube" | "X";

export interface SocialAccount {
  platform: SocialPlatform;
  handle: string;
  followers: number;
  verified: boolean;
}

export interface CreatorProfile {
  name: string;
  handle: string;
  avatarInitials: string;
  avatarUrl: string | null;
  location: string;
  niches: string[];
  bio: string;
  lookingFor: string;
  socialAccounts: SocialAccount[];
}

export type BrandCategory = "Beauty" | "Fashion" | "Lifestyle" | "UGC";

export interface Brand {
  id: string;
  name: string;
  category: BrandCategory;
  description: string;
  budgetRange: string;
  location: string;
}

export type InterestStatus = "pending" | "accepted" | "declined";

export interface Interest {
  id: string;
  brandId: string;
  initiatedBy: "creator" | "brand";
  status: InterestStatus;
  message: string;
  createdAt: number;
  respondedAt: number | null;
}

export type NotificationType =
  | "brand_interest"
  | "brand_reply"
  | "deal_offer"
  | "rating"
  | "reminder"
  | "deal_message"
  | "payment"
  | "system";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: number;
  read: boolean;
  brandId?: string;
}

export type ContentStatus = "uploaded" | "editing" | "ready";
export type ContentKind = "video" | "image";

export interface ContentItem {
  id: string;
  kind: ContentKind;
  title: string;
  previewUrl: string | null;
  status: ContentStatus;
  createdAt: number;
  captionSuggestions: string[];
}

export type ScheduledPostStatus = "scheduled" | "posted";

export interface ScheduledPost {
  id: string;
  platform: SocialPlatform;
  caption: string;
  scheduledAt: number;
  reminder: boolean;
  status: ScheduledPostStatus;
  contentId?: string;
}

export type DealStatus = "offered" | "in_progress" | "completed";

export interface DealRating {
  stars: 1 | 2 | 3 | 4 | 5;
  review: string;
  stage: "mid" | "final";
  ratedAt: number;
}

export type PaymentStatus = "unbilled" | "invoiced" | "paid";

export interface DealMessage {
  id: string;
  sender: "creator" | "brand";
  text: string;
  sentAt: number;
}

export interface BrandDeal {
  id: string;
  brandId: string;
  title: string;
  compensation: string;
  amount: number;
  deliverables: { label: string; done: boolean }[];
  deadline: number;
  status: DealStatus;
  rating: DealRating | null;
  messages: DealMessage[];
  paymentStatus: PaymentStatus;
  invoicedAt: number | null;
  paidAt: number | null;
}

export interface PlatformState {
  profile: CreatorProfile;
  brands: Brand[];
  interests: Interest[];
  notifications: AppNotification[];
  content: ContentItem[];
  scheduledPosts: ScheduledPost[];
  deals: BrandDeal[];
}
