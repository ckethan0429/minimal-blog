"use client";

import { footerLinkDefs, siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { useLocale } from "@/components/locale-provider";

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLocale();

  return (
    <footer className="mt-auto border-t border-border/60">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {year} {siteConfig.author.name}
        </p>

        <nav aria-label={t.footer.social}>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerLinkDefs.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {t.footer[item.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
