import type { Metadata } from "next";
import { Branding } from "@/components/home/branding";
import { BuiltFor } from "@/components/home/built-for";
import { Faq } from "@/components/home/faq";
import { FeatureGrid } from "@/components/home/feature-grid";
import { GetStarted } from "@/components/home/get-started";
import { Hero } from "@/components/home/hero";
import { Pricing } from "@/components/home/pricing";
import { ProductTour } from "@/components/home/product-tour";
import { Testimonials } from "@/components/home/testimonials";
import { Workflow } from "@/components/home/workflow";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: site.description,
  url: site.url,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <BuiltFor />
      <ProductTour />
      <FeatureGrid />
      <Workflow />
      <Branding />
      <Testimonials />
      <Pricing />
      <Faq />
      <GetStarted />
    </>
  );
}
