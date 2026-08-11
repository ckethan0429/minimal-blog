"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/heading";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { PostCard, type PostCardData } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/projects";
import { useLocale } from "@/components/locale-provider";

type HomeContentProps = {
  recentPosts: PostCardData[];
  featuredProjects: Project[];
};

export function HomeContent({
  recentPosts,
  featuredProjects,
}: HomeContentProps) {
  const { t } = useLocale();

  return (
    <Container as="main" className="py-16 sm:py-24">
      <Section aria-labelledby="hero-heading" gap="md">
        <p className="mb-4 text-sm font-medium tracking-[var(--tracking-wide)] text-muted-foreground">
          {t.home.role}
        </p>
        <Heading as={1} size="3xl" id="hero-heading" className="max-w-2xl">
          {t.home.heroTitle}
        </Heading>
        <Text lead className="mt-6 max-w-xl">
          {t.home.heroLead}
        </Text>
        <ul
          className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground"
          aria-label={t.home.focusLabel}
        >
          {t.home.focus.map((area, index) => (
            <li key={area} className="flex items-center gap-3">
              {index > 0 ? (
                <span aria-hidden="true" className="text-border">
                  ·
                </span>
              ) : null}
              <span>{area}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/books">{t.common.viewBooks}</ButtonLink>
          <ButtonLink href="/blog" variant="secondary">
            {t.common.readBlog}
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            {t.common.viewProjects}
          </ButtonLink>
        </div>
      </Section>

      <Section aria-labelledby="intro-heading" gap="lg">
        <SectionHeading
          id="intro-heading"
          title={t.home.aboutSection}
          href="/about"
        />
        <div className="max-w-xl space-y-5">
          <Text>{t.home.intro1}</Text>
          <Text>{t.home.intro2}</Text>
        </div>
      </Section>

      <Section aria-labelledby="posts-heading" gap="lg">
        <SectionHeading
          id="posts-heading"
          title={t.home.recentPosts}
          href="/blog"
          linkLabel={t.common.viewAll}
        />

        {recentPosts.length === 0 ? (
          <p className="py-8 text-muted-foreground">{t.common.noPosts}</p>
        ) : (
          <div className="divide-y divide-border/70">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} showCover={false} />
            ))}
          </div>
        )}
      </Section>

      <Section aria-labelledby="projects-heading" gap="lg">
        <SectionHeading
          id="projects-heading"
          title={t.home.featuredProjects}
          href="/projects"
          linkLabel={t.common.viewAll}
        />

        <div className="divide-y divide-border/70">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              headingLevel={3}
              showScreenshot={false}
            />
          ))}
        </div>
      </Section>

      <Section aria-labelledby="interests-heading">
        <SectionHeading id="interests-heading" title={t.home.interests} />
        <ul className="divide-y divide-border/70 border-t border-border/70">
          {t.interests.map((item) => (
            <li key={item.title} className="py-7 sm:py-8">
              <h3 className="text-lg font-medium tracking-[var(--tracking-tight)] text-foreground sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-2 max-w-xl text-pretty text-[var(--text-sm)] leading-[var(--leading-relaxed)] text-muted-foreground sm:text-[var(--text-base)]">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}
