"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Phone,
  FileText,
  Rocket,
  TrendingUp,
  Target,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Book a Discovery Call",
    timing: "15 minutes",
    description:
      "We learn about your product, team, and challenges. No pitch, just listening. By the end of the call, we'll know if we're a good fit — and you'll know exactly how we can help.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Get Your Action Plan",
    timing: "Within 48 hours",
    description:
      "We deliver a tailored engagement plan with clear objectives, deliverables, and timeline. You'll see exactly what the first 30 days look like before you commit to anything.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Kick Off",
    timing: "Day 1-3",
    description:
      "We embed with your team. Access to Slack, tools, and context. Hit the ground running. No lengthy onboarding — we're designed to deliver value from the first week.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Build Momentum",
    timing: "Week 1-2",
    description:
      "Establish rituals, audit the current state, prioritize the backlog, and align stakeholders. Your team will feel the difference immediately as clarity replaces chaos.",
  },
  {
    number: "05",
    icon: Target,
    title: "Deliver Results",
    timing: "Ongoing",
    description:
      "Ship features, hit milestones, iterate based on data. Monthly reviews ensure we're always focused on impact. You get a PM who owns outcomes, not just process.",
  },
];

const milestones = [
  {
    period: "First 30 Days",
    deliverables: [
      "Complete product audit and current state assessment",
      "Prioritized backlog with clear acceptance criteria",
      "Established sprint cadence and team rituals",
      "Stakeholder alignment on top 3 priorities",
      "First sprint shipped and reviewed",
    ],
  },
  {
    period: "First 60 Days",
    deliverables: [
      "Product roadmap aligned with business goals",
      "Measurable improvement in shipping velocity",
      "Data-informed prioritization framework in place",
      "Cross-functional collaboration patterns established",
      "First major milestone delivered",
    ],
  },
  {
    period: "First 90 Days",
    deliverables: [
      "Full product strategy documented and socialized",
      "Repeatable processes running without hand-holding",
      "Clear metrics dashboard tracking product health",
      "Team operating at sustainable, predictable velocity",
      "Strategic roadmap for next 2-3 quarters",
    ],
  },
];

const HowItWorksContent = () => {
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
              From first call to full velocity in under a week.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Getting started is simple. Here&apos;s exactly what to expect when
              you work with Xelerate.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-12 md:space-y-16">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="relative flex flex-col md:flex-row gap-6 md:gap-10"
                  >
                    {/* Timeline connector */}
                    {index < steps.length - 1 && (
                      <div
                        className="hidden md:block absolute left-[28px] top-[72px] bottom-[-64px] w-px bg-border"
                        aria-hidden="true"
                      />
                    )}

                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-[hsl(211,100%,50%)]/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[hsl(211,100%,50%)]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-[hsl(211,100%,50%)]">
                          {step.number}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {step.timing}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                        {step.title}
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-24 md:py-32 bg-secondary">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
                What to expect
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Concrete deliverables and milestones, so you know exactly
                what you&apos;re getting.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="bg-background rounded-2xl p-8"
                >
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    {milestone.period}
                  </h3>
                  <ul className="space-y-4">
                    {milestone.deliverables.map((deliverable, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[hsl(211,100%,50%)] mt-2.5 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm leading-relaxed">
                          {deliverable}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Ready to start?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Book your discovery call and see how Xelerate can help your team
              ship faster.
            </p>
            <Button variant="accent" size="lg" asChild>
              <a href="/product-leadership">
                Book Your Discovery Call
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

export default HowItWorksContent;
