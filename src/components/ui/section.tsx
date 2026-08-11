import { cn } from "@/lib/utils";

export type SectionSpacing = "sm" | "md" | "lg" | "xl";

const spacingClasses: Record<SectionSpacing, string> = {
  sm: "py-[var(--space-10)] sm:py-[var(--space-12)]",
  md: "py-[var(--space-12)] sm:py-[var(--space-16)]",
  lg: "py-[var(--space-16)] sm:py-[var(--space-20)]",
  xl: "py-[var(--space-20)] sm:py-[var(--space-24)]",
};

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  spacing?: SectionSpacing | "none";
  as?: "section" | "div" | "article";
  /** Bottom margin between stacked sections (when not using vertical padding) */
  gap?: SectionSpacing | "none";
};

const gapClasses: Record<Exclude<SectionSpacing, never> | "none", string> = {
  none: "",
  sm: "mb-[var(--space-12)] sm:mb-[var(--space-16)]",
  md: "mb-[var(--space-16)] sm:mb-[var(--space-20)]",
  lg: "mb-[var(--space-20)] sm:mb-[var(--space-24)]",
  xl: "mb-[var(--space-24)] sm:mb-[var(--space-32)]",
};

export function Section({
  spacing = "none",
  gap = "none",
  as: Tag = "section",
  className,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        spacing !== "none" && spacingClasses[spacing],
        gap !== "none" && gapClasses[gap],
        className,
      )}
      {...props}
    />
  );
}
