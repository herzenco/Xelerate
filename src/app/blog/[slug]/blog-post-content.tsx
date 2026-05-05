"use client";

import Link from "next/link";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { blogPosts } from "@/lib/blog-data";
import { AuthorBio } from "@/components/AuthorBio";
import WhatIsFractionalProductManager from "./posts/what-is-fractional-product-manager";
import FractionalProductManagerCost from "./posts/fractional-product-manager-cost";
import FractionalVsFullTimeProductManager from "./posts/fractional-vs-full-time-product-manager";

const postComponents: Record<string, React.ComponentType> = {
  "what-is-fractional-product-manager": WhatIsFractionalProductManager,
  "fractional-product-manager-cost": FractionalProductManagerCost,
  "fractional-vs-full-time-product-manager": FractionalVsFullTimeProductManager,
};

interface BlogPostContentProps {
  slug: string;
}

const BlogPostContent = ({ slug }: BlogPostContentProps) => {
  const post = blogPosts.find((p) => p.slug === slug);
  const PostComponent = postComponents[slug];

  if (!post || !PostComponent) return null;

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug);

  return (
    <>
      <Header currentPage="home" />

      <main id="main-content" className="pt-24 lg:pt-28 min-h-screen">
        <article className="max-w-3xl mx-auto px-6 pb-20">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-sm text-muted-foreground"
          >
            <ol className="flex items-center gap-2">
              <li>
                <a
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Home
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground truncate max-w-[200px]">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Post Header */}
          <header className="mb-10">
            <span className="inline-block text-xs font-medium text-muted-foreground bg-muted rounded-full px-3 py-1 mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span aria-hidden="true">&middot;</span>
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
          </header>

          {/* Post Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-base prose-p:leading-relaxed prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-foreground prose-a:underline hover:prose-a:no-underline prose-table:text-sm prose-th:text-left prose-th:p-3 prose-td:p-3 prose-thead:border-b prose-thead:border-border prose-tr:border-b prose-tr:border-border">
            <PostComponent />
          </div>

          {/* Author Bio */}
          <AuthorBio />

          {/* CTA */}
          <div className="bg-secondary rounded-2xl p-8 mt-8 text-center">
            <h3 className="text-xl font-bold mb-2">Need product leadership?</h3>
            <p className="text-muted-foreground mb-4">
              Get senior PM support for your startup — $2,000/month, cancel anytime.
            </p>
            <Link
              href="/product-leadership"
              className="inline-flex items-center justify-center rounded-full bg-[hsl(211,100%,50%)] text-white px-6 py-3 font-semibold hover:bg-[hsl(211,100%,45%)] transition-colors"
            >
              Learn More
            </Link>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-foreground mb-6">Related Posts</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="block border border-border rounded-2xl p-6 hover:bg-muted/50 transition-colors"
                  >
                    <span className="inline-block text-xs font-medium text-muted-foreground bg-muted rounded-full px-3 py-1 mb-3">
                      {relatedPost.category}
                    </span>
                    <h4 className="font-semibold text-foreground mb-2 leading-snug">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-16 pt-8 border-t border-border">
            <a
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              &larr; Back to Blog
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default BlogPostContent;
