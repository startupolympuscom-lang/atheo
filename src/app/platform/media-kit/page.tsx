"use client";

import { useState } from "react";
import { Copy, Check, Printer, MapPin, BadgeCheck, Users } from "lucide-react";
import { usePlatform } from "@/lib/platform/store";
import { Avatar } from "@/components/platform/Avatar";
import { StarRating } from "@/components/platform/StarRating";
import { computeTrustScore } from "@/lib/platform/trust-score";
import { formatFollowers } from "@/lib/platform/format";

export default function MediaKitPage() {
  const { state } = usePlatform();
  const { profile } = state;
  const trustScore = computeTrustScore(state.deals);
  const [copied, setCopied] = useState(false);

  const totalFollowers = profile.socialAccounts.reduce((sum, a) => sum + a.followers, 0);

  const partnerBrands = Array.from(new Set(state.deals.map((d) => d.brandId)))
    .map((id) => state.brands.find((b) => b.id === id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — nothing to recover from in a demo
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-start justify-between gap-4 print:hidden">
        <div>
          <p className="eyebrow">Media Kit</p>
          <h1 className="mt-2 font-display text-2xl font-bold text-atheo-aubergine sm:text-3xl">
            Everything a brand needs to know.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-atheo-aubergine-soft">
            A shareable one-pager built from your live profile — stats, Trust Score, and brand partners, always
            up to date.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={handleCopyLink} className="btn-secondary inline-flex items-center !px-4 !py-2 text-sm">
            {copied ? <Check className="mr-1.5 h-4 w-4" /> : <Copy className="mr-1.5 h-4 w-4" />}
            {copied ? "Copied" : "Copy link"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-primary inline-flex items-center !px-4 !py-2 text-sm"
          >
            <Printer className="mr-1.5 h-4 w-4" />
            Print / Save PDF
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-atheo-line bg-atheo-white p-6 sm:p-8 print:mt-0 print:rounded-none print:border-0 print:p-0">
        <div className="flex flex-wrap items-center gap-5">
          <Avatar url={profile.avatarUrl} initials={profile.avatarInitials} size={88} />
          <div>
            <h2 className="font-display text-xl font-bold text-atheo-aubergine">{profile.name}</h2>
            <p className="text-sm text-atheo-aubergine-mute">{profile.handle}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-atheo-aubergine-mute">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </p>
          </div>
          <div className="ml-auto flex flex-wrap gap-1.5">
            {profile.niches.map((niche) => (
              <span
                key={niche}
                className="rounded-full border border-atheo-coral/30 bg-atheo-blush/60 px-3 py-1 text-xs font-medium text-atheo-coral"
              >
                {niche}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-atheo-aubergine-soft">{profile.bio}</p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile icon={Users} label="Total reach" value={formatFollowers(totalFollowers)} />
          <StatTile
            label="Trust Score"
            value={trustScore.average !== null ? String(trustScore.average) : "—"}
            sub={trustScore.count > 0 ? `${trustScore.count} brand review${trustScore.count === 1 ? "" : "s"}` : "No reviews yet"}
          />
          <StatTile label="Platforms" value={String(profile.socialAccounts.length)} />
          <StatTile label="Brand partners" value={String(partnerBrands.length)} />
        </div>

        <div className="mt-8">
          <p className="font-display text-sm font-semibold text-atheo-aubergine">Reach by platform</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {profile.socialAccounts.map((account) => (
              <div key={account.platform} className="rounded-2xl border border-atheo-hairline bg-atheo-blush/20 p-4">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-atheo-aubergine-mute">
                    {account.platform}
                  </p>
                  {account.verified && <BadgeCheck className="h-3.5 w-3.5 text-atheo-coral" />}
                </div>
                <p className="mt-1.5 font-display text-lg font-bold text-atheo-aubergine">
                  {formatFollowers(account.followers)}
                </p>
                <p className="text-xs text-atheo-aubergine-mute">{account.handle}</p>
              </div>
            ))}
          </div>
        </div>

        {trustScore.average !== null && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-atheo-blush/40 px-4 py-3">
            <StarRating value={trustScore.average} />
            <p className="text-sm font-medium text-atheo-aubergine">
              {trustScore.average} average from {trustScore.count} brand review{trustScore.count === 1 ? "" : "s"}
            </p>
          </div>
        )}

        <div className="mt-8">
          <p className="font-display text-sm font-semibold text-atheo-aubergine">Brands I&apos;ve worked with</p>
          {partnerBrands.length === 0 ? (
            <p className="mt-2 text-sm text-atheo-aubergine-mute">
              Your brand partners will appear here after your first deal.
            </p>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              {partnerBrands.map((brand) => (
                <BrandBadge key={brand.id} name={brand.name} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-atheo-hairline pt-5">
          <p className="font-display text-sm font-semibold text-atheo-aubergine">What I&apos;m looking for</p>
          <p className="mt-1.5 text-sm text-atheo-aubergine-soft">{profile.lookingFor}</p>
        </div>

        <p className="mt-8 text-center text-[11px] text-atheo-aubergine-mute">
          Generated by Atheo · {new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-atheo-hairline bg-atheo-blush/20 p-4">
      {Icon && <Icon className="h-4 w-4 text-atheo-coral" />}
      <p className={`font-display text-lg font-bold text-atheo-aubergine ${Icon ? "mt-2" : ""}`}>{value}</p>
      <p className="text-xs font-medium text-atheo-aubergine-mute">{label}</p>
      {sub && <p className="mt-0.5 text-[11px] text-atheo-aubergine-mute">{sub}</p>}
    </div>
  );
}

function BrandBadge({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="flex items-center gap-2 rounded-full border border-atheo-line bg-atheo-white px-3 py-1.5">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-atheo-aubergine text-[10px] font-bold text-atheo-white">
        {initials}
      </span>
      <span className="text-xs font-medium text-atheo-aubergine">{name}</span>
    </div>
  );
}
