import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import Deliverables from "@/components/landing/Deliverables";
import HowItWorks from "@/components/landing/HowItWorks";
import WhoIsFor from "@/components/landing/WhoIsFor";
import CaseStudies from "@/components/landing/CaseStudies";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";
import StickyMobileCTA from "@/components/landing/StickyMobileCTA";
import SEOHead from "@/components/SEOHead";

const ProductLeadership = () => {
  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Fractional Product Management',
    description: 'Senior product leadership for $2,000/month. Hands-on PM support, roadmaps, and accountability.',
    url: 'https://xelerate.me/product-leadership',
    provider: {
      '@type': 'Organization',
      name: 'Xelerate',
      url: 'https://xelerate.me',
    },
    offers: {
      '@type': 'Offer',
      price: '2000',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '2000',
        priceCurrency: 'USD',
        unitText: 'month',
      },
    },
    serviceType: 'Product Management',
    areaServed: 'Worldwide',
  };

  const testimonialsStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Xelerate Fractional Product Management',
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Juan Carlos de los Santos',
        },
        reviewBody: 'Xelerate brought order to our chaos. In just 48 hours, we had a clear roadmap, priorities locked in, and the entire team rowing in the same direction.',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Alexis Kopikis',
        },
        reviewBody: 'Xelerate is a game changer. His ability to take a founder\'s vision and translate it into a concrete, actionable product roadmap is second to none.',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: "Tom O'Keefe",
        },
        reviewBody: 'Working with Xelerate has been an absolute pleasure. Every project he leads runs like a well-oiled machine—smooth, efficient, and delivered with precision.',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '3',
      bestRating: '5',
    },
  };

  return (
    <>
      <SEOHead
        title="Fractional Product Management for $2,000/Month | Xelerate"
        description="Senior product leadership without the salary. Get hands-on PM support, clear roadmaps, sprint rituals, and accountability for $2,000/month. Cancel anytime."
        canonical="/product-leadership"
        keywords="fractional product manager, part-time PM, product management consulting, startup product leadership, roadmap planning"
        schemaJson={serviceStructuredData}
        additionalStructuredData={[testimonialsStructuredData]}
      />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:border focus:border-border">
        Skip to main content
      </a>
      <Header currentPage="product-leadership" />
      
      <main id="main-content" className="pt-16 lg:pt-20">
        <Hero />
        <Problem />
        <Solution />
        <Deliverables />
        <HowItWorks />
        <WhoIsFor />
        <CaseStudies />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      
      <Footer />
      <StickyMobileCTA />
      
      {/* Extra padding for mobile sticky CTA */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
};

export default ProductLeadership;