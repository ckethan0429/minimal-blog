"use client";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/projects";
import { useLocale } from "@/components/locale-provider";

type ProjectsContentProps = {
  featured: Project[];
  active: Project[];
  archived: Project[];
};

export function ProjectsContent({
  featured,
  active,
  archived,
}: ProjectsContentProps) {
  const { t } = useLocale();
  const empty =
    featured.length === 0 && active.length === 0 && archived.length === 0;

  return (
    <Container as="main" className="py-16 sm:py-24">
      <PageHeader
        title={t.projects.title}
        description={t.projects.description}
      />

      {featured.length > 0 ? (
        <Section aria-labelledby="featured-projects" gap="lg">
          <SectionHeading
            id="featured-projects"
            title={t.projects.featured}
          />
          <div className="divide-y divide-border/70">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
      ) : null}

      {active.length > 0 ? (
        <Section aria-labelledby="more-projects" gap="lg">
          <SectionHeading id="more-projects" title={t.projects.more} />
          <div className="divide-y divide-border/70">
            {active.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
      ) : null}

      {archived.length > 0 ? (
        <Section aria-labelledby="archived-projects">
          <SectionHeading id="archived-projects" title={t.projects.archived} />
          <div className="divide-y divide-border/70 opacity-90">
            {archived.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Section>
      ) : null}

      {empty ? (
        <p className="text-muted-foreground">{t.common.noProjects}</p>
      ) : null}
    </Container>
  );
}
