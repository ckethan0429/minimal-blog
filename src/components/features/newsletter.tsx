"use client";

import { features } from "@/lib/features";
import { siteConfig } from "@/lib/site";
import { useLocale } from "@/components/locale-provider";

/**
 * Newsletter placeholder — no form backend.
 */
export function NewsletterPlaceholder() {
  const { t } = useLocale();
  if (!features.newsletter) return null;

  return (
    <aside
      aria-labelledby="newsletter-heading"
      className="mt-16 rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-sm)] sm:p-8"
    >
      <h2
        id="newsletter-heading"
        className="text-base font-medium tracking-[var(--tracking-tight)] text-foreground"
      >
        {t.common.newsletterTitle}
      </h2>
      <p className="mt-2 text-[var(--text-sm)] leading-[var(--leading-relaxed)] text-muted-foreground">
        {t.common.newsletterBody}{" "}
        <a
          href="/feed.xml"
          className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          {t.common.rssFeed}
        </a>
        {" · "}
        <a
          href={`mailto:${siteConfig.author.email}`}
          className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          {siteConfig.author.email}
        </a>
      </p>
    </aside>
  );
}
