import { cn } from "@/lib/utils";

type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  /** Wrap in horizontal scroll container (default true) */
  scrollable?: boolean;
};

export function Table({
  className,
  scrollable = true,
  ...props
}: TableProps) {
  const table = (
    <table
      className={cn(
        "w-full border-collapse text-left text-[var(--text-sm)] text-foreground/90",
        className,
      )}
      {...props}
    />
  );

  if (!scrollable) return table;

  return (
    <div className="my-[var(--space-6)] w-full overflow-x-auto rounded-[var(--radius-lg)] border border-border bg-card shadow-[var(--shadow-sm)]">
      {table}
    </div>
  );
}

export function TableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("border-b border-border bg-muted/60", className)}
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn(className)} {...props} />;
}

export function TableFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      className={cn("border-t border-border bg-muted/40 font-medium", className)}
      {...props}
    />
  );
}

export function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b border-border/70 last:border-0 transition-colors hover:bg-muted/40",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "px-[var(--space-3)] py-[var(--space-2)] text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        "px-[var(--space-3)] py-[var(--space-3)] align-top leading-[var(--leading-relaxed)]",
        className,
      )}
      {...props}
    />
  );
}

export function TableCaption({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      className={cn(
        "mt-[var(--space-3)] text-[var(--text-sm)] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
