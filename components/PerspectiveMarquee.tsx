const ROWS = [
  ["React", "TypeScript", "Next.js", "Tailwind", "GSAP", "Motion", "Three.js", "Figma"],
  ["문제해결", "효율", "집요함", "성장", "자동화", "AI", "퍼블리싱", "개발"],
  ["Frontend", "Web Publisher", "UI/UX", "Component", "Animation", "Performance"],
  ["React", "TypeScript", "Next.js", "Tailwind", "GSAP", "Motion", "Three.js", "Figma"],
  ["문제해결", "효율", "집요함", "성장", "자동화", "AI", "퍼블리싱", "개발"],
  ["Frontend", "Web Publisher", "UI/UX", "Component", "Animation", "Performance"],
];

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <div
        className={`flex shrink-0 gap-6 items-center py-2.5 ${reverse ? "animate-[marquee-reverse_30s_linear_infinite]" : "animate-[marquee_30s_linear_infinite]"}`}
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-medium tracking-wide">
            {item}
            <span className="mx-3 opacity-30">·</span>
          </span>
        ))}
      </div>
      {/* 두 번 렌더해서 끊김 없이 이어지게 */}
      <div
        aria-hidden
        className={`flex shrink-0 gap-6 items-center py-2.5 ${reverse ? "animate-[marquee-reverse_30s_linear_infinite]" : "animate-[marquee_30s_linear_infinite]"}`}
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-medium tracking-wide">
            {item}
            <span className="mx-3 opacity-30">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function PerspectiveMarquee() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ perspective: "400px" }}
    >
      <div
        className="w-full"
        style={{
          transform: "rotateX(25deg)",
          transformOrigin: "top center",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      >
        {ROWS.map((row, i) => (
          <MarqueeRow key={i} items={row} reverse={i % 2 !== 0} />
        ))}
      </div>
    </div>
  );
}
