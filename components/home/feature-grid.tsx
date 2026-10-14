import type { ReactNode } from "react";
import { CloudSnow, ContactRound, CreditCard, Download, Maximize2, Printer, SlidersHorizontal } from "lucide-react";
import { PropertyScene, PropertyTraces } from "@/components/illustrations/property-scene";
import { StreetMap } from "@/components/illustrations/street-map";
import { StatusPill } from "@/components/mockups/app-frame";
import { SectionHeading } from "@/components/section-heading";
import { sampleQuote } from "@/lib/sample-quote";

function Tile({
  index,
  title,
  children,
  visual,
  tone = "spruce",
  className = "",
  delay = 0,
}: {
  index: string;
  title: string;
  children: ReactNode;
  visual: ReactNode;
  tone?: "spruce" | "ice";
  className?: string;
  delay?: number;
}) {
  return (
    <div data-reveal style={{ "--delay": `${delay}ms` } as React.CSSProperties} className={className}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-colors duration-300 hover:border-spruce/45">
        <div aria-hidden className="relative h-56 overflow-hidden border-b border-line bg-surface-2/60">
          {visual}
        </div>
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

function DispatchVisual() {
  const jobs = [
    ["04:10", "18 Juniper Cres.", "Done", "success"],
    ["04:40", "77 Birchwood Ln", "In progress", "info"],
    ["05:20", "35 Maple Hollow", "Delayed", "warning"],
  ] as const;
  return (
    <div className="absolute inset-0 grid gap-5 p-6 sm:grid-cols-[1.3fr_1fr]">
      <ul className="grid content-center gap-2">
        {jobs.map(([time, property, status, tone]) => (
          <li
            key={time}
            className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2.5 text-[13px] shadow-[0_1px_2px_rgb(10_30_20/0.04)] transition-transform duration-300 motion-safe:group-hover:translate-x-1"
          >
            <span className="font-mono text-[12px] text-fg-3">{time}</span>
            <span className="truncate font-medium text-fg">{property}</span>
            <span className="ml-auto">
              <StatusPill tone={tone}>{status}</StatusPill>
            </span>
          </li>
        ))}
      </ul>
      <div className="hidden flex-col justify-center rounded-xl border border-line bg-surface p-4 shadow-[0_1px_2px_rgb(10_30_20/0.04)] sm:flex">
        <p className="font-mono text-[10px] tracking-[0.14em] text-fg-3 uppercase">Storm 03 · 05:24</p>
        <p className="mt-2 font-wide text-3xl font-semibold text-snow">
          38<span className="text-lg text-fg-3"> / 52</span>
        </p>
        <p className="text-[12px] text-fg-2">jobs done</p>
        <div className="mt-3 flex h-1.5 gap-0.5 overflow-hidden rounded-full bg-surface-3">
          <span className="bg-spruce" style={{ width: "73%" }} />
          <span className="bg-ice" style={{ width: "17%" }} />
          <span className="bg-warning" style={{ width: "10%" }} />
        </div>
      </div>
    </div>
  );
}

function ContractsVisual() {
  const rows = [
    ["Hollis Residence", "Snow & lawn", sampleQuote.total, "Active", "success"],
    ["Frostline Plaza", "Snow", "$26,750.00", "Pending", "warning"],
    ["Birchwood Dental", "Lawn", "$4,980.00", "Active", "success"],
  ] as const;
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-1.5 px-5">
      <div className="mb-1 flex gap-1.5 text-[11px]">
        <span className="inline-flex items-center gap-1 rounded-md border border-line bg-surface px-2 py-1 text-fg-2">
          <SlidersHorizontal aria-hidden className="size-3 text-spruce" /> Filter · 2
        </span>
        <span className="rounded-md border border-line bg-surface px-2 py-1 text-fg-2">2026–27</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-md border border-line bg-surface px-2 py-1 text-fg-2">
          <Download aria-hidden className="size-3 text-spruce" /> CSV
        </span>
      </div>
      {rows.map(([client, service, price, status, tone]) => (
        <div key={client} className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] leading-tight font-medium text-fg">{client}</p>
            <p className="text-[11px] leading-tight text-fg-3">{service}</p>
          </div>
          <StatusPill tone={tone}>{status}</StatusPill>
          <p className="w-[5.5rem] text-right font-mono text-[12px] text-fg tabular-nums">{price}</p>
        </div>
      ))}
    </div>
  );
}

const BRANDS = [
  { name: "Snowlawna", initial: "S", bg: "#0d1b14", fg: "#56ca8b", bar: "#14633a" },
  { name: "Northline Snow Co.", initial: "N", bg: "#2a1c0b", fg: "#f2a33a", bar: "#d9821b" },
  { name: "Rideau Greenworks", initial: "R", bg: "#12261a", fg: "#8fd18a", bar: "#2e8b57" },
];

function BrandingVisual() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2.5 p-5">
      {BRANDS.map((brand, i) => (
        <div
          key={brand.name}
          className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-2 shadow-[0_1px_2px_rgb(10_30_20/0.04)] transition-transform duration-300 motion-safe:group-hover:translate-x-1"
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <span
            className="flex size-8 items-center justify-center rounded-lg font-wide text-sm font-bold"
            style={{ backgroundColor: brand.bg, color: brand.fg, boxShadow: `inset 0 0 0 1px ${brand.fg}40` }}
          >
            {brand.initial}
          </span>
          <span className="truncate text-[13px] font-medium text-fg">{brand.name}</span>
          <span className="ml-auto h-6 w-14 rounded-md" style={{ backgroundColor: brand.bar }} />
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
          <Tile index="01 · Dispatch" title="Storm-day dispatch" tone="ice" visual={<DispatchVisual />} className="md:col-span-2">
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
          <Tile index="04 · Contracts" title="Seasonal contracts" tone="ice" delay={80} visual={<ContractsVisual />}>
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
