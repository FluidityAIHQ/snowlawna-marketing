import { BrandingSwitcher } from "@/components/home/branding-switcher";
import { SectionHeading } from "@/components/section-heading";

export function Branding() {
  return (
    <section id="branding" aria-labelledby="branding-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="hairline-x absolute inset-x-0 top-0 h-px" />
      <div className="wrap">
        <SectionHeading id="branding-title" eyebrow="Multi-company branding" title="Your brand on every screen. Not ours.">
          <p>
            Each company on Snowlawna gets its own logo, colors and tagline, applied across the workspace, the sign-in
            page, maps and the quotes your customers open. Run more than one company? Each one gets its own look.
          </p>
        </SectionHeading>
        <div data-reveal className="mt-14">
          <BrandingSwitcher />
        </div>
      </div>
    </section>
  );
}
