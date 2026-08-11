"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { features } from "@/lib/features";
import { cn } from "@/lib/utils";
import { PostCard, type PostCardData } from "@/components/post-card";
import { useLocale } from "@/components/locale-provider";

type BlogFiltersProps = {
  posts: PostCardData[];
  tags: string[];
};

export function BlogFilters({ posts, tags }: BlogFiltersProps) {
  const { t } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeTag = features.tagFilter
    ? (searchParams.get("tag") ?? "").toLowerCase()
    : "";
  const [query, setQuery] = useState(
    features.search ? (searchParams.get("q") ?? "") : "",
  );

  const updateParams = useCallback(
    (next: { q?: string; tag?: string | null }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.q !== undefined) {
        if (next.q.trim()) params.set("q", next.q.trim());
        else params.delete("q");
      }
      if (next.tag !== undefined) {
        if (next.tag) params.set("tag", next.tag);
        else params.delete("tag");
      }
      const qs = params.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeTag) {
        const hasTag = post.tags.some((t) => t.toLowerCase() === activeTag);
        if (!hasTag) return false;
      }
      if (!q) return true;
      const haystack = [post.title, post.description, ...post.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, activeTag]);

  return (
    <div className="space-y-8">
      {(features.search || features.tagFilter) && (
        <div className="space-y-4 border-b border-border/70 pb-8">
          {features.search ? (
            <label className="block">
              <span className="sr-only">Search posts</span>
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  updateParams({ q: e.target.value });
                }}
                placeholder={t.common.searchPosts}
                autoComplete="off"
                className="w-full rounded-[var(--radius-lg)] border border-border bg-card px-4 py-2.5 text-[var(--text-sm)] text-foreground shadow-[var(--shadow-sm)] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              />
            </label>
          ) : null}

          {features.tagFilter && tags.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-label="Filter by tag">
              <li>
                <button
                  type="button"
                  onClick={() => updateParams({ tag: null })}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    !activeTag
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.common.allTags}
                </button>
              </li>
              {tags.map((tag) => {
                const selected = activeTag === tag.toLowerCase();
                return (
                  <li key={tag}>
                    <button
                      type="button"
                      onClick={() =>
                        updateParams({ tag: selected ? null : tag })
                      }
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        selected
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {tag}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      )}

      <div
        className={cn(
          "divide-y divide-border/70 border-t border-border/70",
          isPending && "opacity-70",
        )}
        aria-live="polite"
      >
        {filtered.length === 0 ? (
          <p className="py-10 text-muted-foreground">
            {t.common.noPostsFilter}
          </p>
        ) : (
          filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        )}
      </div>
    </div>
  );
}
