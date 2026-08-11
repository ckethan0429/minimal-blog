import projectsData from "../../content/projects/projects.json";
import { pickLocale, type Locale, type Localized } from "@/lib/i18n";

export type ProjectStatus = "active" | "shipped" | "archived";

/**
 * Structured project record (see content/projects/projects.json).
 * Titles/descriptions may be bilingual { en, ko } or a single string.
 */
export type Project = {
  slug: string;
  title: Localized;
  description: Localized;
  year: string;
  status: ProjectStatus;
  stack: string[];
  github?: string;
  website?: string;
  featured?: boolean;
  screenshots?: string[];
};

/** Project with strings resolved for a locale (for UI cards). */
export type LocalizedProject = Omit<Project, "title" | "description"> & {
  title: string;
  description: string;
};

function isProjectStatus(value: string): value is ProjectStatus {
  return value === "active" || value === "shipped" || value === "archived";
}

function parseLocalized(
  value: unknown,
  field: string,
  slug: string,
): Localized {
  if (typeof value === "string" && value) return value;
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    const en = typeof o.en === "string" ? o.en : "";
    const ko = typeof o.ko === "string" ? o.ko : "";
    if (en || ko) return { en: en || ko, ko: ko || en };
  }
  throw new Error(`Project "${slug}" is missing ${field}`);
}

function parseProjects(raw: unknown): Project[] {
  if (!Array.isArray(raw)) {
    throw new Error("content/projects/projects.json must be an array");
  }

  return raw.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Invalid project at index ${index}`);
    }

    const p = item as Record<string, unknown>;

    if (typeof p.slug !== "string" || !p.slug) {
      throw new Error(`Project at index ${index} is missing slug`);
    }
    if (typeof p.year !== "string" || !p.year) {
      throw new Error(`Project "${p.slug}" is missing year`);
    }
    if (typeof p.status !== "string" || !isProjectStatus(p.status)) {
      throw new Error(
        `Project "${p.slug}" has invalid status (active|shipped|archived)`,
      );
    }
    if (!Array.isArray(p.stack) || !p.stack.every((s) => typeof s === "string")) {
      throw new Error(`Project "${p.slug}" needs stack: string[]`);
    }

    return {
      slug: p.slug,
      title: parseLocalized(p.title, "title", p.slug),
      description: parseLocalized(p.description, "description", p.slug),
      year: p.year,
      status: p.status,
      stack: p.stack as string[],
      github: typeof p.github === "string" ? p.github : undefined,
      website: typeof p.website === "string" ? p.website : undefined,
      featured: Boolean(p.featured),
      screenshots: Array.isArray(p.screenshots)
        ? (p.screenshots.filter((s) => typeof s === "string") as string[])
        : [],
    };
  });
}

export const projects: Project[] = parseProjects(projectsData);

export function localizeProject(
  project: Project,
  locale: Locale,
): LocalizedProject {
  return {
    ...project,
    title: pickLocale(project.title, locale),
    description: pickLocale(project.description, locale),
  };
}

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => {
    if (b.year !== a.year) return b.year.localeCompare(a.year);
    return pickLocale(a.title, "en").localeCompare(pickLocale(b.title, "en"));
  });
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured && p.status !== "archived");
}

export function getActiveProjects(): Project[] {
  return getAllProjects().filter((p) => p.status !== "archived");
}

export function getArchivedProjects(): Project[] {
  return getAllProjects().filter((p) => p.status === "archived");
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectPrimaryUrl(project: Project): string | undefined {
  return project.website ?? project.github;
}

export function buildProjectsJsonLd(list: Project[], locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects",
    numberOfItems: list.length,
    itemListElement: list.map((project, index) => {
      const localized = localizeProject(project, locale);
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareSourceCode",
          name: localized.title,
          description: localized.description,
          programmingLanguage: project.stack,
          ...(getProjectPrimaryUrl(project)
            ? { url: getProjectPrimaryUrl(project) }
            : {}),
          ...(project.github ? { codeRepository: project.github } : {}),
        },
      };
    }),
  };
}
