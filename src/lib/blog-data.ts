export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  keywords?: string;
  wordCount?: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-fractional-product-manager",
    title: "What Is a Fractional Product Manager? The Complete Guide for 2026",
    description:
      "Everything you need to know about fractional product management — what it is, how it works, who it's for, and why startups are embracing this model.",
    date: "2026-04-21",
    readTime: "8 min read",
    category: "Fractional PM",
    author: "The Xelerate Team",
    keywords: "what is fractional product manager, fractional PM definition, fractional product management guide",
    wordCount: 2200,
  },
  {
    slug: "fractional-product-manager-cost",
    title: "How Much Does a Fractional Product Manager Cost in 2026?",
    description:
      "A transparent breakdown of fractional PM pricing — from hourly rates to monthly retainers. Compare costs vs. full-time hires and agencies.",
    date: "2026-04-28",
    readTime: "6 min read",
    category: "Pricing",
    author: "The Xelerate Team",
    keywords: "fractional product manager cost, fractional PM pricing, how much fractional PM",
    wordCount: 1400,
  },
  {
    slug: "fractional-vs-full-time-product-manager",
    title:
      "Fractional vs. Full-Time Product Manager: Which Does Your Startup Need?",
    description:
      "A side-by-side comparison of fractional and full-time product managers. Cost, commitment, expertise, and when each model makes sense.",
    date: "2026-05-05",
    readTime: "7 min read",
    category: "Comparison",
    author: "The Xelerate Team",
    keywords: "fractional vs full time product manager, fractional PM comparison, hire fractional or full time PM",
    wordCount: 1500,
  },
];
