"use client";

import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/heading";
import { ButtonLink } from "@/components/ui/button-link";
import { useLocale } from "@/components/locale-provider";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <Container
      as="main"
      className="flex flex-col items-start justify-center py-24 sm:min-h-[60vh] sm:py-32"
    >
      <p className="mb-4 font-mono text-sm tracking-[var(--tracking-wide)] text-muted-foreground">
        {t.notFound.code}
      </p>
      <Heading as={1} size="2xl">
        {t.notFound.title}
      </Heading>
      <Text lead className="mt-5 max-w-md">
        {t.notFound.body}
      </Text>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">{t.notFound.home}</ButtonLink>
        <ButtonLink href="/blog" variant="secondary">
          {t.notFound.blog}
        </ButtonLink>
      </div>
    </Container>
  );
}
