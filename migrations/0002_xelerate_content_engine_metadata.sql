ALTER TABLE "blog_posts" ADD COLUMN "content_type" text DEFAULT 'blog' NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "category" text DEFAULT 'product-leadership' NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "excerpt" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "cover_image_url" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "reading_time" integer;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "seo_title" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "focus_keyword" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "secondary_keywords" text[] DEFAULT ARRAY[]::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "keyword_density" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "readability_score" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "seo_score" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "topic_reasoning" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "og_title" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "og_description" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "schema_markup" jsonb DEFAULT '{}'::jsonb NOT NULL;
