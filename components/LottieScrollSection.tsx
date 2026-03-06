"use client";

import { useRef, useEffect } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// 모바일 주소창 리사이즈로 인한 ScrollTrigger 오작동 방지
ScrollTrigger.config({ ignoreMobileResize: true });

export function LottieScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;

    // CSS clamp() 적용 후 실제 렌더링 크기를 canvas attribute에 반영
    // DotLottie는 canvas.width / canvas.height 기준으로 렌더링
    const syncCanvasSize = () => {
      if (!canvasRef.current) return;
      const { width, height } = canvasRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = Math.round(width * dpr);
      canvasRef.current.height = Math.round(height * dpr);
    };

    syncCanvasSize();

    const dotLottie = new DotLottie({
      canvas: canvasRef.current,
      src: "/lottie/Success.lottie",
      autoplay: false,
      loop: false,
    });

    let ctx: gsap.Context | undefined;

    const initScrollTrigger = () => {
      ctx?.revert();

      const totalFrames = dotLottie.totalFrames;
      if (totalFrames === 0) return;

      const obj = { frame: 0 };

      const FRAME_SCROLL = totalFrames * 15;
      const FADE_SCROLL  = 300;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            start: "top top",
            end: `+=${FRAME_SCROLL + FADE_SCROLL}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1: Lottie 프레임 재생
        tl.to(obj, {
          frame: totalFrames - 1,
          ease: "none",
          duration: FRAME_SCROLL,
          onUpdate: () => {
            dotLottie.setFrame(Math.floor(obj.frame));
          },
        });

        // Phase 2: 재생 완료 후 canvas fade-out
        tl.to(canvasWrapperRef.current, {
          opacity: 0,
          ease: "none",
          duration: FADE_SCROLL,
        });
      }, sectionRef.current);

      ScrollTrigger.refresh();
    };

    dotLottie.addEventListener("load", () => {
      initScrollTrigger();
    });

    const handleResize = () => {
      syncCanvasSize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ctx?.revert();
      dotLottie.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      <div className="absolute inset-x-0 top-[20%] flex justify-center">
        <p className="w-[80vw] text-center text-2xl lg:text-4xl font-bold text-slate-800 dark:text-white">
          확실한 긍정적 변화를 약속하는 인재, 홍성필입니다.
        </p>
      </div>

      {/* 반응형: 모바일 16rem ~ 데스크톱 50rem */}
      <div
        ref={canvasWrapperRef}
        className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "clamp(14rem, 70vw, 50rem)",
            height: "clamp(14rem, 70vw, 50rem)",
            display: "block",
          }}
        />
      </div>
    </section>
  );
}
