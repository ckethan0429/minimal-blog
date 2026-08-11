"use client";

import { useLocale } from "@/components/locale-provider";

/**
 * 공정위 대가성 고지 — required on every post that contains
 * Coupang Partners affiliate links. Place near the top of the body.
 */
export function AffiliateDisclosure() {
  const { t } = useLocale();

  return (
    <aside
      role="note"
      className="my-6 rounded-[var(--radius-lg)] border border-border bg-card px-4 py-3 text-[var(--text-sm)] leading-[var(--leading-relaxed)] text-muted-foreground"
    >
      {t.affiliate.disclosure}
    </aside>
  );
}
