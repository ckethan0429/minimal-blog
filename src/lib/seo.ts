import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute page title (no site template suffix). */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  images?: Array<{ url: string; alt?: string }>;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  authors?: string[];
};

/**
 * Consistent Metadata for App Router pages (canonical, OG, Twitter, robots).
 */
export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  images,
  noIndex = false,
  publishedTime,
  modifiedTime,
  tags,
  authors,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImages =
    images && images.length > 0
      ? images.map((img) => ({
          url: img.url.startsWith("http") ? img.url : absoluteUrl(img.url),
          alt: img.alt ?? title,
        }))
      : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": absoluteUrl("/feed.xml"),
      },
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      alternateLocale: [...siteConfig.alternateLocales],
      siteName: siteConfig.name,
      title,
      description,
      url,
      ...(ogImages ? { images: ogImages } : {}),
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors: authors ?? [siteConfig.author.name],
            tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.author.twitter,
      ...(ogImages ? { images: ogImages.map((i) => i.url) } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large" as const,
            "max-snippet": -1,
          },
        },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
