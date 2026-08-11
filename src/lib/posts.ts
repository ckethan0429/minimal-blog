import { allPosts } from "content-collections";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

export type Post = (typeof allPosts)[number];

/**
 * Published posts only, newest first.
 * Drafts are excluded outside of development.
 */
export function getPublishedPosts(): Post[] {
  const showDrafts = process.env.NODE_ENV === "development";

  return allPosts
    .filter((post) => showDrafts || !post.draft)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getPublishedPosts()) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function formatDate(
  date: string,
  locale: Locale = "ko",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
): string {
  const tag = locale === "ko" ? "ko-KR" : "en-US";
  return new Intl.DateTimeFormat(tag, options).format(new Date(date));
}

export function formatDateISO(date: string): string {
  return new Date(date).toISOString();
}

/** Absolute cover URL for OG/JSON-LD, or null if none. */
export function getPostCoverUrl(post: Post): string | null {
  if (!post.cover) return null;
  return absoluteUrl(post.cover);
}

/**
 * Previous = newer post, Next = older post (chronological reading through the archive).
 * List order is newest-first.
 */
export function getAdjacentPosts(slug: string): {
  previous: Post | null;
  next: Post | null;
} {
  const posts = getPublishedPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: index > 0 ? posts[index - 1]! : null,
    next: index < posts.length - 1 ? posts[index + 1]! : null,
  };
}

/**
 * Related posts ranked by shared tags, then recency.
 * Falls back to newest other posts when no tag overlap.
 */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const others = getPublishedPosts().filter((post) => post.slug !== slug);
  const tagSet = new Set(current.tags.map((t) => t.toLowerCase()));

  const ranked = others
    .map((post) => {
      const shared = post.tags.filter((t) =>
        tagSet.has(t.toLowerCase()),
      ).length;
      return { post, shared };
    })
    .sort((a, b) => {
      if (b.shared !== a.shared) return b.shared - a.shared;
      return (
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
      );
    });

  const withTags = ranked.filter((r) => r.shared > 0).map((r) => r.post);
  if (withTags.length >= limit) {
    return withTags.slice(0, limit);
  }

  // Fill remaining slots with recent posts not already included
  const selected = new Set(withTags.map((p) => p.slug));
  const fallback = others.filter((p) => !selected.has(p.slug));
  return [...withTags, ...fallback].slice(0, limit);
}

/** ISO-8601 duration for reading time (e.g. PT5M). */
export function readingTimeDuration(minutes: number): string {
  return `PT${Math.max(1, minutes)}M`;
}

export function buildArticleJsonLd(post: Post) {
  const cover = getPostCoverUrl(post);
  const url = absoluteUrl(post.url);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: formatDateISO(post.date),
    dateModified: formatDateISO(post.updated ?? post.date),
    wordCount: post.readingTime.words,
    timeRequired: readingTimeDuration(post.readingTime.minutes),
    keywords: post.tags,
    articleSection: post.tags[0],
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    ...(cover ? { image: [cover] } : {}),
  };
}

export function buildBlogJsonLd() {
  const posts = getPublishedPosts();
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    description: siteConfig.description,
    url: absoluteUrl("/blog"),
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: formatDateISO(post.date),
      url: absoluteUrl(post.url),
    })),
  };
}
