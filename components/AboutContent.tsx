import Image from "next/image";
import { PerspectiveMarquee } from "@/components/PerspectiveMarquee";
import { TextReveal } from "@/components/magicui/text-reveal";
import { LottieScrollSection } from "@/components/LottieScrollSection";
import { StoryReveal } from "@/components/StoryReveal";
import { TextType } from "@/components/TextType";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import {
  EvervaultCardDemo,
  ThreeHourToFiveMinContent,
  Fullstack,
  Three,
} from "@/components/dynamic-imports";

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
    type: "Web Publisher",
  },
  {
    period: "2025.09 — 2025.11",
    duration: "3개월",
    company: "퍼널먼스",
    team: "퍼포먼스AI1팀",
    work: "(단기 프로젝트) 카페24 자사몰 기능 개선, PC/모바일 퍼블리싱, UI 개선",
    salary: "2,800만원",
    type: "Web Publisher",
  },
  {
    period: "2023.08 — 2024.07",
    duration: "1년",
    company: "원스톤",
    team: "전략기획팀",
    work: "자사 웹사이트 유지보수 및 운영, PC/모바일 퍼블리싱, UI 개선",
    salary: "2,600만원",
    type: "Web Publisher",
  },
];

export function AboutContent() {
  return (
    <>
      <TextReveal text="책임감, 효율적인, 능동적인" />
      <LottieScrollSection />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-8 pb-0 flex items-center justify-between">
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-medium">About Me</span>
          <span className="text-sm tracking-[0.2em] text-muted-foreground font-mono">2026</span>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="flex flex-col gap-6">
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-medium">Web Publisher</p>
              <h1 className="font-bold tracking-tighter leading-none text-7xl md:text-8xl">홍성필</h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-sm">
                끊임없이 배우고 성장하는<br />웹 퍼블리셔 홍성필 입니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {["책임감", "효율적인", "능동적인"].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 border border-border text-base font-medium rounded-full text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-2 font-mono text-sm text-muted-foreground border-t border-border pt-5">
                <div className="flex gap-4">
                  <span className="text-muted-foreground/40 uppercase tracking-widest text-xs w-12 shrink-0 pt-0.5">Birth</span>
                  <span>00.04.16</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground/40 uppercase tracking-widest text-xs w-12 shrink-0 pt-0.5">Edu</span>
                  <span>UIUX 피그마 웹 개발 프론트엔드 과정 <span className="text-muted-foreground/50">25.02 – 25.07</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground/40 uppercase tracking-widest text-xs w-12 shrink-0 pt-0.5">Work</span>
                  <div className="flex flex-col gap-1">
                    <span>원스톤 <span className="text-muted-foreground/50">23.08 – 24.07</span></span>
                    <span>퍼널먼스 <span className="text-muted-foreground/50">25.09 – 25.11</span></span>
                    <span>포비즈코리아 <span className="text-muted-foreground/50">25.12 – 26.03</span></span>
                  </div>
                </div>
              </div>
              <a
                href={GMAIL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-fit px-5 py-2.5 bg-foreground text-background text-base font-medium rounded-lg hover:opacity-80 transition-opacity"
              >
                ✉️ 포지션 제안하기
              </a>
            </div>
            <div className="w-full max-w-sm mx-auto lg:mx-0 lg:max-w-none">
              <div className="relative w-full rounded-2xl overflow-hidden bg-muted" style={{ aspectRatio: "9/16" }}>
                <Image src="/images/about_me.png" alt="홍성필 프로필" fill className="object-cover object-top" priority />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-foreground/90 backdrop-blur-sm">
                  <p className="text-background text-xs tracking-[0.25em] uppercase font-semibold">Hong Seong-pil · Web Publisher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUESTION ───────────────────────────────────── */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-28 md:py-40 flex items-center justify-center">
          <TextType
            text="홍성필은 어떤 사람인가요?"
            speed={70}
            delay={1000}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-white text-center"
          />
        </div>
      </section>

      {/* ── STORY ──────────────────────────────────────── */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-28 flex flex-col items-center text-center">
          <blockquote className="text-3xl md:text-5xl font-semibold leading-snug tracking-tight mb-10 text-foreground whitespace-nowrap">
            &ldquo;8살, 고장 난 PC를 스스로 고치며 탄생한 문제해결가 .&rdquo;
          </blockquote>
          <div className="text-left w-full">
            <StoryReveal />
          </div>
        </div>
      </section>

      {/* ── PERSPECTIVE MARQUEE ────────────────────────── */}
      <section className="border-b border-border overflow-hidden" style={{ height: "340px" }}>
        <PerspectiveMarquee />
      </section>

      {/* ── 문제해결력 ──────────────────────────────────── */}
      <section className="border-b border-border overflow-x-hidden w-full">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl py-14 md:py-20">
          <div className="PointerHighlight mb-6">
            홍성필의
            <PointerHighlight>
              <span className="text-6xl">문제해결력</span>
            </PointerHighlight>
            자세히 보기
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
            <div className="my-5 cursor-pointer w-full 2xl:w-auto">
              <EvervaultCardDemo title="극한의 효율을 찾는 과정" description="클릭해서 자세히 보기" hoverText="3시간 → 5분" modalContent={<ThreeHourToFiveMinContent />} />
            </div>
            <div className="my-5 cursor-pointer w-full 2xl:w-auto">
              <EvervaultCardDemo title="비동기 데이터 처리" description="클릭해서 자세히 보기" hoverText="API 연결" modalContent={<Fullstack />} />
            </div>
            <div className="my-5 cursor-pointer w-full 2xl:w-auto">
              <EvervaultCardDemo title="외주 비용 절감 프로젝트" description="클릭해서 자세히 보기" hoverText="3,000만원" modalContent={<Three />} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CAREER ─────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-16 mb-10">
            <div className="pt-1">
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-medium">03 · Career</span>
            </div>
            <p className="text-base text-muted-foreground">총 경력 1년 7개월</p>
          </div>
          <div className="divide-y divide-border border-t border-border">
            {CAREERS.map((c, i) => (
              <div key={i} className="py-8 grid grid-cols-1 md:grid-cols-[48px_1fr_auto] gap-4 md:gap-6">
                <span className="text-sm font-mono text-muted-foreground/50 pt-1">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <p className="text-xl font-bold tracking-tight">{c.company}</p>
                    <p className="text-base text-muted-foreground">{c.team}</p>
                  </div>
                  <p className="text-sm font-mono text-muted-foreground mb-3">{c.period} · {c.duration}</p>
                  <p className="text-base text-muted-foreground leading-relaxed">{c.work}</p>
                </div>
                <div className="flex md:flex-col items-start md:items-end gap-2">
                  <span className="inline-block px-3 py-1 text-sm border border-border rounded-full text-muted-foreground whitespace-nowrap">{c.type}</span>
                  <p className="text-base text-muted-foreground whitespace-nowrap">{c.salary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
