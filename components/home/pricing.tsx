import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { IntentLink } from "@/components/intent-link";
import { SectionHeading } from "@/components/section-heading";
import { ButtonArrow, buttonClass } from "@/components/ui/button";
import { plans } from "@/lib/content";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="hairline-x absolute inset-x-0 top-0 h-px" />
      <div className="wrap">
        <SectionHeading id="pricing-title" eyebrow="Pricing" align="center" title="Priced per season, sized to your fleet.">
          <p>
            Every plan includes the full workspace. We quote on your routes, crews and device licenses, so talk to us
            before the first snowfall.
          </p>
        </SectionHeading>

        <ul className="mt-14 grid gap-4 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const featured = "featured" in plan && plan.featured;
            return (
              <li key={plan.name} data-reveal style={{ "--delay": `${i * 90}ms` } as CSSProperties}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                    featured
                      ? "border-ice/40 bg-linear-to-b from-surface-2 to-surface shadow-[0_30px_80px_-30px_rgb(146_198_210/0.25)]"
                      : "border-line bg-surface"
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-7 rounded-full border border-ice/40 bg-canvas px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.14em] text-ice uppercase">
                      Recommended
                    </span>
                  )}
                  <h3 className="font-wide text-2xl font-semibold tracking-[-0.02em] text-snow">{plan.name}</h3>
                  <p className="mt-2 min-h-12 text-[15px] leading-relaxed text-fg-2">{plan.audience}</p>
                  <p className="mt-5 font-mono text-[11px] tracking-[0.14em] text-fg-3 uppercase">Quoted per season</p>
                  <ul className="mt-6 grid gap-3 border-t border-line pt-6 text-[15px]">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3 text-fg-2">
                        <Check aria-hidden className={`mt-0.5 size-4 shrink-0 ${featured ? "text-ice" : "text-spruce"}`} strokeWidth={2.2} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <IntentLink
                      intent="contact"
                      className={buttonClass({ variant: featured ? "primary" : "secondary", className: "w-full" })}
                    >
                      Contact sales
                      <ButtonArrow />
                    </IntentLink>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p data-reveal className="mt-10 text-center text-sm text-fg-3">
          Not sure which fits? Tell us about your operation and we&apos;ll recommend a plan.
        </p>
      </div>
    </section>
  );
}
