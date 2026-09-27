import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article aria-labelledby="legal-title" className="pt-32 pb-24 sm:pt-40">
      <div className="wrap">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow flex items-center gap-2.5">
            <span aria-hidden className="h-2 w-3.5 -skew-x-[32deg] rounded-[1px] bg-ice" />
            Legal
          </p>
          <h1 id="legal-title" className="mt-5 font-wide text-4xl font-bold tracking-[-0.03em] text-snow sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 font-mono text-xs tracking-wide text-fg-3">Last updated {updated}</p>
          <p className="mt-8 rounded-xl border border-warning/25 bg-warning/[0.07] p-4 text-sm leading-relaxed text-fg-2">
            <strong className="font-semibold text-warning">Draft.</strong> This page is a starting template for
            Snowlawna&apos;s pre-launch website, not legal advice. It will be reviewed and finalised before general
            availability.
          </p>
          <div className="legal-prose mt-10">{children}</div>
        </div>
      </div>
    </article>
  );
}
