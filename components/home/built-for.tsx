const SEGMENTS = ["Residential plowing", "Commercial lots", "Condo & HOA contracts", "Lawn & landscaping", "Property management"];

export function BuiltFor() {
  return (
    <section aria-label="Who Snowlawna is for" className="border-y border-line bg-surface/40">
      <div className="wrap flex flex-col gap-4 py-7 lg:flex-row lg:items-center lg:gap-10">
        <p className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-fg-3 uppercase">Built for crews in</p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8">
          {SEGMENTS.map((segment, i) => (
            <li key={segment} className="flex items-center gap-2.5 text-[15px] font-medium text-fg-2">
              <span aria-hidden className={`h-1.5 w-3 -skew-x-[32deg] rounded-[1px] ${i % 2 ? "bg-spruce/70" : "bg-ice/70"}`} />
              {segment}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
