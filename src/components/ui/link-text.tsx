import Link from "next/link";
import { cn } from "@/lib/utils";

type LinkTextProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function LinkText({
  href,
  children,
  className,
  external,
}: LinkTextProps) {
  const classes = cn(
    "text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className,
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
