"use client";

import { useEffect, useState } from "react";
import { features } from "@/lib/features";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!features.readingProgress) return;

    const onScroll = () => {
      const article = document.querySelector("article");
      if (!article) {
        const scrolled =
          window.scrollY /
          Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        setProgress(Math.min(100, Math.max(0, scrolled * 100)));
        return;
      }

      const rect = article.getBoundingClientRect();
      const total = article.offsetHeight - window.innerHeight;
      const passed = -rect.top;
      const value = total <= 0 ? 100 : (passed / total) * 100;
      setProgress(Math.min(100, Math.max(0, value)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!features.readingProgress) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <div
        className="h-full origin-left bg-foreground transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
