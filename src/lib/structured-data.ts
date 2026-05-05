const SITE_URL = 'https://xelerate.me'

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Xelerate',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    description: 'Fractional product management and custom development solutions for startups',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@fractionalpm.com',
      contactType: 'customer service',
    },
  }
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Xelerate',
    url: SITE_URL,
    description: 'Fractional product management and custom development solutions for startups',
    publisher: {
      '@type': 'Organization',
      name: 'Xelerate',
      url: SITE_URL,
    },
  }
}

export function getServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Fractional Product Management',
    description: 'Senior product leadership for $2,000/month. Hands-on PM support, roadmaps, and accountability.',
    url: `${SITE_URL}/product-leadership`,
    provider: {
      '@type': 'Organization',
      name: 'Xelerate',
      url: SITE_URL,
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
  }
}

export function getProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Xelerate Custom Solutions',
    description: 'Custom product management, web development, and bespoke software solutions for startups',
    url: `${SITE_URL}/custom-solutions`,
    areaServed: 'Worldwide',
    serviceType: ['Product Management', 'Web Development', 'Custom Software Development', 'Project Management'],
    provider: {
      '@type': 'Organization',
      name: 'Xelerate',
      url: SITE_URL,
    },
  }
}

export function getTestimonialsSchema() {
  return {
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
        reviewBody: "Xelerate is a game changer. His ability to take a founder's vision and translate it into a concrete, actionable product roadmap is second to none.",
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
  }
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
