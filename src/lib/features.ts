/**
 * Optional site features (plan 5).
 * Toggle modules without removing code — keep everything modular.
 *
 * Giscus enables itself when NEXT_PUBLIC_GISCUS_* env vars are set,
 * even if `giscus` is true.
 */
export const features = {
  /** Blog search input */
  search: true,
  /** Tag chips + ?tag= filter on /blog */
  tagFilter: true,
  /** Theme toggle (light / dark / system) — already wired in header */
  darkMode: true,
  /** Article reading progress bar */
  readingProgress: true,
  /** Copy button on fenced code blocks */
  copyCode: true,
  /** Hover anchor (#) on MDX headings */
  anchorLinks: true,
  /** Click-to-zoom on MDX images */
  imageZoom: true,
  /** Placeholder view count UI (no analytics backend) */
  viewCount: true,
  /** Newsletter signup placeholder */
  newsletter: true,
  /**
   * Giscus comments — requires env:
   * NEXT_PUBLIC_GISCUS_REPO, REPO_ID, CATEGORY, CATEGORY_ID
   */
  giscus: true,
  /** Global keyboard shortcuts (? help, / search) */
  keyboardShortcuts: true,
  /** CSS View Transitions for navigations (when supported) */
  pageTransitions: true,
} as const;

export type FeatureFlag = keyof typeof features;

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return features[flag];
}

export function isGiscusConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_GISCUS_REPO &&
      process.env.NEXT_PUBLIC_GISCUS_REPO_ID &&
      process.env.NEXT_PUBLIC_GISCUS_CATEGORY &&
      process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
  );
}
