import type { Metadata } from "next";
import { ButtonArrow, ButtonLink, DemoAppLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="relative isolate overflow-hidden pt-36 pb-28 sm:pt-44">
      <div
        aria-hidden
        className="bg-survey absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent_75%)]"
      />
      <div className="wrap flex flex-col items-center text-center">
        <svg viewBox="0 0 240 80" className="w-60" aria-hidden fill="none">
          <path d="M8 60H70V24H130" stroke="var(--color-spruce)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M130 24H170V52H212" stroke="var(--color-ice)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 10" />
          {[
            [8, 60],
            [70, 42],
            [100, 24],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="var(--color-spruce)" stroke="var(--color-canvas)" strokeWidth="3" />
          ))}
          <circle cx="212" cy="52" r="11" fill="var(--color-surface)" stroke="var(--color-ice)" strokeWidth="2.5" />
          <text x="212" y="57" textAnchor="middle" fill="var(--color-ice)" fontSize="14" fontWeight="700">
            ?
          </text>
        </svg>
        <p className="mt-8 font-mono text-xs tracking-[0.14em] text-fg-3 uppercase">Error 404</p>
        <h1 id="not-found-title" className="mt-4 font-wide text-4xl font-bold tracking-[-0.03em] text-snow sm:text-5xl">
          This stop isn&apos;t on the route.
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-fg-2">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">
            Back to the homepage
            <ButtonArrow />
          </ButtonLink>
          <DemoAppLink href={site.demoAppUrl} />
        </div>
      </div>
    </section>
  );
}
