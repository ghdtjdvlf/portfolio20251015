"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  "React", "TypeScript", "Next.js", "Tailwind", "GSAP", "Motion",
  "Three.js", "Figma", "Firebase", "Git", "문제해결", "효율", "집요함",
  "자동화", "AI", "퍼블리싱", "Frontend", "Web Publisher",
];

const doubled = [...ITEMS, ...ITEMS];

export function PerspectiveMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Select only the outer item spans (not the separator · spans inside them)
    const spans = Array.from(
      track.querySelectorAll<HTMLSpanElement>("[data-item]")
    );

    function tick() {
      const cw = container!.offsetWidth;
      const cx = cw / 2;
      const cl = container!.getBoundingClientRect().left;

      spans.forEach((span) => {
        const r = span.getBoundingClientRect();
        const itemCx = r.left - cl + r.width / 2;
        // distance 0 = center, 1 = edge
        const norm = Math.min(1, Math.abs((itemCx - cx) / cx));
        const blurPx = norm * 6;
        const opacity = 1 - norm * 0.4;
        span.style.filter = blurPx > 0.15 ? `blur(${blurPx.toFixed(2)}px)` : "";
        span.style.opacity = opacity.toFixed(3);
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <style>{`
        @keyframes pmq-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          perspective: "1200px",
        }}
      >
        {/* 3D rotated row */}
        <div
          style={{
            width: "100%",
            transform: "rotateX(8deg) rotateY(-28deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* left / right fade mask */}
          <div
            style={{
              overflow: "hidden",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
            }}
          >
            <div
              ref={trackRef}
              style={{
                display: "inline-flex",
                gap: "3.5rem",
                alignItems: "center",
                whiteSpace: "nowrap",
                animation: "pmq-scroll 38s linear infinite",
                willChange: "transform",
              }}
            >
              {doubled.map((item, i) => (
                <span
                  key={i}
                  data-item=""
                  style={{
                    display: "inline-block",
                    fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
                    fontWeight: i % 3 === 0 ? 700 : i % 3 === 1 ? 600 : 400,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {item}
                  <span
                    style={{
                      marginLeft: "3.5rem",
                      opacity: 0.2,
                      fontWeight: 300,
                    }}
                  >
                    ·
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* top / bottom fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, var(--background) 0%, transparent 25%, transparent 75%, var(--background) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </>
  );
}
