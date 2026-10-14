"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { FilePenLine, Headset, Map as MapIcon, Ruler, type LucideIcon } from "lucide-react";

const TABS: { id: string; label: string; Icon: LucideIcon; blurb: string; description: string }[] = [
  {
    id: "dispatch",
    label: "Dispatch",
    Icon: Headset,
    blurb: "Filter the day's jobs by date, schedule and service. Update status and notes as crews call in.",
    description:
      "Dispatch board for a storm day: 52 jobs with 38 done, 9 in progress and 5 delayed, and a job detail panel with status, crew and notes.",
  },
  {
    id: "map",
    label: "Live map",
    Icon: MapIcon,
    blurb: "Routes, vehicles and contracted properties on one map, with traffic, picket and visit overlays.",
    description:
      "Live operations map with three plow routes drawn over the streets, vehicle markers, overlay toggles and a side panel of route progress and vehicle status.",
  },
  {
    id: "contracts",
    label: "Contracts",
    Icon: FilePenLine,
    blurb: "Every Snow, Lawn and Snow & lawn contract, with filters, instant search, status tracking and CSV export.",
    description:
      "Contracts list with season totals, search, filters and a table of clients, properties, services, routes, season prices and statuses.",
  },
  {
    id: "quotations",
    label: "Quotations",
    Icon: Ruler,
    blurb: "Trace a property on satellite imagery and watch the seasonal estimate build as you draw.",
    description:
      "Measure workspace: a property traced on aerial imagery with lawn areas, a snow surface and a walkway, beside a Snow & lawn estimate totalling $2,920.14 for the season.",
  },
];

export function TourTabs({ panels }: { panels: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + TABS.length) % TABS.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: TABS.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key]);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Product areas"
          onKeyDown={onKeyDown}
          className="grid w-full max-w-sm grid-cols-2 gap-1.5 rounded-3xl border border-line-strong bg-surface p-1.5 shadow-card sm:inline-flex sm:w-auto sm:max-w-none sm:rounded-full"
        >
          {TABS.map((tab, i) => {
            const selected = i === active;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabs.current[i] = node;
                }}
                type="button"
                role="tab"
                id={`tour-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`tour-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-4.5 text-sm font-medium transition-colors ${
                  selected
                    ? "bg-primary text-canvas shadow-sm"
                    : "text-fg-2 hover:bg-surface-2 hover:text-fg"
                }`}
              >
                <tab.Icon aria-hidden className={`size-4 ${selected ? "text-canvas" : "text-spruce"}`} strokeWidth={1.8} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="mx-auto mt-5 min-h-12 max-w-xl text-center text-[15px] leading-relaxed text-fg-2">
        {TABS[active].blurb}
      </p>

      <div className="mt-8">
        {TABS.map((tab, i) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`tour-panel-${tab.id}`}
            aria-labelledby={`tour-tab-${tab.id}`}
            hidden={i !== active}
            className="anim-fade"
          >
            <div role="img" aria-label={tab.description}>
              {panels[i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
