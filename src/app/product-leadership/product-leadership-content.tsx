"use client";

import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import Deliverables from "@/components/landing/Deliverables";
import HowItWorks from "@/components/landing/HowItWorks";
import WhoIsFor from "@/components/landing/WhoIsFor";
import CaseStudies from "@/components/landing/CaseStudies";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import StickyMobileCTA from "@/components/landing/StickyMobileCTA";
import Link from "next/link";

const ProductLeadershipContent = () => {

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:border focus:border-border"
      >
        Skip to main content
      </a>
      <Header currentPage="product-leadership" />

      <main id="main-content" className="pt-16 lg:pt-20">
        <Hero />
        <Problem />
        <Solution />
        <Deliverables />
        <HowItWorks />
        <WhoIsFor />
        <CaseStudies />
        <Testimonials />
        <section className="py-8 bg-background">
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/blog" className="text-primary hover:underline font-medium">
              Read our blog →
            </Link>
            <Link href="/faq" className="text-primary hover:underline font-medium">
              Frequently asked questions →
            </Link>
          </div>
        </section>
        <Pricing />
        <FinalCTA />
      </main>

      <Footer />
      <StickyMobileCTA />

      {/* Extra padding for mobile sticky CTA */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
};

export default ProductLeadershipContent;
