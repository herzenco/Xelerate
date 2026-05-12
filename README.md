# Xelerate

Next.js App Router site for Xelerate, with a private admin portal for analytics and AI-assisted content operations.

## Local Development

```sh
npm install
npm run dev
```

Open `http://localhost:3000` or the port printed by Next.js.

## Stack

- Next.js 14 App Router
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Drizzle ORM + Neon Postgres for the admin/content database
- Auth.js v5 magic-link auth for the admin portal
- Anthropic Claude for blog draft generation

## Environment Variables

Copy `.env.example` to `.env.local` and fill the values.

Required for the admin portal:

- `AUTH_SECRET`
- `AUTH_URL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `ADMIN_EMAIL_ALLOWLIST`
- `DATABASE_URL`
- `ANTHROPIC_API_KEY`
- `BLOG_MODEL`
- `CRON_SECRET`

Optional/reserved:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `VOYAGE_API_KEY`
- `PLAUSIBLE_API_KEY`
- `PLAUSIBLE_SITE_ID`

## Secret Rotation Procedure

Rotate these secrets at least every 6 months, and immediately after any suspected exposure.

### `ANTHROPIC_API_KEY`

1. Create a new key in Anthropic.
2. Update the Vercel environment variable.
3. Redeploy.
4. Run a test draft generation.
5. Revoke the old key.

### `RESEND_API_KEY`

1. Create a new sending key in Resend.
2. Update the Vercel environment variable.
3. Redeploy.
4. Send a test magic-link email.
5. Revoke the old key.

### `AUTH_SECRET`

1. Generate a new high-entropy value.
2. Update the Vercel environment variable.
3. Redeploy.
4. Expect all existing admin sessions and magic links to become invalid.

## Database

Schema lives in `src/db/schema.ts`.

The admin content engine uses Drizzle + Neon/Postgres when `DATABASE_URL` is
set. Local development has a fallback at `data/admin-content.json` so the
workflow can be previewed before Neon is connected. That file is ignored by git.

Generate migrations:

```sh
npx drizzle-kit generate
```

Apply migrations against the configured database:

```sh
npx drizzle-kit migrate
```

The first migration enables `pgvector` and `pgcrypto`.

## Content Generator Deployment

Production requires these Vercel environment variables:

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_URL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `ADMIN_EMAIL_ALLOWLIST`
- `ANTHROPIC_API_KEY`
- `BLOG_MODEL`
- `CRON_SECRET`

`vercel.json` configures two cron jobs:

- `/api/blog/generate` daily at 10:00 UTC
- `/api/blog/publish-scheduled` every 15 minutes

The 15-minute scheduled publishing cron requires a Vercel plan that supports
sub-daily cron frequency.

## Sprint Docs

- `docs/sprints/admin-portal-v2.md`
- `PROJECT_MEMORY.md`
