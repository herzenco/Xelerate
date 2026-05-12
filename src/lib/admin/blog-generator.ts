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
} from "./content-store";
import {
  ALLOWED_INTERNAL_LINKS,
  BLOG_SYSTEM_PROMPT,
} from "@/lib/prompts/blog-system";

const generatedDraftSchema = z.object({
  title: z.string().min(8).max(120),
  slug: z.string().min(3).max(120),
  tags: z.array(z.string().min(2).max(40)).min(1).max(6),
  meta_description: z.string().min(80).max(180),
  body_markdown: z.string().min(1200),
  suggested_internal_links: z.array(z.string()).max(6).default([]),
});

export interface GeneratedDraft {
  title: string;
  slug: string;
  tags: string[];
  meta_description: string;
  body_markdown: string;
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

Return a strong, useful draft. Avoid sounding like a content farm. Make the angle specific enough that Lupe can add a short editor's note and approve it.
`.trim();
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

export async function generateBlogDraft() {
  const existingPostId = await getGeneratedPostIdForToday();
  if (existingPostId) {
    const existingPost = await getAdminPost(existingPostId);

    return {
      postId: existingPostId,
      draft: existingPost
        ? {
            title: existingPost.title,
            slug: existingPost.slug,
            tags: existingPost.tags,
            meta_description: existingPost.metaDescription,
            body_markdown: existingPost.bodyMarkdown,
            suggested_internal_links: existingPost.suggestedInternalLinks,
          }
        : null,
    };
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
              "Save a structured Xelerate blog draft for Lupe to review.",
            input_schema: {
              type: "object",
              additionalProperties: false,
              required: [
                "title",
                "slug",
                "tags",
                "meta_description",
                "body_markdown",
                "suggested_internal_links",
              ],
              properties: {
                title: {
                  type: "string",
                  description: "Compelling SEO title for the blog post.",
                },
                slug: {
                  type: "string",
                  description: "URL slug, lowercase words separated by hyphens.",
                },
                tags: {
                  type: "array",
                  items: { type: "string" },
                },
                meta_description: {
                  type: "string",
                  description: "135-160 character meta description.",
                },
                body_markdown: {
                  type: "string",
                  description: "Full markdown blog post body.",
                },
                suggested_internal_links: {
                  type: "array",
                  items: {
                    type: "string",
                    enum: ALLOWED_INTERNAL_LINKS,
                  },
                },
              },
            },
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
    const postId = await createGeneratedDraft(topic.id, draft);

    return { postId, draft };
  } catch (error) {
    await logGenerationError(error, {
      topicId: topic.id,
      topic: topic.topic,
      model: getModel(),
    });
    throw error;
  }
}
