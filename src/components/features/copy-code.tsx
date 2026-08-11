"use client";

import { useCallback, useRef, useState } from "react";
import { features } from "@/lib/features";
import { cn } from "@/lib/utils";

type PreWithCopyProps = React.HTMLAttributes<HTMLPreElement>;

function extractText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    const el = node as { props?: { children?: React.ReactNode } };
    return extractText(el.props?.children);
  }
  return "";
}

export function PreWithCopy({ className, children, ...props }: PreWithCopyProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    const text =
      preRef.current?.innerText ?? extractText(children);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard may be denied */
    }
  }, [children]);

  if (!features.copyCode) {
    return (
      <pre
        className={cn(
          "my-6 overflow-x-auto rounded-[var(--radius-lg)] border border-border bg-muted p-4 font-mono text-[0.875rem] leading-relaxed shadow-[var(--shadow-sm)]",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    );
  }

  return (
    <div className="group/code relative my-6 [figure_&]:my-0">
      <button
        type="button"
        onClick={onCopy}
        className="absolute top-2.5 right-2.5 z-10 rounded-[var(--radius-md)] border border-border bg-card/90 px-2 py-1 text-xs text-muted-foreground opacity-100 shadow-[var(--shadow-sm)] backdrop-blur transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:opacity-0 sm:group-hover/code:opacity-100"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre
        ref={preRef}
        className={cn(
          "overflow-x-auto rounded-[var(--radius-lg)] border border-border bg-muted p-4 font-mono text-[0.875rem] leading-relaxed shadow-[var(--shadow-sm)]",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
