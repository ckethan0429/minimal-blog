"use client";

import Image from "next/image";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/posts";
import { Heading } from "@/components/ui/heading";
import { TagList } from "@/components/ui/tag";
import { ViewCountPlaceholder } from "@/components/features/view-count";
import { features } from "@/lib/features";
import { useLocale } from "@/components/locale-provider";

type PostHeaderProps = {
  post: Post;
};

export function PostHeader({ post }: PostHeaderProps) {
  const { locale, t } = useLocale();

  return (
    <header className="mb-10 sm:mb-12">
      <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime.text}</span>
        {features.viewCount ? (
          <>
            <span aria-hidden="true">·</span>
            <ViewCountPlaceholder />
          </>
        ) : null}
        {post.updated ? (
          <>
            <span aria-hidden="true">·</span>
            <span>
              {locale === "ko" ? "수정" : "Updated"}{" "}
              {formatDate(post.updated, locale)}
            </span>
          </>
        ) : null}
        {post.draft ? (
          <>
            <span aria-hidden="true">·</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
              {t.common.draft}
            </span>
          </>
        ) : null}
      </div>

      <Heading as={1} size="2xl">
        {post.title}
      </Heading>

      <TagList tags={post.tags} className="mt-7" />

      {post.cover ? (
        <div className="relative mt-10 aspect-[2/1] overflow-hidden rounded-[var(--radius-xl)] border border-border bg-muted shadow-[var(--shadow-md)]">
          <Image
            src={post.cover}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(max-width: 672px) 100vw, 672px"
          />
        </div>
      ) : null}
    </header>
  );
}
