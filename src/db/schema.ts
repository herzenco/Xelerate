import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  vector,
} from "drizzle-orm/pg-core";

export const blogPostStatus = pgEnum("blog_post_status", [
  "draft",
  "needs_review",
  "approved",
  "scheduled",
  "published",
  "rejected",
]);

export const authUsers = pgTable("auth_user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const authAccounts = pgTable(
  "auth_account",
  {
    userId: text("userId")
      .notNull()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    pk: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  }),
);

export const authSessions = pgTable("auth_session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const authVerificationTokens = pgTable(
  "auth_verification_token",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    pk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    tags: text("tags")
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),
    metaDescription: text("meta_description").notNull(),
    bodyMarkdown: text("body_markdown").notNull().default(""),
    editorsNote: text("editors_note"),
    status: blogPostStatus("status").notNull().default("draft"),
    publishAt: timestamp("publish_at", { withTimezone: true }),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    rejectionReason: text("rejection_reason"),
    embedding: vector("embedding", { dimensions: 1536 }),
    similarityWarning: boolean("similarity_warning").notNull().default(false),
    suggestedInternalLinks: jsonb("suggested_internal_links")
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    hasXyrenLink: boolean("has_xyren_link").notNull().default(false),
    generationDate: date("generation_date"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (post) => ({
    slugIdx: uniqueIndex("blog_posts_slug_idx").on(post.slug),
    generationDateIdx: uniqueIndex("blog_posts_generation_date_idx").on(
      post.generationDate,
    ),
    statusIdx: index("blog_posts_status_idx").on(post.status),
    publishAtIdx: index("blog_posts_publish_at_idx").on(post.publishAt),
    embeddingIdx: index("blog_posts_embedding_hnsw_idx").using(
      "hnsw",
      post.embedding.op("vector_cosine_ops"),
    ),
  }),
);

export const blogPostRevisions = pgTable("blog_post_revisions", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("post_id")
    .notNull()
    .references(() => blogPosts.id, { onDelete: "cascade" }),
  bodyMarkdown: text("body_markdown").notNull(),
  promptUsed: text("prompt_used"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const blogTopics = pgTable(
  "blog_topics",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    topic: text("topic").notNull(),
    lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (topic) => ({
    activeIdx: index("blog_topics_active_idx").on(topic.active),
  }),
);

export const generationErrors = pgTable("generation_errors", {
  id: uuid("id").primaryKey().defaultRandom(),
  error: text("error").notNull(),
  payload: jsonb("payload").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const adminAuditLog = pgTable(
  "admin_audit_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actorEmail: text("actor_email").notNull(),
    action: text("action").notNull(),
    resourceType: text("resource_type").notNull(),
    resourceId: text("resource_id"),
    ip: text("ip"),
    ua: text("ua"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (entry) => ({
    createdAtIdx: index("admin_audit_log_created_at_idx").on(entry.createdAt),
    actorIdx: index("admin_audit_log_actor_idx").on(entry.actorEmail),
  }),
);

export const adminMagicLinkRequests = pgTable(
  "admin_magic_link_requests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    tokenHash: text("token_hash").notNull(),
    ip: text("ip").notNull(),
    ua: text("ua").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (request) => ({
    tokenHashIdx: uniqueIndex("admin_magic_link_requests_token_hash_idx").on(
      request.tokenHash,
    ),
    emailIdx: index("admin_magic_link_requests_email_idx").on(request.email),
  }),
);

export const approvedAnchorPhrases = pgTable("approved_anchor_phrases", {
  id: uuid("id").primaryKey().defaultRandom(),
  phrase: text("phrase").notNull().unique(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
