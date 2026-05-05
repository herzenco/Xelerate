import { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ExpertiseIcon, PartnershipIcon, OutcomeIcon, FlexibilityIcon, CheckIcon } from "@/components/icons/XelerateIcons";
import { analytics } from "@/lib/analytics";
import { remoteAnalytics } from "@/lib/tracking";
import ContactForm from "@/components/landing/ContactForm";
import GetStartedModal from "@/components/landing/GetStartedModal";

const values = [
  {
    Icon: ExpertiseIcon,
    title: "Senior-Level Expertise",
    description: "Direct access to experienced product managers, project leads, and developers—no junior handoffs.",
  },
  {
    Icon: PartnershipIcon,
    title: "Embedded Partnership",
    description: "We work alongside your team, not in a silo. True collaboration that builds internal capability.",
  },
  {
    Icon: OutcomeIcon,
    title: "Outcome-Focused",
    description: "We deliver results, not just recommendations. Every engagement is scoped for measurable impact.",
  },
  {
    Icon: FlexibilityIcon,
    title: "No Overhead",
    description: "Get the expertise you need without the burden of full-time hires, benefits, or long-term contracts.",
  },
];

const CustomSolutions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCTAClick = (ctaName: string, location: string) => {
    analytics.trackCTAClick(ctaName, location);
    remoteAnalytics.trackCTAClick(ctaName, '/custom-solutions');
  };

  const handleGetStartedClick = (location: string) => {
    analytics.trackCTAClick('Get started today', location);
    remoteAnalytics.trackCTAClick('Get started today', '/custom-solutions');
    setIsModalOpen(true);
  };

  const handleConsultationClick = (location: string) => {
    analytics.trackCTAClick('Schedule a consultation', location);
    remoteAnalytics.trackConsultationClick(location, '/custom-solutions');
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Xelerate Custom Solutions',
    description: 'Custom product management, web development, and bespoke software solutions for startups',
    url: 'https://xelerate.me/custom-solutions',
    areaServed: 'Worldwide',
    serviceType: ['Product Management', 'Web Development', 'Custom Software Development', 'Project Management'],
    provider: {
      '@type': 'Organization',
      name: 'Xelerate',
      url: 'https://xelerate.me',
    },
  };

  return (
    <>
      <SEOHead
        title="Custom Solutions - Bespoke Product & Development Services | Xelerate"
        description="Tailored product management, web development, and custom software solutions. Senior-level expertise with flexible engagements and measurable results."
        canonical="/custom-solutions"
        keywords="custom product management, bespoke software development, web development services, fractional CTO, startup consulting"
        schemaJson={structuredData}
      />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:border focus:border-border">
        Skip to main content
      </a>
      <Header currentPage="custom-solutions" />
      
      <main id="main-content" className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section aria-labelledby="hero-heading" className="relative py-24 md:py-32 lg:py-40 bg-background overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[hsl(211,100%,50%)]/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[hsl(211,100%,50%)]/3 rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2" aria-hidden="true" />
          
          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-secondary rounded-full text-sm font-medium text-muted-foreground animate-fade-up">
                <span className="w-2 h-2 bg-[hsl(211,100%,50%)] rounded-full" aria-hidden="true" />
                Custom Solutions
              </div>
              
              <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                Tailored strategies. Bespoke builds.
                <span className="text-gradient"> Real results.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                Flexible, bespoke engagements for organizations tackling complex product challenges, 
                full-stack development, and tailor-made software builds.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                <Button variant="accent" size="lg" className="group" onClick={() => handleGetStartedClick('custom-solutions-hero')}>
                  Get started today
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section aria-labelledby="value-props-heading" className="py-24 md:py-32 bg-secondary">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 id="value-props-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
                Why teams choose us.
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Senior expertise, delivered flexibly.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {values.map((value, index) => (
                <article
                  key={index}
                  className="group p-6 md:p-8 bg-background rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[hsl(211,100%,50%)]/10 rounded-xl flex items-center justify-center group-hover:bg-[hsl(211,100%,50%)]/20 transition-colors" aria-hidden="true">
                      <value.Icon className="w-6 h-6 text-[hsl(211,100%,50%)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section aria-labelledby="how-we-work-heading" className="py-24 md:py-32 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 id="how-we-work-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
                  How we work.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Every engagement starts with understanding your unique situation. We scope precisely 
                  what's needed, execute alongside your team, and ensure knowledge transfer so your 
                  organization grows stronger.
                </p>
                
                <ul className="space-y-4" role="list">
                  {[
                    "Deep discovery to understand your challenges",
                    "Custom scope tailored to your needs",
                    "Embedded execution with your team",
                    "Knowledge transfer built into every project"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckIcon className="w-5 h-5 text-[hsl(211,100%,50%)] flex-shrink-0" aria-hidden="true" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-[hsl(211,100%,50%)]/5 rounded-3xl blur-2xl" aria-hidden="true" />
                <div className="relative bg-secondary rounded-2xl p-8 md:p-10">
                  <ol className="space-y-6" role="list">
                    {[
                      { step: "01", title: "Discovery", desc: "We learn about your challenges and goals." },
                      { step: "02", title: "Scope", desc: "Custom proposal with clear deliverables." },
                      { step: "03", title: "Execute", desc: "We embed and deliver alongside your team." },
                      { step: "04", title: "Transfer", desc: "Your team owns the outcomes long-term." },
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-bold" aria-hidden="true">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" aria-labelledby="contact-heading" className="py-24 md:py-32 bg-background">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <h2 id="contact-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
                  Let's talk.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Have a project in mind? Tell us about your challenges and we'll get back to you within 24 hours.
                </p>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>Prefer to schedule a call directly?</p>
                  <Button variant="outline" size="lg" className="group" asChild onClick={() => handleConsultationClick('contact-section')}>
                    <a href="https://calendly.com/herzenco/xelerate-custom-solutions-consulting" target="_blank" rel="noopener noreferrer">
                      Schedule a consultation
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="bg-secondary rounded-2xl p-8 md:p-10">
                <ContactForm source="custom_solutions_page" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section aria-labelledby="cta-heading" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[hsl(211,100%,50%)]/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2 id="cta-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Ready to get started?
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10">
              Let's discuss how we can help you tackle your next challenge.
            </p>
            
            <Button variant="accent" size="lg" className="group" onClick={() => handleGetStartedClick('custom-solutions-cta')}>
              Get started today
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </div>
        </section>

        <GetStartedModal open={isModalOpen} onOpenChange={setIsModalOpen} source="/custom-solutions" />
      </main>
      
      <Footer />
    </>
  );
};

export default CustomSolutions;