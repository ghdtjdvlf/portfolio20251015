"use client";

import { useRef, useEffect } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";

type LottieSuccessProps = {
  /** public 기준 lottie 파일 경로 @default "/lottie/Success.lottie" */
  src?: string;
  className?: string;
  width?: string | number;
  height?: string | number;
};

export const LottieSuccess = ({
  src = "/lottie/Success.lottie",
  className = "",
  width = 400,
  height = 400,
}: LottieSuccessProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<DotLottie | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const dotLottie = new DotLottie({
      canvas: canvasRef.current,
      src,
      autoplay: false,
      loop: false,
    });

    lottieRef.current = dotLottie;

    const handleScroll = () => {
      const container = containerRef.current;
      const anim = lottieRef.current;
      if (!container || !anim || anim.totalFrames === 0) return;

      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;

      // 요소 상단이 화면 하단에 진입하는 시점 → 0%
      // 요소 하단이 화면 상단을 벗어나는 시점 → 100%
      const progress = Math.min(
        1,
        Math.max(0, (windowH - rect.top) / (windowH + rect.height))
      );

      const frame = Math.floor(progress * (anim.totalFrames - 1));
      anim.setFrame(frame);
    };

    // DotLottie 로드 완료 후 초기 프레임 세팅
    dotLottie.addEventListener("load", () => {
      handleScroll();
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      dotLottie.destroy();
      lottieRef.current = null;
    };
  }, [src]);

  const w = typeof width === "number" ? `${width}px` : width;
  const h = typeof height === "number" ? `${height}px` : height;

  return (
    <div ref={containerRef} className={className} style={{ width: w, height: h }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default LottieSuccess;
