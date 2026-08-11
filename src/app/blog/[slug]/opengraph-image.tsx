import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostOpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          color: "#ededed",
          padding: "72px 80px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: "#a3a3a3",
          }}
        >
          <span>{siteConfig.name}</span>
          <span>{post.readingTime.text}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
              maxWidth: 980,
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#a3a3a3",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {post.description}
          </div>
          {post.tags.length > 0 ? (
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 8,
                fontSize: 20,
                color: "#737373",
              }}
            >
              {post.tags.slice(0, 4).map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...size },
  );
}
