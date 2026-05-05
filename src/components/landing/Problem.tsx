import { useSectionTracking } from "@/hooks/useSectionTracking";

const problems = [
  "Roadmaps slip without accountability",
  "Deadlines drift with no one tracking them",
  "No one knows who's doing what",
  "Founders spend half the week chasing updates",
  "Teams operate without clear ownership",
];

const Problem = () => {
  const sectionRef = useSectionTracking("problem");

  return (
    <section ref={sectionRef} className="py-32 bg-foreground text-background">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
              Product isn't the problem.
              <br />
              <span className="text-muted-foreground">Ownership is.</span>
            </h2>
          </div>
          
          <div>
            <ul className="space-y-6">
              {problems.map((problem, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-lg text-background/80"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-background/10 flex items-center justify-center text-sm font-medium mt-0.5">
                    {index + 1}
                  </span>
                  {problem}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
