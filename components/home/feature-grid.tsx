import type { ReactNode } from "react";
import Image from "next/image";
import { CloudSnow, ContactRound, CreditCard, Download, Maximize2, Printer } from "lucide-react";
import { Mark } from "@/components/brand/logo";
import { GreenworksMark, HarbourMark, NorthlineMark } from "@/components/home/example-marks";
import { PropertyScene, PropertyTraces } from "@/components/illustrations/property-scene";
import { StreetMap } from "@/components/illustrations/street-map";
import { SectionHeading } from "@/components/section-heading";
import { sampleQuote } from "@/lib/sample-quote";

type TileProps = {
  index: string;
  title: string;
  children: ReactNode;
  tone?: "spruce" | "ice";
  className?: string;
  delay?: number;
} & (
  | {
      visual: ReactNode;
      imageSrc?: never;
      imageAlt?: never;
      imageSizes?: never;
      chip?: never;
    }
  | {
      visual?: never;
      imageSrc: string;
      imageAlt: string;
      imageSizes?: string;
      chip?: string;
    }
);

function Tile({
  index,
  title,
  children,
  visual,
  imageSrc,
  imageAlt,
  imageSizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
  chip,
  tone = "spruce",
  className = "",
  delay = 0,
}: TileProps) {
  return (
    <div data-reveal style={{ "--delay": `${delay}ms` } as React.CSSProperties} className={className}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card hover:border-spruce/45 motion-safe:transition-colors motion-safe:duration-300">
        {imageSrc ? (
          <div className="relative h-56 overflow-hidden border-b border-line bg-surface-2">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes={imageSizes}
              loading="lazy"
              className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent"
            />
            {chip && (
              <span
                aria-hidden
                className="pointer-events-none absolute right-3.5 bottom-3.5 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/95 px-3 py-1 font-mono text-[11px] font-medium text-snow shadow-card backdrop-blur-md tabular-nums"
              >
                <span className={`size-1.5 rounded-full ${tone === "ice" ? "bg-ice" : "bg-spruce"}`} />
                {chip}
              </span>
            )}
          </div>
        ) : (
          <div aria-hidden className="relative h-56 overflow-hidden border-b border-line bg-surface-2/60">
            {visual}
          </div>
        )}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.14em] text-fg-3 uppercase">
            <span aria-hidden className={`size-1.5 rounded-full ${tone === "ice" ? "bg-ice" : "bg-spruce"}`} />
            {index}
          </p>
          <h3 className="mt-2.5 font-wide text-xl font-semibold tracking-[-0.01em] text-snow">{title}</h3>
          <p className="mt-2.5 text-[15px] leading-relaxed text-fg-2">{children}</p>
        </div>
      </article>
    </div>
  );
}

const BRANDS = [
  { name: "Snowlawna", Logo: Mark, bar: "#14633a" },
  { name: "Northline Snow Co.", Logo: NorthlineMark, bar: "#d9821b" },
  { name: "Rideau Greenworks", Logo: GreenworksMark, bar: "#2e8b57" },
  { name: "Harbour & Pine", Logo: HarbourMark, bar: "#df8a62" },
];

function BrandingVisual() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2 px-5 py-3.5">
      {BRANDS.map(({ name, Logo, bar }, i) => (
        <div
          key={name}
          className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-1.5 shadow-[0_1px_2px_rgb(10_30_20/0.04)] transition-transform duration-300 motion-safe:group-hover:translate-x-1"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <Logo className="size-7 shrink-0" />
          <span className="truncate text-[13px] font-medium text-fg">{name}</span>
          <span className="ml-auto h-5 w-12 shrink-0 rounded-md" style={{ backgroundColor: bar }} />
        </div>
      ))}
    </div>
  );
}

const EXTRAS = [
  { Icon: ContactRound, title: "Client records", text: "Contacts, properties and linked contracts in one place." },
  { Icon: CreditCard, title: "Billing & device licenses", text: "Subscription usage, device licenses and invoice summaries." },
  { Icon: CloudSnow, title: "Weather at a glance", text: "Temperature and conditions in the top bar, refreshed every 15 minutes." },
  { Icon: Printer, title: "Printable quote links", text: "A clean share page your customer can open and print." },
  { Icon: Download, title: "CSV & text exports", text: "Take contract lists and summaries wherever you need them." },
  { Icon: Maximize2, title: "Full-screen maps", text: "Blow the live map up to fill the dispatch desk's screen." },
];

export function FeatureGrid() {
  return (
    <section id="features" aria-labelledby="features-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="hairline-x absolute inset-x-0 top-0 h-px" />
      <div className="wrap">
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeading id="features-title" eyebrow="Features" title="Everything a seasonal operation runs on." />
          <p data-reveal className="max-w-md text-lg leading-relaxed text-fg-2 lg:justify-self-end">
            Five core tools that share one set of clients, properties and routes, so nothing gets typed in twice.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Tile
            index="01 · Dispatch"
            title="Storm-day dispatch"
            tone="ice"
            imageSrc="/features/dispatch.webp"
            imageAlt="Plow truck clearing a snowy residential street at dusk under streetlights"
            imageSizes="(min-width: 1024px) 66vw, 100vw"
            chip="38/52 done"
            className="md:col-span-2"
          >
            See every job for the day, who&apos;s on it and what&apos;s running late. Change a schedule, status or note and
            the whole office sees it.
          </Tile>
          <Tile
            index="02 · Maps"
            title="Live & prospecting maps"
            tone="spruce"
            delay={80}
            visual={<StreetMap className="absolute inset-0 size-full" viewBox="250 20 500 330" labels={false} animate />}
          >
            Routes, vehicles, crews and contracted properties on one map, with traffic, picket and visit overlays and a
            full-screen mode.
          </Tile>
          <Tile
            index="03 · Measure-to-quote"
            title="Measure from satellite"
            tone="spruce"
            visual={
              <>
                <PropertyScene season="summer" idPrefix="feature" viewBox="20 236 560 300" className="absolute inset-0 size-full" />
                <PropertyTraces viewBox="20 236 560 300" className="absolute inset-0 size-full" />
                <span className="absolute right-4 bottom-4 rounded-xl border border-line-strong bg-surface/95 px-3 py-2 shadow-md backdrop-blur">
                  <span className="block font-mono text-[10px] tracking-[0.14em] text-fg-3 uppercase">Seasonal total</span>
                  <span className="font-wide text-lg font-semibold text-snow tabular-nums">{sampleQuote.total}</span>
                </span>
              </>
            }
          >
            Trace lawns, snow surfaces, driveways and walkways on satellite imagery. Areas, line items and the total
            update as you draw.
          </Tile>
          <Tile
            index="04 · Contracts"
            title="Seasonal contracts"
            tone="ice"
            delay={80}
            imageSrc="/features/contracts.webp"
            imageAlt="Landscaping crew member mowing a striped green lawn in front of a house in summer"
            chip="Snow & lawn · Active"
          >
            Every Snow, Lawn and Snow &amp; lawn contract, with nine filters, instant search, status tracking and
            exports.
          </Tile>
          <Tile index="05 · Branding" title="Multi-company branding" tone="spruce" delay={160} visual={<BrandingVisual />}>
            Each company on Snowlawna gets its own logo, colors and tagline across the workspace, sign-in, maps and
            customer quotes.
          </Tile>
        </div>

        <div data-reveal className="mt-16">
          <h3 className="font-mono text-[11px] font-medium tracking-[0.14em] text-fg-3 uppercase">Also in the workspace</h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXTRAS.map(({ Icon, title, text }) => (
              <li
                key={title}
                className="flex gap-4 rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_2px_rgb(10_30_20/0.03)]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-spruce/20 bg-spruce/10 text-spruce">
                  <Icon aria-hidden className="size-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-semibold text-snow">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-2">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
