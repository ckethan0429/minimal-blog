import { features } from "@/lib/features";
import { cn } from "@/lib/utils";

type MdxHeadingProps = {
  as: "h1" | "h2" | "h3" | "h4";
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

const sizeClasses = {
  h1: "mt-10 scroll-mt-24 text-[var(--text-2xl)] font-semibold tracking-[var(--tracking-tight)] sm:text-[var(--text-3xl)]",
  h2: "mt-12 scroll-mt-24 border-b border-border/60 pb-2 text-[var(--text-xl)] font-semibold tracking-[var(--tracking-tight)] first:mt-0 sm:text-[var(--text-2xl)]",
  h3: "mt-8 scroll-mt-24 text-[var(--text-lg)] font-semibold tracking-[var(--tracking-tight)] sm:text-[var(--text-xl)]",
  h4: "mt-6 scroll-mt-24 text-[var(--text-base)] font-semibold tracking-[var(--tracking-tight)]",
} as const;

/**
 * MDX heading with optional hover anchor link.
 */
export function MdxHeading({ as: Tag, id, className, children }: MdxHeadingProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "group/heading relative text-balance text-foreground",
        sizeClasses[Tag],
        className,
      )}
    >
      {features.anchorLinks && id ? (
        <a
          href={`#${id}`}
          className="absolute top-1/2 -left-6 hidden -translate-y-1/2 text-muted-foreground opacity-0 transition-opacity group-hover/heading:opacity-100 focus-visible:opacity-100 sm:inline"
          aria-label="Link to this section"
        >
          #
        </a>
      ) : null}
      {children}
    </Tag>
  );
}
