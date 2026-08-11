"use client";

import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { NewsletterPlaceholder } from "@/components/features/newsletter";
import { BlogFilters } from "@/components/features/blog-filters";
import { KeyboardShortcuts } from "@/components/features/keyboard-shortcuts";
import type { PostCardData } from "@/components/post-card";
import { useLocale } from "@/components/locale-provider";
import { features } from "@/lib/features";

type BlogPageContentProps = {
  posts: PostCardData[];
  tags: string[];
};

export function BlogPageContent({ posts, tags }: BlogPageContentProps) {
  const { t } = useLocale();

  return (
    <>
      {features.keyboardShortcuts ? <KeyboardShortcuts /> : null}

      <Container as="main" className="py-16 sm:py-24">
        <PageHeader title={t.blog.title} description={t.blog.description} />

        {posts.length === 0 ? (
          <p className="text-muted-foreground">{t.common.noPosts}</p>
        ) : (
          <Suspense
            fallback={
              <div className="divide-y divide-border/70 border-t border-border/70">
                <p className="py-10 text-muted-foreground">
                  {t.common.loading}
                </p>
              </div>
            }
          >
            <BlogFilters posts={posts} tags={tags} />
          </Suspense>
        )}

        <NewsletterPlaceholder />
      </Container>
    </>
  );
}
