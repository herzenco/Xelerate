import { 
  Search, 
  Map, 
  Users, 
  Calendar, 
  AlertTriangle, 
  BarChart3, 
  ArrowUpRight, 
  Briefcase 
} from "lucide-react";
import { useSectionTracking } from "@/hooks/useSectionTracking";

const deliverables = [
  {
    icon: Search,
    title: "Product Audit",
    description: "Deep dive into backlog, features, and technical debt",
  },
  {
    icon: Map,
    title: "Roadmap",
    description: "Living roadmap aligned with business goals",
  },
  {
    icon: Users,
    title: "RACI Matrix",
    description: "Clear ownership for every task",
  },
  {
    icon: Calendar,
    title: "Sprint Rituals",
    description: "Planning, standups, and retros that work",
  },
  {
    icon: AlertTriangle,
    title: "RAID Log",
    description: "Risks and dependencies tracked",
  },
  {
    icon: BarChart3,
    title: "KPI Dashboard",
    description: "Metrics to track progress and velocity",
  },
  {
    icon: ArrowUpRight,
    title: "Escalation Paths",
    description: "Clear processes when blockers arise",
  },
  {
    icon: Briefcase,
    title: "Vendor Management",
    description: "Coordinate partners and contractors",
  },
];

const Deliverables = () => {
  const sectionRef = useSectionTracking("deliverables");

  return (
    <section ref={sectionRef} className="py-32 bg-secondary">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            What's included.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to run product like a pro.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {deliverables.map((item, index) => (
            <div
              key={index}
              className="group p-6 bg-background rounded-2xl hover:shadow-xl transition-all duration-500"
            >
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-5 group-hover:bg-[hsl(211,100%,50%)]/10 transition-colors duration-300">
                <item.icon className="w-6 h-6 text-foreground group-hover:text-[hsl(211,100%,50%)] transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deliverables;
