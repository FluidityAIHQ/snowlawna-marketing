import type { CSSProperties } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ButtonArrow, buttonClass } from "@/components/ui/button";
import { plans } from "@/lib/content";
import { site } from "@/lib/site";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="hairline-x absolute inset-x-0 top-0 h-px" />
      <div className="wrap">
        <SectionHeading id="pricing-title" eyebrow="Pricing" align="center" title="One workspace. Add the trucks you need.">
          <p>
            C$99 per month for your workspace, plus C$29 per enrolled truck/driver. Every fleet gets the same
            workspace features. Here are three examples, before tax.
          </p>
        </SectionHeading>

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const featured = "featured" in plan && plan.featured;
            return (
              <li key={plan.name} data-reveal style={{ "--delay": `${i * 90}ms` } as CSSProperties}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                    featured
                      ? "border-fg/35 bg-linear-to-b from-surface-2/85 to-surface shadow-float"
                      : "border-line bg-surface shadow-card"
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-7 rounded-full border border-line-strong bg-surface px-3 py-0.5 font-mono text-[10px] font-medium tracking-[0.14em] text-fg uppercase shadow-sm">
                      3-truck example
                    </span>
                  )}
                  <h3 className="font-wide text-2xl font-semibold tracking-[-0.02em] text-snow">{plan.name}</h3>
                  <p className="mt-2 min-h-12 text-[15px] leading-relaxed text-fg-2">{plan.audience}</p>
                  <p className="mt-5 text-fg">
                    <strong className="font-wide text-3xl font-semibold">C${plan.monthly}</strong>
                    <span className="ml-1.5 text-sm text-fg-3">/ month</span>
                  </p>
                  <ul className="mt-6 grid gap-3 border-t border-line pt-6 text-[15px]">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-fg-2">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-2 text-fg ring-1 ring-line">
                          <Check aria-hidden className="size-3.5" strokeWidth={2.5} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Link
                      href={`${site.demoAppUrl}/signup`}
                      className={buttonClass({ variant: featured ? "primary" : "secondary", className: "w-full" })}
                    >
                      Start a 14-day trial
                      <ButtonArrow />
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p data-reveal className="mt-10 text-center text-sm text-fg-3">
          No setup fee. Cancel anytime. One license per enrolled truck/driver; each company workspace has its own
          subscription. Each successful CAD customer payment has a C$0.10 Snowlawna fee deducted from your proceeds, plus Stripe processing fees. Your customer’s total stays unchanged. No Snowlawna fee on bank payouts or offline payments.
        </p>
      </div>
    </section>
  );
}
