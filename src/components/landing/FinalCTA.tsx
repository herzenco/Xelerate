"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { remoteAnalytics } from "@/lib/tracking";

const FinalCTA = () => {
  const handleCTAClick = (ctaName: string) => {
    analytics.trackCTAClick(ctaName, 'final-cta');
    remoteAnalytics.trackCTAClick(ctaName, '/product-leadership');
  };

  const handleConsultationClick = () => {
    analytics.trackCTAClick('Book a free call', 'final-cta');
    remoteAnalytics.trackConsultationClick('final_cta', '/product-leadership');
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Gradient orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[1000px] h-[1000px] bg-[hsl(211,100%,50%)]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
          Stop managing chaos.
          <br />
          <span className="text-gradient">Start shipping.</span>
        </h2>
        
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Join 120+ startups that transformed their product delivery with fractional product leadership.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="accent" size="xl" className="group" asChild onClick={() => handleCTAClick('Start your subscription')}>
            <a href="https://buy.stripe.com/6oU3cub9s7C74X0bu07kc0j" target="_blank" rel="noopener noreferrer">
              Start your subscription
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button variant="outline" size="xl" asChild onClick={handleConsultationClick}>
            <a href="https://calendly.com/herzenco/xelerate-intro-call" target="_blank" rel="noopener noreferrer">
              Book a free call
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
