"use client";

import Link from "next/link";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/locale-provider";

type AdjacentPostsProps = {
  previous: Post | null;
  next: Post | null;
};

export function AdjacentPosts({ previous, next }: AdjacentPostsProps) {
  const { t } = useLocale();
  if (!previous && !next) return null;

  return (
    <nav
      aria-label={`${t.common.previous} / ${t.common.next}`}
      className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-2 sm:gap-6"
    >
      <div>
        {previous ? (
          <Link
            href={previous.url}
            className="group block rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <p className="mb-1.5 text-sm text-muted-foreground">
              {t.common.previous}
            </p>
            <p className="text-base font-medium tracking-[var(--tracking-tight)] text-foreground transition-colors group-hover:text-foreground/80">
              ← {previous.title}
            </p>
          </Link>
        ) : null}
      </div>
      <div className={cn(!previous && "sm:col-start-2")}>
        {next ? (
          <Link
            href={next.url}
            className="group block rounded-[var(--radius-lg)] text-left sm:text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <p className="mb-1.5 text-sm text-muted-foreground">
              {t.common.next}
            </p>
            <p className="text-base font-medium tracking-[var(--tracking-tight)] text-foreground transition-colors group-hover:text-foreground/80">
              {next.title} →
            </p>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
