import { cn } from "@/lib/utils";
import { Heading, Text } from "@/components/ui/heading";

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("mb-12 sm:mb-16", className)}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium tracking-[var(--tracking-wide)] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <Heading as={1} size="2xl">
        {title}
      </Heading>
      {description ? (
        <Text lead className="mt-4 max-w-xl">
          {description}
        </Text>
      ) : null}
    </header>
  );
}
