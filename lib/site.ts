const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  name: "Snowlawna",
  tagline: "Two seasons. One operation.",
  description:
    "Lawn and snow operations software. Dispatch crews, measure properties from satellite imagery, send seasonal quotes and manage contracts under your own brand.",
  url: configuredUrl.replace(/\/+$/, ""),
  demoAppUrl: "https://app.snowlawna.com",
  // Optional. When set, the contact page lists it and failed form posts offer a mailto: fallback.
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
} as const;

export const mainNav = [
  { label: "Product", href: "/#product" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
] as const;
