# Xelerate Content Engine Handoff

This document summarizes the Xelerate content-engine work so the same ideas can be ported back into Xyren.

## Goal

Upgrade Xelerate's admin content engine so it behaves more like the Xyren content engine, while keeping Xelerate's current Next.js App Router, Drizzle/Postgres, and admin UI architecture.

The important product behavior is:

- Claude drafts content for editorial review.
- Drafts include SEO metadata, topic reasoning, scorecard fields, and suggested internal links.
- Editors can edit, approve, schedule, publish, reject, or re-prompt Claude.
- Every state-changing admin action is logged.
- No AI-generated post can publish without a human editor's note.

## Main Files Changed

- `src/lib/admin/blog-generator.ts`
- `src/lib/admin/content-store.ts`
- `src/db/schema.ts`
- `migrations/0002_xelerate_content_engine_metadata.sql`
- `src/app/admin/content/page.tsx`
- `src/app/admin/content/[id]/page.tsx`
- `src/app/admin/content/actions.ts`
- `src/utils/supabase/client.ts`
- `src/utils/supabase/server.ts`
- `src/utils/supabase/middleware.ts`
- `middleware.ts`

## Backend Content Pipeline

The main generator lives in:

```text
src/lib/admin/blog-generator.ts
```

The generation flow is:

1. Check whether a draft was already generated today.
2. If today's draft already has rich metadata and scores, reuse it.
3. If today's draft exists but is missing the new metadata, regenerate/enrich it once.
4. Select the next active topic seed from `blog_topics`.
5. Fetch recent published-post context to reduce repetition.
6. Call Claude using Anthropic tool use.
7. Require Claude to return structured fields.
8. Run a second Claude pass as an SEO/readability review.
9. Save the enriched draft through the content store.
10. Log generation errors to `generation_errors`.

The tool output now requires these fields:

```ts
title
slug
tags
content_type
category
excerpt
meta_description
body_markdown
seo_title
focus_keyword
secondary_keywords
og_title
og_description
schema_markup
topic_reasoning
suggested_internal_links
```

Then the SEO review pass adds:

```ts
seo_score
readability_score
keyword_density
reading_time
```

## Claude Prompting

The content system prompt lives in:

```text
src/lib/prompts/blog-system.ts
```

The generator appends a Xyren-style instruction block that asks Claude to:

- Pick a clear SEO focus keyword.
- Include secondary keywords.
- Write for founders/operators.
- Include a practical framework.
- Include excerpt, SEO title, OG metadata, and schema markup.
- Avoid generic marketing filler.

The generator still uses Anthropic tool use instead of raw JSON parsing. This is stricter and safer than asking the model to return plain JSON.

## SEO Review Pass

After the draft is generated, Claude is called a second time as an SEO editor.

It scores:

- Keyword intent match
- Title/meta quality
- Content structure
- Practical usefulness
- Readability for a founder audience

The result is saved as:

```ts
seoScore
readabilityScore
keywordDensity
```

In Xelerate, `keywordDensity` is stored as an integer scaled by 10. For example, `14` means `1.4%`.

## Database Schema

The richer metadata was added to `blog_posts`.

Migration:

```text
migrations/0002_xelerate_content_engine_metadata.sql
```

New columns:

```sql
content_type text default 'blog' not null
category text default 'product-leadership' not null
excerpt text
cover_image_url text
reading_time integer
seo_title text
focus_keyword text
secondary_keywords text[] default array[]::text[] not null
keyword_density integer default 0 not null
readability_score integer default 0 not null
seo_score integer default 0 not null
topic_reasoning text
og_title text
og_description text
schema_markup jsonb default '{}'::jsonb not null
```

Existing tables used by the content engine:

```text
blog_posts
blog_post_revisions
blog_topics
generation_errors
admin_audit_log
```

## Content Store Layer

The storage abstraction lives in:

```text
src/lib/admin/content-store.ts
```

It supports two modes:

- Production: Drizzle/Postgres when `DATABASE_URL` exists.
- Local development: JSON fallback at `data/admin-content.json`.

The JSON fallback was kept so local admin testing works without a live database.

The store now normalizes older posts so old drafts do not crash the newer UI. Missing fields are filled with defaults, such as:

- `contentType: "blog"`
- `category: "product-leadership"`
- `seoTitle: post.title`
- `ogTitle: post.title`
- `ogDescription: post.metaDescription`
- score fields as `0`

## Re-Prompt / Revision Flow

The admin editor now supports asking Claude to revise a draft.

Key function:

```ts
reviseBlogDraft(postId, requestedChanges)
```

It:

1. Loads the current draft.
2. Sends the current markdown plus the requested editorial changes to Claude.
3. Requires Claude to return only revised markdown.
4. Stores the previous version in `blog_post_revisions`.
5. Replaces the draft body with the revised markdown.
6. Updates reading time.
7. Logs the action to `admin_audit_log`.

This is the main Xyren feature worth porting if Xyren does not already preserve revisions.

## Admin UI

Content list:

```text
src/app/admin/content/page.tsx
```

Changes:

- Added a score column.
- Existing status pills remain.
- Draft rows still open into the editor.
- `Generate with Claude` still uses a server action.

Draft editor:

```text
src/app/admin/content/[id]/page.tsx
```

New UI sections:

### Metadata

Editable fields now include:

- Title
- Slug
- Tags
- Excerpt
- SEO title
- Focus keyword
- Secondary keywords
- Meta description
- OG title
- OG description

### Body Markdown

The existing markdown textarea remains. This is still not a full live markdown editor.

### Content Scorecard

Shows:

- SEO score
- Readability score
- Estimated reading time
- Topic reasoning
- Keyword density

### Editor's Note

Still required before approve, schedule, or publish.

Server enforcement remains in:

```text
src/app/admin/content/actions.ts
```

The minimum editor note length is 50 characters.

### Suggested Internal Links

Still shown in the right rail.

### Re-Prompt Claude

New textarea:

```text
revisionPrompt
```

Submit action:

```ts
revisePostAction
```

This saves current changes first, then asks Claude to revise the body.

### Schedule / Reject

Existing schedule and reject controls remain.

## Server Actions

File:

```text
src/app/admin/content/actions.ts
```

Important actions:

```ts
generateClaudeDraftAction
savePostAction
approvePostAction
publishPostAction
schedulePostAction
rejectPostAction
revisePostAction
```

`savePostAction` now saves the new SEO and OG fields.

`revisePostAction`:

- Requires an admin session.
- Requires a revision prompt of at least 10 characters.
- Saves the current form state.
- Calls Claude revision.
- Revalidates the admin content pages.

## Supabase Connection Layer

Supabase was added as an optional connection layer:

```text
src/utils/supabase/client.ts
src/utils/supabase/server.ts
src/utils/supabase/middleware.ts
```

Packages installed:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

Environment variables:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

The helper supports either the newer publishable key or the legacy anon key.

Important middleware detail:

Supabase session refresh only runs when a Supabase auth cookie exists. This avoids slow local requests when the app is not using Supabase auth.

## What Was Not Ported From Xyren

These Xyren features were intentionally not added yet:

- Gemini cover image generation.
- Supabase Storage uploads for cover images.
- ClickUp task creation.
- How-to guide public routing.
- A full live markdown preview editor.
- Publishing generated DB posts into the public `/blog/[slug]` route.

## Biggest Remaining Gap

The admin content engine can create, edit, approve, schedule, and publish draft records, but the public blog still primarily reads static blog data.

For a complete production content engine, wire public routes to read published posts from the database:

```text
src/app/blog/page.tsx
src/app/blog/[slug]/page.tsx
src/app/blog/[slug]/blog-post-content.tsx
src/lib/blog-data.ts
```

The target behavior should be:

- Static seed posts can remain.
- Published database posts are merged into the blog index.
- `/blog/[slug]` resolves database posts first, then static posts.
- Published database posts render markdown.
- Metadata uses the saved SEO/OG/schema fields.

## Suggested Port Order For Xyren

1. Add the scorecard fields to Xyren's draft table or equivalent.
2. Add the second-pass SEO review after generation.
3. Add editable SEO/OG fields to the Xyren draft editor.
4. Add the topic reasoning display.
5. Add or verify revision history before AI re-prompts replace content.
6. Add a re-prompt UI that saves the current draft first.
7. Keep image generation and ClickUp as optional downstream steps.

## Verification

After implementation, `npm run build` passes.

Known warnings:

- `src/components/landing/Header.tsx` uses `<img>`.
- `src/components/landing/Footer.tsx` uses `<img>`.

Those warnings existed before this content-engine work.
