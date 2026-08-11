import Link from "next/link";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/heading";

type SectionHeadingProps = {
  id?: string;
  title: string;
  href?: string;
  linkLabel?: string;
  className?: string;
};

export function SectionHeading({
  id,
  title,
  href,
  linkLabel = "View all",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-6 flex items-baseline justify-between gap-4 border-b border-border/70 pb-3",
        className,
      )}
    >
      <Heading as={2} size="xs" muted id={id} balance={false}>
        {title}
      </Heading>
      {href ? (
        <Link
          href={href}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
