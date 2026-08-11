"use client";

import { useEffect, useRef } from "react";
import { features, isGiscusConfigured } from "@/lib/features";
import { useTheme } from "@/components/theme-provider";
import { useLocale } from "@/components/locale-provider";

function giscusTheme(appTheme: string): string {
  if (appTheme === "dark") return "dark";
  if (appTheme === "light") return "light";
  // system
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "preferred_color_scheme";
}

/**
 * Giscus comments — only mounts when feature flag + env are set.
 * Env: NEXT_PUBLIC_GISCUS_REPO, REPO_ID, CATEGORY, CATEGORY_ID
 */
export function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { t, locale } = useLocale();

  const enabled = features.giscus && isGiscusConfigured();

  useEffect(() => {
    if (!enabled || !ref.current) return;

    // Clear previous iframe when theme changes
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", process.env.NEXT_PUBLIC_GISCUS_REPO!);
    script.setAttribute(
      "data-repo-id",
      process.env.NEXT_PUBLIC_GISCUS_REPO_ID!,
    );
    script.setAttribute(
      "data-category",
      process.env.NEXT_PUBLIC_GISCUS_CATEGORY!,
    );
    script.setAttribute(
      "data-category-id",
      process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!,
    );
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", giscusTheme(theme));
    script.setAttribute("data-lang", locale === "ko" ? "ko" : "en");
    script.setAttribute("data-loading", "lazy");

    ref.current.appendChild(script);
  }, [enabled, theme, locale]);

  if (!enabled) return null;

  return (
    <section
      aria-labelledby="comments-heading"
      className="mt-16 border-t border-border pt-12"
    >
      <h2
        id="comments-heading"
        className="mb-6 text-sm font-medium tracking-[var(--tracking-wide)] text-muted-foreground"
      >
        {t.common.comments}
      </h2>
      <div ref={ref} className="giscus" />
    </section>
  );
}
