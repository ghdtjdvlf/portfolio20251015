"use client";

import { useEffect, useRef } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";

export function LottieFlyman() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotLottieRef = useRef<DotLottie | null>(null);
  const isReadyRef = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const dotLottie = new DotLottie({
      canvas: canvasRef.current,
      src: "/lottie/Businessman flies up with rocket.lottie",
      autoplay: false,
      loop: false,
    });

    dotLottieRef.current = dotLottie;

    const seek = () => {
      if (!isReadyRef.current || !canvasRef.current || !dotLottieRef.current) return;

      const totalFrames = dotLottieRef.current.totalFrames;
      if (!totalFrames) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;

      // 요소가 뷰포트 하단에서 진입(progress=0) → 상단으로 퇴장(progress=1)
      const start = viewH;                  // rect.top 기준 시작 지점
      const end = -rect.height;             // rect.top 기준 끝 지점
      const progress = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, progress));

      dotLottieRef.current.setFrame(clamped * (totalFrames - 1));
    };

    dotLottie.addEventListener("ready", () => {
      isReadyRef.current = true;
      seek();
    });

    window.addEventListener("scroll", seek, { passive: true });

    return () => {
      window.removeEventListener("scroll", seek);
      dotLottieRef.current?.destroy();
      dotLottieRef.current = null;
      isReadyRef.current = false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="w-[200px] h-[200px] md:w-[350px] md:h-[350px] pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
    />
  );
}
