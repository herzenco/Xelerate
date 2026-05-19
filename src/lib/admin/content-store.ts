import "server-only";

import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { and, asc, desc, eq, lte } from "drizzle-orm";
import { getDb } from "@/db";
import {
  adminAuditLog,
  blogPostRevisions,
  blogPosts,
  blogTopics,
  generationErrors,
} from "@/db/schema";

export type BlogPostStatus =
  | "draft"
  | "needs_review"
  | "approved"
  | "scheduled"
  | "published"
  | "rejected";

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  contentType: string;
  category: string;
  excerpt: string;
  metaDescription: string;
  bodyMarkdown: string;
  coverImageUrl: string | null;
  readingTime: number | null;
  seoTitle: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  keywordDensity: number;
  readabilityScore: number;
  seoScore: number;
  topicReasoning: string;
  ogTitle: string;
  ogDescription: string;
  schemaMarkup: Record<string, unknown>;
  editorsNote: string;
  status: BlogPostStatus;
  publishAt: string | null;
  publishedAt: string | null;
  similarityWarning: boolean;
  suggestedInternalLinks: string[];
  hasXyrenLink: boolean;
  generationDate: string | null;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogTopic {
  id: string;
  topic: string;
  lastUsedAt: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminAuditEvent {
  id: string;
  actorEmail: string;
  action: string;
  resourceType: string;
  resourceId: string | null;
  ip: string | null;
  ua: string | null;
  createdAt: string;
}

interface ContentStore {
  posts: AdminBlogPost[];
  topics: BlogTopic[];
  auditLog: AdminAuditEvent[];
  generationErrors?: Array<{
    id: string;
    error: string;
    payload: Record<string, unknown>;
    createdAt: string;
  }>;
  revisions?: Array<{
    id: string;
    postId: string;
    bodyMarkdown: string;
    promptUsed: string | null;
    createdAt: string;
  }>;
}

const storePath = path.join(process.cwd(), "data", "admin-content.json");

const seedTopics = [
  "How founder-led startups can decide what not to build",
  "What changes when a startup hires fractional product leadership",
  "How to turn a messy backlog into a focused 30-day roadmap",
];

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

function now() {
  return new Date().toISOString();
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function toIso(value: Date | string | null | undefined) {
  if (!value) return null;
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function detectXyrenLink(markdown: string) {
  return /https?:\/\/(www\.)?xyren\.me|xyren\.me/i.test(markdown);
}

function actorEmail() {
  return "admin@xelerate.me";
}

function rowToPost(row: typeof blogPosts.$inferSelect): AdminBlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    tags: row.tags,
    contentType: row.contentType,
    category: row.category,
    excerpt: row.excerpt ?? "",
    metaDescription: row.metaDescription,
    bodyMarkdown: row.bodyMarkdown,
    coverImageUrl: row.coverImageUrl,
    readingTime: row.readingTime,
    seoTitle: row.seoTitle ?? row.title,
    focusKeyword: row.focusKeyword ?? "",
    secondaryKeywords: row.secondaryKeywords,
    keywordDensity: row.keywordDensity,
    readabilityScore: row.readabilityScore,
    seoScore: row.seoScore,
    topicReasoning: row.topicReasoning ?? "",
    ogTitle: row.ogTitle ?? row.title,
    ogDescription: row.ogDescription ?? row.metaDescription,
    schemaMarkup: row.schemaMarkup,
    editorsNote: row.editorsNote ?? "",
    status: row.status,
    publishAt: toIso(row.publishAt),
    publishedAt: toIso(row.publishedAt),
    similarityWarning: row.similarityWarning,
    suggestedInternalLinks: row.suggestedInternalLinks,
    hasXyrenLink: row.hasXyrenLink,
    generationDate: row.generationDate,
    createdAt: toIso(row.createdAt) ?? now(),
    updatedAt: toIso(row.updatedAt) ?? now(),
  };
}

function normalizePost(post: AdminBlogPost): AdminBlogPost {
  return {
    ...post,
    contentType: post.contentType ?? "blog",
    category: post.category ?? "product-leadership",
    excerpt: post.excerpt ?? "",
    coverImageUrl: post.coverImageUrl ?? null,
    readingTime: post.readingTime ?? estimateReadingTime(post.bodyMarkdown ?? ""),
    seoTitle: post.seoTitle ?? post.title,
    focusKeyword: post.focusKeyword ?? "",
    secondaryKeywords: post.secondaryKeywords ?? [],
    keywordDensity: post.keywordDensity ?? 0,
    readabilityScore: post.readabilityScore ?? 0,
    seoScore: post.seoScore ?? 0,
    topicReasoning: post.topicReasoning ?? "",
    ogTitle: post.ogTitle ?? post.title,
    ogDescription: post.ogDescription ?? post.metaDescription,
    schemaMarkup: post.schemaMarkup ?? {},
  };
}

function estimateReadingTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function rowToTopic(row: typeof blogTopics.$inferSelect): BlogTopic {
  return {
    id: row.id,
    topic: row.topic,
    lastUsedAt: toIso(row.lastUsedAt),
    active: row.active,
    createdAt: toIso(row.createdAt) ?? now(),
    updatedAt: toIso(row.updatedAt) ?? now(),
  };
}

function rowToAudit(row: typeof adminAuditLog.$inferSelect): AdminAuditEvent {
  return {
    id: row.id,
    actorEmail: row.actorEmail,
    action: row.action,
    resourceType: row.resourceType,
    resourceId: row.resourceId,
    ip: row.ip,
    ua: row.ua,
    createdAt: toIso(row.createdAt) ?? now(),
  };
}

function defaultStore(): ContentStore {
  const timestamp = now();

  return {
    posts: [
      {
        id: "demo-draft",
        title: "How to Turn a Messy Backlog Into a Focused Product Roadmap",
        slug: "messy-backlog-focused-product-roadmap",
        tags: ["product roadmap", "startup operations", "fractional pm"],
        contentType: "blog",
        category: "product-leadership",
        excerpt:
          "A practical way for founders to turn scattered product ideas into a roadmap their team can execute.",
        metaDescription:
          "A practical guide for founders who need to turn scattered product ideas into a roadmap their team can actually execute.",
        bodyMarkdown:
          "# How to Turn a Messy Backlog Into a Focused Product Roadmap\n\nMost startup backlogs become a junk drawer because every idea feels urgent when there is no product operating system.\n\nA useful roadmap starts by separating signal from noise. Group requests by customer pain, business impact, implementation effort, and strategic fit. Then choose a small number of outcomes the team can actually move in the next 30 days.\n\nThe best roadmap is not a promise list. It is a decision-making artifact that helps the team say yes and no with confidence.\n\n## A Simple Reset Process\n\n1. Collect everything in one place.\n2. Remove duplicates and stale requests.\n3. Group work by customer problem.\n4. Score by impact, confidence, and effort.\n5. Commit to fewer priorities than feels comfortable.\n\nThat last step is where most teams get the leverage.",
        coverImageUrl: null,
        readingTime: 3,
        seoTitle: "Turn a Messy Backlog Into a Focused Roadmap",
        focusKeyword: "product roadmap",
        secondaryKeywords: ["startup backlog", "fractional product leadership"],
        keywordDensity: 0,
        readabilityScore: 78,
        seoScore: 80,
        topicReasoning:
          "Backlog clarity is a common founder pain and connects naturally to fractional product leadership.",
        ogTitle: "Turn a Messy Backlog Into a Focused Roadmap",
        ogDescription:
          "A founder-friendly framework for turning scattered product ideas into a focused roadmap.",
        schemaMarkup: {},
        editorsNote: "",
        status: "draft",
        publishAt: null,
        publishedAt: null,
        similarityWarning: false,
        suggestedInternalLinks: ["/pricing", "/how-it-works", "/blog"],
        hasXyrenLink: false,
        generationDate: null,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    ],
    topics: seedTopics.map((topic) => ({
      id: randomUUID(),
      topic,
      lastUsedAt: null,
      active: true,
      createdAt: timestamp,
      updatedAt: timestamp,
    })),
    auditLog: [],
    generationErrors: [],
  };
}

async function readStore(): Promise<ContentStore> {
  try {
    const raw = await readFile(storePath, "utf8");
    return JSON.parse(raw) as ContentStore;
  } catch {
    return defaultStore();
  }
}

async function writeStore(store: ContentStore) {
  await mkdir(path.dirname(storePath), { recursive: true });
  await writeFile(storePath, JSON.stringify(store, null, 2));
}

async function auditLocal(
  store: ContentStore,
  action: string,
  resourceType: string,
  resourceId: string | null,
) {
  store.auditLog.unshift({
    id: randomUUID(),
    actorEmail: actorEmail(),
    action,
    resourceType,
    resourceId,
    ip: null,
    ua: null,
    createdAt: now(),
  });

  store.auditLog = store.auditLog.slice(0, 250);
}

async function auditDb(
  action: string,
  resourceType: string,
  resourceId: string | null,
) {
  await getDb().insert(adminAuditLog).values({
    actorEmail: actorEmail(),
    action,
    resourceType,
    resourceId,
    ip: null,
    ua: null,
  });
}

async function ensureSeedTopics() {
  if (!hasDatabase()) return;

  const existing = await getDb().select({ id: blogTopics.id }).from(blogTopics).limit(1);
  if (existing.length > 0) return;

  await getDb().insert(blogTopics).values(seedTopics.map((topic) => ({ topic })));
}

export async function listAdminPosts() {
  if (hasDatabase()) {
    const rows = await getDb()
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.updatedAt));
    return rows.map(rowToPost);
  }

  const store = await readStore();
  return [...store.posts].map(normalizePost).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getAdminPost(id: string) {
  if (hasDatabase()) {
    const [row] = await getDb()
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, id))
      .limit(1);
    return row ? rowToPost(row) : null;
  }

  const store = await readStore();
  const post = store.posts.find((item) => item.id === id);
  return post ? normalizePost(post) : null;
}

export async function listBlogTopics() {
  if (hasDatabase()) {
    await ensureSeedTopics();
    const rows = await getDb()
      .select()
      .from(blogTopics)
      .orderBy(desc(blogTopics.active), asc(blogTopics.topic));
    return rows.map(rowToTopic);
  }

  const store = await readStore();
  return [...store.topics].sort((a, b) => {
    if (a.active !== b.active) return a.active ? -1 : 1;
    return a.topic.localeCompare(b.topic);
  });
}

export async function listAuditEvents() {
  if (hasDatabase()) {
    const rows = await getDb()
      .select()
      .from(adminAuditLog)
      .orderBy(desc(adminAuditLog.createdAt))
      .limit(100);
    return rows.map(rowToAudit);
  }

  const store = await readStore();
  return store.auditLog.slice(0, 100);
}

export async function getNextActiveTopic() {
  if (hasDatabase()) {
    await ensureSeedTopics();
    const [row] = await getDb()
      .select()
      .from(blogTopics)
      .where(eq(blogTopics.active, true))
      .orderBy(asc(blogTopics.lastUsedAt), asc(blogTopics.createdAt))
      .limit(1);
    return row ? rowToTopic(row) : null;
  }

  const store = await readStore();
  const activeTopics = store.topics.filter((topic) => topic.active);

  return (
    activeTopics.sort((a, b) =>
      (a.lastUsedAt ?? "").localeCompare(b.lastUsedAt ?? ""),
    )[0] ?? null
  );
}

export async function getRecentPublishedPostContext() {
  const posts = hasDatabase()
    ? (
        await getDb()
          .select()
          .from(blogPosts)
          .where(eq(blogPosts.status, "published"))
          .orderBy(desc(blogPosts.publishedAt))
          .limit(10)
      ).map(rowToPost)
    : (await readStore()).posts
        .filter((post) => post.status === "published")
        .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
        .slice(0, 10);

  return posts
    .map((post) => {
      const firstParagraph =
        post.bodyMarkdown
          .split(/\n{2,}/)
          .find((block) => block.trim() && !block.trim().startsWith("#"))
          ?.trim()
          .slice(0, 500) ?? "";

      return `Title: ${post.title}\nTags: ${post.tags.join(", ")}\nFirst paragraph: ${firstParagraph}`;
    })
    .join("\n\n---\n\n");
}

export async function getGeneratedPostIdForToday() {
  if (hasDatabase()) {
    const [row] = await getDb()
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.generationDate, today()))
      .limit(1);
    return row?.id ?? null;
  }

  const store = await readStore();
  return store.posts.find((post) => post.generationDate === today())?.id ?? null;
}

export async function createBlogTopic(topic: string) {
  const cleaned = topic.trim();
  if (!cleaned) return;

  if (hasDatabase()) {
    const [inserted] = await getDb()
      .insert(blogTopics)
      .values({ topic: cleaned })
      .returning({ id: blogTopics.id });
    await auditDb("topic.create", "blog_topic", inserted?.id ?? cleaned);
    return;
  }

  const store = await readStore();
  const timestamp = now();

  store.topics.unshift({
    id: randomUUID(),
    topic: cleaned,
    lastUsedAt: null,
    active: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  await auditLocal(store, "topic.create", "blog_topic", cleaned);
  await writeStore(store);
}

export async function toggleBlogTopic(topicId: string) {
  if (hasDatabase()) {
    const [topic] = await getDb()
      .select()
      .from(blogTopics)
      .where(eq(blogTopics.id, topicId))
      .limit(1);
    if (!topic) return;

    await getDb()
      .update(blogTopics)
      .set({ active: !topic.active, updatedAt: new Date() })
      .where(eq(blogTopics.id, topicId));
    await auditDb(topic.active ? "topic.deactivate" : "topic.activate", "blog_topic", topicId);
    return;
  }

  const store = await readStore();
  const topic = store.topics.find((item) => item.id === topicId);
  if (!topic) return;

  topic.active = !topic.active;
  topic.updatedAt = now();

  await auditLocal(store, topic.active ? "topic.activate" : "topic.deactivate", "blog_topic", topicId);
  await writeStore(store);
}

export async function createDraftFromTopic(topicId?: string) {
  if (hasDatabase()) {
    await ensureSeedTopics();
    const selected = topicId
      ? (
          await getDb()
            .select()
            .from(blogTopics)
            .where(and(eq(blogTopics.id, topicId), eq(blogTopics.active, true)))
            .limit(1)
        )[0]
      : (
          await getDb()
            .select()
            .from(blogTopics)
            .where(eq(blogTopics.active, true))
            .orderBy(asc(blogTopics.lastUsedAt), asc(blogTopics.createdAt))
            .limit(1)
        )[0];

    const timestamp = new Date();
    const topic = selected?.topic ?? "Fractional product leadership for startups";
    const title = topic.replace(/\.$/, "");

    if (selected) {
      await getDb()
        .update(blogTopics)
        .set({ lastUsedAt: timestamp, updatedAt: timestamp })
        .where(eq(blogTopics.id, selected.id));
    }

    const [post] = await getDb()
      .insert(blogPosts)
      .values({
        title,
        slug: slugify(title),
        tags: ["fractional pm", "startup product"],
        contentType: "blog",
        category: "product-leadership",
        excerpt: `A practical Xelerate draft on ${topic.toLowerCase()}.`,
        metaDescription: `A practical Xelerate draft on ${topic.toLowerCase()}.`,
        bodyMarkdown: `# ${title}\n\nThis is a working draft generated from the topic seed: **${topic}**.\n\n## Why this matters\n\nFounders often know the product needs more structure, but they do not always need a full-time product leader yet. This draft should explain the problem clearly, show practical product judgment, and connect the lesson back to Xelerate's fractional product leadership offer.\n\n## Draft direction\n\n- Start with the founder pain.\n- Explain the product operating principle.\n- Give a concrete framework an editor can revise.\n- Add internal links only where they genuinely help the reader.\n\n## Editorial note\n\nAdd at least one first-hand observation before approval so the post has a real human signal.`,
        readingTime: 2,
        seoTitle: title,
        focusKeyword: "fractional product leadership",
        secondaryKeywords: ["startup product", "product roadmap"],
        topicReasoning: `Placeholder draft created from topic seed: ${topic}`,
        editorsNote: "",
        suggestedInternalLinks: ["/product-leadership", "/how-it-works", "/pricing"],
        generationDate: today(),
      })
      .returning({ id: blogPosts.id });

    await auditDb("draft.create", "blog_post", post.id);
    return post.id;
  }

  const store = await readStore();
  const activeTopics = store.topics.filter((topic) => topic.active);
  const selected =
    activeTopics.find((topic) => topic.id === topicId) ??
    activeTopics.sort((a, b) => (a.lastUsedAt ?? "").localeCompare(b.lastUsedAt ?? ""))[0];

  const topic = selected?.topic ?? "Fractional product leadership for startups";
  const timestamp = now();
  const title = topic.replace(/\.$/, "");

  if (selected) {
    selected.lastUsedAt = timestamp;
    selected.updatedAt = timestamp;
  }

  const post: AdminBlogPost = {
    id: randomUUID(),
    title,
    slug: slugify(title),
    tags: ["fractional pm", "startup product"],
    contentType: "blog",
    category: "product-leadership",
    excerpt: `A practical Xelerate draft on ${topic.toLowerCase()}.`,
    metaDescription: `A practical Xelerate draft on ${topic.toLowerCase()}.`,
    bodyMarkdown: `# ${title}\n\nThis is a working draft generated from the topic seed: **${topic}**.\n\n## Why this matters\n\nFounders often know the product needs more structure, but they do not always need a full-time product leader yet. This draft should explain the problem clearly, show practical product judgment, and connect the lesson back to Xelerate's fractional product leadership offer.\n\n## Draft direction\n\n- Start with the founder pain.\n- Explain the product operating principle.\n- Give a concrete framework an editor can revise.\n- Add internal links only where they genuinely help the reader.\n\n## Editorial note\n\nAdd at least one first-hand observation before approval so the post has a real human signal.`,
    coverImageUrl: null,
    readingTime: 2,
    seoTitle: title,
    focusKeyword: "fractional product leadership",
    secondaryKeywords: ["startup product", "product roadmap"],
    keywordDensity: 0,
    readabilityScore: 0,
    seoScore: 0,
    topicReasoning: `Placeholder draft created from topic seed: ${topic}`,
    ogTitle: title,
    ogDescription: `A practical Xelerate draft on ${topic.toLowerCase()}.`,
    schemaMarkup: {},
    editorsNote: "",
    status: "draft",
    publishAt: null,
    publishedAt: null,
    similarityWarning: false,
    suggestedInternalLinks: ["/product-leadership", "/how-it-works", "/pricing"],
    hasXyrenLink: false,
    generationDate: today(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.posts.unshift(post);
  await auditLocal(store, "draft.create", "blog_post", post.id);
  await writeStore(store);
  return post.id;
}

export async function createGeneratedDraft(
  topicId: string,
  draft: {
    title: string;
    slug: string;
    tags: string[];
    content_type?: string;
    category?: string;
    excerpt?: string;
    meta_description: string;
    body_markdown: string;
    cover_image_url?: string | null;
    reading_time?: number;
    seo_title?: string;
    focus_keyword?: string;
    secondary_keywords?: string[];
    keyword_density?: number;
    readability_score?: number;
    seo_score?: number;
    topic_reasoning?: string;
    og_title?: string;
    og_description?: string;
    schema_markup?: Record<string, unknown>;
    suggested_internal_links: string[];
  },
) {
  const existingPostId = await getGeneratedPostIdForToday();
  if (existingPostId) {
    await updateAdminPost(existingPostId, {
      title: draft.title.trim(),
      slug: slugify(draft.slug || draft.title),
      tags: draft.tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean),
      contentType: draft.content_type ?? "blog",
      category: draft.category ?? "product-leadership",
      excerpt: draft.excerpt?.trim() ?? "",
      metaDescription: draft.meta_description.trim(),
      bodyMarkdown: draft.body_markdown.trim(),
      coverImageUrl: draft.cover_image_url ?? null,
      readingTime: draft.reading_time ?? estimateReadingTime(draft.body_markdown),
      seoTitle: draft.seo_title?.trim() || draft.title.trim(),
      focusKeyword: draft.focus_keyword?.trim() ?? "",
      secondaryKeywords: draft.secondary_keywords ?? [],
      keywordDensity: draft.keyword_density ?? 0,
      readabilityScore: draft.readability_score ?? 0,
      seoScore: draft.seo_score ?? 0,
      topicReasoning: draft.topic_reasoning ?? "",
      ogTitle: draft.og_title?.trim() || draft.title.trim(),
      ogDescription: draft.og_description?.trim() || draft.meta_description.trim(),
      schemaMarkup: draft.schema_markup ?? {},
    });
    return existingPostId;
  }

  if (hasDatabase()) {
    const timestamp = new Date();
    await getDb()
      .update(blogTopics)
      .set({ lastUsedAt: timestamp, updatedAt: timestamp })
      .where(eq(blogTopics.id, topicId));

    const [post] = await getDb()
      .insert(blogPosts)
      .values({
        title: draft.title.trim(),
        slug: slugify(draft.slug || draft.title),
        tags: draft.tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean),
        contentType: draft.content_type ?? "blog",
        category: draft.category ?? "product-leadership",
        excerpt: draft.excerpt?.trim() ?? "",
        metaDescription: draft.meta_description.trim(),
        bodyMarkdown: draft.body_markdown.trim(),
        coverImageUrl: draft.cover_image_url ?? null,
        readingTime: draft.reading_time ?? estimateReadingTime(draft.body_markdown),
        seoTitle: draft.seo_title?.trim() || draft.title.trim(),
        focusKeyword: draft.focus_keyword?.trim() ?? "",
        secondaryKeywords: draft.secondary_keywords ?? [],
        keywordDensity: draft.keyword_density ?? 0,
        readabilityScore: draft.readability_score ?? 0,
        seoScore: draft.seo_score ?? 0,
        topicReasoning: draft.topic_reasoning ?? "",
        ogTitle: draft.og_title?.trim() || draft.title.trim(),
        ogDescription: draft.og_description?.trim() || draft.meta_description.trim(),
        schemaMarkup: draft.schema_markup ?? {},
        editorsNote: "",
        suggestedInternalLinks: draft.suggested_internal_links,
        hasXyrenLink: detectXyrenLink(draft.body_markdown),
        generationDate: today(),
      })
      .returning({ id: blogPosts.id });

    await auditDb("draft.generate.claude", "blog_post", post.id);
    return post.id;
  }

  const store = await readStore();
  const timestamp = now();
  const topic = store.topics.find((item) => item.id === topicId);

  if (topic) {
    topic.lastUsedAt = timestamp;
    topic.updatedAt = timestamp;
  }

  const post: AdminBlogPost = {
    id: randomUUID(),
    title: draft.title.trim(),
    slug: slugify(draft.slug || draft.title),
    tags: draft.tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean),
    contentType: draft.content_type ?? "blog",
    category: draft.category ?? "product-leadership",
    excerpt: draft.excerpt?.trim() ?? "",
    metaDescription: draft.meta_description.trim(),
    bodyMarkdown: draft.body_markdown.trim(),
    coverImageUrl: draft.cover_image_url ?? null,
    readingTime: draft.reading_time ?? estimateReadingTime(draft.body_markdown),
    seoTitle: draft.seo_title?.trim() || draft.title.trim(),
    focusKeyword: draft.focus_keyword?.trim() ?? "",
    secondaryKeywords: draft.secondary_keywords ?? [],
    keywordDensity: draft.keyword_density ?? 0,
    readabilityScore: draft.readability_score ?? 0,
    seoScore: draft.seo_score ?? 0,
    topicReasoning: draft.topic_reasoning ?? "",
    ogTitle: draft.og_title?.trim() || draft.title.trim(),
    ogDescription: draft.og_description?.trim() || draft.meta_description.trim(),
    schemaMarkup: draft.schema_markup ?? {},
    editorsNote: "",
    status: "draft",
    publishAt: null,
    publishedAt: null,
    similarityWarning: false,
    suggestedInternalLinks: draft.suggested_internal_links,
    hasXyrenLink: detectXyrenLink(draft.body_markdown),
    generationDate: today(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.posts.unshift(post);
  await auditLocal(store, "draft.generate.claude", "blog_post", post.id);
  await writeStore(store);

  return post.id;
}

export async function logGenerationError(
  error: unknown,
  payload: Record<string, unknown>,
) {
  const message = error instanceof Error ? error.message : String(error);

  if (hasDatabase()) {
    const [row] = await getDb()
      .insert(generationErrors)
      .values({ error: message, payload })
      .returning({ id: generationErrors.id });
    await auditDb("draft.generate.error", "generation_error", row?.id ?? null);
    return;
  }

  const store = await readStore();
  store.generationErrors = store.generationErrors ?? [];
  store.generationErrors.unshift({
    id: randomUUID(),
    error: message,
    payload,
    createdAt: now(),
  });
  store.generationErrors = store.generationErrors.slice(0, 100);

  await auditLocal(store, "draft.generate.error", "generation_error", null);
  await writeStore(store);
}

export async function updateAdminPost(
  postId: string,
  updates: Partial<
    Pick<
      AdminBlogPost,
      | "title"
      | "slug"
      | "tags"
      | "contentType"
      | "category"
      | "excerpt"
      | "metaDescription"
      | "bodyMarkdown"
      | "coverImageUrl"
      | "readingTime"
      | "seoTitle"
      | "focusKeyword"
      | "secondaryKeywords"
      | "keywordDensity"
      | "readabilityScore"
      | "seoScore"
      | "topicReasoning"
      | "ogTitle"
      | "ogDescription"
      | "schemaMarkup"
      | "editorsNote"
      | "publishAt"
      | "rejectionReason"
    >
  >,
) {
  if (hasDatabase()) {
    const updateValues = {
      title: updates.title,
      slug: updates.slug ? slugify(updates.slug) : undefined,
      tags: updates.tags,
      contentType: updates.contentType,
      category: updates.category,
      excerpt: updates.excerpt,
      metaDescription: updates.metaDescription,
      bodyMarkdown: updates.bodyMarkdown,
      coverImageUrl: updates.coverImageUrl,
      readingTime: updates.readingTime,
      seoTitle: updates.seoTitle,
      focusKeyword: updates.focusKeyword,
      secondaryKeywords: updates.secondaryKeywords,
      keywordDensity: updates.keywordDensity,
      readabilityScore: updates.readabilityScore,
      seoScore: updates.seoScore,
      topicReasoning: updates.topicReasoning,
      ogTitle: updates.ogTitle,
      ogDescription: updates.ogDescription,
      schemaMarkup: updates.schemaMarkup,
      editorsNote: updates.editorsNote,
      publishAt: updates.publishAt ? new Date(updates.publishAt) : undefined,
      rejectionReason: updates.rejectionReason,
      hasXyrenLink: updates.bodyMarkdown
        ? detectXyrenLink(updates.bodyMarkdown)
        : undefined,
      updatedAt: new Date(),
    };

    const [post] = await getDb()
      .update(blogPosts)
      .set(updateValues)
      .where(eq(blogPosts.id, postId))
      .returning();

    if (post) {
      await auditDb("post.update", "blog_post", postId);
      return rowToPost(post);
    }
    return null;
  }

  const store = await readStore();
  const post = store.posts.find((item) => item.id === postId);
  if (!post) return null;

  Object.assign(post, updates, {
    slug: updates.slug ? slugify(updates.slug) : post.slug,
    hasXyrenLink: updates.bodyMarkdown
      ? detectXyrenLink(updates.bodyMarkdown)
      : post.hasXyrenLink,
    updatedAt: now(),
  });
  await auditLocal(store, "post.update", "blog_post", postId);
  await writeStore(store);
  return post;
}

export async function setPostStatus(
  postId: string,
  status: BlogPostStatus,
  extra?: Partial<Pick<AdminBlogPost, "publishAt" | "publishedAt" | "rejectionReason">>,
) {
  if (hasDatabase()) {
    const [post] = await getDb()
      .update(blogPosts)
      .set({
        status,
        publishAt: extra?.publishAt ? new Date(extra.publishAt) : undefined,
        publishedAt: extra?.publishedAt ? new Date(extra.publishedAt) : undefined,
        rejectionReason: extra?.rejectionReason,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, postId))
      .returning();

    if (post) {
      await auditDb(`post.${status}`, "blog_post", postId);
      return rowToPost(post);
    }
    return null;
  }

  const store = await readStore();
  const post = store.posts.find((item) => item.id === postId);
  if (!post) return null;

  post.status = status;
  post.updatedAt = now();
  Object.assign(post, extra);

  await auditLocal(store, `post.${status}`, "blog_post", postId);
  await writeStore(store);
  return post;
}

export async function publishDueScheduledPosts() {
  if (hasDatabase()) {
    const duePosts = await getDb()
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(and(eq(blogPosts.status, "scheduled"), lte(blogPosts.publishAt, new Date())));

    for (const post of duePosts) {
      await setPostStatus(post.id, "published", {
        publishedAt: new Date().toISOString(),
      });
    }

    return duePosts.length;
  }

  const store = await readStore();
  const timestamp = now();
  let count = 0;

  for (const post of store.posts) {
    if (
      post.status === "scheduled" &&
      post.publishAt &&
      new Date(post.publishAt).getTime() <= Date.now()
    ) {
      post.status = "published";
      post.publishedAt = timestamp;
      post.updatedAt = timestamp;
      count += 1;
      await auditLocal(store, "post.published", "blog_post", post.id);
    }
  }

  if (count > 0) await writeStore(store);
  return count;
}

export async function reviseAdminPostBody(
  postId: string,
  revisedMarkdown: string,
  promptUsed: string,
) {
  if (hasDatabase()) {
    const post = await getAdminPost(postId);
    if (!post) return null;

    await getDb().insert(blogPostRevisions).values({
      postId,
      bodyMarkdown: post.bodyMarkdown,
      promptUsed,
    });

    await updateAdminPost(postId, {
      bodyMarkdown: revisedMarkdown,
      readingTime: estimateReadingTime(revisedMarkdown),
    } as Partial<AdminBlogPost>);
    await auditDb("post.revise.claude", "blog_post", postId);
    return postId;
  }

  const store = await readStore();
  const post = store.posts.find((item) => item.id === postId);
  if (!post) return null;

  store.revisions = store.revisions ?? [];
  store.revisions.unshift({
    id: randomUUID(),
    postId,
    bodyMarkdown: post.bodyMarkdown,
    promptUsed,
    createdAt: now(),
  });
  store.revisions = store.revisions.slice(0, 100);

  post.bodyMarkdown = revisedMarkdown;
  post.readingTime = estimateReadingTime(revisedMarkdown);
  post.updatedAt = now();

  await auditLocal(store, "post.revise.claude", "blog_post", postId);
  await writeStore(store);
  return postId;
}
