const ROWS = [
  ["React", "TypeScript", "Next.js", "Tailwind", "GSAP", "Motion", "Three.js", "Figma", "Firebase", "Git"],
  ["문제해결", "효율", "집요함", "성장", "자동화", "AI", "퍼블리싱", "개발", "협업", "혁신"],
  ["Frontend", "Web Publisher", "UI/UX", "Component", "Animation", "Performance", "Accessibility"],
  ["React", "TypeScript", "Next.js", "Tailwind", "GSAP", "Motion", "Three.js", "Figma", "Firebase", "Git"],
  ["문제해결", "효율", "집요함", "성장", "자동화", "AI", "퍼블리싱", "개발", "협업", "혁신"],
  ["Frontend", "Web Publisher", "UI/UX", "Component", "Animation", "Performance", "Accessibility"],
];

function MarqueeRow({ items, reverse, speed = 30 }: { items: string[]; reverse?: boolean; speed?: number }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          flexShrink: 0,
          gap: "1.5rem",
          alignItems: "center",
          padding: "10px 0",
          animation: `${reverse ? "marqueeReverse" : "marquee"} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ whiteSpace: "nowrap", fontSize: "0.875rem", fontWeight: 500 }}>
            {item}
            <span style={{ margin: "0 10px", opacity: 0.3 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function PerspectiveMarquee() {
  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          perspective: "400px",
        }}
      >
        <div
          style={{
            transform: "rotateX(22deg)",
            transformOrigin: "top center",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
          }}
        >
          {ROWS.map((row, i) => (
            <MarqueeRow
              key={i}
              items={row}
              reverse={i % 2 !== 0}
              speed={25 + i * 3}
            />
          ))}
        </div>
      </div>
    </>
  );
}
