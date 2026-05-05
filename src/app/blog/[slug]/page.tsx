import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BlogPostContent from "./blog-post-content";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://xelerate.me/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `https://xelerate.me/blog/${post.slug}`,
      siteName: "Xelerate",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: "https://xelerate.me/og-image.png",
    wordCount: post.wordCount,
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: "The Xelerate Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Xelerate",
      url: "https://xelerate.me",
    },
    url: `https://xelerate.me/blog/${post.slug}`,
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
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://xelerate.me/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Suspense>
        <BlogPostContent slug={params.slug} />
      </Suspense>
    </>
  );
}
