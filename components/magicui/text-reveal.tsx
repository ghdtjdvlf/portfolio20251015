"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface TextRevealProps {
  text: string;
  className?: string;
}

export function TextReveal({ text, className }: TextRevealProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const textEl = textRef.current;
    if (!wrapper || !textEl) return;

    let ctx: gsap.Context | undefined;

    const createAnimation = () => {
      ctx?.revert();

      ctx = gsap.context(() => {
        const split = SplitText.create(textEl, { type: "words" });
        const wordCount = split.words.length;

        // 초기 상태: 모든 단어 dim
        gsap.set(split.words, { opacity: 0.15 });

        const revealDist = wordCount * 180;   // 단어 reveal 구간
        const extraDist  = revealDist * 0.8;  // reveal 완료 후 30% 추가 대기 구간

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            pin: true,
            start: "top top",
            end: `+=${revealDist + extraDist}`,  // reveal + 30% 여유
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // 단어마다 순차적으로 opacity 1로 (전체 타임라인의 70% 구간에서 완료)
        tl.to(split.words, {
          opacity: 1,
          ease: "none",
          stagger: {
            each: 1,
            ease: "none",
          },
          duration: 1,
        });

        // 모든 단어 reveal 완료 후 30% 구간 동안 핀 유지 (아무 동작 없음)
        tl.to({}, { duration: wordCount * 0.3 });
      }, wrapper);

      ScrollTrigger.refresh();
    };

    createAnimation();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(createAnimation, 200);
    };

    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className={cn(
        "flex items-center justify-center min-h-screen",
        className
      )}
    >
      <p
        ref={textRef}
        className="max-w-4xl px-8 text-2xl font-bold leading-relaxed text-center md:text-3xl lg:text-4xl xl:text-5xl"
      >
        {text}
      </p>
    </section>
  );
}
