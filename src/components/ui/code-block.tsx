import { cn } from "@/lib/utils";

type CodeBlockProps = {
  children: React.ReactNode;
  title?: string;
  language?: string;
  className?: string;
  /** Use for inline-style code blocks without rehype-pretty-code */
  code?: string;
};

export function CodeBlock({
  children,
  title,
  language,
  className,
  code,
}: CodeBlockProps) {
  return (
    <figure
      className={cn(
        "my-[var(--space-6)] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-muted shadow-[var(--shadow-sm)]",
        className,
      )}
    >
      {(title || language) && (
        <figcaption className="flex items-center justify-between gap-3 border-b border-border px-[var(--space-4)] py-[var(--space-2)]">
          {title ? (
            <span className="truncate font-mono text-[var(--text-xs)] text-muted-foreground">
              {title}
            </span>
          ) : (
            <span />
          )}
          {language ? (
            <span className="shrink-0 font-mono text-[var(--text-xs)] uppercase tracking-wide text-muted-foreground/80">
              {language}
            </span>
          ) : null}
        </figcaption>
      )}
      <pre
        className={cn(
          "overflow-x-auto p-[var(--space-4)] font-mono text-[0.875rem] leading-[1.7] text-foreground",
          !title && !language && "rounded-[var(--radius-lg)]",
        )}
      >
        {code !== undefined ? (
          <code className="bg-transparent p-0 font-mono text-inherit">{code}</code>
        ) : (
          children
        )}
      </pre>
    </figure>
  );
}

type InlineCodeProps = React.HTMLAttributes<HTMLElement>;

export function InlineCode({ className, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        "rounded-[var(--radius-md)] border border-border/80 bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground",
        className,
      )}
      {...props}
    />
  );
}
