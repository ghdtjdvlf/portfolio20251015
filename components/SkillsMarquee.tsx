"use client";

import { allSkills } from "@/app/data/skills";

// trend / non-trend 분리
const trendSkills    = allSkills.filter((s) => s.trend);    // 5개: Figma, Tailwind, React, Jira, Claude
const nonTrendSkills = allSkills.filter((s) => !s.trend);   // 20개

// Row 1 (13개): non×5 → Figma → non×1 → Tailwind → non×3 → React → non×1
const row1 = [
  ...nonTrendSkills.slice(0, 5),   // Adobe, Html5, CSS3, SCSS, Styled
  trendSkills[0],                  // Figma  ← trend
  nonTrendSkills[5],               // Bootstrap5
  trendSkills[1],                  // Tailwind ← trend
  ...nonTrendSkills.slice(6, 9),   // Ant Design, JS, jQuery
  trendSkills[2],                  // React ← trend
  nonTrendSkills[9],               // GSAP
];

// Row 2 (12개): non×4 → Jira → non×3 → Claude → non×3
const row2 = [
  ...nonTrendSkills.slice(10, 14), // Lottie, Firebase, WordPress, 카페24
  trendSkills[3],                  // Jira ← trend
  ...nonTrendSkills.slice(14, 17), // 그누보드, Notion, git
  trendSkills[4],                  // Claude ← trend
  ...nonTrendSkills.slice(17),     // SourceTree, IntelliJ, Jenkins
];

function MarqueeRow({
  skills,
  reverse = false,
}: {
  skills: typeof allSkills;
  reverse?: boolean;
}) {
  const repeated = [...skills, ...skills, ...skills];

  return (
    <div className="skills-marquee-row-wrapper">
      <div
        className={`skills-marquee-track ${reverse ? "skills-marquee-reverse" : ""}`}
      >
        {repeated.map((skill, i) => (
          <div key={i} className="skills-marquee-item">
            <span className="skills-marquee-icon">{skill.icon}</span>
            <span className="skills-marquee-title">{skill.title}</span>
            {skill.trend && (
              <span className="skills-marquee-trend">🔥</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillsMarquee() {
  return (
    <div className="skills-marquee-wrapper">
      <MarqueeRow skills={row1} reverse={false} />
      <MarqueeRow skills={row2} reverse={true} />
    </div>
  );
}
