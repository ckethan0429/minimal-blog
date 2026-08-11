import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { BlogPageContent } from "@/components/blog-page-content";
import { siteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildBlogJsonLd,
  getAllTags,
  getPublishedPosts,
} from "@/lib/posts";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description: `Writing by ${siteConfig.author.name} on infrastructure, AI systems, cloud platforms, and open source.`,
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPublishedPosts();
  const tags = getAllTags();

  const summaries = posts.map((post) => ({
    slug: post.slug,
    url: post.url,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    draft: post.draft,
    cover: post.cover,
    readingTime: post.readingTime,
  }));

  return (
    <>
      <JsonLd data={buildBlogJsonLd()} />
      <BlogPageContent posts={summaries} tags={tags} />
    </>
  );
}
