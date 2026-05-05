import type { Metadata } from "next";
import { Suspense } from "react";
import CustomSolutionsContent from "./custom-solutions-content";

export const metadata: Metadata = {
  title: "Custom Product Strategy & Development | Discovery to Launch",
  description:
    "Tailored product management, web development, and custom software solutions. Senior-level expertise with flexible engagements and measurable results.",
  keywords:
    "custom product management, bespoke software development, web development services, fractional CTO, startup consulting, MVP development, product strategy, technical discovery",
  alternates: {
    canonical: "https://xelerate.me/custom-solutions",
  },
  openGraph: {
    title:
      "Custom Product Strategy & Development | Discovery to Launch",
    description:
      "Tailored product management, web development, and custom software solutions. Senior-level expertise with flexible engagements and measurable results.",
    url: "https://xelerate.me/custom-solutions",
    siteName: "Xelerate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Custom Product Strategy & Development | Discovery to Launch",
    description:
      "Tailored product management, web development, and custom software solutions. Senior-level expertise with flexible engagements and measurable results.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Xelerate Custom Solutions",
  description:
    "Custom product management, web development, and bespoke software solutions for startups",
  url: "https://xelerate.me/custom-solutions",
  areaServed: "Worldwide",
  serviceType: [
    "Product Management",
    "Web Development",
    "Custom Software Development",
    "MVP Development",
    "Product Strategy",
    "Technical Discovery",
    "Team Augmentation",
  ],
  provider: {
    "@type": "Organization",
    name: "Xelerate",
    url: "https://xelerate.me",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://xelerate.me",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Custom Solutions",
      item: "https://xelerate.me/custom-solutions",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of projects do you take on?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We handle everything from MVP development and product strategy to full web application builds and team augmentation. Our sweet spot is early-stage startups and growth-stage companies that need senior product and engineering leadership without committing to a full-time hire. If it involves building, shipping, or scaling a digital product, we can help.",
      },
    },
    {
      "@type": "Question",
      name: "How long do custom engagements typically last?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Engagements range from two-week discovery sprints to six-month product builds. Most projects fall in the six-to-twelve-week range. We always start with a scoping phase so both sides have a clear picture of timeline and deliverables before committing to a longer engagement.",
      },
    },
    {
      "@type": "Question",
      name: "What's your pricing model for custom work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer three models: fixed-price projects with clearly defined scope, time-and-materials for exploratory or evolving work, and monthly retainers for ongoing fractional support. Every engagement starts with a free discovery call and a detailed proposal so you know exactly what you are paying for.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with existing development teams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Many of our engagements involve embedding alongside your existing team. We integrate into your workflows, tools, and communication channels. Our goal is to amplify your team's output, not replace them. We also provide mentoring and process improvements that outlast our engagement.",
      },
    },
    {
      "@type": "Question",
      name: "What technologies do you work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our core stack is TypeScript, React, Next.js, Node.js, and PostgreSQL, but we are experienced across a wide range of technologies including Python, AWS, GCP, Supabase, and various headless CMS platforms. We choose the right tools for your specific needs rather than forcing a one-size-fits-all approach.",
      },
    },
    {
      "@type": "Question",
      name: "How do we get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start by filling out the contact form on this page or scheduling a free consultation call. We will have an initial conversation to understand your challenges, timeline, and budget. From there, we provide a tailored proposal within a few business days. If it is a fit, we can typically kick off within one to two weeks.",
      },
    },
  ],
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Xelerate",
  url: "https://xelerate.me",
  review: [
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Juan Carlos de los Santos",
      },
      reviewBody:
        "Xelerate took our half-baked idea and turned it into a production-ready platform in under eight weeks. The discovery process alone saved us months of building the wrong thing. They truly understand how to balance speed with quality.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Alexis Kopikis",
      },
      reviewBody:
        "Xelerate is a game changer. Startups are inherently chaotic, but he has a unique ability to bring order to the madness. His ability to take a founder's vision and translate it into a concrete, actionable product roadmap is second to none.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
    {
      "@type": "Review",
      author: {
        "@type": "Person",
        name: "Tom O'Keefe",
      },
      reviewBody:
        "Working with Xelerate has been an absolute pleasure. His ability to bring projects together seamlessly is remarkable. Every project he leads runs like a well-oiled machine—smooth, efficient, and delivered with precision.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
    bestRating: "5",
  },
};

export default function CustomSolutionsPage() {
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
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema),
        }}
      />
      <Suspense>
        <CustomSolutionsContent />
      </Suspense>
    </>
  );
}
