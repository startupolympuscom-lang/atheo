"use client";

import { useState } from "react";
import { Plus, BadgeCheck } from "lucide-react";
import { usePlatform } from "@/lib/platform/store";
import { LiveFollowerCount } from "@/components/platform/LiveFollowerCount";
import type { SocialPlatform } from "@/lib/platform/types";

const ALL_PLATFORMS: SocialPlatform[] = ["Instagram", "TikTok", "YouTube", "X"];
const ALL_NICHES = ["Beauty", "Fashion", "Lifestyle", "UGC"] as const;

export default function ProfilePage() {
  const { state, updateProfile, addSocialAccount } = usePlatform();
  const { profile } = state;

  const [form, setForm] = useState(profile);
  const [dirty, setDirty] = useState(false);
  const [addingPlatform, setAddingPlatform] = useState(false);
  const [newPlatform, setNewPlatform] = useState<SocialPlatform | "">("");
  const [newHandle, setNewHandle] = useState("");
  const [newFollowers, setNewFollowers] = useState("");

  const availablePlatforms = ALL_PLATFORMS.filter(
    (p) => !profile.socialAccounts.some((a) => a.platform === p),
  );

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setDirty(true);
  }

  function toggleNiche(niche: string) {
    const has = form.niches.includes(niche);
    set("niches", has ? form.niches.filter((n) => n !== niche) : [...form.niches, niche]);
  }

  function handleSave() {
    updateProfile({
      name: form.name,
      handle: form.handle,
      location: form.location,
      niches: form.niches,
      bio: form.bio,
      lookingFor: form.lookingFor,
    });
    setDirty(false);
  }

  function handleAddPlatform() {
    if (!newPlatform || !newHandle.trim()) return;
    addSocialAccount({
      platform: newPlatform,
      handle: newHandle.trim(),
      followers: Math.max(0, Number(newFollowers) || 0),
      verified: false,
    });
    setAddingPlatform(false);
    setNewPlatform("");
    setNewHandle("");
    setNewFollowers("");
  }

  return (
    <div className="max-w-3xl">
      <p className="eyebrow">Your profile</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-atheo-aubergine sm:text-3xl">
        Tell brands who you are.
      </h1>

      <div className="mt-8 rounded-2xl border border-atheo-line bg-atheo-white p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name">
            <input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Handle">
            <input value={form.handle} onChange={(e) => set("handle", e.target.value)} className={inputClass} />
          </Field>
          <Field label="Location" full>
            <input value={form.location} onChange={(e) => set("location", e.target.value)} className={inputClass} />
          </Field>
        </div>

        <div className="mt-5">
          <span className="mb-1.5 block text-xs font-medium text-atheo-aubergine-mute">Niches</span>
          <div className="flex flex-wrap gap-2">
            {ALL_NICHES.map((niche) => {
              const active = form.niches.includes(niche);
              return (
                <button
                  key={niche}
                  type="button"
                  onClick={() => toggleNiche(niche)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-atheo-coral bg-atheo-blush text-atheo-coral"
                      : "border-atheo-line text-atheo-aubergine-mute hover:border-atheo-coral"
                  }`}
                >
                  {niche}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <Field label="Bio">
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <div className="mt-5">
          <Field label="What I'm looking for in brand partnerships">
            <textarea
              rows={3}
              value={form.lookingFor}
              onChange={(e) => set("lookingFor", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <button type="button" onClick={handleSave} disabled={!dirty} className="btn-primary mt-6 disabled:opacity-40">
          Save changes
        </button>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <p className="font-display text-sm font-semibold text-atheo-aubergine">Live follower counts</p>
        {availablePlatforms.length > 0 && (
          <button
            type="button"
            onClick={() => setAddingPlatform((v) => !v)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-atheo-coral hover:text-atheo-aubergine"
          >
            <Plus className="h-4 w-4" />
            Add platform
          </button>
        )}
      </div>

      {addingPlatform && (
        <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-atheo-line bg-atheo-blush/40 p-4 sm:flex-row sm:items-end">
          <Field label="Platform">
            <select
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value as SocialPlatform)}
              className={inputClass}
            >
              <option value="">Select…</option>
              {availablePlatforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Handle">
            <input value={newHandle} onChange={(e) => setNewHandle(e.target.value)} className={inputClass} />
          </Field>
          <Field label="Followers">
            <input
              type="number"
              min={0}
              value={newFollowers}
              onChange={(e) => setNewFollowers(e.target.value)}
              className={inputClass}
            />
          </Field>
          <button type="button" onClick={handleAddPlatform} className="btn-primary shrink-0">
            Add
          </button>
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {profile.socialAccounts.map((account) => (
          <div key={account.platform} className="rounded-2xl border border-atheo-line bg-atheo-white p-5">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold text-atheo-aubergine">{account.platform}</span>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-atheo-coral">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-atheo-coral opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-atheo-coral" />
                </span>
                Live
              </span>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <p className="truncate text-sm text-atheo-aubergine-mute">{account.handle}</p>
              {account.verified && <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-atheo-coral" />}
            </div>
            <div className="mt-3">
              <LiveFollowerCount value={account.followers} />
              <span className="ml-1.5 text-xs text-atheo-aubergine-mute">followers</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-atheo-line bg-atheo-white px-4 py-2.5 text-sm text-atheo-aubergine placeholder:text-atheo-aubergine-mute focus:border-atheo-coral focus:outline-none";

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`block text-left ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-xs font-medium text-atheo-aubergine-mute">{label}</span>
      {children}
    </label>
  );
}
