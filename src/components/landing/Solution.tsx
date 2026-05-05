import { Check } from "lucide-react";
import { useSectionTracking } from "@/hooks/useSectionTracking";

const benefits = [
  "Hands-on product leadership",
  "Clear roadmap + reality checks",
  "Sprint rituals run objectively",
  "RAID logs & risk tracking",
  "KPI dashboards",
  "Vendor & stakeholder coordination",
];

const Solution = () => {
  const sectionRef = useSectionTracking("solution");

  return (
    <section ref={sectionRef} className="py-32 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Your fractional PM.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to ship with confidence—without the $150K+ salary.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 bg-secondary rounded-2xl hover:bg-secondary/80 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[hsl(211,100%,50%)]/10 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-[hsl(211,100%,50%)]" />
                </div>
                <span className="text-foreground font-medium">{benefit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
