import type { Metadata } from "next";
import { Suspense } from "react";
import BlogContent from "./blog-content";

export const metadata: Metadata = {
  title: "Blog - Product Management Insights & Resources",
  description:
    "Expert insights on product management, roadmapping, sprint rituals, and startup strategy from Xelerate's fractional PM team.",
  keywords:
    "product management blog, fractional PM insights, startup product strategy, product leadership resources",
  alternates: {
    canonical: "https://xelerate.me/blog",
  },
  openGraph: {
    title: "Blog - Product Management Insights & Resources",
    description:
      "Expert insights on product management, roadmapping, sprint rituals, and startup strategy from Xelerate's fractional PM team.",
    url: "https://xelerate.me/blog",
    siteName: "Xelerate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Product Management Insights & Resources",
    description:
      "Expert insights on product management, roadmapping, sprint rituals, and startup strategy from Xelerate's fractional PM team.",
  },
};

const blogListSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Xelerate Blog",
  description:
    "Expert insights on product management, roadmapping, sprint rituals, and startup strategy from Xelerate's fractional PM team.",
  url: "https://xelerate.me/blog",
  publisher: {
    "@type": "Organization",
    name: "Xelerate",
    url: "https://xelerate.me",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://xelerate.me",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://xelerate.me/blog",
    },
  ],
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogListSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Suspense>
        <BlogContent />
      </Suspense>
    </>
  );
}
