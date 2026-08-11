"use client";

import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/posts";
import { Heading } from "@/components/ui/heading";
import { useLocale } from "@/components/locale-provider";

type RelatedPostsProps = {
  posts: Post[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const { locale, t } = useLocale();
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className="mt-16 border-t border-border pt-12"
    >
      <Heading as={2} size="xs" muted id="related-heading" className="mb-6">
        {t.common.related}
      </Heading>
      <ul className="divide-y divide-border/70 border-t border-border/70">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={post.url}
              className="group block rounded-[var(--radius-lg)] py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <time dateTime={post.date}>
                  {formatDate(post.date, locale)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime.text}</span>
              </div>
              <p className="mt-2 text-lg font-medium tracking-[var(--tracking-tight)] text-foreground transition-colors group-hover:text-foreground/80">
                {post.title}
              </p>
              <p className="mt-1.5 text-pretty text-[var(--text-sm)] leading-[var(--leading-relaxed)] text-muted-foreground">
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
