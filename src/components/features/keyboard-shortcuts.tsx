"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { features } from "@/lib/features";
import { cn } from "@/lib/utils";

type KeyboardShortcutsProps = {
  /** Optional prev/next post URLs for j/k on article pages */
  previousHref?: string | null;
  nextHref?: string | null;
};

/**
 * Optional shortcuts:
 *  /  → focus blog search (or go to /blog)
 *  ?  → toggle help
 *  j  → next post (article)
 *  k  → previous post (article)
 *  Esc → close help / blur
 */
export function KeyboardShortcuts({
  previousHref,
  nextHref,
}: KeyboardShortcutsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!features.keyboardShortcuts) return;

    const isTypingTarget = (el: EventTarget | null) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el.isContentEditable
      );
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (isTypingTarget(e.target)) return;

      if (e.key === "?") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }

      if (e.key === "/") {
        e.preventDefault();
        const search = document.getElementById(
          "blog-search",
        ) as HTMLInputElement | null;
        if (search) {
          search.focus();
          search.select();
        } else {
          router.push("/blog");
        }
        return;
      }

      if (e.key === "j" && nextHref) {
        e.preventDefault();
        router.push(nextHref);
        return;
      }

      if (e.key === "k" && previousHref) {
        e.preventDefault();
        router.push(previousHref);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [nextHref, previousHref, router]);

  if (!features.keyboardShortcuts) return null;

  return (
    <>
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-title"
          className="fixed inset-0 z-[70] flex items-end justify-center bg-background/70 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-[var(--radius-xl)] border border-border bg-card p-6 shadow-[var(--shadow-lg)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="shortcuts-title"
              className="text-base font-medium text-foreground"
            >
              Keyboard shortcuts
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <Shortcut keys="/" label="Search posts" />
              <Shortcut keys="?" label="Toggle this help" />
              <Shortcut keys="j" label="Next post (on article)" />
              <Shortcut keys="k" label="Previous post (on article)" />
              <Shortcut keys="Esc" label="Close" />
            </ul>
            <button
              type="button"
              className="mt-6 text-sm text-foreground underline decoration-border underline-offset-4"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Shortcut({ keys, label }: { keys: string; label: string }) {
  return (
    <li className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <kbd
        className={cn(
          "rounded-[var(--radius-md)] border border-border bg-muted px-2 py-0.5 font-mono text-xs text-foreground",
        )}
      >
        {keys}
      </kbd>
    </li>
  );
}
