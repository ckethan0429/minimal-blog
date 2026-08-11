"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button-link";
import { Tag } from "@/components/ui/tag";
import { useLocale } from "@/components/locale-provider";
import { pickLocale } from "@/lib/i18n";
import { formatBookPrice, type Book } from "@/lib/books";

type BooksContentProps = {
  books: Book[];
};

export function BooksContent({ books }: BooksContentProps) {
  const { t, locale } = useLocale();

  return (
    <Container as="main" className="py-16 sm:py-24">
      <PageHeader title={t.books.title} description={t.books.description} />

      <Section gap="lg">
        <div className="flex flex-col gap-12">
          {books.map((book) => {
            const title = pickLocale(book.title, locale);
            const available = book.buyUrl || book.kmongUrl;

            return (
              <article
                key={book.slug}
                className="flex flex-col gap-6 sm:flex-row sm:gap-8"
                aria-labelledby={`book-${book.slug}`}
              >
                <div className="w-full max-w-[240px] shrink-0">
                  <Image
                    src={book.cover}
                    alt={title}
                    width={652}
                    height={488}
                    className="rounded-lg border border-border/70"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <h2
                    id={`book-${book.slug}`}
                    className="text-xl font-semibold tracking-tight"
                  >
                    {title}
                  </h2>
                  <p className="text-muted-foreground">
                    {pickLocale(book.description, locale)}
                  </p>

                  <ul className="mt-1 flex flex-col gap-1.5 text-sm text-muted-foreground">
                    {book.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2">
                        <span aria-hidden className="text-foreground/50">
                          –
                        </span>
                        {pickLocale(h, locale)}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span className="text-lg font-semibold">
                      {formatBookPrice(book.price)}
                    </span>
                    <Tag>
                      PDF · {book.pages} {t.books.pages}
                    </Tag>
                  </div>

                  <div className="mt-1 flex flex-wrap gap-3">
                    {book.buyUrl ? (
                      <ButtonLink href={book.buyUrl} external>
                        {t.books.buy}
                      </ButtonLink>
                    ) : null}
                    {book.kmongUrl ? (
                      <ButtonLink
                        href={book.kmongUrl}
                        external
                        variant="secondary"
                      >
                        {t.books.kmong}
                      </ButtonLink>
                    ) : null}
                    {!available ? <Tag>{t.books.comingSoon}</Tag> : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section gap="md" aria-labelledby="buy-info-heading">
        <h2
          id="buy-info-heading"
          className="text-lg font-semibold tracking-tight"
        >
          {t.books.buyInfoTitle}
        </h2>
        <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
          {t.books.buyInfoItems.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="text-foreground/50">
                –
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}
