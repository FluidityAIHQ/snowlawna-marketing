import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Snowlawna handles the information you share through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="September 27, 2026">
      <p>
        This policy explains what information Snowlawna (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects through this
        website, how we use it and the choices you have. Use of the Snowlawna product itself is covered by the agreement
        you sign with us as a customer.
      </p>

      <h2>What we collect</h2>
      <p>When you book a demo, join the waitlist or contact us, we collect what you enter in the form:</p>
      <ul>
        <li>your name, work email and company;</li>
        <li>optional details such as your fleet size, the services you run and your message;</li>
        <li>the page you sent the form from.</li>
      </ul>
      <p>
        Our hosting provider also records standard technical information when you visit, such as your IP address,
        browser type and the pages requested. We use IP addresses briefly to limit spam submissions and don&apos;t add
        them to your contact record.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>to reply to you, arrange a demo or send the early-access updates you asked for;</li>
        <li>to understand which features and regions interest people, so we can plan the product;</li>
        <li>to keep the site secure and working.</li>
      </ul>
      <p>We don&apos;t sell your information or share it with advertisers.</p>

      <h2>Cookies and analytics</h2>
      <p>
        This site does not set advertising or analytics cookies. If that changes, we&apos;ll update this policy first.
      </p>

      <h2>Service providers</h2>
      <p>
        The site is hosted on Vercel. Form submissions may be stored or delivered by providers we use to run our
        business, such as email and database services, who may only process your information to provide those
        services to us.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep contact details for as long as we need them to respond and follow up, then delete them. You can ask
        us to delete them sooner at any time.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask to see, correct or delete the information we hold about you, and you can unsubscribe from any
        email we send. Contact us using the details below and we&apos;ll respond promptly.
      </p>

      <h2>Children</h2>
      <p>This site is for businesses and isn&apos;t directed at children.</p>

      <h2>Changes to this policy</h2>
      <p>If we change this policy, we&apos;ll update this page and the date at the top.</p>

      <h2>Contact</h2>
      <p>
        Send privacy questions or requests through our <Link href="/contact">contact page</Link>
        {site.contactEmail ? (
          <>
            {" "}
            or by email to <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </>
        ) : null}
        .
      </p>
    </LegalPage>
  );
}
