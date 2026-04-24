import Image from "next/image";
import { PerspectiveMarquee } from "@/components/PerspectiveMarquee";

const GMAIL_BODY = `안녕하세요, 홍성필님.

아래 포지션을 제안드리고 싶어 연락드립니다.

■ 포지션  :
■ 회사명  :
■ 근무형태 : (정규직 / 계약직 / 프리랜서)
■ 근무지  :
■ 급여    :
■ 면접 일정 :
.

`;

const GMAIL_URL = `https://mail.google.com/mail/?view=cm&to=tjdvlf0416@gmail.com&su=${encodeURIComponent("[면접 제의] 회사명 · 직군명")}&body=${encodeURIComponent(GMAIL_BODY)}`;

const CAREERS = [
  {
    period: "2025.12 — 2026.03",
    duration: "4개월",
    company: "포비즈코리아",
    team: "FE팀",
    work: "뉴발란스 웹사이트 유지보수, 프론트엔드 개발, PC/모바일 퍼블리싱, UI 개선 및 최적화",
    salary: "2,900만원",
    type: "Frontend Developer",
  },
  {
    period: "2025.09 — 2025.11",
    duration: "3개월",
    company: "퍼널먼스",
    team: "퍼포먼스AI1팀",
    work: "카페24 유지보수 및 운영, PC/모바일 퍼블리싱, UI 개선",
    salary: "2,800만원",
    type: "Web Publisher",
  },
  {
    period: "2023.08 — 2024.07",
    duration: "1년",
    company: "원스톤",
    team: "디자인팀",
    work: "자사 웹사이트 유지보수 및 운영, PC/모바일 퍼블리싱, UI 개선",
    salary: "2,600만원",
    type: "Web Publisher",
  },
];


const CHARS = [
  {
    badge: "장점",
    title: "극한의 효율성과 집요한 문제해결력",
    body: "3시간 업무를 5분으로. 3,000만 원 외주를 내재화로 0원에. 숫자로 증명해온 실행력입니다.",
    accent: "3h → 5min",
  },
  {
    badge: "단점",
    title: "낯선 방식 도입에 따른 조직 내 우려",
    body: "기존 방식에 안주하지 않으려는 성향이 때로는 동료에게 부담으로 다가올 수 있음을 경계합니다.",
    accent: null,
  },
  {
    badge: "보완점",
    title: "설득과 검증을 통한 점진적 변화",
    body: "독단적으로 진행하지 않습니다. 팀원과 충분히 상의하고 PoC로 효용성을 먼저 입증합니다.",
    accent: null,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-8 pb-0 flex items-center justify-between">
          <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium">About Me</span>
          <span className="text-[11px] tracking-[0.2em] text-muted-foreground font-mono">2026</span>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left: Text */}
            <div className="flex flex-col gap-6">
              <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
                Web Publisher · Frontend Developer
              </p>

              <h1 className="font-bold tracking-tighter leading-none text-7xl md:text-8xl">
                홍성필
              </h1>

              <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
                효율을 숫자로 증명해온 퍼블리셔.<br />
                확실한 긍정적 변화를 약속합니다.
              </p>

              <div className="flex flex-wrap gap-2">
                {["책임감", "효율적인", "능동적인"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 border border-border text-sm font-medium rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Contact shortcut */}
              <a
                href={GMAIL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-fit px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:opacity-80 transition-opacity"
              >
                ✉️ 포지션 제안하기
              </a>
            </div>

            {/* Right: Photo */}
            <div className="w-full max-w-sm mx-auto lg:mx-0 lg:max-w-none">
              <div className="relative w-full rounded-2xl overflow-hidden bg-muted" style={{ aspectRatio: "4/5" }}>
                <Image
                  src="/images/me.jpg"
                  alt="홍성필 프로필"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-foreground/90 backdrop-blur-sm">
                  <p className="text-background text-[10px] tracking-[0.25em] uppercase font-semibold">
                    Hong Seong-pil · Frontend Developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORY ──────────────────────────────────────── */}
      <section className="relative border-b border-border overflow-hidden">

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-16">
            <div className="pt-1">
              <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
                02 · Story
              </span>
            </div>
            <div className="max-w-2xl">
              <blockquote className="text-2xl md:text-4xl font-semibold leading-snug tracking-tight mb-7 text-foreground">
                &ldquo;8살, 고장 난 PC를 스스로 고치며 느꼈던
                문제해결의 즐거움 .&rdquo;
              </blockquote>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p>
                  어린 시절부터 남들이 포기할 때 끝까지 답을 찾는 아이였습니다.
                  그 성향은 성인이 되어{" "}
                  <strong className="text-foreground font-semibold">
                    &lsquo;기존보다 더 나은 효율&rsquo;
                  </strong>
                  을 찾아내는 경쟁력이 되었습니다.
                </p>
                <p>
                  사수 없이 독립적으로 레퍼런스를 분석·적용하며{" "}
                  <strong className="text-foreground font-semibold">
                    3시간짜리 업무를 5분으로 단축
                  </strong>
                  하고, 월 300만 원 외주 의존을 자체 개발로 전환했습니다.
                </p>
                <p>
                  뉴발란스 프로젝트에서 10명 규모 팀의 FE 파트를 담당하며
                  복잡한 요구사항을 빠르게 파악하고 사용자 중심 인터페이스를
                  설계·구현하는 역량을 갖췄습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERSPECTIVE MARQUEE ────────────────────────── */}
      <section className="border-b border-border overflow-hidden" style={{ height: "340px" }}>
        <PerspectiveMarquee />
      </section>

      {/* ── CAREER ─────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-16 mb-10">
            <div className="pt-1">
              <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
                03 · Career
              </span>
            </div>
            <p className="text-sm text-muted-foreground">총 경력 1년 7개월</p>
          </div>

          <div className="divide-y divide-border border-t border-border">
            {CAREERS.map((c, i) => (
              <div key={i} className="py-8 grid grid-cols-1 md:grid-cols-[48px_1fr_auto] gap-4 md:gap-6">
                {/* Index */}
                <span className="text-xs font-mono text-muted-foreground/50 pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Main info */}
                <div>
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <p className="text-lg font-bold tracking-tight">{c.company}</p>
                    <p className="text-sm text-muted-foreground">{c.team}</p>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mb-3">{c.period} · {c.duration}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.work}</p>
                </div>

                {/* Badge + salary */}
                <div className="flex md:flex-col items-start md:items-end gap-2">
                  <span className="inline-block px-3 py-1 text-xs border border-border rounded-full text-muted-foreground whitespace-nowrap">
                    {c.type}
                  </span>
                  <p className="text-sm text-muted-foreground whitespace-nowrap">{c.salary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHARACTER ──────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="mb-10">
            <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
              04 · Character
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
            {CHARS.map(({ badge, title, body, accent }) => (
              <div key={badge} className="bg-background p-8">
                <span className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase border border-border rounded-full text-muted-foreground mb-5 font-medium">
                  {badge}
                </span>
                <h3 className="text-base font-bold leading-snug mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                {accent && (
                  <p className="mt-5 text-xl font-bold">{accent}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ─────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-24">
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-8">
            05 · Vision
          </p>
          <h2 className="text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-6 max-w-3xl">
            &ldquo;AI 에이전트 기반 자동화로{" "}
            <span className="text-muted-foreground">24시간 멈추지 않는</span>
            {" "}지능형 시스템을 구축합니다.&rdquo;
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
            단순 도구 활용을 넘어, AI가 결과물을 검수하고 관리하는 자동화 시스템 구축이
            가장 도전하고 싶은 핵심 영역입니다. 팀이 반복 업무에서 자유로워지고
            독보적인 기술 우위를 점할 수 있도록 기여하겠습니다.
          </p>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────── */}
      <section>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium mb-3">
                06 · Contact
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                포지션 제안하기
              </h2>
              <p className="text-muted-foreground mt-1.5 text-sm">
                채용 제안, 프로젝트 협업 문의를 환영합니다.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href="tel:01067315242"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border hover:bg-muted transition-colors text-sm font-medium rounded-xl"
              >
                📞 010-6731-5242
              </a>
              <a
                href={GMAIL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background hover:opacity-80 transition-opacity text-sm font-medium rounded-xl"
              >
                ✉️ 이메일로 제안하기
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
