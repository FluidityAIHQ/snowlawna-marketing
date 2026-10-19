import type { CSSProperties } from "react";
import { ArrowRight, Snowflake } from "lucide-react";
import { HeroVideo } from "@/components/home/hero-video";
import { SeasonSplit } from "@/components/home/season-split";
import { IntentLink } from "@/components/intent-link";
import { ButtonArrow, buttonClass } from "@/components/ui/button";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

const HIGHLIGHTS = [
  { label: "Satellite measure", detail: "Trace lawns & snow once", tone: "spruce" },
  { label: "Seasonal quotes", detail: "Snow, Lawn or combined", tone: "ice" },
  { label: "Storm & turf dispatch", detail: "One board all year", tone: "spruce" },
] as const;

export function Hero() {
  return (
    // Fills the screen, under the fixed header (pt-header), so the content centres in the space below it
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-viewport flex-col justify-center overflow-hidden pt-header"
    >
      {/* Snowfall footage under a canvas scrim (hero-scrim in globals.css) that keeps the copy readable */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <HeroVideo className="absolute inset-0 size-full object-cover" />
        <div className="hero-scrim absolute inset-0" />
      </div>
      {/* Architectural survey grid and dual-season ambient light */}
      <div
        aria-hidden
        className="bg-survey absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_85%_75%_at_55%_10%,black_25%,transparent_80%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_45%_at_76%_20%,color-mix(in_oklab,var(--color-spruce)_13%,transparent),transparent_70%),radial-gradient(40%_40%_at_20%_15%,color-mix(in_oklab,var(--color-ice)_11%,transparent),transparent_70%)]"
      />

      <div className="wrap grid items-center gap-14 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1.06fr)] lg:gap-12 lg:py-8 xl:gap-16">
        <div className="max-w-xl">
          <IntentLink
            intent="waitlist"
            className="anim-rise group inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/90 py-1 pr-3.5 pl-1.5 text-xs font-medium text-fg-2 shadow-card backdrop-blur transition-colors hover:border-spruce/50 hover:text-fg"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-spruce/12 px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-[0.12em] text-spruce uppercase">
              <Snowflake aria-hidden className="size-3" /> New
            </span>
            Early access for the 2026–27 winter
            <ArrowRight aria-hidden className="size-3.5 text-spruce transition-transform motion-safe:group-hover:translate-x-0.5" />
          </IntentLink>

          <h1
            id="hero-title"
            className="mt-7 font-wide text-[clamp(2.65rem,1rem+6vw,4.35rem)] leading-[0.95] font-bold tracking-[-0.035em] text-snow lg:text-[clamp(3.25rem,0.9rem+4.1vw,4.45rem)]"
          >
            <span className="anim-rise block" style={delay(80)}>
              Two seasons<span className="text-ice">.</span>
            </span>
            <span className="anim-rise block" style={delay(180)}>
              One operation<span className="text-spruce">.</span>
            </span>
          </h1>

          <p className="anim-rise mt-6 max-w-[34rem] text-lg leading-relaxed text-fg-2 sm:text-xl" style={delay(300)}>
            Snowlawna is the operations board for lawn and snow contractors. Dispatch crews, measure properties from
            satellite imagery, send seasonal quotes and keep every contract on track, all under your own brand.
          </p>

          <div className="anim-rise mt-8 grid gap-3 sm:flex sm:flex-wrap sm:items-center" style={delay(420)}>
            <IntentLink intent="demo" className={buttonClass({ size: "lg" })}>
              Book a demo
              <ButtonArrow />
            </IntentLink>
          </div>

          <p className="anim-rise mt-5 text-sm" style={delay(500)}>
            <IntentLink intent="waitlist" className="font-medium text-spruce underline-offset-4 hover:underline">
              Or join the waitlist
            </IntentLink>
          </p>

          <dl
            className="anim-rise mt-9 grid grid-cols-3 gap-2.5 border-t border-line pt-6"
            style={delay(580)}
          >
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="rounded-xl border border-line bg-surface/75 px-3 py-2.5 backdrop-blur-sm">
                <dt className="flex items-center gap-1.5 font-mono text-[10px] font-medium tracking-[0.1em] text-fg-3 uppercase">
                  <span
                    aria-hidden
                    className={`size-1.5 rounded-full ${item.tone === "spruce" ? "bg-spruce" : "bg-ice"}`}
                  />
                  {item.label}
                </dt>
                <dd className="mt-1 text-xs font-medium text-fg sm:text-[13px]">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative z-10 xl:-mr-6">
          <div className="anim-float" style={delay(150)}>
            <SeasonSplit />
          </div>
        </div>
      </div>
    </section>
  );
}
