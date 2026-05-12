# Xelerate

Next.js App Router site for Xelerate, with a private admin portal in progress for analytics and AI-assisted content operations.

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
- Auth.js v5 planned for admin magic-link auth
- Anthropic Claude planned for blog draft generation

## Environment Variables

Copy `.env.example` to `.env.local` and fill the values.

Required for the admin portal:

- `AUTH_SECRET`
- `AUTH_URL`
- `RESEND_API_KEY`
- `ADMIN_EMAIL_ALLOWLIST`
- `DATABASE_URL`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `ANTHROPIC_API_KEY`
- `BLOG_MODEL`
- `VOYAGE_API_KEY`
- `PLAUSIBLE_API_KEY`
- `PLAUSIBLE_SITE_ID`
- `CRON_SECRET`

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

The admin content engine currently has a local development fallback at
`data/admin-content.json` so the workflow can be tested before Neon is
connected. That file is ignored by git. Production persistence should use the
Drizzle/Neon schema.

Generate migrations:

```sh
npx drizzle-kit generate
```

Apply migrations against the configured database:

```sh
npx drizzle-kit migrate
```

The first migration enables `pgvector` and `pgcrypto`.

## Sprint Docs

- `docs/sprints/admin-portal-v2.md`
- `PROJECT_MEMORY.md`
