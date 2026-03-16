"use client";

import dynamic from "next/dynamic";

// 모달 컴포넌트 — SSR 불필요, ssr:false로 서버 렌더 제외
export const EvervaultCardDemo = dynamic(
  () => import("@/components/magicui/CardReveal"),
  { ssr: false }
);

export const ThreeHourToFiveMinContent = dynamic(
  () => import("@/components/3hour-to-5min-content").then((m) => ({ default: m.ThreeHourToFiveMinContent })),
  { ssr: false }
);

export const Fullstack = dynamic(
  () => import("@/components/Fullstack").then((m) => ({ default: m.Fullstack })),
  { ssr: false }
);

export const Three = dynamic(
  async () => {
    const mod = await import("@/components/30000");
    return { default: mod.Three };
  },
  { ssr: false }
);

// 브라우저 전용 API (Matter.js, Lottie) — ssr:false + loading:null
export const FallingText = dynamic(
  () => import("@/components/ui/falling-text"),
  { ssr: false }
);

export const LottieScrollSection = dynamic(
  () => import("@/components/LottieScrollSection").then((m) => ({ default: m.LottieScrollSection })),
  { ssr: false }
);
