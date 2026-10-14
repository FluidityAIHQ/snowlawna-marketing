import { Check } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { SectionHeading } from "@/components/section-heading";

const EXPECT = [
  "We'll measure and quote one of your own properties, live.",
  "See dispatch, maps and contracts with your routes in mind.",
  "Get pricing for your fleet ahead of the season.",
];

export function GetStarted() {
  return (
    <section id="get-started" aria-labelledby="get-started-title" className="relative overflow-hidden border-t border-line bg-surface-2/45 py-24 sm:py-32">
      <div
        aria-hidden
        className="bg-survey absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_75%_35%,black_20%,transparent_80%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_85%_40%,color-mix(in_oklab,var(--color-spruce)_11%,transparent),transparent_70%),radial-gradient(35%_40%_at_10%_90%,color-mix(in_oklab,var(--color-ice)_9%,transparent),transparent_70%)]"
      />
      {/* Mobile order: heading, form, extras. Desktop: heading and extras left, form right. */}
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16">
        <SectionHeading id="get-started-title" eyebrow="Get started" title="Get set before the first snowfall." className="lg:col-start-1 lg:row-start-1">
          <p>Book a walkthrough with your own properties, join the waitlist for early access, or ask us anything.</p>
        </SectionHeading>

        <div
          data-reveal
          id="lead-form"
          className="rounded-3xl border border-line-strong bg-surface p-5 shadow-stage sm:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start"
        >
          <LeadForm />
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <ul data-reveal className="grid gap-4">
            {EXPECT.map((item) => (
              <li key={item} className="flex gap-3.5 text-[15px] text-fg-2">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-spruce/15 text-spruce">
                  <Check aria-hidden className="size-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
