"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const SHOWN_KEY = "geminiHeroShown"

const titleHuge: React.CSSProperties = {
  fontSize: "clamp(6rem, 15vw, 18rem)",
  fontWeight: 900,
  lineHeight: 0.85,
  letterSpacing: "-0.06em",
  fontFamily: "'Inter', sans-serif",
}

export function GeminiHero() {
  useEffect(() => {
    // 이미 재생된 경우 즉시 숨기고 종료
    if (sessionStorage.getItem(SHOWN_KEY)) {
      const el = document.getElementById("gemini-intro")
      if (el) el.style.display = "none"
      gsap.set("#site-nav-wrapper", { opacity: 1, pointerEvents: "auto" })
      return
    }

    sessionStorage.setItem(SHOWN_KEY, "1")

    gsap.registerPlugin(ScrollTrigger)

    // 스크롤 차단
    document.body.style.overflow = "hidden"

    // 커튼 동안 navbar 숨기기
    gsap.set("#site-nav-wrapper", { opacity: 0, pointerEvents: "none" })

    // 인트로 타임라인
    const introTl = gsap.timeline({
      onComplete: () => {
        const el = document.getElementById("gemini-intro")
        if (el) el.style.display = "none"
        // 스크롤 복원
        document.body.style.overflow = ""
      },
    })

    introTl
      .to("#gemini-curtain", { height: "100vh", duration: 5, ease: "power2.inOut" }, 0)
      .fromTo(".gemini-t1", { opacity: 0, scale: 0.7, y: 260 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power2.out" }, 0.2)
      .to(".gemini-t1", { opacity: 0, duration: 0.4, ease: "power2.in" }, 1.35)
      .fromTo(".gemini-t2", { opacity: 0 }, { opacity: 1, duration: 1.1, ease: "power2.out" }, 2.1)
      .to(".gemini-t2", { opacity: 0, duration: 0.2, ease: "power2.in" }, 3.25)
      .to("#gemini-intro", { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 4.2)
      .to("#site-nav-wrapper", { opacity: 1, pointerEvents: "auto", duration: 0.5, ease: "power2.out" }, 4.8)

    return () => {
      introTl.kill()
      // 컴포넌트 언마운트 시 스크롤 복원
      document.body.style.overflow = ""
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
          <h1 className="gemini-t1 absolute opacity-0 text-[2.2rem] md:text-[4.5rem] lg:text-[7rem]" style={{ ...titleHuge, fontSize: undefined }}>Web Publisher & Front End</h1>
          <h1 className="gemini-t2 absolute opacity-0 text-[2.8rem] md:text-[5.5rem] lg:text-[8rem]" style={{ ...titleHuge, fontSize: undefined }}>홍성필 포트폴리오</h1>
        </div>
      </div>

    </>
  )
}
