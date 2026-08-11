import { cn } from "@/lib/utils";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

/* Mild tracking — aggressive negative letter-spacing breaks Hangul rhythm */
const sizeClasses: Record<HeadingSize, string> = {
  xs: "text-[var(--text-sm)] font-medium tracking-[var(--tracking-wide)]",
  sm: "text-[var(--text-base)] font-semibold tracking-[var(--tracking-normal)]",
  md: "text-[var(--text-lg)] font-semibold tracking-[var(--tracking-tight)] sm:text-[var(--text-xl)]",
  lg: "text-[var(--text-xl)] font-semibold tracking-[var(--tracking-tight)] sm:text-[var(--text-2xl)]",
  xl: "text-[var(--text-2xl)] font-semibold tracking-[var(--tracking-tight)] sm:text-[var(--text-3xl)]",
  "2xl":
    "text-[var(--text-3xl)] font-semibold tracking-[var(--tracking-tight)] sm:text-[var(--text-4xl)] sm:leading-[var(--leading-tight)]",
  "3xl":
    "text-[var(--text-3xl)] font-semibold tracking-[var(--tracking-tight)] sm:text-[2.5rem] sm:leading-[1.25]",
  "4xl":
    "text-[2.25rem] font-semibold tracking-[var(--tracking-tight)] leading-[var(--leading-tight)] sm:text-[2.75rem]",
};

const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  1: "2xl",
  2: "xl",
  3: "lg",
  4: "md",
  5: "sm",
  6: "xs",
};

type HeadingProps = {
  as?: HeadingLevel;
  size?: HeadingSize;
  balance?: boolean;
  muted?: boolean;
  className?: string;
  children?: React.ReactNode;
  id?: string;
};

export function Heading({
  as = 2,
  size,
  balance = true,
  muted = false,
  className,
  children,
  id,
}: HeadingProps) {
  const resolvedSize = size ?? defaultSizeForLevel[as];
  const classes = cn(
    sizeClasses[resolvedSize],
    balance && "text-balance",
    muted ? "text-muted-foreground" : "text-foreground",
    className,
  );

  switch (as) {
    case 1:
      return (
        <h1 id={id} className={classes}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 id={id} className={classes}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 id={id} className={classes}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 id={id} className={classes}>
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 id={id} className={classes}>
          {children}
        </h5>
      );
    case 6:
      return (
        <h6 id={id} className={classes}>
          {children}
        </h6>
      );
  }
}

type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  size?: "sm" | "base" | "lg";
  muted?: boolean;
  lead?: boolean;
};

const textSizeClasses = {
  sm: "text-[var(--text-sm)]",
  base: "text-[var(--text-base)]",
  lg: "text-[var(--text-lg)] sm:text-[var(--text-xl)]",
} as const;

export function Text({
  size = "base",
  muted = false,
  lead = false,
  className,
  ...props
}: TextProps) {
  return (
    <p
      className={cn(
        "text-pretty leading-[var(--leading-relaxed)]",
        lead ? textSizeClasses.lg : textSizeClasses[size],
        muted || lead ? "text-muted-foreground" : "text-foreground/90",
        className,
      )}
      {...props}
    />
  );
}
