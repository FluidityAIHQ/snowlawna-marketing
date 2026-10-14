"use client";

import { useState, type CSSProperties } from "react";
import { FilePenLine, Headset, Map as MapIcon, Printer, Ruler } from "lucide-react";
import { Mark } from "@/components/brand/logo";
import { GreenworksMark, HarbourMark, NorthlineMark } from "@/components/home/example-marks";
import { sampleQuote } from "@/lib/sample-quote";

// Example companies (fictional) showing how one workspace takes on each customer's brand.
const TENANTS = [
  {
    id: "snowlawna",
    name: "Snowlawna",
    tagline: "Two seasons. One operation.",
    logo: Mark,
    primary: "#14633a",
    onPrimary: "#f6faf8",
    accent: "#136b3d",
    canvas: "#f6faf8",
    surface: "#ffffff",
    raised: "#ecf4f0",
    line: "#c4d8ce",
    fg: "#0c1a13",
    fg2: "#2d4438",
    fg3: "#486154",
  },
  {
    id: "northline",
    name: "Northline Snow Co.",
    tagline: "Cleared before you wake up.",
    logo: NorthlineMark,
    primary: "#f2a33a",
    onPrimary: "#1d1204",
    accent: "#f2a33a",
    canvas: "#100f0d",
    surface: "#181613",
    raised: "#211e19",
    line: "#312c24",
    fg: "#f4efe8",
    fg2: "#c8bfb2",
    fg3: "#9a9082",
  },
  {
    id: "greenworks",
    name: "Rideau Greenworks",
    tagline: "Lawns that look after themselves.",
    logo: GreenworksMark,
    primary: "#6cd488",
    onPrimary: "#08170b",
    accent: "#6cd488",
    canvas: "#0c120e",
    surface: "#121a14",
    raised: "#18241b",
    line: "#26362a",
    fg: "#eaf5ec",
    fg2: "#b4cbb9",
    fg3: "#829c88",
  },
  {
    id: "harbour",
    name: "Harbour & Pine",
    tagline: "Property care, every season.",
    logo: HarbourMark,
    primary: "#ebdfca",
    onPrimary: "#241d12",
    accent: "#df8a62",
    canvas: "#11100f",
    surface: "#1a1816",
    raised: "#221f1c",
    line: "#332f2a",
    fg: "#f3eee8",
    fg2: "#c6bdb3",
    fg3: "#968d83",
  },
] as const;

type Tenant = (typeof TENANTS)[number];

const NAV = [
  { label: "Contracts", Icon: FilePenLine },
  { label: "Quotations", Icon: Ruler },
  { label: "Live map", Icon: MapIcon },
  { label: "Dispatch", Icon: Headset },
];

const themeVars = (tenant: Tenant) =>
  ({
    "--t-primary": tenant.primary,
    "--t-on-primary": tenant.onPrimary,
    "--t-accent": tenant.accent,
    "--t-canvas": tenant.canvas,
    "--t-surface": tenant.surface,
    "--t-raised": tenant.raised,
    "--t-line": tenant.line,
    "--t-fg": tenant.fg,
    "--t-fg-2": tenant.fg2,
    "--t-fg-3": tenant.fg3,
  }) as CSSProperties;

const themed = "transition-[background-color,border-color,color,box-shadow] duration-500";

function TenantMark({ tenant, size = "md" }: { tenant: Tenant; size?: "sm" | "md" }) {
  const Logo = tenant.logo;
  return <Logo className={`shrink-0 ${size === "sm" ? "size-7" : "size-9"}`} />;
}

const RECENT = [
  ["402 Aspen Row", "Sent"],
  ["77 Birchwood Ln", "Paid"],
  ["9 Cedar Bend", "Draft"],
] as const;

const THUMB_CORNERS = [
  [14, 12],
  [92, 10],
  [96, 40],
  [16, 44],
];

/** Small traced-property thumbnail drawn in the tenant's accent colour. */
function TraceThumb({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-lg border border-[var(--t-line)] bg-[var(--t-raised)] p-2 ${themed} ${className}`}>
      <svg viewBox="0 0 160 60" className="h-14 w-full" aria-hidden>
        <polygon
          points="14,12 92,10 96,40 16,44"
          fill="var(--t-accent)"
          fillOpacity="0.16"
          stroke="var(--t-accent)"
          strokeWidth="1.5"
          className={themed}
        />
        <polyline points="118,10 118,52" stroke="var(--t-accent)" strokeWidth="2" strokeDasharray="4 3" className={themed} />
        {THUMB_CORNERS.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x - 2.5} y={y - 2.5} width="5" height="5" rx="1" fill="var(--t-fg)" />
        ))}
      </svg>
    </div>
  );
}

export function BrandingSwitcher() {
  const [tenantId, setTenantId] = useState<Tenant["id"]>("snowlawna");
  const tenant = TENANTS.find((t) => t.id === tenantId) ?? TENANTS[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
      <fieldset>
        <legend className="font-mono text-[11px] font-medium tracking-[0.14em] text-fg-3 uppercase">Try an example brand</legend>
        <div className="mt-4 grid gap-2.5">
          {TENANTS.map((option) => (
            <label
              key={option.id}
              style={themeVars(option)}
              className="flex cursor-pointer items-center gap-3.5 rounded-xl border border-line bg-surface px-4 py-3 shadow-card transition-colors hover:border-line-strong has-[:checked]:border-spruce/60 has-[:checked]:bg-surface-2 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-spruce"
            >
              <input
                type="radio"
                name="example-brand"
                value={option.id}
                checked={option.id === tenantId}
                onChange={() => setTenantId(option.id)}
                className="sr-only"
              />
              <TenantMark tenant={option} />
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-semibold text-snow">{option.name}</span>
                <span className="block truncate text-[13px] text-fg-3">{option.tagline}</span>
              </span>
              <span aria-hidden className="ml-auto flex gap-1.5">
                <span className="size-3.5 rounded-full ring-1 ring-line-strong" style={{ backgroundColor: option.primary }} />
                <span className="size-3.5 rounded-full ring-1 ring-line-strong" style={{ backgroundColor: option.accent }} />
              </span>
            </label>
          ))}
        </div>
        <p className="mt-4 text-xs text-fg-3">Example companies for illustration.</p>
      </fieldset>

      <div
        role="img"
        aria-label={`${tenant.name}'s workspace and customer quote, in the company's own colors and logo.`}
        style={themeVars(tenant)}
        className="grid gap-4 sm:grid-cols-[1.15fr_1fr]"
      >
        {/* Workspace */}
        <div className={`overflow-hidden rounded-2xl border border-[var(--t-line)] bg-[var(--t-canvas)] shadow-stage ${themed}`}>
          <div className={`flex items-center gap-2.5 border-b border-[var(--t-line)] px-4 py-3 ${themed}`}>
            <TenantMark tenant={tenant} size="sm" />
            <span className={`truncate text-[13px] font-semibold text-[var(--t-fg)] ${themed}`}>{tenant.name}</span>
            <span className={`ml-auto font-mono text-[10px] tracking-[0.14em] text-[var(--t-fg-3)] uppercase ${themed}`}>Workspace</span>
          </div>
          <div className="flex">
            <ul className="grid w-32 shrink-0 content-start gap-0.5 border-r border-[var(--t-line)] p-2 text-[12px]">
              {NAV.map(({ label, Icon }, i) => (
                <li
                  key={label}
                  className={`relative flex items-center gap-2 rounded-md px-2 py-1.5 ${themed} ${
                    i === 1 ? "bg-[var(--t-raised)] font-medium text-[var(--t-fg)]" : "text-[var(--t-fg-3)]"
                  }`}
                >
                  {i === 1 && <span className={`absolute inset-y-1.5 -left-2 w-0.5 rounded-full bg-[var(--t-accent)] ${themed}`} />}
                  <Icon aria-hidden className={`size-3.5 ${i === 1 ? "text-[var(--t-accent)]" : ""} ${themed}`} />
                  {label}
                </li>
              ))}
            </ul>
            <div className="min-w-0 flex-1 p-3.5">
              <p className={`text-[11px] text-[var(--t-fg-3)] ${themed}`}>Quotations</p>
              <p className={`truncate text-[13px] font-semibold text-[var(--t-fg)] ${themed}`}>{sampleQuote.address}</p>
              <TraceThumb className="mt-3" />
              <span
                className={`mt-3 inline-flex h-7 w-full items-center justify-center rounded-md bg-[var(--t-primary)] text-[12px] font-medium text-[var(--t-on-primary)] ${themed}`}
              >
                Send quote
              </span>
              <ul className="mt-4 grid gap-1.5 border-t border-[var(--t-line)] pt-3 text-[11.5px]">
                {RECENT.map(([address, state]) => (
                  <li key={address} className="flex items-center justify-between gap-2">
                    <span className={`truncate text-[var(--t-fg-2)] ${themed}`}>{address}</span>
                    <span className={`shrink-0 text-[10.5px] font-medium ${state === "Paid" ? "text-[var(--t-accent)]" : "text-[var(--t-fg-3)]"} ${themed}`}>
                      {state}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Customer-facing quote */}
        <div className={`flex flex-col overflow-hidden rounded-2xl border border-[var(--t-line)] bg-[var(--t-surface)] shadow-stage ${themed}`}>
          <div className={`h-1.5 bg-[var(--t-accent)] ${themed}`} />
          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-center gap-2.5">
              <TenantMark tenant={tenant} size="sm" />
              <div className="min-w-0">
                <p className={`truncate text-[13px] font-semibold text-[var(--t-fg)] ${themed}`}>{tenant.name}</p>
                <p className={`truncate text-[11px] text-[var(--t-fg-3)] ${themed}`}>{tenant.tagline}</p>
              </div>
            </div>
            <p className={`mt-4 font-mono text-[10px] tracking-[0.14em] text-[var(--t-fg-3)] uppercase ${themed}`}>Your seasonal estimate</p>
            <p className={`mt-1 text-[13px] text-[var(--t-fg-2)] ${themed}`}>{sampleQuote.address}</p>
            <TraceThumb className="mt-3" />
            <dl className="mt-3 grid gap-1 text-[11.5px]">
              {sampleQuote.lines.map((line) => (
                <div key={line.label} className="flex justify-between gap-2">
                  <dt className={`text-[var(--t-fg-3)] ${themed}`}>{line.label}</dt>
                  <dd className={`font-mono text-[var(--t-fg-2)] tabular-nums ${themed}`}>{line.amount}</dd>
                </div>
              ))}
            </dl>
            <div className={`mt-3 flex items-baseline justify-between border-t border-[var(--t-line)] pt-3 ${themed}`}>
              <span className={`text-[11px] text-[var(--t-fg-3)] ${themed}`}>Season total</span>
              <span className={`font-wide text-lg font-semibold text-[var(--t-fg)] tabular-nums ${themed}`}>{sampleQuote.total}</span>
            </div>
            <div className="mt-auto pt-4">
              <span
                className={`inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-md bg-[var(--t-primary)] text-[12px] font-medium text-[var(--t-on-primary)] ${themed}`}
              >
                <Printer aria-hidden className="size-3.5" /> Print estimate
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
