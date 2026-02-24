"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Flip } from "gsap/Flip"
import "./bento-gallery-flip.css"

gsap.registerPlugin(ScrollTrigger, Flip)

const images = [
  "https://assets.codepen.io/16327/portrait-pattern-1.jpg",
  "https://assets.codepen.io/16327/portrait-image-12.jpg",
  "https://assets.codepen.io/16327/portrait-image-8.jpg",
  "https://assets.codepen.io/16327/portrait-pattern-2.jpg",
  "https://assets.codepen.io/16327/portrait-image-4.jpg",
  "https://assets.codepen.io/16327/portrait-image-3.jpg",
  "https://assets.codepen.io/16327/portrait-pattern-3.jpg",
  "https://assets.codepen.io/16327/portrait-image-1.jpg",
]

export function BentoGalleryFlip() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const gallery = galleryRef.current
    if (!wrapper || !gallery) return

    let flipCtx: gsap.Context | undefined

    const createTween = () => {
      const galleryItems = gallery.querySelectorAll<HTMLElement>(".gallery__item")

      flipCtx?.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      gallery.classList.remove("gallery--final")

      flipCtx = gsap.context(() => {
        gallery.classList.add("gallery--final")
        const flipState = Flip.getState(galleryItems)
        gallery.classList.remove("gallery--final")

        const flip = Flip.to(flipState, {
          simple: true,
          ease: "expoScale(1, 5)",
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: gallery,
            start: "center center",
            end: "+=100%",
            scrub: true,
            pin: wrapper,
            invalidateOnRefresh: true,
          },
        })
        tl.add(flip)

        return () => gsap.set(galleryItems, { clearProps: "all" })
      })

      ScrollTrigger.refresh()
    }

    createTween()

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(createTween, 200)
    }

    window.addEventListener("resize", onResize)

    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener("resize", onResize)
      flipCtx?.revert()
    }
  }, [])

  return (
    <div ref={wrapperRef} className="gallery-wrap">
      <div ref={galleryRef} className="gallery gallery--bento" id="gallery-8">
        {images.map((src, i) => (
          <div key={i} className="gallery__item">
            <img src={src} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}
