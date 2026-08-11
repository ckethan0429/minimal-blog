import { siteConfig } from "@/lib/site";
import {
  formatDateISO,
  getPostCoverUrl,
  getPublishedPosts,
} from "@/lib/posts";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getPublishedPosts().filter((post) => !post.draft);
  const lastBuildDate =
    posts[0] !== undefined
      ? formatDateISO(posts[0].updated ?? posts[0].date)
      : new Date().toISOString();

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}${post.url}`;
      const cover = getPostCoverUrl(post);
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("\n      ");

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.updated ? `<dc:date>${formatDateISO(post.updated)}</dc:date>` : ""}
      <author>${escapeXml(siteConfig.author.email)} (${escapeXml(siteConfig.author.name)})</author>
      ${categories}
      ${cover ? `<enclosure url="${escapeXml(cover)}" type="image/jpeg" length="0" />` : ""}
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(siteConfig.name)} — Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
    <managingEditor>${escapeXml(siteConfig.author.email)} (${escapeXml(siteConfig.author.name)})</managingEditor>
    <webMaster>${escapeXml(siteConfig.author.email)} (${escapeXml(siteConfig.author.name)})</webMaster>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
