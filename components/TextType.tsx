"use client"

import { useEffect, useRef, useState } from "react"

interface TextTypeProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursorChar?: string
}

export function TextType({
  text,
  speed = 60,
  delay = 0,
  className = "",
  cursorChar = "|",
}: TextTypeProps) {
  const [displayed, setDisplayed] = useState("")
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const index = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          setTimeout(() => setStarted(true), delay)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  useEffect(() => {
    if (!started) return
    index.current = 0
    setDisplayed("")
    setDone(false)

    const id = setInterval(() => {
      index.current += 1
      setDisplayed(text.slice(0, index.current))
      if (index.current >= text.length) {
        clearInterval(id)
        setDone(true)
      }
    }, speed)

    return () => clearInterval(id)
  }, [started, text, speed])

  return (
    <span ref={ref} className={className}>
      {displayed}
      <span
        className={done ? "animate-pulse" : ""}
        style={{ marginLeft: "2px", fontWeight: 300 }}
      >
        {cursorChar}
      </span>
    </span>
  )
}
