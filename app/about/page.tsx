import Image from "next/image";
import { SkillsAccordion } from "@/components/SkillsAccordion";
import skillCategories from "@/app/data/skills";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const CORE_VALUES = ["책임감", "효율적인", "능동적인"];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero 섹션 ─────────────────────────────────── */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25 [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]">
          <FlickeringGrid
            className="absolute inset-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.3}
            flickerChance={0.05}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            {/* 프로필 이미지 */}
            <div className="flex-shrink-0">
              <div className="relative w-44 h-44 md:w-60 md:h-60 rounded-2xl overflow-hidden border border-border shadow-xl">
                <Image
                  src="/images/me.jpg"
                  alt="홍성필 프로필 사진"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* 텍스트 */}
            <div className="flex flex-col gap-4 text-center md:text-left">
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
                  Web Publisher · Frontend Developer
                </p>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
                  홍성필
                </h1>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground max-w-md">
                확실한 긍정적 변화를 약속하는 인재
              </p>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {CORE_VALUES.map((value) => (
                  <span
                    key={value}
                    className="px-4 py-1.5 rounded-full border border-border bg-muted text-sm font-medium"
                  >
                    {value}
                  </span>
                ))}
              </div>

              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">연락처</span>{" "}
                <a href="tel:01067315242" className="hover:underline underline-offset-4">
                  010-6731-5242
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 자기소개 섹션 ─────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            <h2 className="font-medium text-3xl md:text-4xl tracking-tighter text-center">
              About Me
            </h2>
            <div className="text-muted-foreground text-base md:text-lg leading-relaxed space-y-5">
              <p>
                저는 단순히 화면을 구현하는 것에 그치지 않고,{" "}
                <strong className="text-foreground">비즈니스에 실질적인 변화를 만드는 개발자</strong>
                입니다. 웹 퍼블리셔로서 실무 현장에서 3시간이 걸리던 반복 작업을 5분으로 줄이고,
                연간 3,000만 원의 외주 비용을 내재화 개발로 0원으로 전환한 경험이 있습니다.
              </p>
              <p>
                입사 2주 차에 카페24 API 연동 작업을 맡아 CORS 문제를 Firebase로 극복하며
                3일 만에 해결했습니다. 주어진 업무를 처리하는 것을 넘어,{" "}
                <strong className="text-foreground">문제를 먼저 발견하고 능동적으로 해결하는 자세</strong>
                로 일해왔습니다.
              </p>
              <p>
                집요한 문제해결력과 효율에 대한 집착, 그리고 팀에 긍정적인 변화를 가져올 수 있다는
                책임감으로 계속 성장하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 스킬 섹션 ────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col gap-2 text-center mb-10">
            <h2 className="font-medium text-3xl md:text-4xl tracking-tighter">
              Skills
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              프로젝트를 완성도로 이끄는 기술적 역량과 도구들을 다룹니다.
            </p>
          </div>
          <SkillsAccordion categories={skillCategories} />
        </div>
      </section>

      {/* ── 연락처 섹션 ──────────────────────────────── */}
      <section>
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
          <h2 className="font-medium text-3xl md:text-4xl tracking-tighter mb-4">
            Contact
          </h2>
          <p className="text-muted-foreground mb-8 text-base">
            프로젝트나 채용 관련 문의는 언제든지 연락주세요.
          </p>
          <a
            href="tel:01067315242"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-border bg-muted hover:bg-muted/60 transition-colors text-lg font-medium"
          >
            <span>📞</span>
            <span>010-6731-5242</span>
          </a>
        </div>
      </section>
    </div>
  );
}
