import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { extractToc } from "./src/lib/toc";

const WORDS_PER_MINUTE = 200;

function estimateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return {
    words,
    minutes,
    text: `${minutes} min read`,
  };
}

const posts = defineCollection({
  name: "posts",
  directory: "content/blog",
  include: "**/*.{md,mdx}",
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.string().min(1),
    updated: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            theme: {
              light: "github-light",
              dark: "github-dark",
            },
            keepBackground: false,
            defaultLang: "plaintext",
          },
        ],
      ],
    });

    const readingTime = estimateReadingTime(document.content);
    const toc = extractToc(document.content);

    return {
      ...document,
      mdx,
      readingTime,
      toc,
      slug: document._meta.path,
      url: `/blog/${document._meta.path}`,
    };
  },
});

export default defineConfig({
  content: [posts],
});
