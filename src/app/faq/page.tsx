import type { Metadata } from "next";
import { Suspense } from "react";
import FAQContent from "./faq-content";

export const metadata: Metadata = {
  title: "Frequently Asked Questions About Fractional Product Management",
  description:
    "Get answers to common questions about fractional product management, pricing, engagement models, and how Xelerate can help your startup ship faster.",
  keywords:
    "fractional product manager FAQ, fractional PM questions, what is fractional product management, hire fractional PM, product management consulting",
  alternates: {
    canonical: "https://xelerate.me/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions About Fractional Product Management",
    description:
      "Get answers to common questions about fractional product management, pricing, engagement models, and how Xelerate can help your startup ship faster.",
    url: "https://xelerate.me/faq",
    siteName: "Xelerate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions About Fractional Product Management",
    description:
      "Get answers to common questions about fractional product management, pricing, engagement models, and how Xelerate can help your startup ship faster.",
  },
};

const faqItems = [
  {
    question: "What is a fractional product manager?",
    answer:
      "A fractional product manager is a senior PM who works with your company on a part-time or contract basis, providing the same strategic leadership as a full-time hire at a fraction of the cost. You get experienced product leadership without committing to a six-figure salary and benefits package.",
  },
  {
    question:
      "How is a fractional PM different from a consultant or contractor?",
    answer:
      "Unlike consultants who deliver reports and leave, a fractional PM embeds with your team and takes ownership of outcomes. We participate in daily standups, manage the backlog, run sprint ceremonies, and hold the team accountable — just like a full-time PM, but on a flexible engagement.",
  },
  {
    question: "What does a fractional product manager actually do day-to-day?",
    answer:
      "Day-to-day work includes prioritizing the product backlog, running sprint planning and retrospectives, aligning stakeholders on roadmap decisions, writing user stories, analyzing product metrics, and removing blockers for your engineering team. The exact mix depends on your team's needs.",
  },
  {
    question: "Who typically hires a fractional product manager?",
    answer:
      "Seed to Series B startups that need product leadership but aren't ready for a full-time VP of Product. Also founders who are stretched too thin managing product themselves, and teams between PM hires who need continuity.",
  },
  {
    question:
      "What's included in the $2,000/month product leadership plan?",
    answer:
      "You get a dedicated senior PM who handles product roadmap and strategy, sprint planning and rituals, stakeholder management, weekly progress reports, and async Slack communication. It's a comprehensive product leadership function at a predictable monthly cost.",
  },
  {
    question: "How quickly can we get started?",
    answer:
      "Most engagements kick off within 48 hours of signing up. We schedule a discovery call, get access to your tools and Slack, and hit the ground running. There's no lengthy onboarding process — we're designed to deliver value from day one.",
  },
  {
    question: "What's the minimum engagement length?",
    answer:
      "There's no minimum commitment. Our product leadership plan is month-to-month, and you can cancel anytime. That said, most clients see the strongest results after 2-3 months as we build deep context with your team.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, absolutely. There are no long-term contracts or cancellation fees. If it's not working out, you can cancel at the end of any billing cycle. We earn your business every month.",
  },
  {
    question: "How many hours per week do I get?",
    answer:
      "Rather than tracking hours, we focus on outcomes and deliverables. You get the product leadership coverage your team needs — including async Slack availability, scheduled meetings, and strategic work. Most engagements involve 10-15 hours of active work per week.",
  },
  {
    question: "Do you work with our existing team?",
    answer:
      "Absolutely. We embed directly with your engineering, design, and leadership teams. We use your existing tools (Jira, Linear, Notion, Slack, etc.) and participate in your existing workflows. The goal is to feel like a natural extension of your team.",
  },
  {
    question: "What types of custom projects do you take on?",
    answer:
      "Custom projects include product strategy and discovery, MVP and prototype builds, web application development, team augmentation, and full product builds. If it involves taking a product from idea to shipped, we can help.",
  },
  {
    question: "How do you price custom engagements?",
    answer:
      "Custom projects are scoped and priced based on complexity, timeline, and deliverables. After a discovery call, we provide a detailed proposal with clear milestones and pricing. No surprises.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "Our development team works across the modern web stack — React, Next.js, Node.js, Python, and cloud infrastructure. For product leadership engagements, we're tool-agnostic and work with whatever your team already uses.",
  },
  {
    question: "Do we own the code and deliverables?",
    answer:
      "Yes, 100%. Everything we build belongs to you. All code, designs, documentation, and strategic artifacts are your intellectual property from day one. Full IP ownership is included in every engagement.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We define clear success metrics at the start of every engagement — whether that's shipping velocity, user engagement, revenue milestones, or team productivity. Monthly reviews ensure we're always focused on the metrics that matter most to your business.",
  },
  {
    question: "What if it's not working out?",
    answer:
      "We believe in radical transparency. If something isn't working, we address it immediately. And since there are no long-term contracts, you're never locked in. Our goal is to earn your trust every single month.",
  },
  {
    question: "Can you share case studies or references?",
    answer:
      "Yes. We've helped startups go from zero to launched MVP, turn chaotic backlogs into structured roadmaps, and scale product teams. We're happy to share relevant case studies and connect you with references during the discovery process.",
  },
  {
    question: "How do you handle confidentiality?",
    answer:
      "We take confidentiality seriously. We sign NDAs before every engagement and follow strict data security practices. Your product ideas, business strategy, and proprietary information are always protected.",
  },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
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
    { "@type": "ListItem", position: 1, name: "Home", item: "https://xelerate.me" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://xelerate.me/faq" },
  ],
};

export default function FAQPage() {
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
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Suspense>
        <FAQContent />
      </Suspense>
    </>
  );
}
