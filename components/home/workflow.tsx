import type { CSSProperties } from "react";
import { FilePenLine, MapPin, Ruler, Send, Truck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const STEPS = [
  {
    Icon: MapPin,
    title: "Find the property",
    text: "Search an address or use your location. The map flies in on satellite imagery and drops a pin.",
  },
  {
    Icon: Ruler,
    title: "Trace what you'll service",
    text: "Outline lawn areas and snow surfaces, then draw driveways and walkways. Areas and lengths are calculated as you go.",
  },
  {
    Icon: Send,
    title: "Send the estimate",
    text: "Pick Snow, Lawn or Snow & lawn and share a link with the traced property, line items and seasonal total.",
  },
  {
    Icon: FilePenLine,
    title: "Win the contract",
    text: "Mark the quote paid and Snowlawna creates the client and an active contract at the quoted price.",
  },
  {
    Icon: Truck,
    title: "Roll the crew",
    text: "The property lands on a route, ready for dispatch the next time it snows or the grass needs cutting.",
  },
];

// Stops blend from winter charcoal to lawn spruce using theme tokens so contrast stays high in both modes.
const STOP_COLORS = [
  "var(--color-fg)",
  "color-mix(in oklab, var(--color-fg) 75%, var(--color-spruce))",
  "color-mix(in oklab, var(--color-fg) 50%, var(--color-spruce))",
  "color-mix(in oklab, var(--color-fg) 25%, var(--color-spruce))",
  "var(--color-spruce)",
];

export function Workflow() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative overflow-hidden border-y border-line bg-surface-2/40 py-24 sm:py-32">
      <div
        aria-hidden
        className="bg-survey absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,black,transparent_80%)] opacity-80"
      />
      <div className="wrap">
        <SectionHeading id="how-title" eyebrow="How it works" title="From satellite trace to scheduled crew.">
          <p>The same property flows from quote to contract to route without anyone retyping an address.</p>
        </SectionHeading>

        <ol className="relative mt-16 grid gap-6 lg:grid-cols-5 lg:gap-5">
          <span
            aria-hidden
            className="pointer-events-none absolute top-6 bottom-6 left-[27px] hidden w-0.5 bg-linear-to-b from-fg to-spruce opacity-35 lg:top-[38px] lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:block lg:h-0.5 lg:w-auto lg:bg-linear-to-r"
          />
          {STEPS.map(({ Icon, title, text }, i) => (
            <li
              key={title}
              data-reveal
              style={{ "--delay": `${i * 100}ms` } as CSSProperties}
              className="relative"
            >
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="relative z-10 flex size-11 items-center justify-center rounded-xl border-2 bg-surface shadow-sm"
                    style={{ borderColor: STOP_COLORS[i], color: STOP_COLORS[i] }}
                  >
                    <Icon aria-hidden className="size-[18px]" strokeWidth={2} />
                  </span>
                  <span className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.14em] text-fg-3 uppercase">
                    Stop {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-wide text-lg leading-snug font-semibold text-snow">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
