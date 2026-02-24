"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(SplitText, ScrollTrigger)

interface HorizontalTextRevealProps {
  children: string
}

export function HorizontalTextReveal({ children }: HorizontalTextRevealProps) {
  const wrapperRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const text = textRef.current
    if (!wrapper || !text) return

    let ctx: gsap.Context | undefined

    const createAnimation = () => {
      ctx?.revert()

      ctx = gsap.context(() => {
        const split = SplitText.create(text, { type: "chars,words" })

        const scrollTween = gsap.to(text, {
          xPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            pin: true,
            end: "+=2000px",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })

        split.chars.forEach((char) => {
          gsap.from(char, {
            yPercent: "random(-200, 200)",
            rotation: "random(-20, 20)",
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: char,
              containerAnimation: scrollTween,
              start: "left 100%",
              end: "left 30%",
              scrub: 1,
            },
          })
        })
      }, wrapper)

      ScrollTrigger.refresh()
    }

    createAnimation()

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(createAnimation, 200)
    }

    window.addEventListener("resize", onResize)

    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener("resize", onResize)
      ctx?.revert()
    }
  }, [])

  return (
    <section
      ref={wrapperRef}
      style={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      {/* overflow:hidden을 pin되는 section이 아닌 자식에 적용 */}
      <div style={{ overflow: "hidden", width: "100%" }}>
        <h3
          ref={textRef}
          style={{
            display: "flex",
            width: "max-content",
            whiteSpace: "nowrap",
            gap: "4vw",
            paddingLeft: "100vw",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 600,
            lineHeight: 1.1,
          }}
        >
          {children}
        </h3>
      </div>
    </section>
  )
}
