"use client";

import { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Map,
  Code,
  Rocket,
  Settings,
  Search,
  Users,
  ChevronDown,
  Shield,
  DollarSign,
  FileCheck,
  Timer,
} from "lucide-react";
import {
  ExpertiseIcon,
  CheckIcon,
} from "@/components/icons/XelerateIcons";
import { analytics } from "@/lib/analytics";
import { remoteAnalytics } from "@/lib/tracking";
import ContactForm from "@/components/landing/ContactForm";
import GetStartedModal from "@/components/landing/GetStartedModal";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import Link from "next/link";

const services = [
  {
    Icon: Map,
    title: "Product Strategy & Roadmapping",
    description:
      "We work with founders and leadership teams to define product vision, prioritize features based on business impact, and build actionable roadmaps that align engineering effort with revenue goals. No more guessing what to build next.",
  },
  {
    Icon: Code,
    title: "Web Application Development",
    description:
      "Full-stack web application development using modern frameworks like Next.js, React, and Node.js. We build performant, scalable applications with clean architecture that your team can maintain and extend long after our engagement ends.",
  },
  {
    Icon: Rocket,
    title: "MVP & Prototype Development",
    description:
      "Get to market fast with a focused MVP that validates your core hypothesis. We strip away feature bloat, identify the critical path, and ship a testable product in weeks, not months. Perfect for pre-seed and seed-stage startups.",
  },
  {
    Icon: Settings,
    title: "Product Process & Operations",
    description:
      "Implement the systems that make product teams run smoothly: sprint planning, backlog management, stakeholder communication, and release processes. We bring structure without bureaucracy so your team ships consistently.",
  },
  {
    Icon: Search,
    title: "Technical Discovery & Scoping",
    description:
      "Before you commit budget to a build, get clarity on what you actually need. Our technical discovery process maps requirements, identifies risks, defines architecture, and produces a detailed scope document with realistic timelines and cost estimates.",
  },
  {
    Icon: Users,
    title: "Team Augmentation & Mentoring",
    description:
      "Embed senior product and engineering leadership directly into your team. We upskill junior PMs, coach engineering leads on product thinking, and fill capability gaps without the overhead of a full-time hire.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We dive deep into your business, users, and goals. Through stakeholder interviews, competitive analysis, and user research, we map the landscape and identify the highest-impact opportunities. This phase typically includes a thorough audit of your existing product (if applicable), a review of your market positioning, and workshops with your leadership team to align on priorities. The output is a clear understanding of where you are, where you need to go, and what stands in the way.",
  },
  {
    step: "02",
    title: "Scope",
    description:
      "We define the solution architecture, create detailed specs, and build a phased roadmap. Every deliverable is agreed upon upfront with clear milestones and success criteria. You receive a comprehensive project brief that covers technical approach, resource allocation, timeline, and budget. We break work into incremental phases so you see value early and can adjust direction based on real feedback rather than assumptions.",
  },
  {
    step: "03",
    title: "Execute",
    description:
      "Our team builds iteratively with weekly demos and continuous feedback loops. You stay in control with full visibility into progress, blockers, and decisions. We work in short sprints, shipping working software at the end of each cycle. Communication happens in your tools, on your schedule. There are no black boxes and no surprises—just steady, measurable progress toward your goals.",
  },
  {
    step: "04",
    title: "Transfer",
    description:
      "We don't just deliver and disappear. We ensure your team is equipped to own and evolve the solution with documentation, training, and a structured handoff. This includes architecture documentation, runbooks, video walkthroughs, and pair sessions with your developers. When we leave, your team should feel more capable than before we arrived—not dependent on us coming back.",
  },
];

const whyXelerate = [
  {
    Icon: ExpertiseIcon,
    title: "Senior-Level Expertise",
    description:
      "Every engagement is led by experienced product managers and engineers with 10+ years in the field. You work directly with the people doing the work—no junior handoffs, no bait-and-switch.",
  },
  {
    Icon: Shield,
    title: "Flexible Engagement Models",
    description:
      "Whether you need a two-week sprint, a three-month build, or ongoing fractional support, we structure engagements around your needs. Scale up or down without the friction of traditional contracts.",
  },
  {
    Icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "No hidden fees, no scope creep surprises. We provide detailed proposals with clear pricing before work begins, and we flag budget implications early if requirements change.",
  },
  {
    Icon: FileCheck,
    title: "Full Ownership of Deliverables",
    description:
      "Everything we build belongs to you. Code, documentation, designs, research—all of it. We use your repositories, your tools, and your infrastructure so there is zero vendor lock-in.",
  },
  {
    Icon: Timer,
    title: "Startup-Speed Execution",
    description:
      "We move fast because we have been in your shoes. Lean teams, rapid iteration, bias toward action. We ship working software every week, not slide decks every quarter.",
  },
];

const testimonials = [
  {
    quote:
      "Xelerate took our half-baked idea and turned it into a production-ready platform in under eight weeks. The discovery process alone saved us months of building the wrong thing. They truly understand how to balance speed with quality.",
    name: "Juan Carlos de los Santos",
    title: "CEO, Innovat3 Solutions",
  },
  {
    quote:
      "Xelerate is a game changer. Startups are inherently chaotic, but he has a unique ability to bring order to the madness. His ability to take a founder's vision and translate it into a concrete, actionable product roadmap is second to none.",
    name: "Alexis Kopikis",
    title: "CEO, Alexify",
  },
  {
    quote:
      "Working with Xelerate has been an absolute pleasure. His ability to bring projects together seamlessly is remarkable. Every project he leads runs like a well-oiled machine—smooth, efficient, and delivered with precision.",
    name: "Tom O'Keefe",
    title: "The Brand Whisperer",
  },
];

const faqs = [
  {
    question: "What types of projects do you take on?",
    answer:
      "We handle everything from MVP development and product strategy to full web application builds and team augmentation. Our sweet spot is early-stage startups and growth-stage companies that need senior product and engineering leadership without committing to a full-time hire. If it involves building, shipping, or scaling a digital product, we can help.",
  },
  {
    question: "How long do custom engagements typically last?",
    answer:
      "Engagements range from two-week discovery sprints to six-month product builds. Most projects fall in the six-to-twelve-week range. We always start with a scoping phase so both sides have a clear picture of timeline and deliverables before committing to a longer engagement.",
  },
  {
    question: "What's your pricing model for custom work?",
    answer:
      "We offer three models: fixed-price projects with clearly defined scope, time-and-materials for exploratory or evolving work, and monthly retainers for ongoing fractional support. Every engagement starts with a free discovery call and a detailed proposal so you know exactly what you are paying for.",
  },
  {
    question: "Do you work with existing development teams?",
    answer:
      "Absolutely. Many of our engagements involve embedding alongside your existing team. We integrate into your workflows, tools, and communication channels. Our goal is to amplify your team's output, not replace them. We also provide mentoring and process improvements that outlast our engagement.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "Our core stack is TypeScript, React, Next.js, Node.js, and PostgreSQL, but we are experienced across a wide range of technologies including Python, AWS, GCP, Supabase, and various headless CMS platforms. We choose the right tools for your specific needs rather than forcing a one-size-fits-all approach.",
  },
  {
    question: "How do we get started?",
    answer:
      "Start by filling out the contact form on this page or scheduling a free consultation call. We will have an initial conversation to understand your challenges, timeline, and budget. From there, we provide a tailored proposal within a few business days. If it is a fit, we can typically kick off within one to two weeks.",
  },
];

const CustomSolutionsContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  usePageTracking();
  useScrollTracking();

  const handleCTAClick = (ctaName: string, location: string) => {
    analytics.trackCTAClick(ctaName, location);
    remoteAnalytics.trackCTAClick(ctaName, "/custom-solutions");
  };

  const handleGetStartedClick = (location: string) => {
    analytics.trackCTAClick("Get started today", location);
    remoteAnalytics.trackCTAClick("Get started today", "/custom-solutions");
    setIsModalOpen(true);
  };

  const handleConsultationClick = (location: string) => {
    analytics.trackCTAClick("Schedule a consultation", location);
    remoteAnalytics.trackConsultationClick(location, "/custom-solutions");
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:border focus:border-border"
      >
        Skip to main content
      </a>
      <Header currentPage="custom-solutions" />

      <main id="main-content" className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section
          aria-labelledby="hero-heading"
          className="relative py-24 md:py-32 lg:py-40 bg-background overflow-hidden"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[hsl(211,100%,50%)]/5 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[hsl(211,100%,50%)]/3 rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-secondary rounded-full text-sm font-medium text-muted-foreground animate-fade-up">
                <span
                  className="w-2 h-2 bg-[hsl(211,100%,50%)] rounded-full"
                  aria-hidden="true"
                />
                Custom Solutions
              </div>

              <h1
                id="hero-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                Custom Product &amp; Development
                <span className="text-gradient"> Solutions</span>
              </h1>

              <p
                className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-4 animate-fade-up"
                style={{ animationDelay: "0.15s" }}
              >
                Tailored strategies. Bespoke builds. Real results.
              </p>

              <p
                className="text-lg text-muted-foreground leading-relaxed mb-8 animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                Not every product challenge fits into a subscription box. When
                you need a dedicated team to tackle a complex build, define a
                product strategy from scratch, or accelerate a critical
                initiative, our custom solutions give you senior-level
                expertise on your terms. We scope precisely what you need,
                execute alongside your team, and deliver outcomes you can
                measure.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 animate-fade-up"
                style={{ animationDelay: "0.3s" }}
              >
                <Button
                  variant="accent"
                  size="lg"
                  className="group"
                  onClick={() =>
                    handleGetStartedClick("custom-solutions-hero")
                  }
                >
                  Get started today
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="group"
                  onClick={() => {
                    handleCTAClick(
                      "Talk to us",
                      "custom-solutions-hero"
                    );
                    scrollToContact();
                  }}
                >
                  Talk to us
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What We Build */}
        <section
          aria-labelledby="services-heading"
          className="py-24 md:py-32 bg-secondary"
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2
                id="services-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
              >
                What we build.
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From strategy to code, we cover the full spectrum of product
                and development work.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services.map((service, index) => (
                <article
                  key={index}
                  className="group p-6 md:p-8 bg-background rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 bg-[hsl(211,100%,50%)]/10 rounded-xl flex items-center justify-center group-hover:bg-[hsl(211,100%,50%)]/20 transition-colors mb-4"
                    aria-hidden="true"
                  >
                    <service.Icon className="w-6 h-6 text-[hsl(211,100%,50%)]" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          aria-labelledby="how-it-works-heading"
          className="py-24 md:py-32 bg-background"
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2
                id="how-it-works-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
              >
                How we work.
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every engagement follows a proven four-phase framework
                designed for clarity, accountability, and lasting impact.
              </p>
            </div>

            <div className="space-y-6">
              {processSteps.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-secondary rounded-2xl p-8 md:p-10"
                >
                  <div className="flex items-start gap-6">
                    <div
                      className="flex-shrink-0 w-14 h-14 bg-foreground text-background rounded-full flex items-center justify-center text-lg font-bold"
                      aria-hidden="true"
                    >
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/how-it-works" className="text-primary hover:underline font-medium">
                See our full process →
              </Link>
            </div>
          </div>
        </section>

        {/* Why Xelerate */}
        <section
          aria-labelledby="why-heading"
          className="py-24 md:py-32 bg-secondary"
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2
                id="why-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
              >
                Why teams choose Xelerate.
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We are not a dev shop. We are product people who build.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {whyXelerate.map((value, index) => (
                <article
                  key={index}
                  className="group p-6 md:p-8 bg-background rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 bg-[hsl(211,100%,50%)]/10 rounded-xl flex items-center justify-center group-hover:bg-[hsl(211,100%,50%)]/20 transition-colors"
                      aria-hidden="true"
                    >
                      <value.Icon className="w-6 h-6 text-[hsl(211,100%,50%)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Cross Links */}
        <section className="py-8 bg-secondary">
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/pricing" className="text-primary hover:underline font-medium">
              See our pricing →
            </Link>
            <Link href="/blog" className="text-primary hover:underline font-medium">
              Read our blog →
            </Link>
            <Link href="/faq" className="text-primary hover:underline font-medium">
              Frequently asked questions →
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section
          aria-labelledby="testimonials-heading"
          className="py-24 md:py-32 bg-foreground text-background"
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2
                id="testimonials-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              >
                What founders say.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6" role="list">
              {testimonials.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className="p-8 bg-background/5 rounded-2xl border border-background/10"
                  role="listitem"
                >
                  <p className="text-lg text-background/90 mb-8 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <footer>
                    <cite className="not-italic">
                      <div className="font-semibold text-background">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-background/60">
                        {testimonial.title}
                      </div>
                    </cite>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          aria-labelledby="faq-heading"
          className="py-24 md:py-32 bg-background"
        >
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2
                id="faq-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
              >
                Frequently asked questions.
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about working with us.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-secondary rounded-2xl overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                    aria-expanded={openFaq === index}
                  >
                    <span className="text-lg font-semibold text-foreground pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="py-24 md:py-32 bg-secondary"
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <h2
                  id="contact-heading"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6"
                >
                  Let&apos;s talk.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Have a project in mind? Tell us about your challenges and
                  we&apos;ll get back to you within 24 hours with a clear
                  next step.
                </p>

                <ul className="space-y-3 mb-8" role="list">
                  {[
                    "Free initial consultation",
                    "Detailed proposal within days",
                    "No commitment required",
                    "Transparent pricing upfront",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckIcon
                        className="w-5 h-5 text-[hsl(211,100%,50%)] flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4 text-muted-foreground">
                  <p>Prefer to schedule a call directly?</p>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group"
                    asChild
                    onClick={() =>
                      handleConsultationClick("contact-section")
                    }
                  >
                    <a
                      href="https://calendly.com/herzenco/xelerate-custom-solutions-consulting"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Schedule a consultation
                      <ArrowRight
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="bg-background rounded-2xl p-8 md:p-10">
                <ContactForm source="custom_solutions_page" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          aria-labelledby="cta-heading"
          className="py-24 md:py-32 bg-background relative overflow-hidden"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[hsl(211,100%,50%)]/5 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2
              id="cta-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6"
            >
              Ready to get started?
            </h2>

            <p className="text-lg text-muted-foreground mb-10">
              Let&apos;s discuss how we can help you tackle your next
              challenge. Every engagement starts with a free discovery call—no
              pressure, no commitment.
            </p>

            <Button
              variant="accent"
              size="lg"
              className="group"
              onClick={() => handleGetStartedClick("custom-solutions-cta")}
            >
              Get started today
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Button>
          </div>
        </section>

        <GetStartedModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          source="/custom-solutions"
        />
      </main>

      <Footer />
    </>
  );
};

export default CustomSolutionsContent;
