"use client";

import { useLocale } from "@/components/locale-provider";
import { cn } from "@/lib/utils";

type LocaleToggleProps = {
  className?: string;
};

/**
 * Compact KO | EN control for the header.
 */
export function LocaleToggle({ className }: LocaleToggleProps) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t.common.language}
      className={cn(
        "inline-flex items-center rounded-[var(--radius-full)] border border-border bg-card p-0.5 text-xs font-medium shadow-[var(--shadow-sm)]",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setLocale("ko")}
        aria-pressed={locale === "ko"}
        className={cn(
          "rounded-[var(--radius-full)] px-2.5 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          locale === "ko"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        KO
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={cn(
          "rounded-[var(--radius-full)] px-2.5 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          locale === "en"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        EN
      </button>
    </div>
  );
}
