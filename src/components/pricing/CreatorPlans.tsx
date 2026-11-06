import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { CREATOR_PLANS } from "@/lib/pricing-data";
import { ROUTES } from "@/lib/routes";

export function CreatorPlans() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {CREATOR_PLANS.map((plan) => (
        <div
          key={plan.id}
          className={`flex flex-col rounded-[2rem] border bg-atheo-white p-7 sm:p-8 ${
            plan.applicationOnly ? "border-atheo-coral/40" : "border-atheo-line"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-lg font-bold text-atheo-aubergine">{plan.name}</p>
            {plan.applicationOnly && (
              <span className="inline-flex items-center gap-1 rounded-full bg-atheo-blush px-2.5 py-1 text-[11px] font-semibold text-atheo-coral">
                <Sparkles className="h-3 w-3" />
                By application
              </span>
            )}
          </div>

          <p className="mt-4 font-display text-3xl font-bold text-atheo-aubergine">{plan.price}</p>
          <p className="mt-1 text-xs text-atheo-aubergine-mute">{plan.eligibility}</p>

          <div className="mt-5 rounded-xl bg-atheo-blush/50 p-4">
            <p className="font-display text-sm font-semibold text-atheo-aubergine">{plan.fee} brand-paid fee</p>
            <p className="mt-1 text-xs text-atheo-aubergine-soft">{plan.feeNote}</p>
          </div>

          <ul className="mt-5 flex flex-1 flex-col gap-2.5">
            {plan.entitlements.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-atheo-aubergine-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-atheo-coral" />
                {item}
              </li>
            ))}
          </ul>

          <Link href={ROUTES.creatorsApply} className={`mt-7 w-full text-center ${plan.applicationOnly ? "btn-secondary" : "btn-primary"}`}>
            {plan.applicationOnly ? "Apply for representation" : "Join as a creator"}
          </Link>
        </div>
      ))}
    </div>
  );
}
