const ITEMS = [
  "React", "TypeScript", "Next.js", "Tailwind", "GSAP", "Motion",
  "Three.js", "Figma", "Firebase", "Git", "문제해결", "효율", "집요함",
  "자동화", "AI", "퍼블리싱", "Frontend", "Web Publisher",
];

const ROWS = [
  { items: ITEMS, speed: 40, reverse: false },
  { items: ITEMS, speed: 35, reverse: true },
  { items: ITEMS, speed: 45, reverse: false },
  { items: ITEMS, speed: 38, reverse: true },
  { items: ITEMS, speed: 42, reverse: false },
];

export function PerspectiveMarquee() {
  return (
    <>
      <style>{`
        @keyframes pmq {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes pmq-r {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          perspective: "600px",
          perspectiveOrigin: "50% 30%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-40% 0",
            transform: "rotateX(35deg)",
            transformOrigin: "50% 0%",
          }}
        >
          {ROWS.map((row, i) => {
            const doubled = [...row.items, ...row.items];
            return (
              <div key={i} style={{ display: "flex", overflow: "hidden" }}>
                <div
                  style={{
                    display: "flex",
                    flexShrink: 0,
                    gap: "3rem",
                    alignItems: "center",
                    padding: "14px 0",
                    animation: `${row.reverse ? "pmq-r" : "pmq"} ${row.speed}s linear infinite`,
                    willChange: "transform",
                  }}
                >
                  {doubled.map((item, j) => (
                    <span
                      key={j}
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: "2.25rem",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {item}
                      <span style={{ margin: "0 1.5rem", opacity: 0.2, fontWeight: 400 }}>·</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
