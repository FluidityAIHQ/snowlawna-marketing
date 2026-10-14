import type { ReactNode } from "react";
import {
  CloudSnow,
  ContactRound,
  CreditCard,
  FilePenLine,
  Headset,
  Lock,
  Map as MapIcon,
  Palette,
  Radar,
  Ruler,
  Search,
  type LucideIcon,
} from "lucide-react";
import { Mark } from "@/components/brand/logo";

// Static replicas of the product's workspace chrome, used as "screenshots" on the marketing site.

export type NavKey = "contracts" | "quotations" | "clients" | "prospecting" | "map" | "dispatch" | "billing" | "branding";

const NAV: { group: string; items: [NavKey, string, LucideIcon][] }[] = [
  {
    group: "Sales",
    items: [
      ["contracts", "Contracts", FilePenLine],
      ["quotations", "Quotations", Ruler],
      ["clients", "Clients", ContactRound],
      ["prospecting", "Prospecting", Radar],
    ],
  },
  {
    group: "Operations",
    items: [
      ["map", "Live map", MapIcon],
      ["dispatch", "Dispatch", Headset],
    ],
  },
  {
    group: "Account",
    items: [
      ["billing", "Billing", CreditCard],
      ["branding", "Branding", Palette],
    ],
  },
];

type Tone = "success" | "info" | "neutral" | "warning" | "danger";

const toneClass: Record<Tone, string> = {
  success: "bg-spruce/12 text-success",
  info: "bg-ice/12 text-ice",
  neutral: "bg-surface-3 text-fg-2",
  warning: "bg-warning/12 text-warning",
  danger: "bg-danger/12 text-danger",
};

export function StatusPill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] leading-4 font-medium whitespace-nowrap ${toneClass[tone]}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

export function RouteTag({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-fg-2">
      <span aria-hidden className="size-2 rounded-full" style={{ backgroundColor: color }} />
      {children}
    </span>
  );
}

function Sidebar({ active }: { active: NavKey }) {
  return (
    <aside className="hidden w-52 shrink-0 flex-col border-r border-line bg-surface-2/50 p-3 @3xl:flex">
      <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
        <Mark className="size-7" />
        <div className="min-w-0">
          <p className="truncate text-[13px] leading-tight font-semibold text-snow">Snowlawna Demo</p>
          <p className="text-[11px] leading-tight text-fg-3">Ottawa, ON</p>
        </div>
      </div>
      <nav className="mt-4 grid gap-4">
        {NAV.map((section) => (
          <div key={section.group}>
            <p className="px-2 font-mono text-[10px] tracking-[0.14em] text-fg-3 uppercase">{section.group}</p>
            <ul className="mt-1.5 grid gap-0.5">
              {section.items.map(([key, label, Icon]) => (
                <li
                  key={key}
                  className={`relative flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] ${
                    key === active ? "bg-spruce/12 font-medium text-snow" : "text-fg-2"
                  }`}
                >
                  {key === active && <span className="absolute top-1.5 bottom-1.5 -left-3 w-0.5 rounded-full bg-spruce" />}
                  <Icon aria-hidden className={`size-4 ${key === active ? "text-spruce" : "text-fg-3"}`} strokeWidth={1.8} />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-2.5 rounded-lg border border-line bg-surface p-2">
        <span className="flex size-7 items-center justify-center rounded-full bg-spruce/15 text-[11px] font-semibold text-spruce">
          AR
        </span>
        <div className="min-w-0">
          <p className="truncate text-[12px] leading-tight font-medium text-fg">Alex Rivera</p>
          <p className="text-[11px] leading-tight text-fg-3">Owner</p>
        </div>
      </div>
    </aside>
  );
}

export function AppFrame({
  path,
  active,
  title,
  section,
  actions,
  children,
}: {
  path: string;
  active: NavKey;
  title: string;
  section: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="@container overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-stage">
      <div className="flex h-10 items-center gap-3 border-b border-line bg-surface-2/80 px-4">
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <div className="mx-auto flex h-6 max-w-[70%] min-w-0 items-center gap-1.5 rounded-md border border-line bg-surface px-3 font-mono text-[11px] text-fg-3">
          <Lock aria-hidden className="size-3 shrink-0 text-spruce" />
          <span className="truncate">snowlawna.vercel.app{path}</span>
        </div>
        <div aria-hidden className="w-10" />
      </div>
      <div className="flex h-[30rem] @3xl:h-[37rem]">
        <Sidebar active={active} />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line bg-surface px-4 @xl:px-5">
            <div className="min-w-0">
              <p className="text-[11px] leading-tight text-fg-3">{section}</p>
              <p className="truncate text-[15px] leading-tight font-semibold text-snow">{title}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden h-8 w-44 items-center gap-2 rounded-md border border-line bg-surface-2/60 px-2.5 text-[12px] text-fg-3 @5xl:flex">
                <Search aria-hidden className="size-3.5" /> Search
              </span>
              <span className="hidden items-center gap-1.5 rounded-md border border-line bg-surface-2/50 px-2.5 py-1 text-[12px] text-fg-2 @2xl:flex">
                <CloudSnow aria-hidden className="size-4 text-ice" />
                <span className="font-medium text-fg">−7°</span> Light snow · Ottawa
              </span>
              {actions}
            </div>
          </header>
          <div className="relative min-h-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
