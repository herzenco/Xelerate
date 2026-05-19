import "server-only";

import { z } from "zod";
import { getAnthropicClient } from "./anthropic";
import {
  createGeneratedDraft,
  getAdminPost,
  getGeneratedPostIdForToday,
  getRecentPublishedPostContext,
  getNextActiveTopic,
  logGenerationError,
  reviseAdminPostBody,
} from "./content-store";
import {
  ALLOWED_INTERNAL_LINKS,
  BLOG_SYSTEM_PROMPT,
} from "@/lib/prompts/blog-system";

const generatedDraftSchema = z.object({
  title: z.string().min(8).max(120),
  slug: z.string().min(3).max(120),
  tags: z.array(z.string().min(2).max(40)).min(1).max(6),
  content_type: z.enum(["blog", "how-to"]).default("blog"),
  category: z.string().min(2).max(80).default("product-leadership"),
  excerpt: z.string().min(60).max(240),
  meta_description: z.string().min(80).max(180),
  body_markdown: z.string().min(1200),
  seo_title: z.string().min(8).max(75),
  focus_keyword: z.string().min(2).max(80),
  secondary_keywords: z.array(z.string().min(2).max(80)).min(1).max(8),
  og_title: z.string().min(8).max(100),
  og_description: z.string().min(80).max(220),
  schema_markup: z.record(z.unknown()).default({}),
  topic_reasoning: z.string().min(30).max(500),
  suggested_internal_links: z.array(z.string()).max(6).default([]),
});

const seoReviewSchema = z.object({
  seo_score: z.number().int().min(0).max(100),
  readability_score: z.number().int().min(0).max(100),
  keyword_density: z.number().min(0).max(10),
});

export interface GeneratedDraft {
  title: string;
  slug: string;
  tags: string[];
  content_type: "blog" | "how-to";
  category: string;
  excerpt: string;
  meta_description: string;
  body_markdown: string;
  seo_title: string;
  focus_keyword: string;
  secondary_keywords: string[];
  og_title: string;
  og_description: string;
  schema_markup: Record<string, unknown>;
  topic_reasoning: string;
  reading_time?: number;
  keyword_density?: number;
  readability_score?: number;
  seo_score?: number;
  suggested_internal_links: string[];
}

function getModel() {
  return process.env.BLOG_MODEL || "claude-sonnet-4-5-20250929";
}

function buildUserPrompt(topic: string, recentPosts: string) {
  return `
Create a draft blog post for Xelerate.

Topic seed:
${topic}

Allowed internal links:
${ALLOWED_INTERNAL_LINKS.join("\n")}

Recent published context to avoid repeating:
${recentPosts || "No recent published posts available yet."}

Use the Xyren-style content engine standard:
- Pick a clear SEO focus keyword and 3-6 useful secondary keywords.
- Include an excerpt, SEO title, Open Graph title/description, and Article schema markup.
- Write for a founder/operator, not a generic marketing audience.
- Include a practical framework, not a fluffy thought piece.
- Return a draft that an editor can edit, annotate, and approve.
`.trim();
}

function stripFences(text: string) {
  return text.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
}

function getMessageText(message: unknown) {
  const content = (message as { content?: Array<Record<string, unknown>> }).content ?? [];
  const textBlock = content.find((block) => block.type === "text");
  return typeof textBlock?.text === "string" ? textBlock.text : "";
}

function extractToolInput(message: unknown): GeneratedDraft {
  const content = (message as { content?: Array<Record<string, unknown>> }).content ?? [];
  const toolUse = content.find(
    (block) => block.type === "tool_use" && block.name === "save_blog_draft",
  );

  if (!toolUse) {
    throw new Error("Claude did not return the expected save_blog_draft tool call.");
  }

  return generatedDraftSchema.parse(toolUse.input) as GeneratedDraft;
}

function estimateReadingTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

async function reviewSEO(draft: GeneratedDraft) {
  const client = getAnthropicClient();
  const message = await client.messages.create(
    {
      model: getModel(),
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `
You are an SEO editor reviewing a Xelerate draft.

Title: ${draft.title}
SEO title: ${draft.seo_title}
Focus keyword: ${draft.focus_keyword}
Meta description (${draft.meta_description.length} chars): ${draft.meta_description}
Word count: ${draft.body_markdown.split(/\s+/).filter(Boolean).length}

Score this content for:
1. Keyword intent match
2. Title/meta quality
3. Content structure
4. Practical usefulness
5. Readability for a founder audience

Return ONLY valid JSON:
{"seo_score": 85, "readability_score": 82, "keyword_density": 1.4}
`.trim(),
        },
      ],
    },
    { timeout: 60_000 },
  );

  try {
    return seoReviewSchema.parse(JSON.parse(stripFences(getMessageText(message))));
  } catch {
    return {
      seo_score: 70,
      readability_score: 70,
      keyword_density: 0,
    };
  }
}

function existingPostToDraft(post: NonNullable<Awaited<ReturnType<typeof getAdminPost>>>): GeneratedDraft {
  return {
    title: post.title,
    slug: post.slug,
    tags: post.tags,
    content_type: post.contentType === "how-to" ? "how-to" : "blog",
    category: post.category,
    excerpt: post.excerpt,
    meta_description: post.metaDescription,
    body_markdown: post.bodyMarkdown,
    seo_title: post.seoTitle,
    focus_keyword: post.focusKeyword,
    secondary_keywords: post.secondaryKeywords,
    og_title: post.ogTitle,
    og_description: post.ogDescription,
    schema_markup: post.schemaMarkup,
    topic_reasoning: post.topicReasoning,
    reading_time: post.readingTime ?? undefined,
    keyword_density: post.keywordDensity,
    readability_score: post.readabilityScore,
    seo_score: post.seoScore,
    suggested_internal_links: post.suggestedInternalLinks,
  };
}

const draftToolSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "title",
    "slug",
    "tags",
    "content_type",
    "category",
    "excerpt",
    "meta_description",
    "body_markdown",
    "seo_title",
    "focus_keyword",
    "secondary_keywords",
    "og_title",
    "og_description",
    "schema_markup",
    "topic_reasoning",
    "suggested_internal_links",
  ],
  properties: {
    title: { type: "string" },
    slug: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
    content_type: { type: "string", enum: ["blog", "how-to"] },
    category: { type: "string" },
    excerpt: { type: "string" },
    meta_description: { type: "string" },
    body_markdown: { type: "string" },
    seo_title: { type: "string" },
    focus_keyword: { type: "string" },
    secondary_keywords: { type: "array", items: { type: "string" } },
    og_title: { type: "string" },
    og_description: { type: "string" },
    schema_markup: {
      type: "object",
      additionalProperties: true,
    },
    topic_reasoning: { type: "string" },
    suggested_internal_links: {
      type: "array",
      items: {
        type: "string",
        enum: ALLOWED_INTERNAL_LINKS,
      },
    },
  },
} as const;

export async function generateBlogDraft() {
  const existingPostId = await getGeneratedPostIdForToday();
  if (existingPostId) {
    const existingPost = await getAdminPost(existingPostId);
    const alreadyEnriched = Boolean(
      existingPost?.focusKeyword && existingPost.seoScore > 0 && existingPost.topicReasoning,
    );

    if (alreadyEnriched) {
      return {
        postId: existingPostId,
        draft: existingPost ? existingPostToDraft(existingPost) : null,
      };
    }
  }

  const topic = await getNextActiveTopic();
  const recentPosts = await getRecentPublishedPostContext();

  if (!topic) {
    throw new Error("No active topic seeds are available.");
  }

  try {
    const client = getAnthropicClient();
    const message = await client.messages.create(
      {
        model: getModel(),
        max_tokens: 4096,
        system: BLOG_SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: buildUserPrompt(topic.topic, recentPosts),
          },
        ],
        tools: [
          {
            name: "save_blog_draft",
            description:
              "Save a structured Xelerate blog draft for editorial review.",
            input_schema: draftToolSchema as any,
          },
        ],
        tool_choice: {
          type: "tool",
          name: "save_blog_draft",
        },
      },
      {
        timeout: 120_000,
      },
    );

    const draft = extractToolInput(message);
    const seoReview = await reviewSEO(draft);
    const enrichedDraft = {
      ...draft,
      ...seoReview,
      keyword_density: Math.round(seoReview.keyword_density * 10),
      reading_time: estimateReadingTime(draft.body_markdown),
    };
    const postId = await createGeneratedDraft(topic.id, enrichedDraft);

    return { postId, draft: enrichedDraft };
  } catch (error) {
    await logGenerationError(error, {
      topicId: topic.id,
      topic: topic.topic,
      model: getModel(),
    });
    throw error;
  }
}

export async function reviseBlogDraft(postId: string, requestedChanges: string) {
  const post = await getAdminPost(postId);
  if (!post) {
    throw new Error("Draft not found.");
  }

  const client = getAnthropicClient();
  const message = await client.messages.create(
    {
      model: getModel(),
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `
You are a content editor for Xelerate. Revise the draft using the editor's instructions.

Title: ${post.title}

Current markdown:
${post.bodyMarkdown}

Requested changes:
${requestedChanges.slice(0, 2000)}

Return ONLY the revised markdown. Do not include commentary.
`.trim(),
        },
      ],
    },
    { timeout: 120_000 },
  );

  const revised = stripFences(getMessageText(message));
  if (!revised || revised.length < 500) {
    throw new Error("Claude returned an empty or too-short revision.");
  }

  await reviseAdminPostBody(postId, revised, requestedChanges);
  return postId;
}
