"use client";

import { features } from "@/lib/features";
import { useLocale } from "@/components/locale-provider";

export function ViewCountPlaceholder() {
  const { t } = useLocale();
  if (!features.viewCount) return null;

  return (
    <span className="text-muted-foreground" title={t.common.viewsPlaceholder}>
      {t.common.viewsPlaceholder}
    </span>
  );
}
