"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const titleHuge: React.CSSProperties = {
  fontSize: "clamp(6rem, 15vw, 18rem)",
  fontWeight: 900,
  lineHeight: 0.85,
  letterSpacing: "-0.06em",
  fontFamily: "'Inter', sans-serif",
}

export function GeminiHero() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // 커튼 동안 navbar 숨기기
    gsap.set("#site-nav-wrapper", { opacity: 0, pointerEvents: "none" })

    // 인트로 타임라인
    const introTl = gsap.timeline({
      onComplete: () => {
        const el = document.getElementById("gemini-intro")
        if (el) el.style.display = "none"
      },
    })

    introTl
      .to("#gemini-curtain", { height: "100vh", duration: 5, ease: "power2.inOut" }, 0)
      .fromTo(".gemini-t1", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 0.2)
      .to(".gemini-t1", { opacity: 0, scale: 1.1, duration: 0.3, ease: "power2.in" }, 1.05)
      .fromTo(".gemini-t2", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 1.8)
      .to(".gemini-t2", { opacity: 0, scale: 1.1, duration: 0.3, ease: "power2.in" }, 2.65)
      .to("#gemini-intro", { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 4.2)
      .to("#site-nav-wrapper", { opacity: 1, pointerEvents: "auto", duration: 0.5, ease: "power2.out" }, 4.8)

    return () => {
      introTl.kill()
    }
  }, [])

  return (
    <>
      {/* 인트로 애니메이션 오버레이 */}
      <div
        id="gemini-intro"
        className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black"
        style={{ zIndex: 200 }}
      >
        {/* 가운데서 벌어지는 흰 커튼 */}
        <div
          id="gemini-curtain"
          className="absolute left-0 w-full bg-white top-1/2 -translate-y-1/2"
          style={{ height: "50vh", zIndex: 10 }}
        />

        {/* 순차 텍스트 */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none text-white"
          style={{ zIndex: 20, mixBlendMode: "difference" }}
        >
          <h1 className="gemini-t1 absolute opacity-0" style={{ ...titleHuge, fontSize: "7rem" }}>Web Publisher & Front End</h1>
          <h1 className="gemini-t2 absolute opacity-0" style={{ ...titleHuge, fontSize: "8rem" }}>홍성필 포트폴리오</h1>
        </div>
      </div>

    </>
  )
}
