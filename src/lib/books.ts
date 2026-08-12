import type { Localized } from "@/lib/i18n";

export type Book = {
  slug: string;
  title: Localized;
  description: Localized;
  highlights: Localized[];
  /** Named appendices/materials included with the book, shown as a bonus stack. */
  bonuses: Localized[];
  /** One-line price anchor comparing the book to the costlier alternative. */
  anchor: Localized;
  pages: number;
  price: {
    amount: number;
    currency: "KRW" | "USD";
  };
  cover: string;
  /** Direct-purchase link (Gumroad). Empty until the store page is live. */
  buyUrl: string;
  /** Domestic-payment link (Latpeed). Empty until the product page is live. */
  latpeedUrl: string;
  /** Kmong listing link. Empty until the listing passes review. */
  kmongUrl: string;
};

export const books: Book[] = [
  {
    slug: "vmware-exit-guide",
    title: {
      ko: "VMware 탈출 실전 가이드",
      en: "The VMware Exit Playbook (Korean)",
    },
    description: {
      ko: "Broadcom 라이선스 인상에 대응하는 Proxmox 이관 A to Z. 실제 이관 경험으로 쓴, 그대로 따라 하는 절차서.",
      en: "A hands-on guide to migrating from VMware to Proxmox — written from real migration projects.",
    },
    highlights: [
      {
        ko: "VMware ↔ Proxmox 개념 대응표",
        en: "VMware-to-Proxmox concept map",
      },
      {
        ko: "파일럿 → 본 이관 → 검증까지 순서대로 따라가는 절차",
        en: "A step-by-step path: pilot, migration, verification",
      },
      {
        ko: "PBS 백업·복구 훈련, 클러스터·Ceph 도입 기준",
        en: "PBS backup drills, cluster and Ceph adoption criteria",
      },
    ],
    bonuses: [
      {
        ko: "이관 계획서 템플릿 — 회의에 그대로 들고 가는 문서",
        en: "Migration plan template — ready to bring to a meeting",
      },
      {
        ko: "마이그레이션 당일 런북 (롤백 절차 포함)",
        en: "Day-of runbook with rollback procedures",
      },
      {
        ko: "체크리스트 3종 — 사전 준비 · 사후 검증 · 완료 판정",
        en: "Three checklists: pre-flight, post-migration, definition of done",
      },
    ],
    anchor: {
      ko: "같은 범위의 이관 컨설팅은 40만 원부터 받습니다. 계획 단계를 직접 하실 수 있게 만든 가이드입니다.",
      en: "A consulting engagement for this scope starts at ₩400,000+. This guide lets you run the planning yourself.",
    },
    pages: 16,
    price: { amount: 19000, currency: "KRW" },
    cover: "/images/books/vmware-exit-guide.png",
    buyUrl: "https://ethanverse784.gumroad.com/l/wypifn",
    latpeedUrl: "https://www.latpeed.com/products/1c2z1",
    kmongUrl: "",
  },
  {
    slug: "gpu-server-guide",
    title: {
      ko: "GPU 서버 구축 실전 가이드",
      en: "The GPU Server Build Guide (Korean)",
    },
    description: {
      ko: "패스스루부터 vGPU/MIG까지. H200 8장 서버를 실제로 구축·디버깅한 기록을 범용 가이드로 정리했다.",
      en: "From PCIe passthrough to vGPU/MIG — distilled from building and debugging an 8×H200 server.",
    },
    highlights: [
      {
        ko: "패스스루 vs vGPU vs MIG 선택 기준",
        en: "Choosing between passthrough, vGPU, and MIG",
      },
      {
        ko: "대용량 BAR·MMIO 계산법 (H200 8장 실전 사례)",
        en: "Large-BAR / MMIO sizing with a real 8×H200 case study",
      },
      {
        ko: "vGPU 라이선스 CLS/DLS, 폐쇄망 대응",
        en: "vGPU licensing (CLS/DLS) including air-gapped setups",
      },
    ],
    bonuses: [
      {
        ko: "증상별 트러블슈팅 판단표 — 막혔을 때 어디를 볼지 찾는 지도",
        en: "Symptom-based troubleshooting matrix — where to look when stuck",
      },
      {
        ko: "개념 사전 — IOMMU·FLR·OVMF·MIG 등 헷갈리는 용어 정리",
        en: "Glossary of the confusing bits: IOMMU, FLR, OVMF, MIG",
      },
    ],
    anchor: {
      ko: "GPU 서버 구축 의뢰는 60만 원부터 받습니다. 시행착오로 태울 주말을 책값으로 줄이는 쪽이 쌉니다.",
      en: "A build engagement starts at ₩600,000+. The troubleshooting chapters alone can save you a weekend.",
    },
    pages: 13,
    price: { amount: 19000, currency: "KRW" },
    cover: "/images/books/gpu-server-guide.png",
    buyUrl: "https://ethanverse784.gumroad.com/l/ioqer",
    latpeedUrl: "https://www.latpeed.com/products/ePoxl",
    kmongUrl: "",
  },
  {
    slug: "auction-checklist",
    title: {
      ko: "부동산 경매 실전 체크리스트",
      en: "The Real Estate Auction Checklist (Korean)",
    },
    description: {
      ko: "난이도 사다리 4단계로 배우는 권리분석, 무잉여 함정, 2026 규제 지도까지 — 낙찰이 아니라 '거르기'의 기술.",
      en: "Rights analysis by difficulty ladder, the surplus-rule trap, and the 2026 regulation map for Korean court auctions.",
    },
    highlights: [
      {
        ko: "난이도 사다리 4단계 권리분석 (등기부 예시로 판정 연습)",
        en: "4-level difficulty ladder with registry examples",
      },
      {
        ko: "무잉여 함정 — 가짜 할인 판별법 (실제 사례)",
        en: "The surplus-rule trap: spotting fake discounts",
      },
      {
        ko: "주간 반복 워크플로우 — 100건 걸러 1건 사는 루틴",
        en: "A weekly routine built for filtering, not chasing",
      },
    ],
    bonuses: [
      {
        ko: "인쇄용 체크리스트 5종 — 임장·입찰 전 그대로 출력해서 사용",
        en: "5 printable checklists for site visits and bidding day",
      },
      {
        ko: "2026 규제 지도 — DSR·규제지역·토허구역·전세대출 최신 기준",
        en: "2026 regulation map: DSR, zones, land-permit areas, jeonse loans",
      },
      {
        ko: "경매 용어 사전 — 말소기준권리부터 인도명령까지",
        en: "Auction glossary, from baseline rights to eviction orders",
      },
    ],
    anchor: {
      ko: "권리분석 실수 하나가 보증금 수백만 원을 지웁니다. 입찰 전에 '거르는 기준'부터 갖추는 값입니다.",
      en: "One rights-analysis mistake can erase millions of won. This is the cost of a filter you use before bidding.",
    },
    pages: 21,
    price: { amount: 19000, currency: "KRW" },
    cover: "/images/books/auction-checklist.png",
    buyUrl: "https://ethanverse784.gumroad.com/l/gizqys",
    latpeedUrl: "https://www.latpeed.com/products/COj1t",
    kmongUrl: "",
  },
  {
    slug: "vmware-exit-playbook",
    title: {
      ko: "The VMware Exit Playbook — 영문판",
      en: "The VMware Exit Playbook (English)",
    },
    description: {
      ko: "『VMware 탈출 실전 가이드』의 영문판. ESXi에서 Proxmox로 옮기는 전 과정을 계획서·런북·체크리스트와 함께 담았다.",
      en: "ESXi to Proxmox migration, end to end — plan template, day-of runbook with rollback, and checklists included.",
    },
    highlights: [
      {
        ko: "VMware ↔ Proxmox 개념 대응표",
        en: "VMware-to-Proxmox concept map",
      },
      {
        ko: "파일럿 → 본 이관 → 검증까지 순서대로 따라가는 절차",
        en: "A step-by-step path: pilot, migration, verification",
      },
      {
        ko: "PBS 백업·복구 훈련, 클러스터·Ceph 도입 기준",
        en: "PBS backup drills, cluster and Ceph adoption criteria",
      },
    ],
    bonuses: [
      {
        ko: "이관 계획서 템플릿",
        en: "Migration plan template — ready to bring to a meeting",
      },
      {
        ko: "마이그레이션 당일 런북 (롤백 절차 포함)",
        en: "Day-of runbook with rollback procedures",
      },
      {
        ko: "체크리스트 3종 — 사전 준비 · 사후 검증 · 완료 판정",
        en: "Three checklists: pre-flight, post-migration, definition of done",
      },
    ],
    anchor: {
      ko: "같은 범위의 이관 컨설팅은 수백 달러부터 시작합니다.",
      en: "Consulting for this scope starts in the hundreds of dollars. The playbook lets you run the planning yourself.",
    },
    pages: 16,
    price: { amount: 14, currency: "USD" },
    cover: "/images/books/vmware-exit-guide-en.png",
    buyUrl: "https://ethanverse784.gumroad.com/l/vmware-exit-playbook",
    latpeedUrl: "",
    kmongUrl: "",
  },
  {
    slug: "gpu-server-build-guide",
    title: {
      ko: "The GPU Server Build Guide — 영문판",
      en: "The GPU Server Build Guide (English)",
    },
    description: {
      ko: "『GPU 서버 구축 실전 가이드』의 영문판. 하드웨어 검수부터 패스스루, vGPU/MIG, 라이선스까지.",
      en: "From hardware inspection to PCIe passthrough, vGPU/MIG, and licensing — with a real 8×H200 troubleshooting case.",
    },
    highlights: [
      {
        ko: "패스스루 vs vGPU vs MIG 선택 기준",
        en: "Choosing between passthrough, vGPU, and MIG",
      },
      {
        ko: "대용량 BAR·MMIO 계산법 (H200 8장 실전 사례)",
        en: "Large-BAR / MMIO sizing with a real 8×H200 case study",
      },
      {
        ko: "vGPU 라이선스 CLS/DLS, 폐쇄망 대응",
        en: "vGPU licensing (CLS/DLS) including air-gapped setups",
      },
    ],
    bonuses: [
      {
        ko: "증상별 트러블슈팅 판단표",
        en: "Symptom-based troubleshooting matrix — where to look when stuck",
      },
      {
        ko: "개념 사전",
        en: "Glossary of the confusing bits: IOMMU, FLR, OVMF, MIG",
      },
    ],
    anchor: {
      ko: "GPU 서버 구축 의뢰는 수백 달러부터 시작합니다.",
      en: "A build engagement starts in the hundreds of dollars. The troubleshooting chapters alone can save you a weekend.",
    },
    pages: 14,
    price: { amount: 14, currency: "USD" },
    cover: "/images/books/gpu-server-guide-en.png",
    buyUrl: "https://ethanverse784.gumroad.com/l/gpu-server-build-guide",
    latpeedUrl: "",
    kmongUrl: "",
  },
];

export function formatBookPrice(price: Book["price"]): string {
  return new Intl.NumberFormat(price.currency === "KRW" ? "ko-KR" : "en-US", {
    style: "currency",
    currency: price.currency,
    maximumFractionDigits: 0,
  }).format(price.amount);
}
