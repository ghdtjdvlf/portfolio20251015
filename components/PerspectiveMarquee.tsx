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
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          perspective: "500px",
        }}
      >
        <div
          style={{
            width: "100%",
            transform: "rotateX(20deg)",
            transformOrigin: "center center",
          }}
        >
          <div style={{ display: "flex", overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                flexShrink: 0,
                gap: "2.5rem",
                alignItems: "center",
                animation: "marquee 35s linear infinite",
                willChange: "transform",
              }}
            >
              {doubled.map((item, i) => (
                <span key={i} style={{ whiteSpace: "nowrap", fontSize: "1.125rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                  {item}
                  <span style={{ marginLeft: "2.5rem", opacity: 0.25 }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
