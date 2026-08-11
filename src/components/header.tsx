"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerLinkDefs, siteConfig } from "@/lib/site";
import { navItems } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "@/components/locale-toggle";
import { useLocale } from "@/components/locale-provider";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const navLabels = {
    home: t.nav.home,
    blog: t.nav.blog,
    projects: t.nav.projects,
    books: t.nav.books,
    about: t.nav.about,
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Container className="flex h-[var(--header-height)] items-center justify-between sm:h-[var(--header-height-sm)]">
        <Link
          href="/"
          className="relative z-50 text-sm font-medium tracking-tight text-foreground transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={close}
        >
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <nav aria-label={t.nav.primary} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-[var(--radius-md)] px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {navLabels[item.key]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <LocaleToggle className="relative z-50" />
          <ThemeToggle className="relative z-50 hidden md:inline-flex" />

          <button
            ref={buttonRef}
            type="button"
            className="relative z-50 -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-foreground md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">
              {open ? t.nav.closeMenu : t.nav.openMenu}
            </span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span
                className={cn(
                  "block h-px w-full origin-center bg-foreground transition-transform duration-200",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-full origin-center bg-foreground transition-transform duration-200",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      <div
        id={menuId}
        ref={panelRef}
        className={cn(
          "fixed inset-0 z-40 bg-background md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        hidden={!open}
        aria-hidden={!open}
      >
        <nav
          aria-label={t.nav.mobile}
          className="flex h-full flex-col px-[var(--container-pad)] pt-24 pb-10"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-[var(--radius-lg)] px-2 py-3 text-2xl font-medium tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    onClick={close}
                  >
                    {navLabels[item.key]}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto space-y-6 border-t border-border pt-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                {t.common.theme}
              </span>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                {t.common.language}
              </span>
              <LocaleToggle />
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              {footerLinkDefs.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    onClick={close}
                  >
                    {t.footer[item.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
