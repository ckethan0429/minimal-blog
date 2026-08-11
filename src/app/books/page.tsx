import type { Metadata } from "next";
import { BooksContent } from "@/components/books-content";
import { books } from "@/lib/books";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Books",
  description:
    "Five practical PDF ebooks covering VMware migration, GPU server builds, and Korean real-estate auctions, including two English editions.",
  path: "/books",
});

export default function BooksPage() {
  return <BooksContent books={books} />;
}
