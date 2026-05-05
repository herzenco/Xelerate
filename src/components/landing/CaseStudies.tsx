import { Rocket, Smartphone, TrendingUp } from "lucide-react";
import { useSectionTracking } from "@/hooks/useSectionTracking";

const caseStudies = [
  {
    icon: Rocket,
    metric: "8 → 3 weeks",
    title: "3-Week Product Launch",
    description: "Cut an 8-week launch plan down to 3 weeks through ruthless prioritization.",
  },
  {
    icon: Smartphone,
    metric: "6 weeks to ship",
    title: "Mobile App Rescue",
    description: "A stalled project stuck for 4 months. Shipped working MVP in 6 weeks.",
  },
  {
    icon: TrendingUp,
    metric: "5k → 50k users",
    title: "Growth Scaling",
    description: "Scaled e-commerce platform 10x through feature prioritization.",
  },
];

const CaseStudies = () => {
  const sectionRef = useSectionTracking("case_studies");

  return (
    <section ref={sectionRef} className="py-32 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Real results.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            What happens with dedicated product leadership.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="group p-8 bg-secondary rounded-2xl hover:bg-foreground hover:text-background transition-all duration-500"
            >
              <div className="w-14 h-14 bg-background rounded-xl flex items-center justify-center mb-6 group-hover:bg-background/10 transition-colors duration-300">
                <study.icon className="w-7 h-7 text-foreground group-hover:text-background transition-colors duration-300" />
              </div>
              
              <div className="text-3xl font-bold mb-3 text-[hsl(211,100%,50%)] group-hover:text-[hsl(211,100%,70%)] transition-colors duration-300">
                {study.metric}
              </div>
              
              <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-background transition-colors duration-300">
                {study.title}
              </h3>
              
              <p className="text-muted-foreground group-hover:text-background/70 transition-colors duration-300 leading-relaxed">
                {study.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
