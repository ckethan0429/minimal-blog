import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { HomeContent } from "@/components/home-content";
import { siteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";
import { getPublishedPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";

const RECENT_POST_COUNT = 3;
const FEATURED_PROJECT_COUNT = 3;

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

function buildHomeJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
      email: siteConfig.author.email,
      sameAs: [siteConfig.author.github, siteConfig.author.linkedin],
      jobTitle: siteConfig.author.role,
      knowsAbout: [...siteConfig.author.focus],
      description: siteConfig.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: ["ko", "en"],
      author: {
        "@type": "Person",
        name: siteConfig.author.name,
      },
      potentialAction: {
        "@type": "ReadAction",
        target: [`${siteConfig.url}/blog`],
      },
    },
  ];
}

export default function HomePage() {
  const recentPosts = getPublishedPosts()
    .slice(0, RECENT_POST_COUNT)
    .map((post) => ({
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

  const featuredProjects = getFeaturedProjects().slice(
    0,
    FEATURED_PROJECT_COUNT,
  );

  return (
    <>
      <JsonLd data={buildHomeJsonLd()} />
      <HomeContent
        recentPosts={recentPosts}
        featuredProjects={featuredProjects}
      />
    </>
  );
}
