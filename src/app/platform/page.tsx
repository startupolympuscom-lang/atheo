"use client";

import Link from "next/link";
import { User, Building2, Sparkles, ArrowRight, Users, Clock, Bell as BellIcon, CalendarClock } from "lucide-react";
import { usePlatform } from "@/lib/platform/store";
import { formatFollowers, formatRelativeTime } from "@/lib/platform/format";
import { computeTrustScore } from "@/lib/platform/trust-score";
import { computeAchievements } from "@/lib/platform/achievements";
import { Avatar } from "@/components/platform/Avatar";
import { StarRating } from "@/components/platform/StarRating";
import { Achievements } from "@/components/platform/Achievements";

export default function PlatformDashboard() {
  const { state } = usePlatform();
  const { profile, interests, notifications, scheduledPosts } = state;
  const trustScore = computeTrustScore(state.deals);
  const achievements = computeAchievements(state);

  const totalFollowers = profile.socialAccounts.reduce((sum, a) => sum + a.followers, 0);
  const pendingInterests = interests.filter((i) => i.status === "pending").length;
  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const upcomingPosts = scheduledPosts.filter((p) => p.status === "scheduled").length;

  const stats = [
    { label: "Total reach", value: formatFollowers(totalFollowers), icon: Users },
    { label: "Pending interests", value: String(pendingInterests), icon: Clock },
    { label: "Unread notifications", value: String(unreadNotifications), icon: BellIcon },
    { label: "Scheduled posts", value: String(upcomingPosts), icon: CalendarClock },
  ];

  const quickLinks = [
    {
      href: "/platform/profile",
      label: "Profile",
      icon: User,
      description: "Edit your bio, what you're looking for, and your live follower counts.",
    },
    {
      href: "/platform/brands",
      label: "Brands",
      icon: Building2,
      description: "Browse brands and express interest in a collaboration.",
    },
    {
      href: "/platform/creative-space",
      label: "Creative Space",
      icon: Sparkles,
      description: "Upload content, get caption ideas, schedule posts, track deals.",
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <Avatar url={profile.avatarUrl} initials={profile.avatarInitials} size={56} />
        <div>
          <p className="eyebrow">Overview</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-atheo-aubergine sm:text-3xl">
            Welcome back, {profile.name.split(" ")[0]}.
          </h1>
        </div>
        {trustScore.average !== null && (
          <div className="ml-auto flex items-center gap-2 rounded-full border border-atheo-line bg-atheo-white px-4 py-2">
            <StarRating value={trustScore.average} size={14} />
            <span className="text-sm font-semibold text-atheo-aubergine">{trustScore.average}</span>
            <span className="text-xs text-atheo-aubergine-mute">({trustScore.count})</span>
          </div>
        )}
      </div>
      <p className="mt-3 max-w-xl text-sm text-atheo-aubergine-soft">
        This is a live demo — brand replies, reminders and your follower counts update in real time while
        you browse.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-atheo-line bg-atheo-white p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-atheo-blush text-atheo-coral">
              <stat.icon className="h-[18px] w-[18px]" />
            </span>
            <p className="mt-4 font-display text-2xl font-bold text-atheo-aubergine">{stat.value}</p>
            <p className="mt-1 text-xs font-medium text-atheo-aubergine-mute">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="font-display text-sm font-semibold text-atheo-aubergine">Recent activity</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-atheo-line bg-atheo-white">
            {notifications.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-atheo-aubergine-mute">Nothing yet — try the Brands page.</p>
            ) : (
              <ul>
                {notifications.slice(0, 6).map((n) => (
                  <li key={n.id} className="flex items-start gap-3 border-b border-atheo-hairline px-5 py-4 last:border-0">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-atheo-line" : "bg-atheo-coral"}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-atheo-aubergine">{n.title}</p>
                      <p className="mt-0.5 text-xs text-atheo-aubergine-soft">{n.body}</p>
                    </div>
                    <span className="shrink-0 text-xs text-atheo-aubergine-mute">{formatRelativeTime(n.createdAt)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <p className="font-display text-sm font-semibold text-atheo-aubergine">Jump back in</p>
          <div className="mt-4 flex flex-col gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-2xl border border-atheo-line bg-atheo-white p-5 transition-colors hover:border-atheo-coral"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-atheo-blush text-atheo-coral">
                    <link.icon className="h-[18px] w-[18px]" />
                  </span>
                  <ArrowRight className="h-4 w-4 text-atheo-aubergine-mute transition-transform group-hover:translate-x-1 group-hover:text-atheo-coral" />
                </div>
                <p className="mt-3 font-display text-sm font-semibold text-atheo-aubergine">{link.label}</p>
                <p className="mt-1 text-xs text-atheo-aubergine-soft">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Achievements achievements={achievements} />
      </div>
    </div>
  );
}
