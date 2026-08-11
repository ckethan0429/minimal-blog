import { cn } from "@/lib/utils";

export type AlertVariant = "info" | "success" | "warning" | "danger" | "neutral";

const variantClasses: Record<AlertVariant, string> = {
  info: "border-[var(--info-border)] bg-[var(--info-bg)] text-foreground [&>[data-alert-icon]]:text-[var(--info)]",
  success:
    "border-[var(--success-border)] bg-[var(--success-bg)] text-foreground [&>[data-alert-icon]]:text-[var(--success)]",
  warning:
    "border-[var(--warning-border)] bg-[var(--warning-bg)] text-foreground [&>[data-alert-icon]]:text-[var(--warning)]",
  danger:
    "border-[var(--danger-border)] bg-[var(--danger-bg)] text-foreground [&>[data-alert-icon]]:text-[var(--danger)]",
  neutral:
    "border-border bg-muted text-foreground [&>[data-alert-icon]]:text-muted-foreground",
};

const roleForVariant: Record<AlertVariant, "status" | "alert"> = {
  info: "status",
  success: "status",
  warning: "alert",
  danger: "alert",
  neutral: "status",
};

type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
  title?: string;
  icon?: boolean;
};

export function Alert({
  variant = "info",
  title,
  icon = true,
  className,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      role={roleForVariant[variant]}
      className={cn(
        "my-[var(--space-6)] flex gap-[var(--space-3)] rounded-[var(--radius-lg)] border px-[var(--space-4)] py-[var(--space-3)] shadow-[var(--shadow-sm)]",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {icon ? (
        <span data-alert-icon className="mt-0.5 shrink-0" aria-hidden="true">
          <AlertIcon variant={variant} />
        </span>
      ) : null}
      <div className="min-w-0 flex-1 text-[var(--text-sm)] leading-[var(--leading-relaxed)]">
        {title ? (
          <p className="mb-1 font-medium text-foreground">{title}</p>
        ) : null}
        <div className="text-foreground/90 [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </div>
      </div>
    </div>
  );
}

function AlertIcon({ variant }: { variant: AlertVariant }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (variant === "success") {
    return (
      <svg {...common}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4 12 14.01l-3-3" />
      </svg>
    );
  }

  if (variant === "warning" || variant === "danger") {
    return (
      <svg {...common}>
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <path d="M12 9v4M12 17h.01" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}
