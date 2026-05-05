"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, ArrowRight } from "lucide-react";

const productLeadershipFeatures = [
  "Dedicated senior PM",
  "Product roadmap & strategy",
  "Sprint planning & rituals",
  "Stakeholder management",
  "Weekly progress reports",
  "Slack/async communication",
  "Cancel anytime",
];

const customSolutionsFeatures = [
  "Discovery & scoping",
  "Product strategy",
  "Web application development",
  "MVP & prototype builds",
  "Team augmentation",
  "Full IP ownership",
  "Project-based engagement",
];

const comparisons = [
  {
    label: "Full-time PM",
    cost: "$120-180K/yr",
    detail: "Plus benefits, equity, recruiting fees, and ramp-up time",
  },
  {
    label: "Agency",
    cost: "$15-25K/mo",
    detail: "Expensive overhead, slow communication, misaligned incentives",
  },
  {
    label: "Other fractional PMs",
    cost: "$3-7K/mo",
    detail: "Variable quality, limited availability, less embedded",
  },
  {
    label: "Xelerate",
    cost: "$2K/mo",
    detail:
      "Senior leadership, fully embedded, cancel anytime, outcomes-focused",
    highlighted: true,
  },
];

const pricingFAQs = [
  {
    question: "Is there a setup fee or onboarding cost?",
    answer:
      "No. There are zero upfront costs. Your first month's subscription is all you pay to get started. We handle onboarding as part of the engagement.",
  },
  {
    question: "What happens if I need to pause my subscription?",
    answer:
      "You can cancel at the end of any billing cycle and re-subscribe whenever you're ready. There are no pause fees or penalties for stopping and restarting.",
  },
  {
    question: "Do you offer discounts for longer commitments?",
    answer:
      "Our pricing is already significantly below market rate for senior PM leadership. We keep it simple with one transparent price — no negotiations, no tiers, no hidden fees.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards through Stripe. For custom engagements, we can also accommodate invoicing and bank transfers.",
  },
  {
    question: "Can I upgrade from Product Leadership to a Custom Solution?",
    answer:
      "Absolutely. Many clients start with our Product Leadership plan and later engage us for custom development work. We'll scope and price any additional work separately so there are no surprises.",
  },
];

const PricingContent = () => {
  usePageTracking();
  useScrollTracking();

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
              Simple, transparent pricing.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Senior product leadership without the enterprise price tag. No
              hidden fees, no long-term contracts.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Leadership */}
              <div className="bg-secondary rounded-3xl p-10 md:p-12 flex flex-col relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-[hsl(211,100%,50%)]/10 rounded-full text-sm font-medium text-[hsl(211,100%,50%)] w-fit">
                  Most popular
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Product Leadership
                </h2>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl md:text-6xl font-bold text-foreground">
                    $2,000
                  </span>
                  <span className="text-xl text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground mb-8">
                  Senior product leadership for your team
                </p>
                <div className="space-y-4 mb-10 flex-1">
                  {productLeadershipFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[hsl(211,100%,50%)] flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full group"
                  asChild
                >
                  <a href="/product-leadership">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>

              {/* Custom Solutions */}
              <div className="bg-secondary rounded-3xl p-10 md:p-12 flex flex-col">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-foreground/5 rounded-full text-sm font-medium text-muted-foreground w-fit">
                  Flexible
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Custom Solutions
                </h2>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl md:text-6xl font-bold text-foreground">
                    Custom
                  </span>
                </div>
                <p className="text-muted-foreground mb-8">
                  Tailored to your project&apos;s scope and goals
                </p>
                <div className="space-y-4 mb-10 flex-1">
                  {customSolutionsFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-foreground/40 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full group"
                  asChild
                >
                  <a href="/custom-solutions">
                    Let&apos;s Talk
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why $2,000/month */}
        <section className="py-24 md:py-32 bg-secondary">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
                Why $2,000/month?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Compare the cost of senior product leadership across your
                options.
              </p>
            </div>

            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    item.highlighted
                      ? "bg-[hsl(211,100%,50%)]/10 border-2 border-[hsl(211,100%,50%)]/30"
                      : "bg-background"
                  }`}
                >
                  <div>
                    <h3
                      className={`text-lg font-semibold mb-1 ${
                        item.highlighted
                          ? "text-[hsl(211,100%,50%)]"
                          : "text-foreground"
                      }`}
                    >
                      {item.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                  <div
                    className={`text-2xl md:text-3xl font-bold whitespace-nowrap ${
                      item.highlighted
                        ? "text-[hsl(211,100%,50%)]"
                        : "text-foreground"
                    }`}
                  >
                    {item.cost}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing FAQ */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
                Pricing Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {pricingFAQs.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`pricing-faq-${index}`}
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
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-secondary">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Start today, cancel whenever you want. No risk, no commitment.
            </p>
            <Button variant="accent" size="lg" asChild>
              <a href="/product-leadership">
                Start Your Subscription
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

export default PricingContent;
