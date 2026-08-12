<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — minimal-blog

Guidance for AI agents working on this repository. Prefer this file + **`README.md`** over assumptions.

## Project

Production-ready **personal site** for a software engineer:

- Blog (MDX in repo under `content/blog/`)
- Projects portfolio (`content/projects/projects.json`)
- About + home (localized UI)
- No CMS, no database
- KO/EN UI localization
- Vercel-oriented static generation

**Goals:** extremely fast, excellent SEO, mobile-first, accessible (WCAG AA), simple to maintain, clean code.

**Design influences:** Apple · Vercel · Linear · Tailwind · Astro — minimal, elegant, typography-first. Never sacrifice readability for visual effects.

## Stack (locked)

| Layer | Choice |
| --- | --- |
| Framework | Next.js **16** App Router |
| UI | React 19 + TypeScript |
| Styles | Tailwind CSS **v4** + CSS variables (`src/app/globals.css`) |
| Content | MDX via **Content Collections** (`content-collections.ts`) |
| Fonts | `next/font/local` — **Nanum Square Neo**; Geist Mono for code |
| i18n | `src/lib/i18n.ts` + `LocaleProvider` + header **KO \| EN** |
| Deploy | Vercel |

Do **not** add a CMS, database, or heavy UI kit unless the user explicitly asks.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production (runs Content Collections)
npm start
npm run lint
```

After substantive changes: `npm run lint` and `npm run build` must pass.

### Env

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (no trailing slash) |
| `NEXT_PUBLIC_GISCUS_REPO` / `_REPO_ID` / `_CATEGORY` / `_CATEGORY_ID` | Optional Giscus |

See `.env.example`.

---

## How to add a blog post (agents must follow)

### Steps

1. **Create** `content/blog/<slug>.mdx` (or `.md`).
2. **Slug** = path under `content/blog` without extension → route `/blog/<slug>`.
3. **Frontmatter** (required + optional):

```yaml
---
title: "Post title"
description: "SEO and card summary (1–2 sentences)."
date: "2026-07-15"          # required, quoted YYYY-MM-DD
updated: "2026-07-16"       # optional
tags:                       # optional; related posts + tag filter
  - engineering
cover: /images/cover.jpg    # optional; under public/ or https URL
draft: false                # true = dev only; hidden in prod/sitemap/RSS
---

Body in Markdown/MDX (one language per post — KO or EN as authored).

## Section

h2/h3 feed the table of contents.
```

4. **No `#` H1 in the body.** `PostHeader` renders the frontmatter `title` as the page `<h1>`; repeating it in the body duplicates the title on screen. Start the body at `##`.
5. **Do not** invent a CMS. Do not put the body in frontmatter as a custom field for authors — schema includes `content` from the file body via Content Collections.
6. **Drafts:** `draft: true` → visible only when `NODE_ENV === "development"`.
7. **Cover:** place file in `public/…`, reference as `/…` path.
8. **Validate:** `npm run build` (invalid frontmatter fails the build).
9. **Query posts** only through `src/lib/posts.ts` (`getPublishedPosts`, `getPostBySlug`, etc.).

### Frontmatter schema (source of truth)

Defined in `content-collections.ts`:

| Field | Type | Required |
| --- | --- | --- |
| `title` | string | yes |
| `description` | string | yes |
| `date` | string | yes |
| `updated` | string | no |
| `tags` | string[] | no (default `[]`) |
| `cover` | string | no |
| `draft` | boolean | no (default `false`) |
| `content` | string | auto from body |

### Pipeline (do not bypass)

`content-collections.ts`: remark-gfm, rehype-slug, rehype-pretty-code (Shiki light/dark), TOC extract, reading time, `slug` + `url`.

---

## Repository map

```text
content/blog/*.{md,mdx}         # Blog posts — ADD POSTS HERE
content/projects/projects.json  # Portfolio (bilingual title/description OK)
content-collections.ts          # Schema + MDX compile
src/app/                        # App Router pages
src/components/
  header.tsx                    # Nav + LocaleToggle + ThemeToggle + mobile menu
  locale-provider.tsx / locale-toggle.tsx
  theme-provider.tsx / theme-toggle.tsx
  home-content.tsx / about-content.tsx / projects-content.tsx / blog-page-content.tsx
  features/                     # Optional UX (search, progress, giscus, …)
  ui/                           # Design system
src/lib/
  site.ts                       # Identity, author, footer link targets
  i18n.ts                       # messages.ko / messages.en + detectBrowserLocale
  posts.ts                      # Blog engine API
  projects.ts                   # Load/validate projects.json
  features.ts / fonts.ts / seo.ts / toc.ts / theme.ts / utils.ts
src/fonts/nanum-square/         # Self-hosted Nanum Square Neo woff2
```

Generated (do not hand-edit): `.content-collections/`, `.next/`.  
Aliases: `@/*` → `./src/*`; `content-collections` → `./.content-collections/generated`.

## Routes

| Path | Notes |
| --- | --- |
| `/` | Home (localized via `HomeContent`) |
| `/blog` | Index + search/tags |
| `/blog/[slug]` | SSG article: TOC, adjacent, related, optional Giscus |
| `/projects` | Featured / more / archived |
| `/about` | Localized about |
| `/feed.xml`, `/sitemap.xml`, `/robots.txt` | SEO / feeds |

## Localization

- **UI strings:** `src/lib/i18n.ts` → `messages.ko` / `messages.en`
- **Toggle:** header **KO \| EN** → `localStorage` key `locale`
- **First visit (no saved locale):**
  1. Browser language `ko*` → `ko`
  2. Timezone `Asia/Seoul` → `ko`
  3. Else → `en`
- **Projects:** `title` / `description` as string or `{ en, ko }` in JSON
- **Blog body:** not dual-language; show as written
- **FOUC:** `localeInitScript` in root layout head (with theme script)
- Use `useLocale()` in client UI; `pickLocale()` / `localizeProject()` for data

## Projects

Edit **`content/projects/projects.json`** only.

Helpers: `getFeaturedProjects`, `getActiveProjects`, `getArchivedProjects`, `localizeProject`, `buildProjectsJsonLd`.

## Site identity

Edit **`src/lib/site.ts`** for name, author, social URLs.  
Footer **labels** come from i18n; **hrefs** from `footerLinkDefs`.

## Design system

- Tokens: `src/app/globals.css` (CSS variables)
- Components: `@/components/ui/*`
- Theme: `data-theme` + `ThemeProvider` / `ThemeToggle`
- Prefer tokens over hard-coded colors/sizes
- Reading width: `--content-width: 42rem`
- Hangul: `word-break: keep-all`, mild tracking, Nanum Square Neo

## Feature flags

`src/lib/features.ts` — search, tagFilter, readingProgress, copyCode, anchorLinks, imageZoom, viewCount, newsletter, giscus, keyboardShortcuts, pageTransitions.

## SEO

- `buildPageMetadata` / `breadcrumbJsonLd` in `src/lib/seo.ts`
- Per-page canonicals (do **not** set a global canonical on root layout)
- JSON-LD via `JsonLd`
- Keep sitemap / robots / RSS in sync when adding routes or posts
- Drafts excluded from production lists and feeds

## Coding conventions

1. TypeScript strict — avoid unnecessary `any`
2. Server Components by default; `"use client"` only for interactivity / i18n-bound UI
3. Static-first; `generateStaticParams` for post slugs
4. `@/` imports; UI from `@/components/ui`
5. Tailwind + CSS variables; `cn()` from `utils.ts`
6. No secrets in git
7. Do not edit `.content-collections/**`
8. `withContentCollections` must be outermost in `next.config.ts`
9. Next 16: `params` is a **Promise** — `await params`
10. Prefer `useSyncExternalStore` for theme/locale (avoid setState-in-effect lint failures)

## What not to do

- No CMS/DB/auth unless requested
- Don’t hard-code UI copy in pages — use `i18n` messages
- Don’t hard-code author URLs everywhere — use `siteConfig`
- Don’t strip a11y, theme, or locale systems for aesthetics
- Don’t break Content Collections post pipeline

## Typical change recipes

| Task | Where |
| --- | --- |
| **New blog post** | `content/blog/<slug>.mdx` (see guide above) |
| New project | `content/projects/projects.json` |
| UI copy KO/EN | `src/lib/i18n.ts` |
| Site name / socials | `src/lib/site.ts` |
| Feature on/off | `src/lib/features.ts` |
| Tokens / type | `src/app/globals.css` |
| MDX styling | `src/components/mdx-components.tsx` |
| New page | `src/app/...` + nav keys in `i18n` + `sitemap.ts` |

## Definition of done

- [ ] Works mobile + desktop  
- [ ] Design tokens / UI primitives used  
- [ ] A11y basics intact  
- [ ] SEO updated if new public route/content  
- [ ] Locale-aware if user-facing copy  
- [ ] `npm run lint` clean  
- [ ] `npm run build` succeeds  

## Docs

| File | Audience |
| --- | --- |
| **`README.md`** | Humans — setup, **how to add posts**, customize |
| **`AGENTS.md`** | Agents — conventions, map, recipes |

When in doubt: match `content/blog/*.mdx`, `src/lib/i18n.ts`, and `src/components/ui/`.
