import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";

/**
 * Nanum Square Neo (나눔스퀘어 네오) — primary UI & reading face.
 * Covers Hangul + Latin for smooth Korean/English mixed text.
 *
 * Weights mapped to static files (smaller than the full variable font):
 * - 400 Regular
 * - 700 Bold (visual Bold)
 *
 * Fallbacks prefer system Korean faces for instant paint before webfont swap.
 */
export const nanumSquare = localFont({
  src: [
    {
      path: "../fonts/nanum-square/NanumSquareNeoTTF-bRg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/nanum-square/NanumSquareNeoTTF-cBd.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/nanum-square/NanumSquareNeoTTF-dEb.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nanum-square",
  display: "swap",
  preload: true,
  fallback: [
    "Apple SD Gothic Neo",
    "Noto Sans KR",
    "Malgun Gothic",
    "Apple Gothic",
    "sans-serif",
  ],
  adjustFontFallback: false, // CJK metrics — avoid Latin metric override
});

/** Code / mono — Latin first; Hangul falls back to system mono if present. */
export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});
