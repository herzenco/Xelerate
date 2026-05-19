# Sprint: Xelerate Admin Portal — Analytics & AI Content

Status: accepted architecture v2
Owner: Xelerate
Stack: Next.js App Router on Vercel

## Goal

Ship a private admin portal for the Xelerate team to:

- View unified site analytics.
- Run a Claude-powered blog drafting and review pipeline with strict editorial guardrails.

SEO audit automation is intentionally out of scope. Manual PageSpeed Insights and Google Search Console checks stay outside the platform until blog scale justifies automation.

## Locked Decisions

- Admin route is `/admin`. Security comes from database-backed auth, Xelerate email-domain gating, and middleware, not URL obfuscation.
- No 2FA for now. Compensating controls: short session TTL, per-user passwords, optional Vercel WAF IP allowlist, and audit logging.
- AI can draft daily, but a human editor must manually approve. No auto-publish path should exist.
- Every approved post requires an editor's note of at least 50 characters.
- Topic similarity and Xyren backlink rules are enforced server-side.
- Use Vercel Analytics plus Plausible by default, with Umami as the cost-sensitive fallback.
- No GA4.

## Sprint Split

### Sprint 1: Foundations, Auth, Content Pipeline

Target: 37 points

- XEL-001: Database schema and migrations
- XEL-002: Environment variable inventory
- XEL-101: `/admin` route protected by middleware
- XEL-102: Email/password admin account creation
- XEL-103: Admin dashboard shell and navigation
- XEL-104: Admin session hardening
- XEL-105: Admin audit log
- XEL-006: Strict admin CSP and security headers
- XEL-301: Claude blog draft generation
- XEL-302: Topic similarity guardrail
- XEL-303: Blog review UI
- XEL-304: Publish pipeline
- XEL-305: Scheduled publishing

If Sprint 1 slips, defer XEL-104 and XEL-006 first. Do not defer XEL-105.

### Sprint 2: Analytics

Target: 4 points plus buffer

- XEL-201: Wire up Vercel Analytics and Plausible/Umami
- XEL-202: Unified analytics dashboard

## Open Questions

- Confirm whether admin access should remain open to all `@xelerate.me` email addresses.
- Confirm Vercel plan tier.
- Confirm Plausible vs Umami.
- Confirm whether admin users have stable IPs for optional Vercel WAF allowlisting.
- Confirm Xyren.me/Xelerate public relationship language before backlink automation.

## Implementation Guardrails

- Keep admin pages `noindex,nofollow`.
- Exclude `/admin/*` from sitemap and disallow it in robots.
- Admin middleware must redirect unauthenticated requests to `/admin/sign-in`.
- Use lazy initialization for DB, Redis, Anthropic, and analytics clients so `next build` does not require runtime secrets.
- Cron endpoints must validate `Authorization: Bearer ${CRON_SECRET}`.
- State-changing admin actions must call `auditLog(...)`.
- Do not expose secret keys through `NEXT_PUBLIC_*`.
