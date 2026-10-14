import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/section-heading";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section aria-labelledby="stories-title" className="relative border-t border-line bg-surface-2/35 py-24 sm:py-32">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="stories-title" eyebrow="From the field" title="Built for the people who run both seasons." />
          {testimonials.isPlaceholder && (
            <p
              data-reveal
              className="rounded-full border border-dashed border-line-strong bg-surface px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-fg-3"
            >
              Sample testimonials: replace with approved customer quotes before launch
            </p>
          )}
        </div>

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <li key={item.role} data-reveal style={{ "--delay": `${i * 90}ms` } as CSSProperties}>
              <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 shadow-card">
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-1 ${item.tone === "spruce" ? "bg-spruce" : "bg-fg"}`}
                />
                <span
                  aria-hidden
                  className={`h-2 w-4 -skew-x-[32deg] rounded-[1px] ${item.tone === "spruce" ? "bg-spruce" : "bg-fg"}`}
                />
                <blockquote className="mt-6 flex-1 text-[17px] leading-relaxed text-fg">
                  <p>&ldquo;{item.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-8 border-t border-line pt-5">
                  <p className="text-sm font-semibold text-snow">{item.role}</p>
                  <p className="mt-0.5 text-sm text-fg-3">{item.company}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
