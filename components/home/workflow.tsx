import type { ComponentType, CSSProperties } from "react";
import { FilePenLine, MapPin, Ruler, Send, Snowflake, Sprout, Truck } from "lucide-react";
import {
  FindPropertyPreview,
  RollCrewPreview,
  SendEstimatePreview,
  TracePropertyPreview,
  WinContractPreview,
  WorkflowStyles,
} from "@/components/home/workflow-visuals";
import { SectionHeading } from "@/components/section-heading";

type Step = {
  Icon: ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;
  stage: string;
  title: string;
  text: string;
  accent: string;
  iconColor: string;
  Preview: ComponentType;
};

const STEPS: readonly Step[] = [
  {
    Icon: MapPin,
    stage: "Locate",
    title: "Find the property",
    text: "Search an address or use your location. The map flies in on satellite imagery and drops a pin.",
    accent: "var(--scene-trace-stroke)",
    iconColor: "var(--wf-cyan-ink)",
    Preview: FindPropertyPreview,
  },
  {
    Icon: Ruler,
    stage: "Measure",
    title: "Trace what you'll service",
    text: "Outline lawn areas and snow surfaces, then draw driveways and walkways. Areas and lengths are calculated as you go.",
    accent: "var(--scene-trace-stroke)",
    iconColor: "var(--wf-cyan-ink)",
    Preview: TracePropertyPreview,
  },
  {
    Icon: Send,
    stage: "Quote",
    title: "Send the estimate",
    text: "Pick Snow, Lawn or Snow & lawn and share a link with the traced property, line items and seasonal total.",
    accent: "color-mix(in oklab, var(--scene-trace-stroke) 45%, var(--color-spruce))",
    iconColor: "color-mix(in oklab, var(--wf-cyan-ink) 50%, var(--color-spruce))",
    Preview: SendEstimatePreview,
  },
  {
    Icon: FilePenLine,
    stage: "Contract",
    title: "Win the contract",
    text: "Mark the quote paid and Snowlawna creates the client and an active contract at the quoted price.",
    accent: "var(--color-spruce)",
    iconColor: "var(--color-spruce)",
    Preview: WinContractPreview,
  },
  {
    Icon: Truck,
    stage: "Dispatch",
    title: "Roll the crew",
    text: "The property lands on a route, ready for dispatch the next time it snows or the grass needs cutting.",
    accent: "var(--color-spruce)",
    iconColor: "var(--color-spruce)",
    Preview: RollCrewPreview,
  },
];

export function Workflow() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="relative isolate overflow-hidden border-y border-line bg-surface-2/40 py-24 sm:py-32"
    >
      <WorkflowStyles />

      {/* Architectural survey grid and dual-season ambient glow */}
      <div
        aria-hidden
        className="bg-survey absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black,transparent_85%)] opacity-85"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_18%_28%,rgba(0,229,255,0.09),transparent_70%),radial-gradient(50%_50%_at_82%_68%,color-mix(in_oklab,var(--color-spruce)_12%,transparent),transparent_70%)]"
      />

      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="how-title" eyebrow="How it works" title="From satellite trace to scheduled crew.">
            <p>The same property flows from quote to contract to route without anyone retyping an address.</p>
          </SectionHeading>

          {/* Seasonal route legend pill */}
          <div
            data-reveal
            className="inline-flex items-center gap-3 rounded-full border border-line-strong/80 bg-surface/90 px-3.5 py-1.5 text-xs text-fg-2 shadow-card backdrop-blur-sm"
          >
            <span className="inline-flex items-center gap-1.5 font-medium text-fg">
              <Snowflake aria-hidden className="size-3.5 text-ice" />
              Snow
            </span>
            <span aria-hidden className="h-3 w-px bg-line-strong" />
            <span className="inline-flex items-center gap-1.5 font-medium text-fg">
              <span aria-hidden className="size-2 rounded-[2px] bg-[#00E5FF] ring-1 ring-black/20 shadow-[0_0_6px_#00E5FF]" />
              Satellite trace
            </span>
            <span aria-hidden className="h-3 w-px bg-line-strong" />
            <span className="inline-flex items-center gap-1.5 font-medium text-fg">
              <Sprout aria-hidden className="size-3.5 text-spruce" />
              Lawn
            </span>
          </div>
        </div>

        <ol className="relative mt-14 grid gap-6 lg:mt-16 lg:grid-cols-5 lg:gap-4 xl:gap-5">
          {/* Mobile / Tablet vertical route line connecting Stops 01–05 */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-6 bottom-6 left-[23px] w-3 -translate-x-1/2 overflow-hidden lg:hidden"
          >
            <span className="absolute inset-y-0 left-1/2 w-2.5 -translate-x-1/2 rounded-full bg-linear-to-b from-fg/15 via-[#00E5FF]/25 to-spruce/30 blur-[2px]" />
            <span className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-linear-to-b from-fg/55 via-[#00E5FF] to-spruce" />
            <span className="wf-connector-dash-y absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2" />
            <span className="wf-runner-y absolute left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00E5FF] shadow-[0_0_10px_2px_#00E5FF]" />
            <span className="wf-runner-y-delayed absolute left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-spruce shadow-[0_0_10px_2px_var(--color-spruce)]" />
          </div>

          {/* Desktop horizontal route line connecting Stops 01–05 */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-6 right-[10%] left-[10%] hidden h-3 -translate-y-1/2 overflow-hidden lg:block"
          >
            <span className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-linear-to-r from-fg/15 via-[#00E5FF]/25 to-spruce/30 blur-[2px]" />
            <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-linear-to-r from-fg/55 via-[#00E5FF] to-spruce" />
            <span className="wf-connector-dash-x absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2" />
            <span className="wf-runner-x absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00E5FF] shadow-[0_0_10px_2px_#00E5FF]" />
            <span className="wf-runner-x-delayed absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-spruce shadow-[0_0_10px_2px_var(--color-spruce)]" />
          </div>

          {STEPS.map(({ Icon, stage, title, text, accent, iconColor, Preview }, i) => {
            const stopNumber = String(i + 1).padStart(2, "0");
            return (
              <li
                key={title}
                data-reveal
                style={{ "--delay": `${i * 100}ms` } as CSSProperties}
                className="group/step relative flex flex-col pl-16 lg:pl-0"
              >
                {/* Route stop node on the track (left rail on mobile, top rail on desktop) */}
                <div className="absolute top-0 left-0 z-10 flex items-center lg:static lg:flex-col">
                  <div className="relative flex size-12 items-center justify-center">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-2xl border border-line-strong/75 bg-surface/80 shadow-sm backdrop-blur-sm motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover/step:scale-110"
                    />
                    <span
                      className="relative flex size-10 items-center justify-center rounded-xl border-2 bg-surface shadow-sm motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:group-hover/step:scale-105"
                      style={{
                        borderColor: accent,
                        color: iconColor,
                        boxShadow: `0 0 0 3px color-mix(in oklab, ${accent} 18%, transparent)`,
                      }}
                    >
                      <span
                        className="wf-step-icon flex items-center justify-center"
                        style={{ "--icon-delay": `${i * 220}ms` } as CSSProperties}
                      >
                        <Icon aria-hidden className="size-[18px]" strokeWidth={2.1} />
                      </span>
                    </span>
                  </div>

                  {/* Connector stem from route node into the card */}
                  <span
                    aria-hidden
                    className="h-[2px] w-4 lg:h-4 lg:w-[2px]"
                    style={{
                      backgroundColor: accent,
                      opacity: 0.6,
                    }}
                  />
                </div>

                {/* Step card */}
                <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card hover:border-spruce/50 hover:shadow-float motion-safe:transition-[transform,border-color,box-shadow] motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover/step:-translate-y-1.5 sm:grid sm:grid-cols-[216px_1fr] lg:flex lg:flex-col">
                  {/* Top seasonal accent bar */}
                  <span
                    aria-hidden
                    className="col-span-full h-1 w-full shrink-0"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${accent}, color-mix(in oklab, ${accent} 45%, var(--color-spruce)))`,
                    }}
                  />

                  {/* Visual preview stage */}
                  <div
                    aria-hidden
                    className="relative h-[148px] w-full shrink-0 overflow-hidden border-b border-line bg-surface-2/65 sm:h-full sm:min-h-[152px] sm:border-r sm:border-b-0 lg:h-[148px] lg:min-h-0 lg:border-r-0 lg:border-b"
                  >
                    <Preview />
                  </div>

                  {/* Step copy */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.14em] text-fg-2 uppercase">
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full ring-1 ring-black/15"
                          style={{ backgroundColor: accent }}
                        />
                        Stop {stopNumber}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.12em] text-fg-3 uppercase">
                        {stage}
                      </span>
                    </div>

                    <h3 className="mt-3.5 font-wide text-lg leading-snug font-semibold text-snow">
                      {title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-fg-2">
                      {text}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
