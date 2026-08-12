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
    viewBooks: string;
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
    latpeed: string;
    gumroad: string;
    kmong: string;
    comingSoon: string;
    pages: string;
    includes: string;
    buyInfoTitle: string;
    buyInfoItems: string[];
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
      viewBooks: "전자책 보기",
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
        "안정적으로 돌아가고, 읽기 쉬운 시스템을 만듭니다. 만든 것과 배운 것을 여기에 기록합니다.",
      aboutSection: "소개",
      intro1:
        "CK입니다. 제품 뒤에서 돌아가는 것들을 만듭니다. 인프라, AI 시스템, 클라우드 컨트롤 플레인, 그리고 이런 것들을 쓰기 쉽게 만드는 오픈소스에 관심이 많습니다.",
      intro2:
        "이 블로그에는 긴 호흡의 글, 직접 만든 프로젝트, 요즘 공부하는 것들을 모아둡니다. 광고도 없고 구독 유도도 없습니다. 그냥 북마크해두고 가끔 들를 수 있는 페이지면 충분합니다.",
      recentPosts: "최근 글",
      featuredProjects: "주요 프로젝트",
      interests: "요즘 관심",
      focusLabel: "관심 분야",
      focus: ["인프라", "AI 시스템", "클라우드", "오픈소스"],
    },
    about: {
      title: "소개",
      lead: "인프라와 AI 시스템, 클라우드 플랫폼을 만드는 소프트웨어 엔지니어입니다. 오픈소스에도 관심이 많습니다.",
      p1: "제품 뒤에서 돌아가는 컨트롤 플레인과 AI 모델을 제공하는 과정, 운영 상태를 살피는 도구를 주로 만듭니다. 팀이 더 안심하고 배포할 수 있도록 돕는 오픈소스 도구도 개발합니다.",
      p2: "이 사이트에는 긴 호흡의 글과 직접 만든 프로젝트, 요즘 공부하는 것들을 모아둡니다. 광고나 구독 유도 없이, 필요할 때 다시 찾아볼 수 있는 곳으로 만들고 있습니다.",
      principles: "일하는 방식",
      principle1Title: "영리함보다 명확함",
      principle1Body:
        "코드는 다음에 작업할 사람이 읽을 수 있어야 합니다. 그 사람이 미래의 나일 수도 있습니다. 문제가 이미 어렵다면 단순하고 검증된 해법을 선택합니다.",
      principle2Title: "성능은 제품이다",
      principle2Body:
        "응답이 느리면 사용자의 신뢰도 떨어집니다. 처음부터 빠르게 동작하도록 만들고, 번들 크기를 줄이며, 성능이 나빠졌는지 수치로 확인합니다.",
      principle3Title: "접근성은 기본",
      principle3Body:
        "의미에 맞는 HTML, 키보드로 이용할 수 있는 화면, 충분한 색상 대비는 기본입니다. 누구나 쓸 수 있어야 작업이 끝났다고 봅니다.",
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
        "인프라·AI 실무에서 직접 구축하고 운영한 것들. 고객사 사례는 비식별화해 실었습니다.",
      featured: "추천",
      more: "더 보기",
      archived: "보관",
    },
    books: {
      title: "전자책",
      description:
        "국문 실전 가이드 3종과 영문판 2종. 인프라 현장 경험과 부동산 경매 체크리스트를 PDF로 바로 받아보실 수 있습니다.",
      buy: "구매하기",
      latpeed: "래피드에서 구매",
      gumroad: "Gumroad에서 구매",
      kmong: "크몽에서 구매",
      comingSoon: "판매 준비 중",
      pages: "페이지",
      includes: "구성",
      buyInfoTitle: "구매 안내",
      buyInfoItems: [
        "결제 즉시 이메일로 PDF 다운로드 링크가 전달됩니다 (래피드·Gumroad 자동 발송).",
        "래피드는 국내 카드·간편결제, Gumroad는 해외 결제(카드·PayPal)를 지원합니다. 편한 쪽으로 구매하시면 됩니다.",
        "개인 사용 라이선스입니다. 팀·사내 공유가 필요하시면 이메일로 문의해 주세요.",
        "디지털 상품 특성상 다운로드 후에는 환불이 어렵습니다. 결제 오류나 파일 문제는 이메일로 연락 주시면 바로 처리해 드립니다.",
        "내용이 업데이트되면 구매자는 같은 다운로드 링크에서 최신 PDF를 다시 받으실 수 있습니다.",
      ],
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
        detail: "어떻게 장애가 나는지 살피고, 요청이 몰릴 때 속도를 조절하며, 운영 상태를 쉽게 파악할 수 있는 시스템을 고민합니다.",
      },
      {
        title: "AI 인프라",
        detail: "AI 모델을 안정적으로 제공하고 평가하면서 운영 비용까지 관리하는 방법에 관심이 있습니다.",
      },
      {
        title: "클라우드 플랫폼 설계",
        detail: "여러 조직이 함께 쓰는 컨트롤 플레인과 권한 관리, 개발자가 편하게 쓸 수 있는 환경을 설계합니다.",
      },
      {
        title: "오픈소스 도구",
        detail: "작고 문서가 잘 갖춰져 있으며, 배포 과정을 간단하게 만드는 도구를 좋아합니다.",
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
      viewBooks: "Browse ebooks",
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
        "Systems I have built and operated in production across infrastructure and AI. Client work is anonymized.",
      featured: "Featured",
      more: "More projects",
      archived: "Archived",
    },
    books: {
      title: "Books",
      description:
        "Five practical PDF guides: three Korean originals and two English editions covering infrastructure and Korean real-estate auctions.",
      buy: "Buy",
      latpeed: "Buy on Latpeed",
      gumroad: "Buy on Gumroad",
      kmong: "Buy on Kmong",
      comingSoon: "Coming soon",
      pages: "pages",
      includes: "Includes",
      buyInfoTitle: "Purchase notes",
      buyInfoItems: [
        "The PDF download link is emailed immediately after checkout (delivered automatically via Latpeed or Gumroad).",
        "Latpeed handles Korean domestic cards and local wallets; Gumroad handles international cards and PayPal. Pick whichever suits you.",
        "Licensed for personal use. For team or company-wide use, please reach out by email.",
        "As with most digital goods, refunds after download are generally not possible. For payment errors or file issues, email me and I will sort it out right away.",
        "When the content is updated, buyers can re-download the latest PDF from the same link.",
      ],
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
