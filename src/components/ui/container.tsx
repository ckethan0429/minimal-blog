import { cn } from "@/lib/utils";

export type ContainerSize = "default" | "wide" | "full";

const sizeClasses: Record<ContainerSize, string> = {
  default: "max-w-[var(--content-width)]",
  wide: "max-w-[var(--content-width-wide)]",
  full: "max-w-none",
};

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: ContainerSize;
  as?: "div" | "main" | "section" | "article" | "header" | "footer";
};

export function Container({
  children,
  className,
  size = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-[var(--container-pad)] sm:px-[var(--container-pad-sm)]",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
