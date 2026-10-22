"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import type {
  AppNotification,
  BrandDeal,
  ContentItem,
  ContentStatus,
  CreatorProfile,
  Interest,
  InterestStatus,
  PlatformState,
  ScheduledPost,
  SocialAccount,
} from "./types";
import {
  SEED_BRANDS,
  SEED_CONTENT,
  SEED_DEALS,
  SEED_INTERESTS,
  SEED_NOTIFICATIONS,
  SEED_PROFILE,
  SEED_SCHEDULED_POSTS,
} from "./seed-data";

const STORAGE_KEY = "atheo-platform-demo-v1";

function initialState(): PlatformState {
  return {
    profile: SEED_PROFILE,
    brands: SEED_BRANDS,
    interests: SEED_INTERESTS,
    notifications: SEED_NOTIFICATIONS,
    content: SEED_CONTENT,
    scheduledPosts: SEED_SCHEDULED_POSTS,
    deals: SEED_DEALS,
  };
}

type Action =
  | { type: "HYDRATE"; state: PlatformState }
  | { type: "UPDATE_PROFILE"; patch: Partial<CreatorProfile> }
  | { type: "ADD_SOCIAL_ACCOUNT"; account: SocialAccount }
  | { type: "TICK_FOLLOWERS" }
  | { type: "EXPRESS_INTEREST"; id: string; brandId: string; message: string }
  | { type: "RECEIVE_BRAND_INTEREST"; id: string; brandId: string }
  | { type: "RESOLVE_INTEREST"; interestId: string; status: "accepted" | "declined" }
  | { type: "MARK_NOTIFICATION_READ"; id: string }
  | { type: "MARK_ALL_NOTIFICATIONS_READ" }
  | { type: "ADD_CONTENT"; item: ContentItem }
  | { type: "UPDATE_CONTENT_STATUS"; id: string; status: ContentStatus }
  | { type: "SET_CAPTION_SUGGESTIONS"; id: string; suggestions: string[] }
  | { type: "SCHEDULE_POST"; post: ScheduledPost }
  | { type: "DELETE_SCHEDULED_POST"; id: string }
  | { type: "REMINDER_FIRED"; postId: string }
  | { type: "ADD_NOTIFICATION"; notification: AppNotification }
  | { type: "TOGGLE_DELIVERABLE"; dealId: string; index: number };

function reducer(state: PlatformState, action: Action): PlatformState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;

    case "UPDATE_PROFILE":
      return { ...state, profile: { ...state.profile, ...action.patch } };

    case "ADD_SOCIAL_ACCOUNT":
      return {
        ...state,
        profile: {
          ...state.profile,
          socialAccounts: [...state.profile.socialAccounts, action.account],
        },
      };

    case "TICK_FOLLOWERS":
      return {
        ...state,
        profile: {
          ...state.profile,
          socialAccounts: state.profile.socialAccounts.map((acc) => {
            // Mostly-upward organic drift, with an occasional small dip.
            const direction = Math.random() < 0.88 ? 1 : -1;
            const magnitude = Math.max(1, Math.round(acc.followers * 0.00015 * Math.random()));
            return { ...acc, followers: Math.max(0, acc.followers + direction * magnitude) };
          }),
        },
      };

    case "EXPRESS_INTEREST": {
      const interest: Interest = {
        id: action.id,
        brandId: action.brandId,
        initiatedBy: "creator",
        status: "pending",
        message: action.message,
        createdAt: Date.now(),
        respondedAt: null,
      };
      return { ...state, interests: [interest, ...state.interests] };
    }

    case "RECEIVE_BRAND_INTEREST": {
      const brand = state.brands.find((b) => b.id === action.brandId);
      if (!brand) return state;
      const interest: Interest = {
        id: action.id,
        brandId: action.brandId,
        initiatedBy: "brand",
        status: "pending",
        message: `${brand.name} would like to collaborate with you.`,
        createdAt: Date.now(),
        respondedAt: null,
      };
      const notification: AppNotification = {
        id: `notif-${action.id}`,
        type: "brand_interest",
        title: `${brand.name} is interested in working with you`,
        body: "Respond from the Brands page to start the conversation.",
        createdAt: Date.now(),
        read: false,
        brandId: action.brandId,
      };
      return {
        ...state,
        interests: [interest, ...state.interests],
        notifications: [notification, ...state.notifications],
      };
    }

    case "RESOLVE_INTEREST": {
      const interest = state.interests.find((i) => i.id === action.interestId);
      if (!interest || interest.status !== "pending") return state;
      const brand = state.brands.find((b) => b.id === interest.brandId);

      const updatedInterests = state.interests.map((i) =>
        i.id === action.interestId ? { ...i, status: action.status, respondedAt: Date.now() } : i,
      );

      const isBrandReplyingToCreator = interest.initiatedBy === "creator";
      const notification: AppNotification = {
        id: `notif-resolve-${action.interestId}`,
        type: isBrandReplyingToCreator ? "brand_reply" : "system",
        title: isBrandReplyingToCreator
          ? `${brand?.name ?? "A brand"} ${action.status} your interest`
          : `You ${action.status} ${brand?.name ?? "a brand"}'s interest`,
        body:
          action.status === "accepted"
            ? "A deal has been added to your Creative Space."
            : "No deal this time — keep browsing, more brands are open to pitches.",
        createdAt: Date.now(),
        read: false,
        brandId: interest.brandId,
      };

      let deals = state.deals;
      if (action.status === "accepted" && brand) {
        const compensation =
          brand.budgetRange === "$$$$"
            ? "$3,500 + product"
            : brand.budgetRange === "$$$"
              ? "$2,200 + product"
              : brand.budgetRange === "$$"
                ? "$1,200 + product"
                : "Product + affiliate commission";
        const deal: BrandDeal = {
          id: `deal-${action.interestId}`,
          brandId: brand.id,
          title: `${brand.name} collaboration`,
          compensation,
          deliverables: [
            { label: "1 Instagram Reel", done: false },
            { label: "2 Instagram Stories", done: false },
            { label: "1 TikTok video", done: false },
          ],
          deadline: Date.now() + 14 * 86_400_000,
          status: "offered",
        };
        deals = [deal, ...state.deals];
      }

      return {
        ...state,
        interests: updatedInterests,
        notifications: [notification, ...state.notifications],
        deals,
      };
    }

    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => (n.id === action.id ? { ...n, read: true } : n)),
      };

    case "MARK_ALL_NOTIFICATIONS_READ":
      return { ...state, notifications: state.notifications.map((n) => ({ ...n, read: true })) };

    case "ADD_CONTENT":
      return { ...state, content: [action.item, ...state.content] };

    case "UPDATE_CONTENT_STATUS":
      return {
        ...state,
        content: state.content.map((c) => (c.id === action.id ? { ...c, status: action.status } : c)),
      };

    case "SET_CAPTION_SUGGESTIONS":
      return {
        ...state,
        content: state.content.map((c) =>
          c.id === action.id ? { ...c, captionSuggestions: action.suggestions } : c,
        ),
      };

    case "SCHEDULE_POST":
      return { ...state, scheduledPosts: [action.post, ...state.scheduledPosts] };

    case "DELETE_SCHEDULED_POST":
      return { ...state, scheduledPosts: state.scheduledPosts.filter((p) => p.id !== action.id) };

    case "REMINDER_FIRED":
      return {
        ...state,
        scheduledPosts: state.scheduledPosts.map((p) => (p.id === action.postId ? { ...p, reminder: false } : p)),
      };

    case "ADD_NOTIFICATION":
      return { ...state, notifications: [action.notification, ...state.notifications] };

    case "TOGGLE_DELIVERABLE":
      return {
        ...state,
        deals: state.deals.map((d) =>
          d.id === action.dealId
            ? {
                ...d,
                deliverables: d.deliverables.map((item, i) => (i === action.index ? { ...item, done: !item.done } : item)),
              }
            : d,
        ),
      };

    default:
      return state;
  }
}

interface PlatformContextValue {
  state: PlatformState;
  updateProfile: (patch: Partial<CreatorProfile>) => void;
  addSocialAccount: (account: SocialAccount) => void;
  expressInterest: (brandId: string, message: string) => void;
  resolveInterest: (interestId: string, status: "accepted" | "declined") => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addContent: (item: Omit<ContentItem, "id" | "createdAt" | "status" | "captionSuggestions">) => string;
  updateContentStatus: (id: string, status: ContentItem["status"]) => void;
  setCaptionSuggestions: (id: string, suggestions: string[]) => void;
  schedulePost: (post: Omit<ScheduledPost, "id" | "status">) => void;
  deleteScheduledPost: (id: string) => void;
  toggleDeliverable: (dealId: string, index: number) => void;
  notify: (notification: Omit<AppNotification, "id" | "createdAt" | "read">) => void;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const hydrated = useRef(false);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Hydrate from localStorage once, client-side only.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", state: JSON.parse(raw) as PlatformState });
    } catch {
      // ignore corrupt/missing storage, keep seed state
    } finally {
      hydrated.current = true;
    }
  }, []);

  // Persist on every change, after the initial hydration pass.
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage full/unavailable — demo still works for this session
    }
  }, [state]);

  // Live follower counters.
  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "TICK_FOLLOWERS" }), 4000);
    return () => clearInterval(id);
  }, []);

  // Occasionally, a brand reaches out first — picked from brands with no
  // existing interest record yet, read fresh off stateRef to avoid a stale
  // closure without re-creating this timer on every state change.
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleNext = () => {
      const delay = 45_000 + Math.random() * 45_000;
      timeout = setTimeout(() => {
        const { brands, interests } = stateRef.current;
        const contactedBrandIds = new Set(interests.map((i) => i.brandId));
        const candidates = brands.filter((b) => !contactedBrandIds.has(b.id));
        if (candidates.length > 0) {
          const brand = candidates[Math.floor(Math.random() * candidates.length)];
          dispatch({ type: "RECEIVE_BRAND_INTEREST", id: `interest-${Date.now()}`, brandId: brand.id });
        }
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => clearTimeout(timeout);
  }, []);

  // Fire due reminders for scheduled posts.
  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      for (const post of stateRef.current.scheduledPosts) {
        if (post.reminder && post.status === "scheduled" && post.scheduledAt - now <= 60_000) {
          dispatch({
            type: "ADD_NOTIFICATION",
            notification: {
              id: `notif-reminder-${post.id}-${now}`,
              type: "reminder",
              title: "Scheduled post reminder",
              body: `Your ${post.platform} post goes live soon: "${post.caption.slice(0, 60)}${post.caption.length > 60 ? "…" : ""}"`,
              createdAt: now,
              read: false,
            },
          });
          dispatch({ type: "REMINDER_FIRED", postId: post.id });
        }
      }
    }, 15_000);
    return () => clearInterval(id);
  }, []);

  const updateProfile = useCallback((patch: Partial<CreatorProfile>) => dispatch({ type: "UPDATE_PROFILE", patch }), []);
  const addSocialAccount = useCallback((account: SocialAccount) => dispatch({ type: "ADD_SOCIAL_ACCOUNT", account }), []);

  const expressInterest = useCallback((brandId: string, message: string) => {
    const id = `interest-${Date.now()}`;
    dispatch({ type: "EXPRESS_INTEREST", id, brandId, message });
    const delay = 6000 + Math.random() * 6000;
    setTimeout(() => {
      const status: InterestStatus = Math.random() < 0.7 ? "accepted" : "declined";
      dispatch({ type: "RESOLVE_INTEREST", interestId: id, status });
    }, delay);
  }, []);

  const resolveInterest = useCallback((interestId: string, status: "accepted" | "declined") => {
    dispatch({ type: "RESOLVE_INTEREST", interestId, status });
  }, []);

  const markNotificationRead = useCallback((id: string) => dispatch({ type: "MARK_NOTIFICATION_READ", id }), []);
  const markAllNotificationsRead = useCallback(() => dispatch({ type: "MARK_ALL_NOTIFICATIONS_READ" }), []);

  const addContent = useCallback((item: Omit<ContentItem, "id" | "createdAt" | "status" | "captionSuggestions">) => {
    const id = `content-${Date.now()}`;
    dispatch({
      type: "ADD_CONTENT",
      item: { ...item, id, createdAt: Date.now(), status: "uploaded", captionSuggestions: [] },
    });
    return id;
  }, []);

  const setCaptionSuggestions = useCallback(
    (id: string, suggestions: string[]) => dispatch({ type: "SET_CAPTION_SUGGESTIONS", id, suggestions }),
    [],
  );

  const schedulePost = useCallback((post: Omit<ScheduledPost, "id" | "status">) => {
    dispatch({ type: "SCHEDULE_POST", post: { ...post, id: `scheduled-${Date.now()}`, status: "scheduled" } });
  }, []);

  const deleteScheduledPost = useCallback((id: string) => dispatch({ type: "DELETE_SCHEDULED_POST", id }), []);
  const toggleDeliverable = useCallback(
    (dealId: string, index: number) => dispatch({ type: "TOGGLE_DELIVERABLE", dealId, index }),
    [],
  );
  const updateContentStatus = useCallback(
    (id: string, status: ContentItem["status"]) => dispatch({ type: "UPDATE_CONTENT_STATUS", id, status }),
    [],
  );
  const notify = useCallback(
    (notification: Omit<AppNotification, "id" | "createdAt" | "read">) =>
      dispatch({
        type: "ADD_NOTIFICATION",
        notification: { ...notification, id: `notif-${Date.now()}`, createdAt: Date.now(), read: false },
      }),
    [],
  );

  return (
    <PlatformContext.Provider
      value={{
        state,
        updateProfile,
        addSocialAccount,
        expressInterest,
        resolveInterest,
        markNotificationRead,
        markAllNotificationsRead,
        addContent,
        updateContentStatus,
        setCaptionSuggestions,
        schedulePost,
        deleteScheduledPost,
        toggleDeliverable,
        notify,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error("usePlatform must be used within a PlatformProvider");
  return ctx;
}
