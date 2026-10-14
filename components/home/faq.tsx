import Link from "next/link";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="hairline-x absolute inset-x-0 top-0 h-px" />
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" eyebrow="FAQ" tone="ice" title="Questions from the dispatch desk.">
            <p>
              Anything else?{" "}
              <Link href="/contact" className="font-medium text-spruce underline decoration-spruce/40 underline-offset-4 hover:decoration-spruce">
                Ask us directly
              </Link>
              .
            </p>
          </SectionHeading>
        </div>

        <div data-reveal className="divide-y divide-line rounded-3xl border border-line bg-surface px-6 py-2 shadow-card sm:px-8">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item group">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left text-[17px] font-medium text-fg transition-colors hover:text-snow">
                {faq.question}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface-2/60 text-fg-2 transition-[rotate,border-color,background-color,color] duration-300 group-open:rotate-45 group-open:border-spruce/50 group-open:bg-spruce/12 group-open:text-spruce">
                  <Plus aria-hidden className="size-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-fg-2">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
