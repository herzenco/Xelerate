"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const aboutFractionalPM: FAQItem[] = [
  {
    question: "What is a fractional product manager?",
    answer: (
      <>A fractional product manager is a senior PM who works with your company on a part-time or contract basis, providing the same strategic leadership as a full-time hire at a fraction of the cost. You get experienced product leadership without committing to a six-figure salary and benefits package. Learn more in our <Link href="/blog/what-is-fractional-product-manager" className="text-primary hover:underline">complete guide to fractional product management</Link>.</>
    ),
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
    answer: (
      <>Seed to Series B startups that need product leadership but aren&apos;t ready for a full-time VP of Product. Also founders who are stretched too thin managing product themselves, and teams between PM hires who need continuity. See how <Link href="/blog/fractional-vs-full-time-product-manager" className="text-primary hover:underline">fractional compares to full-time</Link> to decide which is right for you.</>
    ),
  },
];

const workingWithXelerate: FAQItem[] = [
  {
    question:
      "What's included in the $2,000/month product leadership plan?",
    answer: (
      <>You get a dedicated senior PM who handles product roadmap and strategy, sprint planning and rituals, stakeholder management, weekly progress reports, and async Slack communication. It&apos;s a comprehensive product leadership function at a predictable monthly cost. See the full breakdown on our <Link href="/pricing" className="text-primary hover:underline">pricing page</Link>.</>
    ),
  },
  {
    question: "How quickly can we get started?",
    answer: (
      <>Most engagements kick off within 48 hours of signing up. We schedule a discovery call, get access to your tools and Slack, and hit the ground running. There&apos;s no lengthy onboarding process — we&apos;re designed to deliver value from day one. See <Link href="/how-it-works" className="text-primary hover:underline">how the process works</Link>.</>
    ),
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
];

const customSolutions: FAQItem[] = [
  {
    question: "What types of custom projects do you take on?",
    answer: (
      <>Custom projects include product strategy and discovery, MVP and prototype builds, web application development, team augmentation, and full product builds. If it involves taking a product from idea to shipped, we can help. Explore our <Link href="/custom-solutions" className="text-primary hover:underline">custom solutions</Link> to learn more.</>
    ),
  },
  {
    question: "How do you price custom engagements?",
    answer: (
      <>Custom projects are scoped and priced based on complexity, timeline, and deliverables. After a discovery call, we provide a detailed proposal with clear milestones and <Link href="/pricing" className="text-primary hover:underline">pricing</Link>. No surprises.</>
    ),
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
];

const resultsAndProcess: FAQItem[] = [
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
    answer: (
      <>Yes. We&apos;ve helped startups go from zero to launched MVP, turn chaotic backlogs into structured roadmaps, and scale product teams. We&apos;re happy to share relevant case studies and connect you with references during the discovery process. You can also read insights on our <Link href="/blog" className="text-primary hover:underline">blog</Link>.</>
    ),
  },
  {
    question: "How do you handle confidentiality?",
    answer:
      "We take confidentiality seriously. We sign NDAs before every engagement and follow strict data security practices. Your product ideas, business strategy, and proprietary information are always protected.",
  },
];

const FAQCategory = ({
  title,
  items,
  idPrefix,
}: {
  title: string;
  items: FAQItem[];
  idPrefix: string;
}) => (
  <div className="mb-12">
    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
      {title}
    </h2>
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`${idPrefix}-${index}`}
          className="border-border"
        >
          <AccordionTrigger className="text-left text-base md:text-lg text-foreground hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-base leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

const FAQContent = () => {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:border focus:border-border"
      >
        Skip to main content
      </a>
      <Header currentPage="home" />

      <main id="main-content" className="pt-16 lg:pt-20">
        {/* Hero */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about fractional product management
              and working with Xelerate.
            </p>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-3xl mx-auto px-6">
            <FAQCategory
              title="About Fractional PM"
              items={aboutFractionalPM}
              idPrefix="about"
            />
            <FAQCategory
              title="Working with Xelerate"
              items={workingWithXelerate}
              idPrefix="working"
            />
            <FAQCategory
              title="Custom Solutions"
              items={customSolutions}
              idPrefix="custom"
            />
            <FAQCategory
              title="Results & Process"
              items={resultsAndProcess}
              idPrefix="results"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-secondary">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Still have questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Book a free discovery call and we&apos;ll walk you through
              everything.
            </p>
            <Button variant="accent" size="lg" asChild>
              <a href="/product-leadership">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FAQContent;
