"use client"

import { useState } from "react"
import { motion } from "motion/react"

const PARAGRAPHS = [
  <>
    어린 시절부터 남들이 포기할 때 끝까지 답을 찾는 아이였습니다.
    그 성향은 성인이 되어{" "}
    <strong className="text-foreground font-semibold">
      &lsquo;기존보다 더 나은 효율&rsquo;
    </strong>
    을 찾아내는 경쟁력이 되었습니다.
  </>,
  <>
    독립적으로 레퍼런스를 분석·적용하며{" "}
    <strong className="text-foreground font-semibold">
      작업시간 3시간 -> 5분 단축
    </strong>
    하고,
  </>,
  <>
    월 300만원 외주 의존을 <strong className="text-foreground font-semibold">
      자체 개발로
    </strong>
    전환 했습니다
  </>,
  <>
    스스로에게 항상 질문합니다 {" "}
    <strong className="text-foreground font-semibold">
      이게 최선일까?
    </strong>
  </>,

]

export function StoryReveal() {
  const [unlocked, setUnlocked] = useState<boolean[]>(PARAGRAPHS.map(() => false))

  const unlock = (i: number) => {
    setUnlocked((prev) => {
      const next = [...prev]
      next[i] = true
      return next
    })
  }

  return (
    <div className="space-y-4 text-muted-foreground leading-relaxed text-2xl md:text-3xl">
      {PARAGRAPHS.map((text, i) => (
        <motion.p
          key={i}
          onClick={() => unlock(i)}
          animate={{
            filter: unlocked[i] ? "blur(0px)" : "blur(2.5px)",
            opacity: unlocked[i] ? 1 : 0.65,
          }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="cursor-pointer select-none"
        >
          {text}
        </motion.p>
      ))}
    </div>
  )
}
