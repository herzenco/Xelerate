"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { analytics } from "@/lib/analytics";
import { remoteAnalytics } from "@/lib/tracking";

const StickyMobileCTA = () => {
  const handleCTAClick = () => {
    analytics.trackCTAClick('Start your subscription', 'sticky-mobile');
    remoteAnalytics.trackCTAClick('Start your subscription', window.location.pathname);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-xl border-t border-border p-4">
      <Button variant="accent" size="lg" className="w-full group" asChild onClick={handleCTAClick}>
        <a href="https://buy.stripe.com/6oU3cub9s7C74X0bu07kc0j" target="_blank" rel="noopener noreferrer">
          Start your subscription
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </Button>
    </div>
  );
};

export default StickyMobileCTA;
