import Image from "next/image";
import { SkillsAccordion } from "@/components/SkillsAccordion";
import skillCategories from "@/app/data/skills";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const CORE_VALUES = ["책임감", "효율적인", "능동적인"];

const GMAIL_BODY = `안녕하세요, 홍성필님.

저는 [회사명]의 [담당자명]입니다.

아래 포지션을 제안드리고 싶어 연락드립니다.

■ 포지션  :
■ 회사명  :
■ 근무형태 : (정규직 / 계약직 / 프리랜서)
■ 근무지  :
■ 급여    :
■ 면접 일정 :

업무 내용 및 기타 세부 사항을 자유롭게 기재해 주세요.


감사합니다.
[담당자명] 드림`;

const GMAIL_URL = `https://mail.google.com/mail/?view=cm&to=tjdvlf0416@gmail.com&su=${encodeURIComponent("[면접 제의] 회사명 · 직군명")}&body=${encodeURIComponent(GMAIL_BODY)}`;

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
            {/* <div className="flex-shrink-0">
              <div className="relative w-44 h-44 md:w-60 md:h-60 rounded-2xl overflow-hidden border border-border shadow-xl">
                <Image
                  src="/images/me.webp"
                  alt="홍성필 프로필 사진"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div> */}

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

              <div className="flex justify-center md:justify-start">
                <a
                  href={GMAIL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background hover:opacity-80 transition-opacity text-sm font-medium"
                >
                  <span>✉️</span>
                  <span>포지션 제안하기</span>
                </a>
              </div>
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
                <strong className="text-foreground">3,000만 원의 외주를 내재화로 0원에.</strong>{" "}
                반복 작업 3시간을 5분으로. 숫자로 증명해온 퍼블리셔입니다.
              </p>
              <p>
                그 경험을 마크업 공정에도 그대로 녹여내고 싶습니다.{" "}
                나아가{" "}
                <strong className="text-foreground">AI 에이전트 기반 자동화</strong>를 통해,
                8시간의 근무를 넘어 24시간 중단 없이 결과물을 검수하고 생성하는 시스템을 지향합니다.
              </p>
              <p>
                빠른 적응력과 효율 추구 성향으로{" "}
                <strong className="text-foreground">팀의 생산성과 서비스 품질 향상</strong>에
                실질적으로 기여하겠습니다.
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:01067315242"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-border bg-muted hover:bg-muted/60 transition-colors text-lg font-medium"
            >
              <span>📞</span>
              <span>010-6731-5242</span>
            </a>
            <a
              href={GMAIL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-border bg-foreground text-background hover:opacity-80 transition-opacity text-lg font-medium"
            >
              <span>✉️</span>
              <span>포지션 제안하기</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
