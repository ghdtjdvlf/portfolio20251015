import "@/app/section01.css";
import skillCategories from "@/app/data/skills";
import SpotlightCard from "@/components/SpotlightCard";

export const metadata = {
  title: "Skills | 홍성필 포트폴리오",
  description: "홍성필의 기술 스택과 역량을 소개합니다.",
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen w-full">
      {/* 헤더 */}
      <div className="border-b border-border px-6 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Skills</h1>
        <p className="mt-4 text-muted-foreground text-sm md:text-base">
          프로젝트를 완성도로 이끄는 기술적 역량과 도구들을 다룹니다.
        </p>
      </div>

      {/* 카테고리별 스킬 목록 */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 flex flex-col gap-16">
        {skillCategories.map((category, catIdx) => (
          <section key={catIdx}>
            {/* 카테고리 헤더 */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">{category.icon}</span>
              <h2 className="text-2xl font-bold tracking-tight">{category.category}</h2>
            </div>

            {/* 스킬 카드 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.skills.map((skill, skillIdx) => (
                <SpotlightCard
                  key={skillIdx}
                  className="custom-spotlight-card flex flex-col items-start justify-start p-6 gap-3"
                  spotlightColor="rgba(0, 229, 255, 0.15)"
                >
                  <div className="flex items-center gap-3 text-neutral-800 dark:text-neutral-200 w-full">
                    {skill.icon}
                    <p className="font-semibold text-lg flex-1">{skill.title}</p>
                    {skill.trend && (
                      <span className="skill-trend-badge">🔥 Trend</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {skill.desc}
                  </p>
                </SpotlightCard>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
