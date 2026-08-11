import type { Localized } from "@/lib/i18n";

export type Book = {
  slug: string;
  title: Localized;
  description: Localized;
  highlights: Localized[];
  pages: number;
  priceKrw: number;
  cover: string;
  /** Direct-purchase link (Gumroad). Empty until the store page is live. */
  buyUrl: string;
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
        ko: "이관 계획서 템플릿 + 당일 런북 (롤백 포함)",
        en: "Migration plan template + day-of runbook with rollback",
      },
      {
        ko: "PBS 백업·복구 훈련, 클러스터·Ceph 도입 기준",
        en: "PBS backup drills, cluster and Ceph adoption criteria",
      },
      {
        ko: "사전/사후 체크리스트 3종",
        en: "Three pre/post-migration checklists",
      },
    ],
    pages: 16,
    priceKrw: 19000,
    cover: "/images/books/vmware-exit-guide.png",
    buyUrl: "https://ethanverse784.gumroad.com/l/wypifn",
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
      {
        ko: "증상별 트러블슈팅 판단표 + 개념 사전",
        en: "Symptom-based troubleshooting matrix + glossary",
      },
    ],
    pages: 13,
    priceKrw: 19000,
    cover: "/images/books/gpu-server-guide.png",
    buyUrl: "https://ethanverse784.gumroad.com/l/ioqer",
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
        ko: "2026 규제 지도 (DSR·규제지역·토허구역·전세대출)",
        en: "2026 regulation map: DSR, zones, jeonse-loan rules",
      },
      {
        ko: "주간 반복 워크플로우 + 인쇄용 체크리스트 5종",
        en: "Weekly routine + 5 printable checklists",
      },
    ],
    pages: 21,
    priceKrw: 19000,
    cover: "/images/books/auction-checklist.png",
    buyUrl: "https://ethanverse784.gumroad.com/l/gizqys",
    kmongUrl: "",
  },
];

export function formatKrw(price: number): string {
  return `₩${price.toLocaleString("ko-KR")}`;
}
