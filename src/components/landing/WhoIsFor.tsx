import { ArrowRight } from "lucide-react";

const audiences = [
  "Post-seed startups ready to execute",
  "Teams without a dedicated PM",
  "Founders who want accountability",
  "Startups struggling to ship",
  "Companies unable to hire full-time",
];

const WhoIsFor = () => {
  return (
    <section className="py-32 bg-secondary">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
              Built for founders who ship.
            </h2>
            <p className="text-xl text-muted-foreground">
              Product leadership without the overhead of a full-time hire.
            </p>
          </div>
          
          <div className="space-y-4">
            {audiences.map((audience, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-5 bg-background rounded-xl group hover:shadow-lg transition-all duration-300"
              >
                <ArrowRight className="w-5 h-5 text-[hsl(211,100%,50%)] flex-shrink-0" />
                <span className="text-foreground font-medium">{audience}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsFor;
