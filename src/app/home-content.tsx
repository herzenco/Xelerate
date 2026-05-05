"use client";

import { ArrowRight, BarChart3, Code2, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";

const testimonials = [
  {
    quote: "Xelerate brought order to our chaos. In just 48 hours, we had a clear roadmap, priorities locked in, and the entire team rowing in the same direction.",
    name: "Juan Carlos de los Santos",
    title: "CEO, Innovat3 Solutions",
  },
  {
    quote: "Xelerate is a game changer. His ability to take a founder's vision and translate it into a concrete, actionable product roadmap is second to none.",
    name: "Alexis Kopikis",
    title: "CEO, Alexify",
  },
  {
    quote: "Every project he leads runs like a well-oiled machine — smooth, efficient, and delivered with precision.",
    name: "Tom O'Keefe",
    title: "The Brand Whisperer",
  },
];

const HomeContent = () => {
  return (
    <>
      <Header currentPage="home" />

      {/* Hero Section */}
      <section
        aria-labelledby="hero-heading"
        className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
      >
        {/* Subtle gradient orb */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[hsl(211,100%,50%)]/5 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
          <h1
            id="hero-heading"
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-8 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Fractional Product
            <br />
            <span className="text-gradient">Leadership.</span>
          </h1>

          <p
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Senior product management and custom development solutions for
            startups and scale-ups — without the full-time salary.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="accent" size="lg" className="group" asChild>
              <a href="/product-leadership">
                Product Leadership — $2K/mo
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/custom-solutions">Custom Solutions</a>
            </Button>
          </div>
        </div>
      </section>

      {/* What is Xelerate */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Senior Product Leadership, Without the Six-Figure Salary
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>
              Most startups need product leadership long before they can afford a full-time VP of Product.
              That gap leads to misaligned teams, wasted sprints, and products that miss the mark.
            </p>
            <p>
              Xelerate bridges that gap with fractional product management — senior PM expertise
              embedded directly in your team, at a fraction of the cost. We handle roadmapping,
              sprint rituals, stakeholder alignment, and product strategy so your team can focus
              on building.
            </p>
            <p>
              Whether you need ongoing product leadership at{' '}
              <Link href="/pricing" className="text-primary hover:underline">$2,000/month</Link>{' '}
              or a{' '}
              <Link href="/custom-solutions" className="text-primary hover:underline">custom engagement</Link>{' '}
              for a specific project, we bring the experience of 120+ startup engagements to your team.
            </p>
            <p>
              Not sure where to start? Learn{' '}
              <Link href="/how-it-works" className="text-primary hover:underline">how it works</Link>,
              read our{' '}
              <Link href="/faq" className="text-primary hover:underline">FAQ</Link>, or{' '}
              <Link href="/about" className="text-primary hover:underline">get to know the team</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards Section */}
      <section
        aria-labelledby="services-heading"
        className="py-32 bg-secondary"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2
              id="services-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              Two ways to <span className="text-gradient">accelerate.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you need ongoing product leadership or a custom-built
              solution, we have you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Leadership Card */}
            <a
              href="/product-leadership"
              className="group p-10 bg-background rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[hsl(211,100%,50%)]/10 flex items-center justify-center">
                  <BarChart3
                    className="w-6 h-6 text-[hsl(211,100%,50%)]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Product Leadership
                </h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A senior fractional PM embedded in your team. Roadmaps, sprint
                rituals, stakeholder alignment, and KPI dashboards — all for{" "}
                <span className="text-foreground font-semibold">
                  $2,000/month
                </span>
                .
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Hands-on product leadership",
                  "Clear roadmap & sprint management",
                  "KPI dashboards & RAID logs",
                  "Vendor & stakeholder coordination",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <Users className="w-4 h-4 text-foreground/60 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-2 text-foreground font-medium group-hover:gap-3 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </a>

            {/* Custom Solutions Card */}
            <a
              href="/custom-solutions"
              className="group p-10 bg-background rounded-2xl border border-border hover:border-foreground/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[hsl(211,100%,50%)]/10 flex items-center justify-center">
                  <Code2
                    className="w-6 h-6 text-[hsl(211,100%,50%)]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Custom Solutions
                </h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                End-to-end product and development for your next big idea.
                Strategy, design, and engineering — delivered as a complete
                package.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Full product strategy & scoping",
                  "UI/UX design & prototyping",
                  "Development & QA",
                  "Launch support & iteration",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <Zap className="w-4 h-4 text-foreground/60 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-2 text-foreground font-medium group-hover:gap-3 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section
        aria-labelledby="testimonials-heading"
        className="py-32 bg-foreground text-background"
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

      {/* Blog Preview */}
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Latest Insights</h2>
            <p className="text-muted-foreground">Expert resources on product management and startup strategy</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-background border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:border-foreground/20 hover:-translate-y-1"
              >
                <span className="inline-block text-xs font-medium text-muted-foreground bg-muted rounded-full px-3 py-1 mb-4">
                  {post.category}
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-foreground/80 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="text-primary hover:underline font-medium">
              View all posts →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[1000px] h-[1000px] bg-[hsl(211,100%,50%)]/5 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
            Ready to accelerate
            <br />
            <span className="text-gradient">your product?</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Choose the path that fits your stage. Both start with a free
            consultation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" className="group" asChild>
              <a href="/product-leadership">
                Product Leadership — $2K/mo
                <ArrowRight
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="/custom-solutions">Custom Solutions</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomeContent;
