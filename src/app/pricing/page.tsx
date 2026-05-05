import type { Metadata } from "next";
import { Suspense } from "react";
import PricingContent from "./pricing-content";

export const metadata: Metadata = {
  title: "Pricing - Fractional Product Management from $2,000/month",
  description:
    "Transparent pricing for fractional product management. Senior PM leadership for $2,000/month with no long-term contracts. Compare plans and get started today.",
  keywords:
    "fractional product manager cost, fractional PM pricing, product management pricing, fractional product manager rates, startup PM cost",
  alternates: {
    canonical: "https://xelerate.me/pricing",
  },
  openGraph: {
    title: "Pricing - Fractional Product Management from $2,000/month",
    description:
      "Transparent pricing for fractional product management. Senior PM leadership for $2,000/month with no long-term contracts. Compare plans and get started today.",
    url: "https://xelerate.me/pricing",
    siteName: "Xelerate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing - Fractional Product Management from $2,000/month",
    description:
      "Transparent pricing for fractional product management. Senior PM leadership for $2,000/month with no long-term contracts. Compare plans and get started today.",
  },
};

const offerStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fractional Product Management — Product Leadership",
  description:
    "Dedicated senior PM, product roadmap and strategy, sprint planning and rituals, stakeholder management, weekly progress reports, and async Slack communication.",
  url: "https://xelerate.me/pricing",
  provider: {
    "@type": "Organization",
    name: "Xelerate",
    url: "https://xelerate.me",
  },
  offers: {
    "@type": "Offer",
    price: "2000",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "2000",
      priceCurrency: "USD",
      unitText: "month",
    },
    availability: "https://schema.org/InStock",
  },
  serviceType: "Product Management",
  areaServed: "Worldwide",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://xelerate.me" },
    { "@type": "ListItem", position: 2, name: "Pricing", item: "https://xelerate.me/pricing" },
  ],
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Xelerate",
  url: "https://xelerate.me",
  logo: "https://xelerate.me/favicon.png",
  description:
    "Fractional product management and custom development solutions for startups",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@fractionalpm.com",
    contactType: "customer service",
  },
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(offerStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Suspense>
        <PricingContent />
      </Suspense>
    </>
  );
}
