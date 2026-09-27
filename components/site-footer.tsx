import Link from "next/link";
import { Mark, Wordmark } from "@/components/brand/logo";
import { IntentLink } from "@/components/intent-link";
import { site } from "@/lib/site";

const linkClass = "text-sm text-fg-2 transition-colors hover:text-fg";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-canvas">
      <div className="wrap grid gap-12 pt-16 pb-10 md:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
        <div className="max-w-xs">
          <Link href="/" aria-label="Snowlawna home" className="inline-block rounded-lg">
            <Wordmark className="h-8 w-auto text-fg" />
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-fg-2">
            Lawn and snow operations software: dispatch, maps, measure-to-quote and contracts, under your own
            brand.
          </p>
          <p className="mt-4 font-mono text-xs tracking-wide text-fg-3">
            Two seasons<span className="text-ice">.</span> One operation<span className="text-spruce">.</span>
          </p>
        </div>

        <nav aria-labelledby="footer-product">
          <h2 id="footer-product" className="eyebrow !text-fg-3">
            Product
          </h2>
          <ul className="mt-4 grid gap-3">
            <li>
              <Link href="/#product" className={linkClass}>
                Overview
              </Link>
            </li>
            <li>
              <Link href="/#features" className={linkClass}>
                Features
              </Link>
            </li>
            <li>
              <Link href="/#how-it-works" className={linkClass}>
                How it works
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className={linkClass}>
                Pricing
              </Link>
            </li>
            <li>
              <a href={site.demoAppUrl} target="_blank" rel="noopener" className={linkClass}>
                Open demo app ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className="eyebrow !text-fg-3">
            Get in touch
          </h2>
          <ul className="mt-4 grid gap-3">
            <li>
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
            </li>
            <li>
              <IntentLink intent="demo" className={linkClass}>
                Book a demo
              </IntentLink>
            </li>
            <li>
              <IntentLink intent="waitlist" className={linkClass}>
                Join the waitlist
              </IntentLink>
            </li>
            <li>
              <Link href="/#faq" className={linkClass}>
                FAQ
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-legal">
          <h2 id="footer-legal" className="eyebrow !text-fg-3">
            Legal
          </h2>
          <ul className="mt-4 grid gap-3">
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                Terms
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="wrap">
        <div className="flex flex-col gap-3 border-t border-line py-6 text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Snowlawna. All rights reserved.</p>
          <p className="font-mono tracking-wide">Built for northern winters and long mowing seasons.</p>
        </div>
      </div>

      <Mark
        tile={false}
        className="pointer-events-none absolute -right-16 -bottom-24 size-[22rem] opacity-[0.035] select-none"
      />
    </footer>
  );
}
