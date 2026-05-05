import { useSectionTracking } from "@/hooks/useSectionTracking";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "We review your situation and confirm fit. No pressure, no commitment.",
  },
  {
    number: "02",
    title: "Onboarding & Audit",
    description: "We evaluate your product, backlog, tech, risks, and team structure.",
  },
  {
    number: "03",
    title: "Monthly Execution",
    description: "Ongoing product leadership + delivery oversight. Cancel anytime.",
  },
];

const HowItWorks = () => {
  const sectionRef = useSectionTracking("how_it_works");

  return (
    <section ref={sectionRef} className="py-32 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            How it works.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in three simple steps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[1px] bg-border" />
              )}
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-foreground text-background rounded-full text-xl font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/how-it-works" className="text-primary hover:underline font-medium">
            See the full process →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
