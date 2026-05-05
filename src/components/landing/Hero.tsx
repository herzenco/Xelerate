"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { remoteAnalytics } from "@/lib/tracking";
import GetStartedModal from "./GetStartedModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetStartedClick = () => {
    analytics.trackCTAClick('Get Started', 'hero');
    remoteAnalytics.trackCTAClick('Get Started', '/product-leadership');
    setIsModalOpen(true);
  };

  return (
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
        {/* Headline */}
        <h1 
          id="hero-heading" 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-8 animate-fade-up" 
          style={{ animationDelay: "0.1s" }}
        >
          Product leadership.
          <br />
          <span className="text-gradient">$2,000/month.</span>
        </h1>
        
        {/* Subheadline */}
        <p 
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up" 
          style={{ animationDelay: "0.2s" }}
        >
          Senior product management without the salary. 
          Your fractional PM, embedded in your team.
        </p>
        
        {/* CTA */}
        <div className="flex justify-center mb-20 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button 
            variant="accent" 
            size="lg" 
            className="group" 
            onClick={handleGetStartedClick}
          >
            Get started today
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Button>
        </div>
        
      </div>

      <GetStartedModal open={isModalOpen} onOpenChange={setIsModalOpen} source="/product-leadership" />
    </section>
  );
};

export default Hero;