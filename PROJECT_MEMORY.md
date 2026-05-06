# PROJECT_MEMORY.md
> Last updated: 2026-05-06 | Session #1 | Agent: Claude Opus 4.6

---

## 🗂 Project Overview
Xelerate (xelerate.me) is a fractional product management consultancy website. It offers two core services: ongoing product leadership at $2,000/month and custom product & development solutions. The site was originally built as a Lovable-generated React + Vite SPA and was migrated to Next.js App Router for SEO, SSR, and crawlability. The target audience is startup founders and scale-up teams who need senior PM leadership without a full-time hire.

## 🏗 Tech Stack
- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS 3, shadcn/ui (50+ Radix UI components), tailwindcss-animate
- **Backend:** Supabase Edge Functions (analytics + lead capture), Supabase SDK (@supabase/ssr + @supabase/supabase-js)
- **Database:** Supabase (project: jmpgtpjytfionovnyvkf) — used for event tracking and lead submission
- **Hosting:** Not yet deployed to production (previously on Vite, needs Vercel/Netlify setup)
- **Analytics:** GA4 (G-HWY2TQ2MJ4) + custom Supabase tracking
- **Key libraries:** react-hook-form, zod, @tanstack/react-query, lucide-react, sonner, next/font (DM Sans, Crimson Pro)

## 📁 File & Folder Map
- `src/app/` — Next.js App Router pages (17 routes total)
  - `layout.tsx` — Root layout with fonts, metadata, analytics, providers
  - `page.tsx` — Homepage (hub page linking to both services)
  - `product-leadership/` — Main service page ($2K/mo fractional PM)
  - `custom-solutions/` — Custom development services page
  - `pricing/` — Pricing comparison page
  - `faq/` — 18 FAQs with accordion UI + FAQPage schema
  - `how-it-works/` — 5-step process + 30/60/90 day milestones
  - `about/` — Company mission, values, founder section
  - `blog/` — Blog index + 3 pillar posts via `[slug]/` dynamic route
  - `sitemap.ts`, `robots.ts`, `manifest.ts` — SEO infrastructure
  - `opengraph-image.tsx` — Dynamic OG image generation (edge runtime)
- `src/components/` — Reusable components
  - `landing/` — Page sections (Header, Footer, Hero, Pricing, Testimonials, etc.)
  - `ui/` — shadcn/ui components (50+ files)
  - `Analytics.tsx` — GA4 script loader
  - `AuthorBio.tsx` — Blog author bio component
  - `JsonLd.tsx` — Reusable JSON-LD injector
- `src/lib/` — Utilities
  - `analytics.ts` — GA4 event tracking helpers
  - `tracking.ts` — Supabase remote analytics + lead submission
  - `blog-data.ts` — Static blog post metadata (slug, title, date, keywords, wordCount)
  - `constants.ts` — SITE_URL, SITE_NAME, GA_MEASUREMENT_ID
  - `structured-data.ts` — JSON-LD schema helpers (Organization, Service, etc.)
- `src/utils/supabase/` — Supabase client helpers (server.ts, client.ts, middleware.ts)
- `src/hooks/` — Custom hooks (usePageTracking, useScrollTracking, useSectionTracking, use-mobile)
- `src/assets/` — xelerate-logo.png
- `public/` — favicon.ico, favicon.png, apple-touch-icon.png, llms.txt, placeholder.svg
- `next.config.mjs` — Security headers, image optimization (AVIF/WebP), poweredByHeader: false
- `.env.local` — NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY (not committed)

## ✅ Current State
- **Build:** Clean — `npm run build` passes with 17 static/SSG routes, 0 errors
- **SSR:** All pages render full HTML server-side (verified with curl)
- **SEO:** Complete metadata on every page (title, description, canonical, OG, Twitter, keywords). Structured data: Organization, Service, FAQPage, Article, HowTo, BreadcrumbList, AggregateRating across relevant pages. Dynamic OG images auto-generated per page.
- **Navigation:** Header links to /, /product-leadership, /custom-solutions, /pricing, /blog, /about. Footer has 4-column nav with all pages.
- **Blog:** 3 pillar posts (~5,000 words total) with cross-linking, author bios, related posts, and CTAs. Article schema with Person author, dateModified, wordCount.
- **Internal linking:** Every page links to multiple other pages. No orphaned pages.
- **Supabase:** SDK installed and configured (server + client + middleware helpers). Connected to project jmpgtpjytfionovnyvkf. Old edge function tracking (iftavwzmvuqykujebini) still in tracking.ts.
- **Not deployed yet** — needs Vercel or similar setup.

## 🔨 What Was Done This Session
- Migrated entire project from Lovable/Vite SPA to Next.js 14 App Router
- Removed react-router-dom, react-helmet-async, vite, @vitejs/plugin-react-swc, lovable-tagger
- Created App Router structure with server/client component split pattern
- Replaced SEOHead component with Next.js Metadata API exports
- Created 8 new pages: homepage, pricing, faq, how-it-works, about, blog index, 3 blog posts
- Expanded /custom-solutions from ~350 words to ~1,800 words with FAQ, testimonials, process detail
- Built real homepage (was previously a redirect to /product-leadership)
- Added dynamic OG images via opengraph-image.tsx (edge runtime, ImageResponse API)
- Added sitemap.ts, robots.ts, manifest.ts with all routes
- Added security headers (HSTS, X-Frame-Options, CSP, etc.) to next.config.mjs
- Added structured data across all pages (Organization, Service, FAQPage, Article, HowTo, BreadcrumbList)
- Set up Supabase SDK (@supabase/ssr) with server/client/middleware helpers
- Installed Supabase agent skills
- Created llms.txt for AI crawlers
- Created AuthorBio component for blog posts
- Added cross-links between all blog posts
- Added Related Posts section to blog post template
- Added CTA sections to blog posts and blog index
- Updated Header with secondary nav (Pricing, Blog, About)
- Rebuilt Footer with 4-column navigation layout
- Fixed currentPage prop on all pages
- Added keywords metadata to all pages
- Added BreadcrumbList schema to 4 pages missing it
- Fixed meta description lengths
- Added Twitter card metadata to pages missing it
- Cleaned up leftover Vite files from repo

## 🧠 Key Decisions Made
- **In-place migration over new project:** Converted the existing repo rather than scaffolding a new Next.js project, preserving git history and all existing components.
- **Server/client component split:** Page-level `page.tsx` files are Server Components (export metadata + structured data), with `*-content.tsx` client wrappers containing the interactive UI. This maximizes SSR for SEO while keeping hooks/interactivity working.
- **Static blog with file-based content:** Blog posts are React components in `src/app/blog/[slug]/posts/`, with metadata in `src/lib/blog-data.ts`. No CMS yet — easy to migrate to MDX or a headless CMS later.
- **Dynamic OG images via ImageResponse:** Used Next.js edge runtime opengraph-image.tsx convention instead of static PNGs. Auto-generates branded images per page.
- **Kept dual analytics (GA4 + Supabase):** Both systems preserved. GA4 for standard analytics, Supabase edge functions for custom event tracking and lead capture.
- **Two Supabase projects:** Old project (iftavwzmvuqykujebini) handles analytics edge functions. New project (jmpgtpjytfionovnyvkf) set up for future DB/auth needs. tracking.ts still points to old project.
- **ESLint downgraded to v8:** eslint-config-next requires ESLint 8, not 9. Downgraded from ^9.32.0 to ^8.57.0.
- **react-router-dom fully removed:** All routing now file-based. Link uses next/link (href not to), useNavigate replaced with useRouter, useLocation with usePathname.
- **Homepage as hub page:** Root `/` is now a real content page (not a redirect) with links to both services, testimonials, blog preview, and descriptive SEO copy. This preserves the most authoritative URL.

## 🐛 Known Bugs / Issues
- **Two Supabase projects in use:** tracking.ts still points to old project (iftavwzmvuqykujebini). New SDK helpers point to new project (jmpgtpjytfionovnyvkf). Need to consolidate.
- **Person schema on About page uses generic "Xelerate Founder"** — needs real founder name, photo, and credentials for proper E-E-A-T.
- **Blog author is "The Xelerate Team"** — should be a named individual for stronger E-E-A-T signals.
- **Organization sameAs is empty** on homepage and about page — should include social profile URLs when available.
- **Email domain mismatch:** Contact email is hello@fractionalpm.com but site domain is xelerate.me. May confuse users/crawlers.
- **Manifest icons reuse favicon.png** for both 192x192 and 512x512 — should be properly sized separate files.
- **img tags used for logo** instead of next/image — shows ESLint warnings (non-blocking).
- **Font download may fail in offline/CI builds** — DM Sans and Crimson Pro loaded from Google Fonts at build time.
- **No /privacy or /terms pages exist** — footer links were removed, but these pages should eventually be created.

## 🔜 Next Steps (Prioritized)
- [ ] Deploy to Vercel (or preferred host) and verify production SSR
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Bing Webmaster Tools (powers ChatGPT search)
- [ ] Add real founder name, photo, and bio to About page + Person schema
- [ ] Consolidate Supabase projects (migrate edge functions to new project or unify)
- [ ] Create /privacy and /terms pages
- [ ] Add proper 192x192 and 512x512 PWA icons
- [ ] Set up Google Search Console verification meta tag
- [ ] Create OG image as static fallback at public/og-image.png
- [ ] Add more blog posts (target: 2/month) — "7 Signs You Need a Fractional PM", "Fractional CPO vs PM", "Product Roadmap Template"
- [ ] Add case studies page with detailed client outcomes
- [ ] Consider MDX or headless CMS for blog (current file-based approach works but won't scale past ~20 posts)
- [ ] Add social profile URLs to Organization schema (LinkedIn, Twitter)
- [ ] Replace img tags with next/image for logo
- [ ] Set up Supabase Auth if admin/dashboard features are planned
- [ ] Run Lighthouse audit post-deploy (target 90+ on Performance and SEO)

## 🔐 Environment & Config Notes
- `NEXT_PUBLIC_SUPABASE_URL` — New Supabase project URL (in .env.local)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — New Supabase anon key (in .env.local)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4 ID (defaults to G-HWY2TQ2MJ4 in constants.ts)
- `NEXT_PUBLIC_SITE_URL` — Site URL (defaults to https://xelerate.me in constants.ts)
- Old Supabase URL hardcoded in `src/lib/tracking.ts` (iftavwzmvuqykujebini) — env var override available via NEXT_PUBLIC_SUPABASE_URL
- `.env.local.example` documents all required env vars

## 📦 Schema / Data Model
No direct DB tables managed by this frontend. Data flows:

**Supabase Edge Functions (old project — iftavwzmvuqykujebini):**
- `POST /functions/v1/track-event` — eventType, pagePath, eventData, sessionId
- `POST /functions/v1/submit-lead` — name, email, phone, company, url, message, source, page_source

**Supabase SDK (new project — jmpgtpjytfionovnyvkf):**
- Server/client helpers configured but no tables accessed yet
- Ready for future auth, CMS, or dashboard features

## 🔗 External Resources
- **GitHub (new):** https://github.com/herzenco/Xelerate
- **GitHub (old):** https://github.com/herzenco/xelerate.me-front
- **Production URL:** https://xelerate.me (not yet deployed with Next.js)
- **Supabase (new):** https://supabase.com/dashboard/project/jmpgtpjytfionovnyvkf
- **Supabase (old/analytics):** https://supabase.com/dashboard/project/iftavwzmvuqykujebini
- **GA4:** Measurement ID G-HWY2TQ2MJ4

## 🗓 Session Log

### Session #1 — 2026-05-05/06
**Agent:** Claude Opus 4.6 (1M context)
**Branch/Commit:** main / `16a81e6` (Remove leftover Vite/SPA files from pre-migration)
**Summary:** Full migration from Lovable/Vite SPA to Next.js App Router. Expanded from 2 pages to 17 routes. Complete SEO overhaul with structured data, dynamic OG images, sitemap, robots, llms.txt. Added blog with 3 pillar posts. Set up Supabase SDK. Ran comprehensive SEO audit and fixed all critical/high issues (navigation, internal linking, metadata, schemas). Cleaned repo and pushed to new GitHub repo (herzenco/Xelerate).
**Files changed:** 187 files added, 15 old Vite files removed. Net: ~24,000 lines added.
