"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  "Cancel anytime",
  "No long-term contracts",
  "Dedicated product leadership",
  "Bi-weekly check-ins",
  "Async Slack support",
  "Scales with your needs",
];

const Pricing = () => {
  return (
    <section className="py-32 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Simple pricing.
          </h2>
          <p className="text-xl text-muted-foreground">
            One subscription. No hidden fees.
          </p>
        </div>
        
        <div className="bg-secondary rounded-3xl p-10 md:p-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[hsl(211,100%,50%)]/10 rounded-full text-sm font-medium text-[hsl(211,100%,50%)]">
            Most popular
          </div>
          
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="text-6xl md:text-7xl font-bold text-foreground">$2,000</span>
            <span className="text-xl text-muted-foreground">/month</span>
          </div>
          
          <p className="text-muted-foreground mb-10">
            Senior product leadership for your team
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left max-w-md mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[hsl(211,100%,50%)] flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
          
          <Button variant="accent" size="xl" className="w-full sm:w-auto group" asChild>
            <a href="https://buy.stripe.com/6oU3cub9s7C74X0bu07kc0j" target="_blank" rel="noopener noreferrer">
              Start your subscription
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          
          <p className="text-sm text-muted-foreground mt-6">
            Start today. Cancel whenever you want.
          </p>
        </div>

        <div className="text-center mt-10">
          <Link href="/pricing" className="text-primary hover:underline font-medium">
            See full pricing comparison →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
