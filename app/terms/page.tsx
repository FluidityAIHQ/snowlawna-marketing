import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms that apply when you use the Snowlawna website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="October 19, 2026">
      <p>
        These terms apply to the website operated by 17673108 Canada Inc., 28 Pretoria Avenue, Ottawa ON K1S 1W7,
        Canada (&ldquo;Snowlawna&rdquo;, &ldquo;we&rdquo;). By using the website, you agree to them. Use of the app
        is governed by its <a href={`${site.demoAppUrl}/terms`}>terms of service</a>.
      </p>

      <h2>This website</h2>
      <p>
        The site describes Snowlawna and its features. Screens, figures and company names shown on the site are
        illustrative, and features may change as the product develops. Subscription prices, quantities and taxes
        are confirmed in the app before checkout. The app&apos;s terms govern paid subscriptions.
      </p>

      <h2>The Snowlawna app</h2>
      <p>
        The app at <a href={site.demoAppUrl}>{site.demoAppUrl.replace("https://", "")}</a> requires sign-in and uses
        separate company workspaces. Review the app&apos;s <a href={`${site.demoAppUrl}/terms`}>terms</a> and
        {" "}<a href={`${site.demoAppUrl}/privacy`}>privacy policy</a> before using it.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>don&apos;t try to disrupt, overload or gain unauthorised access to the site;</li>
        <li>don&apos;t scrape, copy or resell the site&apos;s content;</li>
        <li>don&apos;t use the site for anything unlawful.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The Snowlawna name, logo, software and site content belong to us. The example companies shown on the site are
        fictional and used for illustration only.
      </p>

      <h2>No warranty</h2>
      <p>
        The site is provided &ldquo;as is&rdquo; without warranties of any kind. To the extent the law
        allows, we aren&apos;t liable for losses arising from your use of it.
      </p>

      <h2>Links to other sites</h2>
      <p>We aren&apos;t responsible for the content or practices of websites we link to.</p>

      <h2>Changes</h2>
      <p>We may update these terms. The date at the top shows when they last changed.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Reach us through our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
