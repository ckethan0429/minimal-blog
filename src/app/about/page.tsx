import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { AboutContent } from "@/components/about-content";
import { siteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description: `About ${siteConfig.author.name} — ${siteConfig.description}`,
  path: "/about",
});

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    email: siteConfig.author.email,
    jobTitle: siteConfig.author.role,
    description: siteConfig.description,
    knowsAbout: [...siteConfig.author.focus],
    sameAs: [siteConfig.author.github, siteConfig.author.linkedin],
  };

  return (
    <>
      <JsonLd data={personJsonLd} />
      <AboutContent />
    </>
  );
}
