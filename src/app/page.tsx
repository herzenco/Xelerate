import type { Metadata } from "next";
import { Suspense } from "react";
import HomeContent from "./home-content";

export const metadata: Metadata = {
  title: "Xelerate - Fractional Product Management & Custom Solutions",
  description: "Senior product leadership without the salary. Fractional product management for $2,000/month and custom solutions for startups.",
  keywords: "fractional product manager, product management consulting, custom software development, startup product leadership, fractional PM",
  alternates: {
    canonical: "https://xelerate.me",
  },
  openGraph: {
    title: "Xelerate - Fractional Product Management & Custom Solutions",
    description: "Senior product leadership without the salary. Fractional PM for $2,000/month and custom solutions for startups.",
    url: "https://xelerate.me",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xelerate - Fractional Product Management & Custom Solutions",
    description: "Senior product leadership without the salary. Fractional product management for $2,000/month and custom solutions for startups.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Xelerate",
  url: "https://xelerate.me",
  logo: "https://xelerate.me/favicon.png",
  description: "Fractional product management and custom development solutions for startups and scale-ups",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@fractionalpm.com",
    contactType: "customer service",
  },
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Xelerate",
  url: "https://xelerate.me",
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <Suspense>
        <HomeContent />
      </Suspense>
    </>
  );
}
