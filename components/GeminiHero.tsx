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

    // 커튼이 펼쳐지는 동안 navbar 숨기기
    gsap.set("#site-nav-wrapper", { opacity: 0, pointerEvents: "none" })

    // 인트로 타임라인
    const introTl = gsap.timeline({
      onComplete: () => {
        const el = document.getElementById("gemini-intro")
        if (el) el.style.display = "none"
      },
    })

    introTl
      .to("#gemini-curtain", { height: "100vh", duration: 6 }, 0)
      // 텍스트
      .fromTo(".gemini-t1", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }, 0.2)
      .to(".gemini-t1", { opacity: 0, scale: 1.1, duration: 0.3, ease: "power2.in" }, 1.15)
      .fromTo(".gemini-t2", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }, 2.0)
      .to(".gemini-t2", { opacity: 0, scale: 1.1, duration: 0.3, ease: "power2.in" }, 2.95)
      .fromTo(".gemini-t3", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }, 4.0)
      .to(".gemini-t3", { opacity: 0, scale: 1.1, duration: 0.3, ease: "power2.in" }, 4.95)
      .to("#gemini-intro", { opacity: 0, duration: 1, ease: "power2.inOut" }, 5.5)
      .to("#site-nav-wrapper", { opacity: 1, pointerEvents: "auto", duration: 0.5, ease: "power2.out" }, 6.0)

    // 스크롤 패럴랙스 타임라인
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#gemini-scroll-wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    })

    masterTl
      .to(".gemini-feel-better", { y: -150, opacity: 0, duration: 1, ease: "none" }, 0)
      .to(".gemini-product-img", { y: 100, opacity: 0.5, duration: 1, ease: "none" }, 0)

    // 정신없이 통통 튀기 (wrapper에 적용)
    const isMobile = window.innerWidth < 768
    const bounceY = gsap.to(".gemini-product-wrapper", {
      y: isMobile ? -14 : -22,
      duration: 0.25,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    })
    const bounceScale = gsap.to(".gemini-product-wrapper", {
      scale: 1.12,
      duration: 0.3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    })


    // 이미지 1초마다 순환
    let currentIdx = 0
    const imgInterval = setInterval(() => {
      const next = (currentIdx + 1) % 6
      gsap.to(`.gemini-img-${currentIdx}`, { opacity: 0, duration: 0.15 })
      gsap.to(`.gemini-img-${next}`, { opacity: 1, duration: 0.15 })
      currentIdx = next
    }, 1000)

    return () => {
      introTl.kill()
      masterTl.scrollTrigger?.kill()
      masterTl.kill()
      bounceY.kill()
      bounceScale.kill()

      clearInterval(imgInterval)
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
          <h1 className="gemini-t1 absolute opacity-0" style={{ ...titleHuge, fontSize: "8rem" }}>개상그지똥그릉뱅이</h1>
          <h1 className="gemini-t2 absolute opacity-0" style={{ ...titleHuge, fontSize: "12rem" }}>빠큐나먹으셈ㅋㅋ</h1>
          <h1 className="gemini-t3 absolute opacity-0" style={{ ...titleHuge, fontSize: "14rem" }}>어 SUCK 현</h1>
        </div>
      </div>

      {/* 메인 히어로 섹션 */}
      <main
        id="gemini-scroll-wrapper"
        className="relative w-full"
        style={{ height: "200vh" }}
      >
        <section className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row bg-white">

          {/* 왼쪽 타이포그래피 영역 */}
          <div className="w-full md:w-[60%] h-full flex items-center justify-center relative p-8 md:p-20 z-10">
            <div className="gemini-feel-better absolute inset-0 flex flex-col items-start justify-center p-12 md:p-24">

              {/* sofi 로고 */}
              <div className="mb-8">
                <span
                  className="text-3xl font-black tracking-tighter text-black cursor-pointer hover:opacity-70 transition-opacity select-none"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  일베충
                </span>
              </div>

              <h1 className="text-black" style={titleHuge}>
                어석현<br />개자지
              </h1>

              <p
                className="mt-8 text-sm font-medium text-gray-600 max-w-sm tracking-tight leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵 <br />
                앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵  <br />
                앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵 <br />
                앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵앙기모띵
              </p>

              {/* shop 버튼 */}
              <button
                className="mt-10 bg-black text-white px-8 py-3 rounded-full text-sm font-bold tracking-tight hover:bg-gray-800 transition-colors shadow-lg hover:-translate-y-1 transform duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                shop sofi
              </button>
            </div>
          </div>

          {/* 오른쪽 제품 이미지 영역 */}
          <div className="w-full md:w-[40%] h-full absolute right-0 top-0 md:relative flex items-center justify-center pointer-events-none z-0">
            <div className="gemini-product-wrapper absolute inset-0 w-full h-full flex items-center justify-center">
              {[
                "https://i.ibb.co/84byWcWz/image.png",
                "https://i.ibb.co/dJ0wsGWh/image-removebg-preview-1.png",
                "https://i.ibb.co/MHYgL35/image-removebg-preview-2.png",
                "https://i.ibb.co/n2czmmx/image.png",
                "https://i.ibb.co/93zWJQpT/image.png",
                "https://i.ibb.co/G4WkmkQ8/image.png",          
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`product ${i}`}
                  className={`gemini-img-${i} gemini-product-img absolute w-full h-full object-cover md:object-contain object-right`}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                />
              ))}
            </div>
          </div>

        </section>
      </main>
    </>
  )
}
