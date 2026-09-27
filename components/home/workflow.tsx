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

// Stops fade from ice (winter) to spruce (lawn) along the route.
const STOP_COLORS = ["#92c6d2", "#88c3c1", "#7fc0b0", "#76bea0", "#6cbb91"];

export function Workflow() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="hairline-x absolute inset-x-0 top-0 h-px" />
      <div
        aria-hidden
        className="bg-survey absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent_75%)] opacity-70"
      />
      <div className="wrap">
        <SectionHeading id="how-title" eyebrow="How it works" tone="spruce" title="From satellite trace to scheduled crew.">
          <p>The same property flows from quote to contract to route without anyone retyping an address.</p>
        </SectionHeading>

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-8">
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-[21px] w-0.5 bg-linear-to-b from-ice to-spruce opacity-40 lg:top-[21px] lg:right-[10%] lg:bottom-auto lg:left-[22px] lg:h-0.5 lg:w-auto lg:bg-linear-to-r"
          />
          {STEPS.map(({ Icon, title, text }, i) => (
            <li
              key={title}
              data-reveal
              style={{ "--delay": `${i * 110}ms` } as CSSProperties}
              className="relative grid grid-cols-[44px_1fr] gap-x-5 lg:block"
            >
              <span
                className="relative z-10 flex size-11 items-center justify-center rounded-full border-2 bg-canvas shadow-[0_0_0_6px_var(--color-canvas)]"
                style={{ borderColor: STOP_COLORS[i], color: STOP_COLORS[i] }}
              >
                <Icon aria-hidden className="size-[18px]" strokeWidth={1.9} />
              </span>
              <div className="lg:mt-6">
                <p className="font-mono text-[11px] tracking-[0.14em] text-fg-3 uppercase">Stop {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1.5 text-lg leading-snug font-semibold text-snow">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
