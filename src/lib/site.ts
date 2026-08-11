export const siteConfig = {
  name: "CK",
  title: "CK — Infrastructure Engineer",
  description:
    "Software engineer working on infrastructure, AI systems, cloud platforms, and open source. 인프라·AI·클라우드·오픈소스를 다루는 소프트웨어 엔지니어.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  /** Default OG locale */
  locale: "ko_KR",
  alternateLocales: ["en_US"] as const,
  /** Initial html lang before client locale hydrates (detection runs in head script) */
  htmlLang: "en",
  author: {
    name: "CK",
    email: "ckethan0429@gmail.com",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
    twitter: "",
    github: "https://github.com/ckethan0429",
    linkedin: "",
    role: "Infrastructure Engineer",
    focus: [
      "Infrastructure",
      "AI systems",
      "Cloud platforms",
      "Open source",
    ] as const,
  },
} as const;

/** Footer link targets (labels come from i18n). */
export const footerLinkDefs = [
  { href: "/feed.xml", key: "rss" as const, external: false as const },
  {
    href: `mailto:${siteConfig.author.email}`,
    key: "email" as const,
    external: false as const,
  },
] as const;

export type SiteConfig = typeof siteConfig;

/** @deprecated Use footerLinkDefs + i18n labels */
export const footerLinks = footerLinkDefs.map((item) => ({
  href: item.href,
  label: item.key === "rss" ? "RSS" : "Email",
  external: item.external,
}));
