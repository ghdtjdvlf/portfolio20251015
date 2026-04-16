"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./gsap-list-slide.css"

gsap.registerPlugin(ScrollTrigger)

interface GsapListSlideProps {
  items?: string[]
  images?: string[]
}

const defaultItems = ["Animate", "Anything", "With", "GSAP"]
const defaultImages = [
  "https://assets.codepen.io/16327/portrait-number-01.png",
  "https://assets.codepen.io/16327/portrait-number-02.png",
  "https://assets.codepen.io/16327/portrait-number-03.png",
  "https://assets.codepen.io/16327/portrait-number-04.png",
]

export function GsapListSlide({
  items = defaultItems,
  images = defaultImages,
}: GsapListSlideProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const list = listRef.current
    const fill = fillRef.current
    if (!section || !list || !fill) return

    const ctx = gsap.context(() => {
      const listItems = gsap.utils.toArray<HTMLElement>("li", list)
      const slides = gsap.utils.toArray<HTMLElement>(".gsap-list-slide", section)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=" + listItems.length * 50 + "%",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      gsap.set(fill, {
        scaleY: 1 / listItems.length,
        transformOrigin: "top left",
      })

      listItems.forEach((item, i) => {
        const previousItem = listItems[i - 1]
        if (previousItem) {
          tl.set(item, { color: "#0ae448" }, 0.5 * i)
            .to(slides[i], { autoAlpha: 1, duration: 0.2 }, "<")
            .set(previousItem, { color: "#fffce1" }, "<")
            .to(slides[i - 1], { autoAlpha: 0, duration: 0.2 }, "<")
        } else {
          gsap.set(item, { color: "#0ae448" })
          gsap.set(slides[i], { autoAlpha: 1 })
        }
      })

      tl.to(
        fill,
        {
          scaleY: 1,
          transformOrigin: "top left",
          ease: "none",
          duration: tl.duration(),
        },
        0
      ).to({}, {})
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="gsap-list-section">
      <div className="gsap-list-content">
        <ul ref={listRef}>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div ref={fillRef} className="gsap-list-fill" />
        <div className="gsap-list-right">
          {images.map((src, i) => (
            <div key={i} className="gsap-list-slide center">
              <img src={src} alt={`slide ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
