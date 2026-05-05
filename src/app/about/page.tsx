import type { Metadata } from "next";
import { Suspense } from "react";
import AboutContent from "./about-content";

export const metadata: Metadata = {
  title: "About Xelerate - Your Fractional Product Partner",
  description:
    "Xelerate gives startups access to senior product leadership without the six-figure salary. Learn about our mission, approach, and team.",
  keywords:
    "about Xelerate, fractional product management company, product leadership team, startup consulting firm",
  alternates: {
    canonical: "https://xelerate.me/about",
  },
  openGraph: {
    title: "About Xelerate - Your Fractional Product Partner",
    description:
      "Xelerate gives startups access to senior product leadership without the six-figure salary. Learn about our mission, approach, and team.",
    url: "https://xelerate.me/about",
    siteName: "Xelerate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Xelerate - Your Fractional Product Partner",
    description:
      "Xelerate gives startups access to senior product leadership without the six-figure salary. Learn about our mission, approach, and team.",
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
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@fractionalpm.com",
    contactType: "customer service",
  },
  sameAs: [],
};

const personData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Xelerate Founder",
  jobTitle: "Founder & Fractional Product Leader",
  description:
    "Product leader with over a decade of experience shipping products at startups and scale-ups across SaaS, fintech, and marketplace verticals. Founded Xelerate to give every startup access to senior PM leadership at a price that makes sense for their stage.",
  worksFor: {
    "@type": "Organization",
    name: "Xelerate",
    url: "https://xelerate.me",
  },
};

export default function AboutPage() {
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
          __html: JSON.stringify(personData),
        }}
      />
      <Suspense>
        <AboutContent />
      </Suspense>
    </>
  );
}
