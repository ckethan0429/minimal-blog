import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PostHeader } from "@/components/post-header";
import { Prose } from "@/components/prose";
import { TableOfContents } from "@/components/table-of-contents";
import { AdjacentPosts } from "@/components/adjacent-posts";
import { RelatedPosts } from "@/components/related-posts";
import { JsonLd } from "@/components/json-ld";
import { ReadingProgress } from "@/components/features/reading-progress";
import { GiscusComments } from "@/components/features/giscus-comments";
import { NewsletterPlaceholder } from "@/components/features/newsletter";
import { KeyboardShortcuts } from "@/components/features/keyboard-shortcuts";
import {
  buildArticleJsonLd,
  formatDateISO,
  getAdjacentPosts,
  getPostBySlug,
  getPostCoverUrl,
  getPublishedPosts,
  getRelatedPosts,
} from "@/lib/posts";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { features } from "@/lib/features";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }

  const cover = getPostCoverUrl(post);

  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: post.url,
    type: "article",
    noIndex: post.draft,
    publishedTime: formatDateISO(post.date),
    modifiedTime: formatDateISO(post.updated ?? post.date),
    tags: post.tags,
    images: cover ? [{ url: cover, alt: post.title }] : undefined,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug, 3);
  const jsonLd = [
    buildArticleJsonLd(post),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: post.url },
    ]),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      {features.readingProgress ? <ReadingProgress /> : null}
      {features.keyboardShortcuts ? (
        <KeyboardShortcuts
          previousHref={previous?.url}
          nextHref={next?.url}
        />
      ) : null}

      <Container as="main" className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/blog"
                className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden="true" className="text-border">
              /
            </li>
            <li className="truncate text-foreground/80" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        <article itemScope itemType="https://schema.org/BlogPosting">
          <meta itemProp="headline" content={post.title} />
          <meta itemProp="datePublished" content={formatDateISO(post.date)} />
          <PostHeader post={post} />
          <TableOfContents items={post.toc} />
          <div itemProp="articleBody">
            <Prose code={post.mdx} />
          </div>
        </article>

        <AdjacentPosts previous={previous} next={next} />
        <RelatedPosts posts={related} />
        <GiscusComments />
        <NewsletterPlaceholder />
      </Container>
    </>
  );
}
