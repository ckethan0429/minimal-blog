import { cn } from "@/lib/utils";

export type CardVariant = "default" | "muted" | "outline" | "ghost";

const variantClasses: Record<CardVariant, string> = {
  default:
    "border border-border bg-card text-card-foreground shadow-[var(--shadow-md)]",
  muted: "border border-transparent bg-muted text-foreground",
  outline: "border border-border bg-transparent text-foreground",
  ghost: "border border-transparent bg-transparent text-foreground",
};

type CardProps = {
  variant?: CardVariant;
  as?: "div" | "article" | "section" | "li";
  className?: string;
  children?: React.ReactNode;
  id?: string;
};

export function Card({
  variant = "default",
  as = "div",
  className,
  children,
  id,
}: CardProps) {
  const classes = cn(
    "rounded-[var(--radius-xl)] p-[var(--space-6)]",
    variantClasses[variant],
    className,
  );

  if (as === "article") {
    return (
      <article id={id} className={classes}>
        {children}
      </article>
    );
  }
  if (as === "section") {
    return (
      <section id={id} className={classes}>
        {children}
      </section>
    );
  }
  if (as === "li") {
    return (
      <li id={id} className={classes}>
        {children}
      </li>
    );
  }

  return (
    <div id={id} className={classes}>
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mb-[var(--space-3)] flex flex-col gap-[var(--space-1)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  as = "h3",
  children,
  id,
}: {
  className?: string;
  as?: "h2" | "h3" | "h4";
  children?: React.ReactNode;
  id?: string;
}) {
  const classes = cn(
    "text-lg font-medium tracking-[var(--tracking-tight)] text-foreground",
    className,
  );

  if (as === "h2") {
    return (
      <h2 id={id} className={classes}>
        {children}
      </h2>
    );
  }
  if (as === "h4") {
    return (
      <h4 id={id} className={classes}>
        {children}
      </h4>
    );
  }

  return (
    <h3 id={id} className={classes}>
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-[var(--text-sm)] leading-[var(--leading-relaxed)] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-[var(--space-4)] flex items-center gap-[var(--space-3)]",
        className,
      )}
      {...props}
    />
  );
}
