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

    const ctx = gsap.context(() => {
      const split = SplitText.create(text, { type: "chars,words" })

      const scrollTween = gsap.to(text, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          end: "+=2000px",
          scrub: true,
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

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={wrapperRef}
      style={{ overflow: "hidden", height: "100vh", display: "flex", alignItems: "center" }}
    >
      <div className="container">
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
