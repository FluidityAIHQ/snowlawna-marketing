import type { CSSProperties } from "react";
import { ArrowRight, Compass, Snowflake, Sprout } from "lucide-react";
import { SeasonSplit } from "@/components/home/season-split";
import { IntentLink } from "@/components/intent-link";
import { ButtonArrow, DemoAppLink, buttonClass } from "@/components/ui/button";
import { sampleQuote } from "@/lib/sample-quote";
import { site } from "@/lib/site";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

const HIGHLIGHTS = [
  { label: "Satellite measure", detail: "Trace lawns & snow once", tone: "spruce" },
  { label: "Seasonal quotes", detail: "Snow, Lawn or combined", tone: "ice" },
  { label: "Storm & turf dispatch", detail: "One board all year", tone: "spruce" },
] as const;

function EstimateCard({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      style={style}
      className={`w-[18rem] rounded-2xl border border-line-strong bg-surface/95 p-4 shadow-float backdrop-blur-md ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-fg-3 uppercase">Seasonal estimate</p>
        <span className="rounded-full border border-spruce/25 bg-spruce/12 px-2 py-0.5 text-[10px] font-medium text-success">
          Ready to send
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold text-snow">{sampleQuote.address}</p>
      <p className="text-xs text-fg-3">{sampleQuote.service} · 2026–27 season</p>
      <dl className="mt-3 grid gap-1.5 border-t border-line pt-3 text-[12px]">
        {sampleQuote.lines.map((line) => (
          <div key={line.label} className="flex items-baseline justify-between gap-3">
            <dt className="text-fg-2">
              {line.label} <span className="font-mono text-[11px] text-fg-3">{line.qty}</span>
            </dt>
            <dd className="font-mono text-fg tabular-nums">{line.amount}</dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-fg-2">{sampleQuote.discount.label}</dt>
          <dd className="font-mono font-medium text-spruce tabular-nums">{sampleQuote.discount.amount}</dd>
        </div>
      </dl>
      <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
        <span className="text-xs font-medium text-fg-2">Total / season</span>
        <span className="font-wide text-lg font-bold text-snow tabular-nums">{sampleQuote.total}</span>
      </div>
    </div>
  );
}

function DispatchChip({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      style={style}
      className={`w-[16rem] rounded-2xl border border-line-strong bg-surface/95 p-3.5 shadow-float backdrop-blur-md ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="relative flex size-2.5">
          <span className="anim-ping absolute inset-0 rounded-full bg-spruce" />
          <span className="relative size-2.5 rounded-full bg-spruce" />
        </span>
        <p className="text-[13px] font-semibold text-snow">Route 3 · Plow 12</p>
        <span className="ml-auto font-mono text-[11px] text-fg-3">04:52</span>
      </div>
      <p className="mt-1 pl-5 text-xs text-fg-2">En route · 9 of 14 stops</p>
      <div className="mt-2.5 ml-5 h-1.5 overflow-hidden rounded-full bg-surface-3">
        <div className="h-full w-[64%] rounded-full bg-linear-to-r from-ice to-spruce" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      {/* Architectural survey grid and dual-season ambient light */}
      <div
        aria-hidden
        className="bg-survey absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_85%_75%_at_55%_10%,black_25%,transparent_80%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_45%_at_76%_20%,color-mix(in_oklab,var(--color-spruce)_13%,transparent),transparent_70%),radial-gradient(40%_40%_at_20%_15%,color-mix(in_oklab,var(--color-ice)_11%,transparent),transparent_70%)]"
      />

      <div className="wrap grid items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1.06fr)] lg:gap-12 xl:gap-16">
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
            <DemoAppLink href={site.demoAppUrl} size="lg" />
          </div>

          <p className="anim-rise mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fg-3" style={delay(500)}>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-full bg-spruce" />
              Explore the live demo without signing in.
            </span>
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

        <div className="relative xl:-mr-6">
          <div
            className="anim-float rounded-3xl border border-line-strong bg-surface/80 p-2.5 shadow-stage backdrop-blur-md sm:p-3"
            style={delay(150)}
          >
            <div className="mb-2.5 flex items-center justify-between gap-2 px-2 py-1 text-xs">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-fg-2">
                <Compass aria-hidden className="size-3.5 text-spruce" />
                {sampleQuote.address}
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-fg-3 uppercase">
                <span className="inline-flex items-center gap-1 text-ice">
                  <Snowflake aria-hidden className="size-3" /> Snow
                </span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1 text-spruce">
                  <Sprout aria-hidden className="size-3" /> Lawn
                </span>
              </span>
            </div>
            <SeasonSplit />
          </div>
          <EstimateCard
            style={delay(750)}
            className="anim-float relative z-10 mx-auto -mt-10 sm:absolute sm:-bottom-12 sm:-left-6 sm:mx-0 sm:mt-0 lg:relative lg:bottom-auto lg:left-auto lg:mx-auto lg:-mt-10 xl:absolute xl:-bottom-12 xl:-left-10 xl:mx-0 xl:mt-0"
          />
          <DispatchChip
            style={delay(950)}
            className="anim-float absolute -top-5 right-3 z-10 hidden sm:block lg:hidden xl:-right-3 xl:block"
          />
        </div>
      </div>
    </section>
  );
}
