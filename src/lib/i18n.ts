export const LOCALE_STORAGE_KEY = "locale";

export const locales = ["ko", "en"] as const;
export type Locale = (typeof locales)[number];

/**
 * SSR / no-JS fallback. First real visit is decided in the browser
 * (language + timezone) — see detectBrowserLocale / localeInitScript.
 */
export const defaultLocale: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return value === "ko" || value === "en";
}

export function toggleLocale(current: Locale): Locale {
  return current === "ko" ? "en" : "ko";
}

/**
 * First-visit locale (no saved preference yet):
 * 1. Any preferred browser language starts with "ko" → Korean
 * 2. Timezone Asia/Seoul (common for visitors in Korea) → Korean
 * 3. Otherwise → English
 */
export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return defaultLocale;

  const langs = [
    ...(navigator.languages ?? []),
    navigator.language,
  ]
    .filter(Boolean)
    .map((l) => l.toLowerCase());

  if (langs.some((l) => l === "ko" || l.startsWith("ko-"))) {
    return "ko";
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === "Asia/Seoul") return "ko";
  } catch {
    /* ignore */
  }

  return "en";
}

/**
 * FOUC-safe: set html lang + data-locale before paint.
 * Order: saved preference → browser language / Seoul TZ → English.
 */
export const localeInitScript = `(function(){try{var k=${JSON.stringify(LOCALE_STORAGE_KEY)};var t=localStorage.getItem(k);if(t!=="ko"&&t!=="en"){var langs=[].concat(navigator.languages||[],navigator.language||[]).filter(Boolean).map(function(l){return String(l).toLowerCase();});var ko=langs.some(function(l){return l==="ko"||l.indexOf("ko-")===0;});if(ko){t="ko";}else{try{t=Intl.DateTimeFormat().resolvedOptions().timeZone==="Asia/Seoul"?"ko":"en";}catch(e2){t="en";}}}document.documentElement.setAttribute("lang",t);document.documentElement.setAttribute("data-locale",t);}catch(e){document.documentElement.setAttribute("lang","en");document.documentElement.setAttribute("data-locale","en");}})();`;

/** Bilingual string or plain string (single-language content). */
export type Localized<T = string> = T | { en: string; ko: string };

export function pickLocale<T extends string>(
  value: Localized<T> | undefined,
  locale: Locale,
  fallback = "",
): string {
  if (value == null) return fallback;
  if (typeof value === "string") return value;
  return value[locale] || value.en || value.ko || fallback;
}

type Messages = {
  nav: {
    home: string;
    blog: string;
    projects: string;
    books: string;
    about: string;
    primary: string;
    mobile: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    social: string;
    github: string;
    linkedin: string;
    rss: string;
    email: string;
  };
  common: {
    theme: string;
    language: string;
    skipToContent: string;
    viewAll: string;
    readBlog: string;
    viewProjects: string;
    backHome: string;
    loading: string;
    draft: string;
    featured: string;
    shipped: string;
    active: string;
    archived: string;
    github: string;
    website: string;
    email: string;
    profile: string;
    noPosts: string;
    noPostsFilter: string;
    noProjects: string;
    searchPosts: string;
    allTags: string;
    previous: string;
    next: string;
    related: string;
    onThisPage: string;
    comments: string;
    newsletterTitle: string;
    newsletterBody: string;
    rssFeed: string;
    viewsPlaceholder: string;
    skipContent: string;
  };
  home: {
    role: string;
    heroTitle: string;
    heroLead: string;
    aboutSection: string;
    intro1: string;
    intro2: string;
    recentPosts: string;
    featuredProjects: string;
    interests: string;
    focusLabel: string;
    focus: string[];
  };
  about: {
    title: string;
    lead: string;
    p1: string;
    p2: string;
    principles: string;
    principle1Title: string;
    principle1Body: string;
    principle2Title: string;
    principle2Body: string;
    principle3Title: string;
    principle3Body: string;
    connect: string;
  };
  blog: {
    title: string;
    description: string;
  };
  affiliate: {
    disclosure: string;
  };
  projects: {
    title: string;
    description: string;
    featured: string;
    more: string;
    archived: string;
  };
  books: {
    title: string;
    description: string;
    buy: string;
    kmong: string;
    comingSoon: string;
    pages: string;
    includes: string;
  };
  notFound: {
    code: string;
    title: string;
    body: string;
    home: string;
    blog: string;
  };
  interests: Array<{ title: string; detail: string }>;
};

export const messages: Record<Locale, Messages> = {
  ko: {
    nav: {
      home: "홈",
      blog: "블로그",
      projects: "프로젝트",
      books: "전자책",
      about: "소개",
      primary: "주요 메뉴",
      mobile: "모바일 메뉴",
      openMenu: "메뉴 열기",
      closeMenu: "메뉴 닫기",
    },
    footer: {
      social: "소셜 및 연락",
      github: "GitHub",
      linkedin: "LinkedIn",
      rss: "RSS",
      email: "이메일",
    },
    common: {
      theme: "테마",
      language: "언어",
      skipToContent: "본문으로 건너뛰기",
      viewAll: "전체 보기",
      readBlog: "글 읽기",
      viewProjects: "프로젝트",
      backHome: "홈으로",
      loading: "불러오는 중…",
      draft: "초안",
      featured: "추천",
      shipped: "출시",
      active: "진행 중",
      archived: "보관",
      github: "GitHub",
      website: "웹사이트",
      email: "이메일",
      profile: "프로필",
      noPosts: "아직 글이 없습니다.",
      noPostsFilter: "조건에 맞는 글이 없습니다.",
      noProjects: "등록된 프로젝트가 없습니다.",
      searchPosts: "글 검색…",
      allTags: "전체",
      previous: "이전",
      next: "다음",
      related: "관련 글",
      onThisPage: "이 페이지",
      comments: "댓글",
      newsletterTitle: "소식 받기",
      newsletterBody:
        "뉴스레터는 아직 연결되지 않았습니다. RSS를 구독하거나 이메일로 연락해 주세요.",
      rssFeed: "RSS 피드",
      viewsPlaceholder: "— 조회",
      skipContent: "본문으로",
    },
    home: {
      role: "소프트웨어 엔지니어",
      heroTitle: "인프라, AI 시스템, 클라우드 플랫폼.",
      heroLead:
        "부하에도 안정적이고, 변경에도 읽히는 시스템을 만듭니다. 오픈소스와 기록은 여기에 남깁니다.",
      aboutSection: "소개",
      intro1:
        "CK입니다. 제품 아래의 플랫폼—인프라, AI 시스템, 클라우드 컨트롤 플레인, 그리고 그걸 쓰기 쉽게 만드는 오픈소스—에 집중합니다.",
      intro2:
        "긴 글, 선택한 프로젝트, 지금 배우는 것을 모읍니다. CMS 없음. 퍼널 없음. 북마크할 수 있는 페이지만.",
      recentPosts: "최근 글",
      featuredProjects: "주요 프로젝트",
      interests: "요즘 관심",
      focusLabel: "관심 분야",
      focus: ["인프라", "AI 시스템", "클라우드", "오픈소스"],
    },
    about: {
      title: "소개",
      lead: "인프라, AI 시스템, 클라우드 플랫폼, 오픈소스에 집중하는 소프트웨어 엔지니어입니다.",
      p1: "대부분의 작업은 제품 표면 아래에 있습니다. 컨트롤 플레인, 서빙 경로, 관측성, 팀이 자신 있게 배포하도록 돕는 오픈소스 도구.",
      p2: "이 사이트는 긴 글, 선택한 프로젝트, 지금 배우는 것의 집입니다. 뉴스레터 퍼널 없음. 성장 해킹 없음. 북마크할 수 있는 페이지만.",
      principles: "일하는 방식",
      principle1Title: "영리함보다 명확함",
      principle1Body:
        "코드는 다음 사람—미래의 나 포함—이 읽을 수 있어야 합니다. 문제가 이미 어려울 때는 지루한 해법을 선호합니다.",
      principle2Title: "성능은 제품이다",
      principle2Body:
        "사용자는 지연을 신뢰로 느낍니다. 빠른 기본값, 작은 번들, 측정된 회귀 대응이 뒤늦은 최적화 쇼보다 낫습니다.",
      principle3Title: "접근성은 기본",
      principle3Body:
        "시맨틱 HTML, 키보드 경로, 대비는 추가 옵션이 아닙니다. 일부 사람에게만 되면 아직 끝나지 않은 것입니다.",
      connect: "연락",
    },
    blog: {
      title: "블로그",
      description:
        "인프라, 시스템, 시간이 쌓이는 디테일에 대한 에세이와 노트.",
    },
    affiliate: {
      disclosure:
        "이 게시물은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.",
    },
    projects: {
      title: "프로젝트",
      description:
        "인프라·AI·클라우드를 가로지르는 도구와 플랫폼. 오픈소스를 우선합니다.",
      featured: "추천",
      more: "더 보기",
      archived: "보관",
    },
    books: {
      title: "전자책",
      description:
        "국문 실전 가이드 3종과 영문판 2종. 인프라 현장 경험과 부동산 경매 체크리스트를 PDF로 바로 받아보실 수 있습니다.",
      buy: "구매하기",
      kmong: "크몽에서 구매",
      comingSoon: "판매 준비 중",
      pages: "페이지",
      includes: "구성",
    },
    notFound: {
      code: "404",
      title: "페이지를 찾을 수 없습니다",
      body: "링크가 잘못되었거나 페이지가 옮겨졌을 수 있습니다. 블로그를 보거나 홈으로 돌아가 보세요.",
      home: "홈으로",
      blog: "블로그 보기",
    },
    interests: [
      {
        title: "신뢰할 수 있는 분산 시스템",
        detail: "장애 모드, 백프레셔, 부하 속에서도 읽히는 운영 관측성.",
      },
      {
        title: "AI 인프라",
        detail: "서빙 경로, 평가 하네스, 비용을 의식한 모델 파이프라인.",
      },
      {
        title: "클라우드 플랫폼 설계",
        detail: "멀티테넌트 컨트롤 플레인, IAM 경계, 개발자 경험.",
      },
      {
        title: "오픈소스 도구",
        detail: "작게 유지하고 문서화해, 배포 마찰을 줄이는 라이브러리.",
      },
    ],
  },
  en: {
    nav: {
      home: "Home",
      blog: "Blog",
      projects: "Projects",
      books: "Books",
      about: "About",
      primary: "Primary",
      mobile: "Mobile primary",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    footer: {
      social: "Social and contact",
      github: "GitHub",
      linkedin: "LinkedIn",
      rss: "RSS",
      email: "Email",
    },
    common: {
      theme: "Theme",
      language: "Language",
      skipToContent: "Skip to content",
      viewAll: "View all",
      readBlog: "Read the blog",
      viewProjects: "View projects",
      backHome: "Back home",
      loading: "Loading…",
      draft: "Draft",
      featured: "Featured",
      shipped: "Shipped",
      active: "Active",
      archived: "Archived",
      github: "GitHub",
      website: "Website",
      email: "Email",
      profile: "Profile",
      noPosts: "No posts yet.",
      noPostsFilter: "No posts match your filters.",
      noProjects: "No projects listed yet.",
      searchPosts: "Search posts…",
      allTags: "All",
      previous: "Previous",
      next: "Next",
      related: "Related posts",
      onThisPage: "On this page",
      comments: "Comments",
      newsletterTitle: "Stay in the loop",
      newsletterBody:
        "Newsletter signup is not connected yet. Prefer the RSS feed, or email me.",
      rssFeed: "RSS feed",
      viewsPlaceholder: "— views",
      skipContent: "Skip to content",
    },
    home: {
      role: "Software Engineer",
      heroTitle: "Infrastructure, AI systems, and cloud platforms.",
      heroLead:
        "Open-source tools and notes on systems that stay reliable under load — and clear under change.",
      aboutSection: "About",
      intro1:
        "I'm CK. I focus on the platforms underneath products: infrastructure, AI systems, cloud control planes, and the open-source work that makes them usable.",
      intro2:
        "This site collects longer writing, selected projects, and what I'm currently learning. No CMS. No funnel. Just pages you can bookmark.",
      recentPosts: "Recent posts",
      featuredProjects: "Featured projects",
      interests: "Current interests",
      focusLabel: "Focus areas",
      focus: ["Infrastructure", "AI systems", "Cloud platforms", "Open source"],
    },
    about: {
      title: "About",
      lead: "Software engineer focused on infrastructure, AI systems, cloud platforms, and open source.",
      p1: "Most of my work sits under the product surface: control planes, serving paths, observability, and open-source tools teams use to ship with confidence.",
      p2: "This site is a home for longer-form writing, selected projects, and what I'm currently learning. No newsletter funnels. No growth hacks. Just pages you can bookmark.",
      principles: "How I work",
      principle1Title: "Clarity over cleverness",
      principle1Body:
        "Code should be readable by the next person — including future me. Prefer boring solutions when the problem is already hard.",
      principle2Title: "Performance is product",
      principle2Body:
        "Users feel latency as trust. Fast defaults, small bundles, and measured regressions beat late-stage optimization theater.",
      principle3Title: "Access by default",
      principle3Body:
        "Semantic HTML, keyboard paths, and contrast are not extras. If it only works for some people, it is not finished.",
      connect: "Connect",
    },
    blog: {
      title: "Blog",
      description:
        "Essays and notes on building software — infrastructure, systems, and the details that compound over time.",
    },
    affiliate: {
      disclosure:
        "This post is part of the Coupang Partners program; the author receives a commission from qualifying purchases.",
    },
    projects: {
      title: "Projects",
      description:
        "Tools and platforms across infrastructure, AI systems, and the cloud — with open source first.",
      featured: "Featured",
      more: "More projects",
      archived: "Archived",
    },
    books: {
      title: "Books",
      description:
        "Five practical PDF guides: three Korean originals and two English editions covering infrastructure and Korean real-estate auctions.",
      buy: "Buy",
      kmong: "Buy on Kmong",
      comingSoon: "Coming soon",
      pages: "pages",
      includes: "Includes",
    },
    notFound: {
      code: "404",
      title: "This page doesn't exist",
      body: "The link may be broken, or the page may have been moved. Try the blog or head back home.",
      home: "Back home",
      blog: "Browse the blog",
    },
    interests: [
      {
        title: "Reliable distributed systems",
        detail:
          "Failure modes, backpressure, and operational clarity under load.",
      },
      {
        title: "Applied AI infrastructure",
        detail:
          "Serving, evaluation harnesses, and cost-aware model pipelines.",
      },
      {
        title: "Cloud platform design",
        detail:
          "Multi-tenant control planes, IAM boundaries, and developer experience.",
      },
      {
        title: "Open-source tools",
        detail:
          "Small, well-documented libraries that remove friction from shipping.",
      },
    ],
  },
};

export const navItems = [
  { href: "/", key: "home" as const },
  { href: "/blog", key: "blog" as const },
  { href: "/projects", key: "projects" as const },
  { href: "/books", key: "books" as const },
  { href: "/about", key: "about" as const },
];
