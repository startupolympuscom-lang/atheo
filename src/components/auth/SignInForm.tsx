"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

type Mode = "sign-in" | "sign-up";

const inputClass =
  "w-full rounded-xl border border-atheo-line bg-atheo-white px-4 py-3 text-sm text-atheo-aubergine placeholder:text-atheo-aubergine-mute focus:border-atheo-coral focus:outline-none";

export function SignInForm() {
  const { data: session, isPending } = authClient.useSession();
  const [mode, setMode] = useState<Mode>("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (isPending) {
    return <p className="text-center text-sm text-atheo-aubergine-mute">Loading…</p>;
  }

  if (session) {
    return (
      <div className="text-center">
        <p className="eyebrow">Signed in</p>
        <p className="mt-3 font-display text-lg font-semibold text-atheo-aubergine">
          {session.user.name || session.user.email}
        </p>
        <p className="mt-1 text-sm text-atheo-aubergine-mute">{session.user.email}</p>
        <button type="button" onClick={() => authClient.signOut()} className="btn-secondary mt-6 w-full">
          Sign out
        </button>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error: authError } =
      mode === "sign-up"
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });

    setSubmitting(false);
    if (authError) setError(authError.message ?? "Something went wrong. Please try again.");
  }

  return (
    <div>
      <div className="mb-6 flex rounded-full border border-atheo-line bg-atheo-blush/60 p-1">
        {(["sign-in", "sign-up"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError(null);
            }}
            className={`flex-1 rounded-full py-2 font-display text-sm font-semibold transition-colors ${
              mode === m ? "bg-atheo-white text-atheo-aubergine shadow-sm" : "text-atheo-aubergine-mute"
            }`}
          >
            {m === "sign-in" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === "sign-up" && (
          <Field label="Name">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className={inputClass}
            />
          </Field>
        )}
        <Field label="Email">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className={inputClass}
          />
        </Field>
        <Field label="Password">
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
            className={inputClass}
          />
        </Field>

        {error && <p className="text-sm text-atheo-coral">{error}</p>}

        <button type="submit" disabled={submitting} className="btn-primary mt-2 w-full disabled:opacity-60">
          {submitting ? "Please wait…" : mode === "sign-up" ? "Create account" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-left">
      <span className="mb-1.5 block text-xs font-medium text-atheo-aubergine-mute">{label}</span>
      {children}
    </label>
  );
}
