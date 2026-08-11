import { cn } from "@/lib/utils";

export type TagVariant = "default" | "outline" | "muted" | "solid";

const variantClasses: Record<TagVariant, string> = {
  default:
    "border border-border bg-muted/50 text-muted-foreground",
  outline: "border border-border bg-transparent text-muted-foreground",
  muted: "border border-transparent bg-muted text-muted-foreground",
  solid: "border border-transparent bg-foreground text-background",
};

type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: TagVariant;
};

export function Tag({
  variant = "default",
  className,
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-full)] px-2.5 py-0.5 text-xs font-medium tracking-wide",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

type TagListProps = {
  tags: string[];
  variant?: TagVariant;
  className?: string;
  label?: string;
};

export function TagList({
  tags,
  variant = "default",
  className,
  label = "Tags",
}: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <ul
      className={cn("flex flex-wrap gap-2", className)}
      aria-label={label}
    >
      {tags.map((tag) => (
        <li key={tag}>
          <Tag variant={variant}>{tag}</Tag>
        </li>
      ))}
    </ul>
  );
}
