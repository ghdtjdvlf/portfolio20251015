"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import {
  FaHtml5, FaCss3Alt, FaSass, FaBootstrap, FaGitAlt, FaWordpress,
} from "react-icons/fa"
import {
  SiAdobe, SiFigma, SiTailwindcss, SiStyledcomponents,
  SiJavascript, SiJquery, SiGreensock, SiReact,
  SiNotion, SiClaude, SiJira, SiSourcetree,
  SiGooglegemini, SiOpenai,
  SiIntellijidea, SiJenkins, SiSlack, SiConfluence,
} from "react-icons/si"
import { MdWeb } from "react-icons/md"

type Skill = {
  icon: React.ReactNode
  title: string
  color: string
  trend?: boolean
}

type Category = {
  id: string
  number: string
  title: string
  subtitle: string
  image: string
  skills: Skill[]
}

const CATEGORIES: Category[] = [
  {
    id: "web",
    number: "01",
    title: "Web",
    subtitle: "마크업 & 프론트엔드",
    image: "/images/포트폴리오 이미지/썸네일가로/뉴발란스_가로.jpg",
    skills: [
      { icon: <FaHtml5 />, title: "HTML5", color: "#E34F26" },
      { icon: <FaCss3Alt />, title: "CSS3", color: "#1572B6" },
      { icon: <FaSass />, title: "SCSS", color: "#CC6699" },
      { icon: <SiTailwindcss />, title: "Tailwind", color: "#38BDF8", trend: true },
      { icon: <SiJavascript />, title: "JavaScript", color: "#F7DF1E" },
      { icon: <SiJquery />, title: "jQuery", color: "#0769AD" },
      { icon: <SiGreensock />, title: "GSAP", color: "#88CE02", trend: true },
      { icon: <SiReact />, title: "React", color: "#61DAFB", trend: true },
      { icon: <FaBootstrap />, title: "Bootstrap", color: "#7952B3" },
      { icon: <SiStyledcomponents />, title: "Styled Comp.", color: "#DB7093" },
    ],
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    subtitle: "UI/UX 디자인",
    image: "/images/포트폴리오 이미지/썸네일가로/굿카스_가로.png",
    skills: [
      { icon: <SiFigma />, title: "Figma", color: "#F24E1E", trend: true },
      { icon: <SiAdobe />, title: "Photoshop", color: "#31A8FF" },
    ],
  },
  {
    id: "cms",
    number: "03",
    title: "CMS",
    subtitle: "커머스 & 플랫폼",
    image: "/thumbnails/워드프레스.webp",
    skills: [
      { icon: <FaWordpress />, title: "WordPress", color: "#21759B" },
      { icon: <MdWeb />, title: "카페24", color: "#3B82F6" },
      { icon: <MdWeb />, title: "그누보드", color: "#9CA3AF" },
    ],
  },
  {
    id: "tool",
    number: "04",
    title: "Tool",
    subtitle: "개발환경 & 버전관리",
    image: "/images/포트폴리오 이미지/썸네일가로/넥서스비전_가로.png",
    skills: [
      { icon: <FaGitAlt />, title: "Git", color: "#F1502F" },
      { icon: <SiSourcetree />, title: "SourceTree", color: "#0052CC" },
      { icon: <SiIntellijidea />, title: "IntelliJ", color: "#FE315D", trend: true },
      { icon: <SiJenkins />, title: "Jenkins", color: "#D24939", trend: true },
    ],
  },
  {
    id: "ai",
    number: "05",
    title: "AI",
    subtitle: "AI 도구 & 프롬프트",
    image: "/images/포트폴리오 이미지/썸네일가로/블로그_가로.jpg",
    skills: [
      { icon: <SiClaude />, title: "Claude Code", color: "#CC785C", trend: true },
      { icon: <SiGooglegemini />, title: "Gemini API", color: "#4285F4", trend: true },
      { icon: <SiOpenai />, title: "ChatGPT", color: "#10a37f", trend: true },
      { icon: <span style={{ fontSize: 22 }}>⌨️</span>, title: "Cursor", color: "#ffffff", trend: true },
      { icon: <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.05em" }}>Kl</span>, title: "Kling", color: "#A855F7", trend: true },
      { icon: <span style={{ fontSize: 20 }}>🍌</span>, title: "나노바나나", color: "#FACC15", trend: true },
    ],
  },
  {
    id: "cop",
    number: "06",
    title: "Cop",
    subtitle: "협업 & 커뮤니케이션",
    image: "/images/포트폴리오 이미지/썸네일가로/뉴발란스_가로.jpg",
    skills: [
      { icon: <SiSlack />, title: "Slack", color: "#4A154B", trend: true },
      { icon: <SiNotion />, title: "Notion", color: "#ffffff" },
      { icon: <SiJira />, title: "Jira", color: "#0052CC", trend: true },
      { icon: <SiConfluence />, title: "Confluence", color: "#0052CC", trend: true },
    ],
  },
]

function SkillIcon({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.04, duration: 0.3, ease: "easeOut" }}
      className="flex flex-col items-center gap-2 group/icon"
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl relative"
        style={{
          background: `${skill.color}18`,
          border: skill.trend ? `1px solid ${skill.color}50` : "1px solid rgba(255,255,255,0.08)",
          color: skill.color,
          boxShadow: skill.trend ? `0 0 20px ${skill.color}35` : "none",
        }}
      >
        {skill.icon}
        {skill.trend && (
          <span className="absolute -top-1.5 -right-1.5 text-[9px] leading-none">🔥</span>
        )}
      </div>
      <span className="text-xs text-white/50 tracking-wide text-center leading-tight group-hover/icon:text-white/80 transition-colors">
        {skill.title}
      </span>
    </motion.div>
  )
}

export function SkillsInteractive() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="w-full bg-[#080808] border-t border-white/[0.06]">
      {/* 헤더 */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-8 flex flex-col items-center text-center gap-2">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-mono">
          {CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)} skills
        </p>
        <h2
          className="text-white leading-none tracking-tighter font-light"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Skills
        </h2>
      </div>

      {/* 아코디언 리스트 */}
      <div className="border-t border-white/[0.06]">
        {CATEGORIES.map((cat) => {
          const isOpen = hovered === cat.id
          const isDimmed = hovered !== null && !isOpen

          return (
            <motion.div
              key={cat.id}
              animate={{ opacity: isDimmed ? 0.3 : 1 }}
              transition={{ duration: 0.25 }}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
              className="border-b border-white/[0.06] cursor-default overflow-hidden"
            >
              {/* 기본 행 */}
              <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex items-center justify-between py-5 gap-6">
                  {/* 왼쪽 */}
                  <div className="flex items-center gap-5 min-w-0">
                    <span className="text-sm font-mono text-white/30 shrink-0 w-7">
                      {cat.number}
                    </span>
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span
                        className="font-semibold text-white tracking-tight shrink-0 transition-all duration-300"
                        style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
                      >
                        {cat.title}
                      </span>
                      <span className="text-white/35 text-sm tracking-wide hidden sm:block truncate">
                        {cat.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* 오른쪽 — 미리보기 아이콘 */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-2">
                      {cat.skills.slice(0, 4).map((s, i) => (
                        <div
                          key={i}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-xl"
                          style={{ color: s.color, opacity: 0.5 }}
                        >
                          {s.icon}
                        </div>
                      ))}
                      {cat.skills.length > 4 && (
                        <span className="text-white/30 text-sm font-mono ml-1">
                          +{cat.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 확장 영역 */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-7xl mx-auto px-6 md:px-10 pb-8">
                      <div className="flex gap-8 items-start">

                        {/* 이미지 */}
                        <motion.div
                          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                          animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                          exit={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                          className="relative shrink-0 rounded-xl overflow-hidden hidden md:block"
                          style={{ width: 380, height: 240 }}
                        >
                          <Image
                            src={cat.image}
                            alt={cat.title}
                            fill
                            className="object-cover"
                            sizes="380px"
                          />
                          <div className="absolute inset-0 bg-black/50" />
                          <div className="absolute inset-0 flex flex-col justify-end p-4">
                            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase font-mono">
                              {cat.subtitle}
                            </p>
                            <p className="text-white text-lg font-semibold tracking-tight mt-0.5">
                              {cat.title}
                            </p>
                          </div>
                        </motion.div>

                        {/* 스킬 그리드 */}
                        <div
                          className="grid gap-x-4 gap-y-5 flex-1"
                          style={{
                            gridTemplateColumns: "repeat(auto-fill, minmax(76px, 1fr))",
                          }}
                        >
                          {cat.skills.map((skill, i) => (
                            <SkillIcon key={skill.title} skill={skill} index={i} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
