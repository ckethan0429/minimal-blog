"use client";

import type { TocItem } from "@/lib/toc";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/locale-provider";

type TableOfContentsProps = {
  items: TocItem[];
  className?: string;
};

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const { t } = useLocale();
  if (items.length < 2) return null;

  return (
    <nav
      aria-label={t.common.onThisPage}
      className={cn(
        "my-10 rounded-[var(--radius-xl)] border border-border bg-card p-5 shadow-[var(--shadow-sm)] sm:p-6",
        className,
      )}
    >
      <p className="mb-3 text-sm font-medium tracking-[var(--tracking-wide)] text-muted-foreground">
        {t.common.onThisPage}
      </p>
      <ol className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className={cn(item.level === 3 && "ml-4")}>
            <a
              href={`#${item.id}`}
              className="text-[var(--text-sm)] leading-snug text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
