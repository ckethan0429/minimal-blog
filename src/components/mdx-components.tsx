import type { MDXComponents } from "mdx/types";
import type { ImageProps } from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { InlineCode } from "@/components/ui/code-block";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { MdxHeading } from "@/components/features/mdx-heading";
import { PreWithCopy } from "@/components/features/copy-code";
import { MdxImage } from "@/components/features/mdx-image";

function isExternal(href?: string) {
  return Boolean(href?.startsWith("http") || href?.startsWith("mailto:"));
}

export const mdxComponents: MDXComponents = {
  h1: ({ className, id, children }) => (
    <MdxHeading as="h1" id={id} className={className}>
      {children}
    </MdxHeading>
  ),
  h2: ({ className, id, children }) => (
    <MdxHeading as="h2" id={id} className={className}>
      {children}
    </MdxHeading>
  ),
  h3: ({ className, id, children }) => (
    <MdxHeading as="h3" id={id} className={className}>
      {children}
    </MdxHeading>
  ),
  h4: ({ className, id, children }) => (
    <MdxHeading as="h4" id={id} className={className}>
      {children}
    </MdxHeading>
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "my-5 text-pretty text-[var(--text-base)] leading-[var(--leading-relaxed)] text-foreground/90",
        className,
      )}
      {...props}
    />
  ),
  a: ({ href, className, children, ...props }) => {
    const external = isExternal(href);
    const classes = cn(
      "font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground",
      className,
    );

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href ?? "#"} className={classes} {...props}>
        {children}
      </Link>
    );
  },
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "my-5 list-disc space-y-2 pl-6 text-[var(--text-base)] leading-[var(--leading-relaxed)] text-foreground/90 marker:text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "my-5 list-decimal space-y-2 pl-6 text-[var(--text-base)] leading-[var(--leading-relaxed)] text-foreground/90 marker:text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("pl-1", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-6 border-l-2 border-foreground/20 pl-5 text-[var(--text-base)] italic leading-[var(--leading-relaxed)] text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr
      className={cn("my-10 border-0 border-t border-border", className)}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  ),
  code: ({ className, ...props }) => {
    const isBlock =
      className?.includes("language-") ||
      className?.includes("code-highlight");

    if (isBlock) {
      return <code className={className} {...props} />;
    }

    return <InlineCode className={className} {...props} />;
  },
  pre: (props) => <PreWithCopy {...props} />,
  table: ({ className, children, ...props }) => (
    <Table className={className} {...props}>
      {children}
    </Table>
  ),
  thead: ({ className, ...props }) => (
    <TableHeader className={className} {...props} />
  ),
  tbody: ({ className, ...props }) => (
    <TableBody className={className} {...props} />
  ),
  tr: ({ className, ...props }) => <TableRow className={className} {...props} />,
  th: ({ className, ...props }) => <TableHead className={className} {...props} />,
  td: ({ className, ...props }) => <TableCell className={className} {...props} />,
  img: (props) => {
    const { src, alt, width, height, className } = props as ImageProps & {
      src: string;
    };

    return (
      <MdxImage
        src={src}
        alt={alt ?? ""}
        width={typeof width === "number" ? width : 1200}
        height={typeof height === "number" ? height : 630}
        className={className}
      />
    );
  },
};
