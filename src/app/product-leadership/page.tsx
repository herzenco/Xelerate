import type { Metadata } from "next";
import { Suspense } from "react";
import ProductLeadershipContent from "./product-leadership-content";

export const metadata: Metadata = {
  title: "Fractional Product Management for $2,000/Month",
  description:
    "Senior product leadership without the salary. Get hands-on PM support, clear roadmaps, sprint rituals, and accountability for $2,000/month. Cancel anytime.",
  keywords:
    "fractional product manager, part-time PM, product management consulting, startup product leadership, roadmap planning",
  alternates: {
    canonical: "https://xelerate.me/product-leadership",
  },
  openGraph: {
    title: "Fractional Product Management for $2,000/Month",
    description:
      "Senior product leadership without the salary. Get hands-on PM support, clear roadmaps, sprint rituals, and accountability for $2,000/month. Cancel anytime.",
    url: "https://xelerate.me/product-leadership",
    siteName: "Xelerate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fractional Product Management for $2,000/Month",
    description:
      "Senior product leadership without the salary. Get hands-on PM support, clear roadmaps, sprint rituals, and accountability for $2,000/month. Cancel anytime.",
  },
};

const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fractional Product Management",
  description:
    "Senior product leadership for $2,000/month. Hands-on PM support, roadmaps, and accountability.",
  url: "https://xelerate.me/product-leadership",
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
  },
  serviceType: "Product Management",
  areaServed: "Worldwide",
};

const testimonialsStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Xelerate Fractional Product Management",
  review: [
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Juan Carlos de los Santos",
      },
      reviewBody:
        "Xelerate brought order to our chaos. In just 48 hours, we had a clear roadmap, priorities locked in, and the entire team rowing in the same direction.",
    },
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Alexis Kopikis",
      },
      reviewBody:
        "Xelerate is a game changer. His ability to take a founder's vision and translate it into a concrete, actionable product roadmap is second to none.",
    },
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Tom O'Keefe",
      },
      reviewBody:
        "Working with Xelerate has been an absolute pleasure. Every project he leads runs like a well-oiled machine—smooth, efficient, and delivered with precision.",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
    bestRating: "5",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://xelerate.me" },
    { "@type": "ListItem", position: 2, name: "Product Leadership", item: "https://xelerate.me/product-leadership" },
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

export default function ProductLeadershipPage() {
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
          __html: JSON.stringify(serviceStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(testimonialsStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Suspense>
        <ProductLeadershipContent />
      </Suspense>
    </>
  );
}
