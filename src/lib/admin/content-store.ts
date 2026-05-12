import "server-only";

import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

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
  metaDescription: string;
  bodyMarkdown: string;
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
}

const storePath = path.join(process.cwd(), "data", "admin-content.json");

const seedTopics = [
  "How founder-led startups can decide what not to build",
  "What changes when a startup hires fractional product leadership",
  "How to turn a messy backlog into a focused 30-day roadmap",
];

function now() {
  return new Date().toISOString();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
        metaDescription:
          "A practical guide for founders who need to turn scattered product ideas into a roadmap their team can actually execute.",
        bodyMarkdown:
          "# How to Turn a Messy Backlog Into a Focused Product Roadmap\n\nMost startup backlogs become a junk drawer because every idea feels urgent when there is no product operating system.\n\nA useful roadmap starts by separating signal from noise. Group requests by customer pain, business impact, implementation effort, and strategic fit. Then choose a small number of outcomes the team can actually move in the next 30 days.\n\nThe best roadmap is not a promise list. It is a decision-making artifact that helps the team say yes and no with confidence.\n\n## A Simple Reset Process\n\n1. Collect everything in one place.\n2. Remove duplicates and stale requests.\n3. Group work by customer problem.\n4. Score by impact, confidence, and effort.\n5. Commit to fewer priorities than feels comfortable.\n\nThat last step is where most teams get the leverage.",
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

async function audit(
  store: ContentStore,
  action: string,
  resourceType: string,
  resourceId: string | null,
) {
  store.auditLog.unshift({
    id: randomUUID(),
    actorEmail: process.env.ADMIN_EMAIL_ALLOWLIST?.split(",")[0] ?? "lupe@xelerate.me",
    action,
    resourceType,
    resourceId,
    ip: null,
    ua: null,
    createdAt: now(),
  });

  store.auditLog = store.auditLog.slice(0, 250);
}

export async function listAdminPosts() {
  const store = await readStore();
  return [...store.posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getAdminPost(id: string) {
  const store = await readStore();
  return store.posts.find((post) => post.id === id) ?? null;
}

export async function listBlogTopics() {
  const store = await readStore();
  return [...store.topics].sort((a, b) => {
    if (a.active !== b.active) return a.active ? -1 : 1;
    return a.topic.localeCompare(b.topic);
  });
}

export async function listAuditEvents() {
  const store = await readStore();
  return store.auditLog.slice(0, 100);
}

export async function getNextActiveTopic() {
  const store = await readStore();
  const activeTopics = store.topics.filter((topic) => topic.active);

  return (
    activeTopics.sort((a, b) =>
      (a.lastUsedAt ?? "").localeCompare(b.lastUsedAt ?? ""),
    )[0] ?? null
  );
}

export async function getRecentPublishedPostContext() {
  const store = await readStore();

  return store.posts
    .filter((post) => post.status === "published")
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, 10)
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

export async function createBlogTopic(topic: string) {
  const cleaned = topic.trim();
  if (!cleaned) return;

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

  await audit(store, "topic.create", "blog_topic", cleaned);
  await writeStore(store);
}

export async function toggleBlogTopic(topicId: string) {
  const store = await readStore();
  const topic = store.topics.find((item) => item.id === topicId);
  if (!topic) return;

  topic.active = !topic.active;
  topic.updatedAt = now();

  await audit(store, topic.active ? "topic.activate" : "topic.deactivate", "blog_topic", topicId);
  await writeStore(store);
}

export async function createDraftFromTopic(topicId?: string) {
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
    metaDescription: `A practical Xelerate draft on ${topic.toLowerCase()}.`,
    bodyMarkdown: `# ${title}\n\nThis is a working draft generated from the topic seed: **${topic}**.\n\n## Why this matters\n\nFounders often know the product needs more structure, but they do not always need a full-time product leader yet. This draft should explain the problem clearly, show practical product judgment, and connect the lesson back to Xelerate's fractional product leadership offer.\n\n## Draft direction\n\n- Start with the founder pain.\n- Explain the product operating principle.\n- Give a concrete framework Lupe can edit.\n- Add internal links only where they genuinely help the reader.\n\n## Editorial note for Lupe\n\nAdd at least one first-hand observation before approval so the post has a real human signal.`,
    editorsNote: "",
    status: "draft",
    publishAt: null,
    publishedAt: null,
    similarityWarning: false,
    suggestedInternalLinks: ["/product-leadership", "/how-it-works", "/pricing"],
    hasXyrenLink: false,
    generationDate: timestamp.slice(0, 10),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.posts.unshift(post);
  await audit(store, "draft.create", "blog_post", post.id);
  await writeStore(store);
  return post.id;
}

export async function createGeneratedDraft(
  topicId: string,
  draft: {
    title: string;
    slug: string;
    tags: string[];
    meta_description: string;
    body_markdown: string;
    suggested_internal_links: string[];
  },
) {
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
    metaDescription: draft.meta_description.trim(),
    bodyMarkdown: draft.body_markdown.trim(),
    editorsNote: "",
    status: "draft",
    publishAt: null,
    publishedAt: null,
    similarityWarning: false,
    suggestedInternalLinks: draft.suggested_internal_links,
    hasXyrenLink: /https?:\/\/(www\.)?xyren\.me|xyren\.me/i.test(
      draft.body_markdown,
    ),
    generationDate: timestamp.slice(0, 10),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.posts.unshift(post);
  await audit(store, "draft.generate.claude", "blog_post", post.id);
  await writeStore(store);

  return post.id;
}

export async function logGenerationError(
  error: unknown,
  payload: Record<string, unknown>,
) {
  const store = await readStore();
  const message = error instanceof Error ? error.message : String(error);

  store.generationErrors = store.generationErrors ?? [];
  store.generationErrors.unshift({
    id: randomUUID(),
    error: message,
    payload,
    createdAt: now(),
  });
  store.generationErrors = store.generationErrors.slice(0, 100);

  await audit(store, "draft.generate.error", "generation_error", null);
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
      | "metaDescription"
      | "bodyMarkdown"
      | "editorsNote"
      | "publishAt"
      | "rejectionReason"
    >
  >,
) {
  const store = await readStore();
  const post = store.posts.find((item) => item.id === postId);
  if (!post) return null;

  Object.assign(post, updates, { updatedAt: now() });
  await audit(store, "post.update", "blog_post", postId);
  await writeStore(store);
  return post;
}

export async function setPostStatus(
  postId: string,
  status: BlogPostStatus,
  extra?: Partial<Pick<AdminBlogPost, "publishAt" | "publishedAt" | "rejectionReason">>,
) {
  const store = await readStore();
  const post = store.posts.find((item) => item.id === postId);
  if (!post) return null;

  post.status = status;
  post.updatedAt = now();
  Object.assign(post, extra);

  await audit(store, `post.${status}`, "blog_post", postId);
  await writeStore(store);
  return post;
}
