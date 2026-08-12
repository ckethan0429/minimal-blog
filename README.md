# Minimal Blog

A modern, minimalist personal site for software engineers — blog, projects, and about.

Built for speed, SEO, accessibility, and long-term maintainability. **No CMS. No database.** Content lives in the repository as MDX and JSON.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS variables |
| Content | MDX + [Content Collections](https://www.content-collections.dev) |
| Fonts | **Nanum Square Neo** (한글 + Latin), Geist Mono |
| i18n | KO / EN UI (header toggle + auto-detect) |
| Deploy | [Vercel](https://vercel.com) |

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL in production
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
npm run lint
```

### Environment

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, no trailing slash (e.g. `https://example.com`) |
| `NEXT_PUBLIC_GISCUS_*` | Optional — enables Giscus comments (see `.env.example`) |

---

## How to add a blog post

Posts are plain **Markdown / MDX files** in the repo. No CMS.

### 1. Create a file

Put a new file under **`content/blog/`**:

```text
content/blog/my-first-post.mdx
```

The **filename (without extension) is the URL slug**:

| File | URL |
| --- | --- |
| `content/blog/my-first-post.mdx` | `/blog/my-first-post` |
| `content/blog/notes/deep-dive.mdx` | `/blog/notes/deep-dive` |

Use `.md` or `.mdx`. Prefer **kebab-case** names (`fast-by-default.mdx`).

### 2. Add frontmatter + body

```mdx
---
title: My first post
description: One or two sentences for SEO, cards, and social previews.
date: "2026-07-15"
updated: "2026-07-16"
tags:
  - engineering
  - performance
cover: /images/my-cover.jpg
draft: false
---

Opening paragraph. Write in **Markdown** or MDX.

## A section heading

Body text. Use `##` / `###` headings so the **table of contents** can pick them up.

```ts
// fenced code gets syntax highlighting + a copy button
const hello = "world";
```

- Lists work
- [Links](/blog) work
```

> **Tip:** Close the outer code fence properly in your real file. The sample above shows the idea; copy a real file from `content/blog/` if unsure.

### 3. Frontmatter fields

| Field | Required | Notes |
| --- | --- | --- |
| `title` | **yes** | Page title and article H1 |
| `description` | **yes** | Meta description, cards, RSS, OG |
| `date` | **yes** | Publish date as `"YYYY-MM-DD"` (quoted string) |
| `updated` | no | Shown as “Updated …” when set |
| `tags` | no | List of strings → related posts, RSS categories, tag filter |
| `cover` | no | Image path under `public/` (e.g. `/images/cover.jpg`) or absolute HTTPS URL |
| `draft` | no | Default `false`. If `true`: **visible in `npm run dev` only**, hidden in production, sitemap, and RSS |

You do **not** put `content` in the frontmatter yourself — Content Collections treats the MDX body as `content`.

### 4. Cover images

1. Add the file under `public/`, e.g. `public/images/my-cover.jpg`
2. Reference it as `cover: /images/my-cover.jpg` (leading `/`, path relative to `public/`)

### 5. Drafts vs published

| Mode | Draft posts |
| --- | --- |
| `npm run dev` | Shown (with a Draft badge) |
| `npm run build` / production | Hidden (not in list, sitemap, or RSS) |

Set `draft: false` (or omit `draft`) when ready to publish.

### 6. Preview and ship

```bash
npm run dev
# open http://localhost:3000/blog/my-first-post

npm run build   # fails if frontmatter is invalid
```

Commit the MDX file (and cover image if any). On Vercel, the next deploy rebuilds Content Collections and static pages automatically.

### 7. Language of the post body

- Write the **article in one language** (Korean **or** English) in the MDX file.
- Site chrome (nav, home, about UI) switches with the **KO | EN** header toggle.
- Post **title/body are not auto-translated** — they appear as authored.

### 8. Checklist for a new post

- [ ] File under `content/blog/<slug>.mdx`
- [ ] `title`, `description`, `date` present
- [ ] `date` is a quoted ISO date string
- [ ] At least one `##` heading if you want a TOC
- [ ] `draft: false` when publishing
- [ ] Cover path exists under `public/` if used
- [ ] `npm run build` succeeds

### Example posts in this repo

See `content/blog/` for real examples (`hello-world.mdx`, `hangul-typography.mdx`, etc.).

---

## How to add a project

Edit **`content/projects/projects.json`** (structured data, not React components).

```json
{
  "slug": "my-tool",
  "title": { "en": "My Tool", "ko": "내 도구" },
  "description": {
    "en": "Short English summary.",
    "ko": "짧은 한글 설명."
  },
  "year": "2026",
  "status": "active",
  "stack": ["TypeScript", "Next.js"],
  "github": "https://github.com/you/repo",
  "website": "https://example.com",
  "featured": true,
  "screenshots": ["/images/projects/my-tool.png"]
}
```

| Field | Notes |
| --- | --- |
| `title` / `description` | String **or** `{ "en", "ko" }` for bilingual UI |
| `status` | `active` · `shipped` · `archived` |
| `featured` | Shown on homepage when `true` (and not archived) |
| `github` / `website` | Optional external links |
| `screenshots` | Optional paths under `public/` |

---

## Localization (KO / EN)

| Control | Behavior |
| --- | --- |
| Header **KO \| EN** | Manual override; saved in `localStorage` (`locale`) |
| First visit | Browser language `ko*` **or** timezone `Asia/Seoul` → Korean; otherwise English |
| UI strings | `src/lib/i18n.ts` (`messages.ko` / `messages.en`) |
| Projects | Bilingual fields in `projects.json` |
| Blog posts | Single language per MDX file (as written) |

---

## Pages

| Route | Description |
| --- | --- |
| `/` | Home — hero, intro, recent posts, featured projects, interests |
| `/blog` | Index with search + tag filter |
| `/blog/[slug]` | Article (SSG): TOC, prev/next, related, optional Giscus |
| `/projects` | Featured / more / archived sections |
| `/books` | Ebook catalog with Latpeed domestic-payment and Gumroad international-payment buttons |
| `/book` | Permanent compatibility redirect to `/books` |
| `/about` | Bio, principles, contact |
| 404 | Localized not-found |
| `/feed.xml` · `/sitemap.xml` · `/robots.txt` | Feeds & SEO |

---

## Project structure

```text
content/
  blog/                      # MDX blog posts ← add posts here
  projects/projects.json     # Portfolio data (bilingual OK)
content-collections.ts       # Post schema + MDX pipeline
src/
  app/                       # Routes (App Router)
  components/
    header.tsx               # Nav + KO|EN + theme + mobile menu
    locale-provider.tsx / locale-toggle.tsx
    theme-provider.tsx / theme-toggle.tsx
    features/                # Optional UX modules
    ui/                      # Design system
  lib/
    site.ts                  # Name, author, URLs
    i18n.ts                  # KO/EN messages + locale detect
    posts.ts                 # Blog queries, related, JSON-LD
    projects.ts              # Load/validate projects.json
    features.ts              # Feature flags
    fonts.ts / seo.ts / toc.ts / theme.ts / utils.ts
  fonts/nanum-square/        # Self-hosted Nanum Square Neo
```

---

## Customize

| Goal | Edit |
| --- | --- |
| Name, email, GitHub, LinkedIn | `src/lib/site.ts` |
| Nav / home / about UI copy (KO+EN) | `src/lib/i18n.ts` |
| New blog post | `content/blog/<slug>.mdx` (see guide above) |
| New project | `content/projects/projects.json` |
| Colors, type, spacing | `src/app/globals.css` |
| Optional UX flags | `src/lib/features.ts` |

### Optional features (`src/lib/features.ts`)

| Flag | What it does |
| --- | --- |
| `search` / `tagFilter` | Blog search + tag chips |
| `darkMode` | Theme toggle (light / dark / system) |
| `readingProgress` | Article progress bar |
| `copyCode` | Copy on code blocks |
| `anchorLinks` | Hover `#` on headings |
| `imageZoom` | Click MDX images to expand |
| `viewCount` | Placeholder views label |
| `newsletter` | Placeholder + RSS/email |
| `giscus` | Comments if `NEXT_PUBLIC_GISCUS_*` set |
| `keyboardShortcuts` | `/` search, `?` help, `j`/`k` posts |
| `pageTransitions` | CSS view transitions class |

---

## Design system (short)

- Tokens: CSS variables in `src/app/globals.css`
- UI primitives: `@/components/ui` (Button, Card, Container, Section, Heading, Tag, Alert, Table, …)
- Theme: `data-theme` on `<html>` + `localStorage`
- Typography: Nanum Square Neo; Hangul-friendly leading and `word-break: keep-all`

---

## SEO & accessibility

- Canonicals, Open Graph, Twitter, generated OG images  
- JSON-LD (`Person`, `WebSite`, `Blog`, `BlogPosting`, projects list, breadcrumbs)  
- Sitemap, robots.txt, RSS  
- Skip link, focus rings, keyboard nav, `prefers-reduced-motion`

---

## Deploy on Vercel

1. Push to GitHub  
2. Import in Vercel  
3. Set `NEXT_PUBLIC_SITE_URL`  
4. Deploy  

Content Collections runs during `next build`. Routes are statically generated.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

## License

Private — replace with your preferred license.
