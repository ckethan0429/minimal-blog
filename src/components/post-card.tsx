"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/posts";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";
import { useLocale } from "@/components/locale-provider";

export type PostCardData = {
  slug: string;
  url: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
  cover?: string;
  readingTime: { text: string };
};

type PostCardProps = {
  post: PostCardData;
  className?: string;
  showCover?: boolean;
};

export function PostCard({
  post,
  className,
  showCover = true,
}: PostCardProps) {
  const { locale, t } = useLocale();
  const withCover = showCover && Boolean(post.cover);

  return (
    <article className={cn("group", className)}>
      <Link
        href={post.url}
        className="block rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <div
          className={cn(
            "flex flex-col gap-2.5 py-7 sm:py-8",
            withCover && "sm:flex-row sm:items-start sm:gap-6",
          )}
        >
          {withCover && post.cover ? (
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-muted shadow-[var(--shadow-sm)] sm:aspect-square sm:w-28">
              <Image
                src={post.cover}
                alt=""
                fill
                loading="lazy"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 112px"
              />
            </div>
          ) : null}

          <div className="flex min-w-0 flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <time dateTime={post.date}>
                {formatDate(post.date, locale)}
              </time>
              <span aria-hidden="true" className="text-border">
                ·
              </span>
              <span>{post.readingTime.text}</span>
              {post.draft ? (
                <>
                  <span aria-hidden="true" className="text-border">
                    ·
                  </span>
                  <Tag variant="muted">{t.common.draft}</Tag>
                </>
              ) : null}
            </div>

            <h3 className="text-lg font-medium tracking-[var(--tracking-tight)] text-foreground transition-colors group-hover:text-foreground/80 sm:text-xl">
              {post.title}
            </h3>

            <p className="text-pretty text-[var(--text-sm)] leading-[var(--leading-relaxed)] text-muted-foreground sm:text-[var(--text-base)]">
              {post.description}
            </p>

            {post.tags.length > 0 ? (
              <ul className="mt-1 flex flex-wrap gap-2" aria-label="Tags">
                {post.tags.slice(0, 3).map((tag) => (
                  <li key={tag}>
                    <span className="text-xs text-muted-foreground/80">
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
