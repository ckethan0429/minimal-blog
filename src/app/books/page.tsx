import type { Metadata } from "next";
import { BooksContent } from "@/components/books-content";
import { books } from "@/lib/books";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Books",
  description:
    "Practical infrastructure guides — VMware to Proxmox migration and GPU server builds — as PDF ebooks.",
  path: "/books",
});

export default function BooksPage() {
  return <BooksContent books={books} />;
}
