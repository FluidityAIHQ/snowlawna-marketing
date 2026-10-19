import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ButtonLink, DemoAppLink } from "@/components/ui/button";
import { intentCopy, isLeadIntent } from "@/lib/lead-schema";
import { site } from "@/lib/site";

// Landing page for the lead form when it's submitted without JavaScript.
export const metadata: Metadata = {
  title: "Thanks",
  robots: { index: false },
};

export default async function ThanksPage({ searchParams }: PageProps<"/thanks">) {
  const { intent } = await searchParams;
  const value = isLeadIntent(intent) ? intent : "demo";

  return (
    <section aria-labelledby="thanks-title" className="wrap flex min-h-[70vh] flex-col items-start justify-center pt-32 pb-24">
      <span className="anim-check flex size-14 items-center justify-center rounded-full bg-spruce/15 text-spruce ring-1 ring-spruce/30">
        <Check aria-hidden className="size-7" strokeWidth={2.4} />
      </span>
      <h1 id="thanks-title" className="mt-8 font-wide text-4xl font-bold tracking-[-0.03em] text-snow sm:text-5xl">
        {intentCopy[value].successTitle}
      </h1>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-fg-2">{intentCopy[value].success}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <DemoAppLink href={site.demoAppUrl} variant="primary">
          Open Snowlawna
        </DemoAppLink>
        <ButtonLink href="/" variant="secondary">
          Back to the homepage
        </ButtonLink>
      </div>
    </section>
  );
}
