import type { Metadata } from "next";
import { CalendarDays, Mail, MessageSquare, Snowflake } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { DemoAppLink } from "@/components/ui/button";
import { isLeadIntent } from "@/lib/lead-schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a Snowlawna demo, join the early-access waitlist or ask the team a question.",
  alternates: { canonical: "/contact" },
};

const NOTICES: Record<string, string> = {
  invalid: "Some details were missing or didn't look right. Please check the form and try again.",
  rate: "We've received several messages from your connection. Please wait a few minutes and try again.",
};

const OPTIONS = [
  { Icon: CalendarDays, title: "Book a demo", text: "A live walkthrough with one of your own properties measured and quoted." },
  { Icon: Snowflake, title: "Join the waitlist", text: "Early access for the 2026–27 winter season, and news as we open up." },
  { Icon: MessageSquare, title: "Contact sales", text: "Pricing for your fleet, multi-company setups or anything else." },
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const params = await searchParams;
  const intent = isLeadIntent(params.intent) ? params.intent : "contact";
  const notice = typeof params.error === "string" ? NOTICES[params.error] : undefined;

  return (
    <section aria-labelledby="contact-title" className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div
        aria-hidden
        className="bg-survey absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_0%,black_20%,transparent_75%)]"
      />
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <p className="eyebrow anim-rise flex items-center gap-2.5">
            <span aria-hidden className="h-2 w-3.5 -skew-x-[32deg] rounded-[1px] bg-ice" />
            Contact
          </p>
          <h1
            id="contact-title"
            className="anim-rise mt-5 font-wide text-[clamp(2.4rem,1.5rem+3.2vw,3.75rem)] leading-[1] font-bold tracking-[-0.03em] text-snow"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            Talk to the people building Snowlawna.
          </h1>
          <p className="anim-rise mt-6 max-w-lg text-lg leading-relaxed text-fg-2" style={{ "--delay": "160ms" } as React.CSSProperties}>
            Tell us about your routes, crews and seasons. We read every message and reply by email.
          </p>

          <ul className="anim-rise mt-10 grid gap-6" style={{ "--delay": "240ms" } as React.CSSProperties}>
            {OPTIONS.map(({ Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface text-ice">
                  <Icon aria-hidden className="size-[18px]" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-medium text-fg">{title}</p>
                  <p className="mt-0.5 text-[15px] leading-relaxed text-fg-3">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="anim-rise mt-10 grid gap-3 border-t border-line pt-8 text-sm text-fg-2" style={{ "--delay": "320ms" } as React.CSSProperties}>
            {site.contactEmail && (
              <p className="flex items-center gap-2.5">
                <Mail aria-hidden className="size-4 text-fg-3" />
                <a href={`mailto:${site.contactEmail}`} className="text-ice underline decoration-ice/40 underline-offset-4 hover:decoration-ice">
                  {site.contactEmail}
                </a>
              </p>
            )}
            <p>Want to look around first? The demo workspace is open without signing in.</p>
            <div>
              <DemoAppLink href={site.demoAppUrl} size="sm" />
            </div>
          </div>
        </div>

        <div
          id="lead-form"
          data-anchor
          className="anim-float rounded-3xl border border-line-strong bg-surface/90 p-5 shadow-[0_40px_100px_-40px_rgb(0_0_0/0.9)] backdrop-blur sm:p-8 lg:self-start"
          style={{ "--delay": "200ms" } as React.CSSProperties}
        >
          <LeadForm key={intent} initialIntent={intent} notice={notice} />
        </div>
      </div>
    </section>
  );
}
