"use client";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { blogPosts } from "@/lib/blog-data";
import Link from "next/link";

const BlogContent = () => {
  return (
    <>
      <Header currentPage="home" />

      <main id="main-content" className="pt-24 lg:pt-28 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 pb-20">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Expert insights on product management, roadmapping, sprint
              rituals, and startup strategy from the Xelerate team.
            </p>
          </div>

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:border-foreground/20 hover:-translate-y-1"
              >
                {/* Category Badge */}
                <span className="inline-block text-xs font-medium text-muted-foreground bg-muted rounded-full px-3 py-1 mb-4">
                  {post.category}
                </span>

                {/* Title */}
                <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-foreground/80 transition-colors line-clamp-2">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {post.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readTime}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-16 bg-secondary rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold mb-2">Want fractional product leadership?</h2>
            <p className="text-muted-foreground mb-4">
              Senior PM support for $2,000/month. No long-term contracts.
            </p>
            <Link href="/product-leadership" className="inline-flex items-center justify-center rounded-full bg-[hsl(211,100%,50%)] text-white px-6 py-3 font-semibold hover:bg-[hsl(211,100%,45%)] transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BlogContent;
