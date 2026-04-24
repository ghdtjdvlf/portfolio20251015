"use client"

import { useEffect, useRef, useState } from "react"

type CharMeta = { char: string; bold: boolean; block: number; isBlockquote: boolean }

const BLOCKS = [
  {
    isBlockquote: true,
    parts: [{ text: '“9살 때 고장 난 PC를 스스로 고치며 느꼈던 문제해결의 희열이, 저만의 경쟁력이 되었습니다.”', bold: false }],
  },
  {
    isBlockquote: false,
    parts: [
      { text: '어린 시절부터 남들이 포기할 때 끝까지 답을 찾는 아이였습니다. 그 성향은 성인이 되어 ', bold: false },
      { text: '‘기존보다 더 나은 효율’', bold: true },
      { text: '을 찾아내는 경쟁력이 되었습니다.', bold: false },
    ],
  },
  {
    isBlockquote: false,
    parts: [
      { text: '사수 없이 독립적으로 레퍼런스를 분석·적용하며 ', bold: false },
      { text: '3시간짜리 업무를 5분으로 단축', bold: true },
      { text: '하고, 월 300만 원 외주 의존을 자체 개발로 전환했습니다.', bold: false },
    ],
  },
  {
    isBlockquote: false,
    parts: [
      { text: '뉴발란스 프로젝트에서 10명 규모 팀의 FE 파트를 담당하며 복잡한 요구사항을 빠르게 파악하고 사용자 중심 인터페이스를 설계·구현하는 역량을 갖췄습니다.', bold: false },
    ],
  },
]

const CHARS: CharMeta[] = []
BLOCKS.forEach((block, bi) => {
  block.parts.forEach((part) => {
    for (const char of part.text) {
      CHARS.push({ char, bold: part.bold, block: bi, isBlockquote: block.isBlockquote })
    }
  })
})

function Cursor() {
  return (
    <span
      className="inline-block w-[2px] h-[1.1em] bg-foreground ml-[1px] align-middle"
      style={{ animation: "story-cursor-blink 0.1s step-end infinite" }}
    />
  )
}

export function StoryTypeWriter() {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let i = 0
          const tick = () => {
            if (i >= CHARS.length) {
              setDone(true)
              return
            }
            i++
            setCount(i)
            timerRef.current = setTimeout(tick, 20)
          }
          tick()
        }
      },
      { threshold: 0.3 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => {
      observer.disconnect()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const typedChars = CHARS.slice(0, count)
  const lastBlock = typedChars.length > 0 ? typedChars[typedChars.length - 1].block : -1

  const renderedBlocks = BLOCKS.map((block, bi) => {
    const blockChars = typedChars.filter((c) => c.block === bi)
    if (blockChars.length === 0) return null

    const spans: { text: string; bold: boolean }[] = []
    let cur = { text: blockChars[0].char, bold: blockChars[0].bold }
    for (let j = 1; j < blockChars.length; j++) {
      if (blockChars[j].bold === cur.bold) {
        cur.text += blockChars[j].char
      } else {
        spans.push({ ...cur })
        cur = { text: blockChars[j].char, bold: blockChars[j].bold }
      }
    }
    spans.push({ ...cur })

    const showCursor = bi === lastBlock && !done

    const content = (
      <>
        {spans.map((span, si) =>
          span.bold ? (
            <strong key={si} className="text-foreground font-semibold">{span.text}</strong>
          ) : (
            <span key={si}>{span.text}</span>
          )
        )}
        {showCursor && <Cursor />}
      </>
    )

    if (block.isBlockquote) {
      return (
        <blockquote
          key={bi}
          className="text-xl md:text-2xl font-semibold leading-snug tracking-tight mb-7 text-foreground"
        >
          {content}
        </blockquote>
      )
    }
    return (
      <p key={bi} className="text-sm md:text-base text-muted-foreground leading-relaxed">
        {content}
      </p>
    )
  })

  return (
    <div ref={containerRef} className="space-y-4 max-w-2xl">
      {renderedBlocks}
    </div>
  )
}
