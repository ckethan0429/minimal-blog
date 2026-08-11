import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/components/locale-provider";
import { siteConfig } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import { localeInitScript } from "@/lib/i18n";
import { features } from "@/lib/features";
import { geistMono, nanumSquare } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  keywords: [
    siteConfig.author.name,
    "software engineer",
    "소프트웨어 엔지니어",
    ...siteConfig.author.focus,
    "open source",
    "TypeScript",
    "Next.js",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    alternateLocale: [...siteConfig.alternateLocales],
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.author.twitter,
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

const headInitScript = `${themeInitScript}${localeInitScript}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.htmlLang}
      data-theme="system"
      data-locale="en"
      suppressHydrationWarning
      className={`${nanumSquare.variable} ${geistMono.variable} h-full antialiased${features.pageTransitions ? " vt-enabled" : ""}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: headInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <ThemeProvider>
          <LocaleProvider>
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <Header />
            <div id="main-content" className="flex-1">
              {children}
            </div>
            <Footer />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
