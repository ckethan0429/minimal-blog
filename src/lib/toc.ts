export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

/**
 * GitHub-style slug used by rehype-slug / github-slugger (simplified).
 * Keeps TOC anchors aligned with rendered heading ids.
 */
export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Extract h2/h3 headings from raw MDX/Markdown source for the table of contents.
 * Skips fenced code blocks so comment hashes are ignored.
 */
export function extractToc(markdown: string): TocItem[] {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");
  const lines = withoutCode.split("\n");
  const items: TocItem[] = [];
  const seen = new Map<string, number>();

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const level = match[1]!.length as 2 | 3;
    // Strip simple markdown emphasis / inline code / links for display + slug
    const raw = match[2]!
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();

    if (!raw) continue;

    let id = slugifyHeading(raw);
    if (!id) continue;

    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) {
      id = `${id}-${count}`;
    }

    items.push({ id, text: raw, level });
  }

  return items;
}
