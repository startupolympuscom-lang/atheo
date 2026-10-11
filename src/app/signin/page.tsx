import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata: Metadata = { title: "Sign in — Atheo" };

export default function SignInPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center bg-atheo-blush px-6 py-20 md:py-28">
        <div className="w-full max-w-md rounded-[2rem] border border-atheo-line bg-atheo-white p-10 shadow-[0_40px_90px_-55px_rgba(40,24,47,0.4)] sm:p-12">
          <p className="eyebrow text-center">Atheo</p>
          <h1 className="mt-4 text-center font-display text-2xl font-bold text-atheo-aubergine sm:text-3xl">
            Welcome back.
          </h1>
          <p className="mt-3 text-center text-sm text-atheo-aubergine-soft">
            Sign in to your account, or create a new one.
          </p>

          <div className="mt-8">
            <SignInForm />
          </div>
        </div>
      </main>
    </>
  );
}
