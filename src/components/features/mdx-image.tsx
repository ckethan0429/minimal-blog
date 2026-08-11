"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { features } from "@/lib/features";
import { cn } from "@/lib/utils";

type MdxImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

export function MdxImage({
  src,
  alt = "",
  width = 1200,
  height = 630,
  className,
}: MdxImageProps) {
  const [open, setOpen] = useState(false);
  const zoomEnabled = features.imageZoom;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const frame = (
    <span className="my-8 block overflow-hidden rounded-[var(--radius-xl)] border border-border shadow-[var(--shadow-sm)]">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "h-auto w-full",
          zoomEnabled && "cursor-zoom-in",
          className,
        )}
        sizes="(max-width: 672px) 100vw, 672px"
        loading="lazy"
      />
    </span>
  );

  if (!zoomEnabled) return frame;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full rounded-[var(--radius-xl)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={alt ? `Expand image: ${alt}` : "Expand image"}
      >
        {frame}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            className="absolute top-4 right-4 rounded-[var(--radius-md)] border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
            onClick={close}
          >
            Close
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-full cursor-zoom-out rounded-[var(--radius-lg)] object-contain shadow-[var(--shadow-lg)]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
