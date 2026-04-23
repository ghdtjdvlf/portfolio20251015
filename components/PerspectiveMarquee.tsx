const ITEMS = [
  "React", "TypeScript", "Next.js", "Tailwind", "GSAP", "Motion",
  "Three.js", "Figma", "Firebase", "Git", "문제해결", "효율", "집요함",
  "자동화", "AI", "퍼블리싱", "Frontend", "Web Publisher",
];

const doubled = [...ITEMS, ...ITEMS];

export function PerspectiveMarquee() {
  return (
    <>
      <style>{`
        @keyframes pmq {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* 섹션 전체를 채우는 절대 위치 컨테이너 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* 좌우 fade mask */}
        <div
          style={{
            width: "100%",
            maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            perspective: "800px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* 단일 행 */}
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "inline-flex",
                flexShrink: 0,
                gap: "3.5rem",
                alignItems: "center",
                animation: "pmq 40s linear infinite",
                willChange: "transform",
                whiteSpace: "nowrap",
              }}
            >
              {doubled.map((item, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "2rem",
                    fontWeight: i % 3 === 1 ? 700 : i % 3 === 2 ? 400 : 600,
                    letterSpacing: "-0.01em",
                    lineHeight: 1,
                  }}
                >
                  {item}
                  <span style={{ marginLeft: "3.5rem", opacity: 0.2, fontWeight: 300 }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
