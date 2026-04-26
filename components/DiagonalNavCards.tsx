"use client"

import { useState } from "react"
import { motion } from "motion/react"
import Link from "next/link"

export function DiagonalNavCards() {
  const [hovered, setHovered] = useState<"projects" | "about" | null>(null)

  return (
    <section className="w-full bg-[#080808] py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative h-[260px] md:h-[320px] rounded-2xl overflow-hidden flex"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.07), 0 32px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* noise grain overlay */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              backgroundSize: "180px 180px",
            }}
          />

          {/* ── Left: Projects ── */}
          <Link
            href="/projects"
            className="relative flex-1 flex items-center overflow-hidden"
            onMouseEnter={() => setHovered("projects")}
            onMouseLeave={() => setHovered(null)}
          >
            {/* hover glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background:
                  hovered === "projects"
                    ? "radial-gradient(ellipse at 25% 50%, rgba(139,92,246,0.18) 0%, transparent 65%)"
                    : "transparent",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* top-left corner tag */}
            <div className="absolute top-5 left-6 text-[9px] tracking-[0.35em] uppercase text-white/20 font-mono">
              01 / Projects
            </div>

            <div className="pl-8 md:pl-14 z-10 relative">
              <motion.h2
                className="font-extralight tracking-tighter leading-none text-white mb-4"
                style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)" }}
                animate={{ opacity: hovered === "about" ? 0.3 : 1 }}
                transition={{ duration: 0.3 }}
              >
                Projects
              </motion.h2>
              <motion.div
                className="flex items-center gap-2 text-white/40 text-sm font-light tracking-wide"
                animate={{
                  x: hovered === "projects" ? 6 : 0,
                  opacity: hovered === "projects" ? 1 : 0.35,
                }}
                transition={{ duration: 0.35 }}
              >
                <span>포트폴리오 보기</span>
                <span className="text-xs">→</span>
              </motion.div>
            </div>
          </Link>

          {/* ── Diagonal "/" divider ── */}
          <div
            className="absolute top-[-12%] bottom-[-12%] pointer-events-none z-20"
            style={{
              left: "calc(50% - 28px)",
              width: "56px",
              transform: "skewX(-5deg)",
              background:
                "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent 100%)",
              borderLeft: "1px solid rgba(255,255,255,0.12)",
              borderRight: "1px solid rgba(255,255,255,0.05)",
            }}
          />
          {/* "/" label on the divider */}
          <div
            className="absolute top-1/2 left-1/2 z-30 pointer-events-none select-none"
            style={{
              transform: "translate(-50%, -50%)",
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              color: "rgba(255,255,255,0.08)",
              fontWeight: 200,
              fontFamily: "monospace",
            }}
          >
            /
          </div>

          {/* ── Right: About Me ── */}
          <Link
            href="/about"
            className="relative flex-1 flex items-center justify-end overflow-hidden"
            onMouseEnter={() => setHovered("about")}
            onMouseLeave={() => setHovered(null)}
          >
            {/* hover glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background:
                  hovered === "about"
                    ? "radial-gradient(ellipse at 75% 50%, rgba(20,184,166,0.18) 0%, transparent 65%)"
                    : "transparent",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* top-right corner tag */}
            <div className="absolute top-5 right-6 text-[9px] tracking-[0.35em] uppercase text-white/20 font-mono">
              02 / About
            </div>

            <div className="pr-8 md:pr-14 z-10 relative text-right">
              <motion.h2
                className="font-extralight tracking-tighter leading-none text-white mb-4"
                style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)" }}
                animate={{ opacity: hovered === "projects" ? 0.3 : 1 }}
                transition={{ duration: 0.3 }}
              >
                About Me
              </motion.h2>
              <motion.div
                className="flex items-center justify-end gap-2 text-white/40 text-sm font-light tracking-wide"
                animate={{
                  x: hovered === "about" ? -6 : 0,
                  opacity: hovered === "about" ? 1 : 0.35,
                }}
                transition={{ duration: 0.35 }}
              >
                <span className="text-xs">←</span>
                <span>소개 보기</span>
              </motion.div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
