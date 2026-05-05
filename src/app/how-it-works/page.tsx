import type { Metadata } from "next";
import { Suspense } from "react";
import HowItWorksContent from "./how-it-works-content";

export const metadata: Metadata = {
  title: "How It Works - Get Started with Fractional Product Management",
  description:
    "From first call to full velocity in under a week. Learn how Xelerate's fractional product management engagement works — discovery, kickoff, and results.",
  keywords:
    "hire fractional product manager, fractional PM process, product management engagement, how to hire fractional PM, startup product management",
  alternates: {
    canonical: "https://xelerate.me/how-it-works",
  },
  openGraph: {
    title: "How It Works - Get Started with Fractional Product Management",
    description:
      "From first call to full velocity in under a week. Learn how Xelerate's fractional product management engagement works — discovery, kickoff, and results.",
    url: "https://xelerate.me/how-it-works",
    siteName: "Xelerate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works - Get Started with Fractional Product Management",
    description:
      "From first call to full velocity in under a week. Learn how Xelerate's fractional product management engagement works — discovery, kickoff, and results.",
  },
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

const howToStructuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Get Started with Fractional Product Management",
  description:
    "From first call to full velocity in under a week. A step-by-step guide to working with Xelerate.",
  step: [
    {
      "@type": "HowToStep",
      name: "Book a Discovery Call",
      text: "We learn about your product, team, and challenges. No pitch, just listening.",
    },
    {
      "@type": "HowToStep",
      name: "Get Your Action Plan",
      text: "We deliver a tailored engagement plan with clear objectives, deliverables, and timeline within 48 hours.",
    },
    {
      "@type": "HowToStep",
      name: "Kick Off",
      text: "We embed with your team, get access to Slack, tools, and context, and hit the ground running.",
    },
    {
      "@type": "HowToStep",
      name: "Build Momentum",
      text: "Establish rituals, audit the current state, prioritize the backlog, and align stakeholders.",
    },
    {
      "@type": "HowToStep",
      name: "Deliver Results",
      text: "Ship features, hit milestones, iterate based on data. Monthly reviews ensure ongoing impact.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://xelerate.me" },
    { "@type": "ListItem", position: 2, name: "How It Works", item: "https://xelerate.me/how-it-works" },
  ],
};

export default function HowItWorksPage() {
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
          __html: JSON.stringify(howToStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Suspense>
        <HowItWorksContent />
      </Suspense>
    </>
  );
}
