import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          color: "#ededed",
          padding: "72px 80px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: "#a3a3a3",
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            인프라 · AI · 클라우드
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#a3a3a3",
              maxWidth: 860,
              lineHeight: 1.4,
            }}
          >
            오픈소스와 시스템 엔지니어링 노트
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
