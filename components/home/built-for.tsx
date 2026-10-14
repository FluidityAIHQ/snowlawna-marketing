import { Building2, KeyRound, ParkingSquare, Snowflake, Sprout, type LucideIcon } from "lucide-react";

const SEGMENTS: { label: string; Icon: LucideIcon; tone: "snow" | "lawn" }[] = [
  { label: "Residential plowing", Icon: Snowflake, tone: "snow" },
  { label: "Commercial lots", Icon: ParkingSquare, tone: "snow" },
  { label: "Condo & HOA contracts", Icon: Building2, tone: "snow" },
  { label: "Lawn & landscaping", Icon: Sprout, tone: "lawn" },
  { label: "Property management", Icon: KeyRound, tone: "snow" },
];

const tileClass = {
  snow: "bg-[#1c1c20] text-[#f2f2f5] ring-1 ring-inset ring-[#00E5FF]/35 shadow-[inset_0_1px_0_rgb(0_229_255/0.16)] dark:bg-surface-2 dark:text-fg",
  lawn: "bg-spruce text-white ring-1 ring-inset ring-spruce-deep/30 dark:bg-spruce-deep dark:text-white dark:ring-spruce/45 [html[data-theme=dark]_&]:bg-spruce-deep [html[data-theme=dark]_&]:ring-spruce/45",
} as const;

export function BuiltFor() {
  return (
    <section aria-label="Who Snowlawna is for" className="border-y border-line bg-surface-2/60">
      <div className="wrap flex flex-col gap-4 py-7 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="size-2 rounded-full bg-spruce" />
          <p className="shrink-0 font-mono text-[11px] font-medium tracking-[0.14em] text-fg-3 uppercase">
            Built for crews in
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {SEGMENTS.map(({ label, Icon, tone }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pr-4 pl-2 text-sm font-medium text-fg shadow-[0_1px_2px_rgb(10_30_20/0.04)]"
            >
              <span
                aria-hidden
                className={`inline-flex size-6 shrink-0 items-center justify-center rounded-md ${tileClass[tone]}`}
              >
                <Icon className="size-3.5" strokeWidth={2} />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

