"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/heading";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { LinkText } from "@/components/ui/link-text";
import { siteConfig } from "@/lib/site";
import { useLocale } from "@/components/locale-provider";

export function AboutContent() {
  const { t } = useLocale();

  const principles = [
    {
      title: t.about.principle1Title,
      body: t.about.principle1Body,
    },
    {
      title: t.about.principle2Title,
      body: t.about.principle2Body,
    },
    {
      title: t.about.principle3Title,
      body: t.about.principle3Body,
    },
  ];

  return (
    <Container as="main" className="py-16 sm:py-24">
      <PageHeader title={t.about.title} description={t.about.lead} />

      <div className="space-y-6">
        <Text>{t.about.p1}</Text>
        <Text>{t.about.p2}</Text>
      </div>

      <Section
        aria-labelledby="principles-heading"
        className="mt-16 sm:mt-20"
      >
        <Heading
          as={2}
          size="xs"
          muted
          id="principles-heading"
          className="mb-6"
        >
          {t.about.principles}
        </Heading>
        <div className="grid gap-4">
          {principles.map((item) => (
            <Card key={item.title} variant="default">
              <CardTitle as="h3">{item.title}</CardTitle>
              <CardDescription className="mt-2">{item.body}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="connect-heading" className="mt-16 sm:mt-20">
        <Heading as={2} size="xs" muted id="connect-heading" className="mb-6">
          {t.about.connect}
        </Heading>
        <div className="space-y-3 border-t border-border/70 pt-7 text-[var(--text-base)]">
          <p>
            {t.common.email}:{" "}
            <LinkText href={`mailto:${siteConfig.author.email}`}>
              {siteConfig.author.email}
            </LinkText>
          </p>
          <p>
            {t.common.github}:{" "}
            <LinkText href={siteConfig.author.github} external>
              {siteConfig.author.github.replace(/^https?:\/\//, "")}
            </LinkText>
          </p>
          <p>
            LinkedIn:{" "}
            <LinkText href={siteConfig.author.linkedin} external>
              {t.common.profile}
            </LinkText>
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/blog">{t.common.readBlog}</ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            {t.common.viewProjects}
          </ButtonLink>
        </div>
      </Section>
    </Container>
  );
}
