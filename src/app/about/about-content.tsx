"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, Zap, Target } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Ownership",
    description:
      "We don't just advise — we own outcomes. Your product goals become our product goals. We're accountable for results, not just deliverables.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "No black boxes. You'll always know what we're working on, why we're prioritizing it, and how it maps to your business objectives.",
  },
  {
    icon: Zap,
    title: "Speed",
    description:
      "Startups move fast, and so do we. From kickoff to first sprint in days, not weeks. We cut through process overhead and focus on shipping.",
  },
  {
    icon: Target,
    title: "Impact",
    description:
      "Every decision is measured against real outcomes. We don't build features for the sake of building — we ship what moves the needle.",
  },
];

const problems = [
  {
    title: "The full-time hire",
    cost: "$150K+",
    issue:
      "Great if you can afford it. But at the seed or Series A stage, that's a massive burn commitment for a role that might evolve significantly in 6 months.",
  },
  {
    title: "The agency",
    cost: "$15-25K/mo",
    issue:
      "Expensive overhead, misaligned incentives, and a team that's juggling 10 other clients. You get polished decks, not embedded leadership.",
  },
  {
    title: "The contractor",
    cost: "Variable",
    issue:
      "Flexible, but often lacks the strategic depth and ownership mentality you need. Great for execution, less so for product vision.",
  },
];

const AboutContent = () => {
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
        {/* Mission */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-8">
              We believe every startup deserves great product leadership.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Xelerate was founded to give startups access to senior product
              leadership without the six-figure salary. We embed with your team,
              take ownership of outcomes, and help you ship products that matter.
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-24 md:py-32 bg-secondary">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
                The problem we solve
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Startups need product leadership, but the traditional options
                don&apos;t fit.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="bg-background rounded-2xl p-8"
                >
                  <div className="text-sm font-mono text-muted-foreground mb-2">
                    {problem.cost}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.issue}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
                Our approach
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Embedded, not external. We become part of your team.
              </p>
            </div>

            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              <p>
                We don&apos;t sit on the sidelines and send recommendations.
                We join your Slack, attend your standups, manage your backlog,
                and hold your team accountable. When your engineers have
                questions, we&apos;re there. When stakeholders need alignment,
                we facilitate it.
              </p>
              <p>
                The difference between a consultant and a fractional PM is
                ownership. Consultants optimize for billable hours. We optimize
                for your product&apos;s success. Our reputation depends on your
                results — and that&apos;s exactly how we like it.
              </p>
              <p>
                We&apos;ve worked with seed-stage startups finding
                product-market fit and Series B companies scaling their product
                organizations. No matter where you are in your journey, we bring
                the process, structure, and strategic thinking that turns chaos
                into momentum.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 md:py-32 bg-secondary">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
                What we stand for
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-background rounded-2xl p-8">
                    <div className="w-12 h-12 rounded-xl bg-[hsl(211,100%,50%)]/10 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-[hsl(211,100%,50%)]" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Meet the Founder</h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Xelerate was founded by a product leader with over a decade of experience
                shipping products at startups and scale-ups across SaaS, fintech, and
                marketplace verticals.
              </p>
              <p>
                After seeing too many startups stall because they couldn&apos;t afford — or
                didn&apos;t yet need — a full-time product leader, the fractional model became
                the obvious answer: give every startup access to senior PM leadership at
                a price that makes sense for their stage.
              </p>
              <p>
                Today, Xelerate has helped 120+ teams ship faster, prioritize smarter,
                and build products their users actually want.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-background">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Let&apos;s build something great together.
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              See how we work, or explore our pricing — no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="accent" size="lg" asChild>
                <a href="/how-it-works">
                  See How It Works
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/pricing">View Pricing</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutContent;
