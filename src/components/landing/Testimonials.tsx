const testimonials = [
  {
    quote: "Xelerate brought order to our chaos. In just 48 hours, we had a clear roadmap, priorities locked in, and the entire team rowing in the same direction. We stopped guessing and actually started shipping.",
    name: "Juan Carlos de los Santos",
    title: "CEO, Innovat3 Solutions",
  },
  {
    quote: "Xelerate is a game changer. Startups are inherently chaotic, but he has a unique ability to bring order to the madness. His ability to take a founder's vision and translate it into a concrete, actionable product roadmap is second to none.",
    name: "Alexis Kopikis",
    title: "CEO, Alexify",
  },
  {
    quote: "Working with Xelerate has been an absolute pleasure. His ability to bring projects together seamlessly is remarkable. Every project he leads runs like a well-oiled machine—smooth, efficient, and delivered with precision.",
    name: "Tom O'Keefe",
    title: "The Brand Whisperer",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading" 
      className="py-32 bg-foreground text-background"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 id="testimonials-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            What founders say.
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6" role="list">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={index}
              className="p-8 bg-background/5 rounded-2xl border border-background/10"
              role="listitem"
            >
              <p className="text-lg text-background/90 mb-8 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              <footer>
                <cite className="not-italic">
                  <div className="font-semibold text-background">{testimonial.name}</div>
                  <div className="text-sm text-background/60">{testimonial.title}</div>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;