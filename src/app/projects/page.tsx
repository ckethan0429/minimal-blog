import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ProjectsContent } from "@/components/projects-content";
import { siteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildProjectsJsonLd,
  getActiveProjects,
  getArchivedProjects,
  getFeaturedProjects,
} from "@/lib/projects";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects",
  description: `Open-source and selected work by ${siteConfig.author.name} — infrastructure, AI systems, and cloud platforms.`,
  path: "/projects",
});

export default function ProjectsPage() {
  const featured = getFeaturedProjects();
  const active = getActiveProjects().filter((p) => !p.featured);
  const archived = getArchivedProjects();
  const allForJsonLd = [...featured, ...active, ...archived];

  return (
    <>
      <JsonLd data={buildProjectsJsonLd(allForJsonLd, "en")} />
      <ProjectsContent
        featured={featured}
        active={active}
        archived={archived}
      />
    </>
  );
}
