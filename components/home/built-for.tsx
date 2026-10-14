const SEGMENTS = ["Residential plowing", "Commercial lots", "Condo & HOA contracts", "Lawn & landscaping", "Property management"];

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
          {SEGMENTS.map((segment, i) => (
            <li
              key={segment}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-fg shadow-[0_1px_2px_rgb(10_30_20/0.04)]"
            >
              <span aria-hidden className={`h-1.5 w-3 -skew-x-[32deg] rounded-[1px] ${i % 2 ? "bg-ice" : "bg-spruce"}`} />
              {segment}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
