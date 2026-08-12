"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/locale-provider";

type TableOfContentsProps = {
  items: TocItem[];
  className?: string;
};

/** Tracks the heading closest above the top of the viewport. */
function useActiveHeading(items: TocItem[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const ids = items.map((item) => item.id).join(",");

  useEffect(() => {
    const headings = ids
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const update = () => {
      let current = headings[0].id;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > 96) break;
        current = heading.id;
      }
      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  return activeId;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const { t } = useLocale();
  const activeId = useActiveHeading(items);

  if (items.length < 2) return null;

  return (
    <>
      {/* Inline: narrow viewports, where there is no room beside the article. */}
      <nav
        aria-label={t.common.onThisPage}
        className={cn(
          "my-8 rounded-[var(--radius-lg)] border border-border/80 bg-card px-4 py-4 shadow-[var(--shadow-sm)] sm:px-5 xl:hidden",
          className,
        )}
      >
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {t.common.onThisPage}
        </p>
        <ol className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id} className={cn(item.level === 3 && "ml-4")}>
              <a
                href={`#${item.id}`}
                className="text-sm leading-relaxed text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Floating: pinned to the right of the reading column on wide screens. */}
      <nav
        aria-label={t.common.onThisPage}
        className="fixed top-1/2 left-[calc(50%+var(--content-width)/2+2.5rem)] z-30 hidden max-h-[70vh] w-56 -translate-y-1/2 overflow-y-auto overscroll-contain xl:block"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {t.common.onThisPage}
        </p>
        <ol className="border-l border-border">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    item.level === 3 ? "pl-7" : "pl-4",
                    isActive
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                  )}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
