import type { CSSProperties } from "react";
import { ArrowRight, Snowflake } from "lucide-react";
import { SeasonSplit } from "@/components/home/season-split";
import { IntentLink } from "@/components/intent-link";
import { ButtonArrow, DemoAppLink, buttonClass } from "@/components/ui/button";
import { sampleQuote } from "@/lib/sample-quote";
import { site } from "@/lib/site";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

function EstimateCard({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      style={style}
      className={`w-[17.5rem] rounded-2xl border border-line-strong bg-surface/95 p-4 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.85)] backdrop-blur-md ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-fg-3 uppercase">Seasonal estimate</p>
        <span className="rounded-full bg-spruce/12 px-2 py-0.5 text-[10px] font-medium text-success">Ready to send</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-fg">{sampleQuote.address}</p>
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
          <dd className="font-mono text-spruce tabular-nums">{sampleQuote.discount.amount}</dd>
        </div>
      </dl>
      <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
        <span className="text-xs text-fg-2">Total / season</span>
        <span className="font-wide text-lg font-semibold text-snow tabular-nums">{sampleQuote.total}</span>
      </div>
    </div>
  );
}

function DispatchChip({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      style={style}
      className={`w-[15.5rem] rounded-2xl border border-line-strong bg-surface/95 p-3.5 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.85)] backdrop-blur-md ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="relative flex size-2.5">
          <span className="anim-ping absolute inset-0 rounded-full bg-spruce" />
          <span className="relative size-2.5 rounded-full bg-spruce" />
        </span>
        <p className="text-[13px] font-semibold text-fg">Route 3 · Plow 12</p>
        <span className="ml-auto font-mono text-[11px] text-fg-3">04:52</span>
      </div>
      <p className="mt-1 pl-5 text-xs text-fg-2">En route · 9 of 14 stops</p>
      <div className="mt-2.5 ml-5 h-1 overflow-hidden rounded-full bg-surface-3">
        <div className="h-full w-[64%] rounded-full bg-linear-to-r from-ice-deep to-ice" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      {/* Survey grid and the cold light of a pre-dawn dispatch room */}
      <div
        aria-hidden
        className="bg-survey absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_60%_0%,black_20%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_45%_at_78%_22%,rgb(146_198_210/0.11),transparent_70%),radial-gradient(35%_35%_at_95%_75%,rgb(108_187_145/0.07),transparent_70%)]"
      />

      <div className="wrap grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-12 xl:gap-16">
        <div className="max-w-xl">
          <IntentLink
            intent="waitlist"
            className="anim-rise group inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/70 py-1 pr-3 pl-1 text-xs text-fg-2 backdrop-blur transition-colors hover:border-fg-3/60 hover:text-fg"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-ice/12 px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.12em] text-ice uppercase">
              <Snowflake aria-hidden className="size-3" /> New
            </span>
            Early access for the 2026–27 winter
            <ArrowRight aria-hidden className="size-3.5 transition-transform motion-safe:group-hover:translate-x-0.5" />
          </IntentLink>

          <h1
            id="hero-title"
            className="mt-7 font-wide text-[clamp(2.6rem,1rem+6vw,4.25rem)] leading-[0.95] font-bold tracking-[-0.035em] text-snow lg:text-[clamp(3.25rem,0.9rem+4.1vw,4.4rem)]"
          >
            <span className="anim-rise block" style={delay(80)}>
              Two seasons<span className="text-ice">.</span>
            </span>
            <span className="anim-rise block" style={delay(180)}>
              One operation<span className="text-spruce">.</span>
            </span>
          </h1>

          <p className="anim-rise mt-7 max-w-[34rem] text-lg leading-relaxed text-fg-2 sm:text-xl" style={delay(300)}>
            Snowlawna is the operations board for lawn and snow contractors. Dispatch crews, measure properties from
            satellite imagery, send seasonal quotes and keep every contract on track, all under your own brand.
          </p>

          <div className="anim-rise mt-9 grid gap-3 sm:flex sm:flex-wrap sm:items-center" style={delay(420)}>
            <IntentLink intent="demo" className={buttonClass({ size: "lg" })}>
              Book a demo
              <ButtonArrow />
            </IntentLink>
            <DemoAppLink href={site.demoAppUrl} size="lg" />
          </div>

          <p className="anim-rise mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fg-3" style={delay(520)}>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-spruce" />
              Explore the live demo without signing in.
            </span>
            <IntentLink intent="waitlist" className="text-ice underline-offset-4 hover:underline">
              Or join the waitlist
            </IntentLink>
          </p>
        </div>

        <div className="relative xl:-mr-10">
          <div className="anim-float" style={delay(150)}>
            <SeasonSplit />
          </div>
          <EstimateCard
            style={delay(750)}
            className="anim-float relative z-10 mx-auto -mt-12 sm:absolute sm:-bottom-14 sm:-left-6 sm:mx-0 sm:mt-0 lg:relative lg:bottom-auto lg:left-auto lg:mx-auto lg:-mt-12 xl:absolute xl:-bottom-14 xl:-left-12 xl:mx-0 xl:mt-0"
          />
          <DispatchChip style={delay(950)} className="anim-float absolute -top-6 right-3 z-10 hidden sm:block lg:hidden xl:-right-2 xl:block" />
        </div>
      </div>
    </section>
  );
}
