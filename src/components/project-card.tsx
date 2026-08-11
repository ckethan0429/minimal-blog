"use client";

import Image from "next/image";
import type { Project } from "@/lib/projects";
import { getProjectPrimaryUrl, localizeProject } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { TagList } from "@/components/ui/tag";
import { useLocale } from "@/components/locale-provider";

type ProjectCardProps = {
  project: Project;
  className?: string;
  headingLevel?: 2 | 3;
  showScreenshot?: boolean;
};

export function ProjectCard({
  project,
  className,
  headingLevel = 2,
  showScreenshot = true,
}: ProjectCardProps) {
  const { locale, t } = useLocale();
  const localized = localizeProject(project, locale);
  const primaryHref = getProjectPrimaryUrl(project);
  const TitleTag = headingLevel === 3 ? "h3" : "h2";
  const shot =
    showScreenshot && project.screenshots && project.screenshots.length > 0
      ? project.screenshots[0]
      : undefined;

  const statusLabel = {
    shipped: t.common.shipped,
    active: t.common.active,
    archived: t.common.archived,
  } as const;

  return (
    <article className={cn("group", className)}>
      <div className="flex flex-col gap-4 py-7 sm:py-8">
        {shot ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-xl)] border border-border bg-muted shadow-[var(--shadow-sm)]">
            <Image
              src={shot}
              alt={`${localized.title} screenshot`}
              fill
              className="object-cover"
              sizes="(max-width: 672px) 100vw, 672px"
              loading="lazy"
            />
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>{project.year}</span>
          <span aria-hidden="true" className="text-border">
            ·
          </span>
          <span>{statusLabel[project.status]}</span>
          {project.featured ? (
            <>
              <span aria-hidden="true" className="text-border">
                ·
              </span>
              <span>{t.common.featured}</span>
            </>
          ) : null}
        </div>

        <TitleTag className="text-lg font-medium tracking-[var(--tracking-tight)] text-foreground sm:text-xl">
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[var(--radius-sm)] transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {localized.title}
              <span
                aria-hidden="true"
                className="ml-1.5 inline-block text-muted-foreground"
              >
                ↗
              </span>
            </a>
          ) : (
            localized.title
          )}
        </TitleTag>

        <p className="text-pretty text-[var(--text-sm)] leading-[var(--leading-relaxed)] text-muted-foreground sm:text-[var(--text-base)]">
          {localized.description}
        </p>

        <TagList
          tags={project.stack}
          variant="outline"
          label="Tech stack"
          className="mt-0.5"
        />

        {(project.github || project.website) && (
          <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {project.github ? (
              <li>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t.common.github}
                </a>
              </li>
            ) : null}
            {project.website ? (
              <li>
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t.common.website}
                </a>
              </li>
            ) : null}
          </ul>
        )}
      </div>
    </article>
  );
}
