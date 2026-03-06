import "./section01.css";
import skillCategories, { allSkills } from "@/app/data/skills";
import { GeminiHero } from "@/components/GeminiHero";
import Particles from "@/components/Particles";
import { docs, meta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { ProjectsGridHome } from "@/components/projects-grid-home";
import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { MacbookScrollDemo } from "@/components/ui/macbook-scroll copy";
import { useScroll, useTransform } from "motion/react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import { ScrollSyncReveal } from "@/components/ui/scroll-sync-reveal";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
import { LottieSuccess } from "@/components/LottieSuccess";
import { SkillsAccordion } from "@/components/SkillsAccordion";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import SpotlightCard from "@/components/SpotlightCard";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { HorizontalTextReveal } from "@/components/ui/horizontal-text-reveal";
import { TextReveal } from "@/components/magicui/text-reveal";
import { BentoGalleryFlip } from "@/components/ui/bento-gallery-flip";
import { GsapListSlide } from "@/components/ui/gsap-list-slide";
import FallingText from "@/components/ui/falling-text";
import CometCard from "@/components/ui/comet-card";
import { Compare } from "@/components/ui/compare";
import ScrollVelocity from "@/components/ScrollVelocity";
import EvervaultCardDemo from "@/components/magicui/CardReveal";
import { ThreeHourToFiveMinContent } from "@/components/3hour-to-5min-content";
import { Fullstack } from "@/components/Fullstack";
import { Three } from "@/components/30000";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { LottieContainer } from "@/components/LottieContainer";
import { LottieScrollSection } from "@/components/LottieScrollSection";



interface BlogData {
  title: string;
  description: string;
  date: {
    start: string;
    end: string;
    day: string;
  };
  tags?: string[];
  featured?: boolean;
  readTime?: string;
  author?: string;
  authorImage?: string;
  thumbnail?: string;
  order?: number;
}

interface BlogPage {
  url: string;
  data: BlogData;
}

const blogSource = loader({
  baseUrl: "/blog",
  source: createMDXSource(docs, meta),
});

const formatProjectPeriod = (date: { start: string; end: string }): string => {
  return `${date.start} ~ ${date.end}`;
};

const parseStartDate = (s: string) => {
  const parts = s.replace(/\./g, "-").split("-").filter(Boolean);
  if (parts.length === 2) parts.push("01");
  return new Date(parts.join("-")).getTime();
};

const content = [
  {
    title: "3시간 -> 5분",
    description:
      "반복 업무 프로세스를 개선하여 작업 시간을 3시간에서 5분으로 97% 단축시키며, 비효율을 제거하고 업무 효율을 극대화한 사례입니다",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
          <img src="images/단순.png" alt="" />
      </div>
    ),
  },

  {
    title: "API 연동 및 구현",
    description:
      "입사 2주 차, 카페24 유지보수 최고가의 API 연동 작업을 3일 안에 해결. CORS 문제를 Firebase로 극복하고 토큰 자동화까지 구현한 경험.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
          <img src="images/full/2-05.png" alt="" />
      </div>
    ),
  },
    {
    title: "3천만원",
    description:
      "연간 3,000만 원이 소요되던 외주 작업을 기술 내재화(자체 개발)를 통해 0원으로 전환하며, 비용을 100% 절감한 운영 효율화 사례입니다",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
              
      <img src="images/3/Group 1.png" alt="" />
      </div>
    ),
  },

];

export default async function HomePage() {
  const allPages = blogSource.getPages() as BlogPage[];
  const latestFour = allPages
    .filter((p) => p.data.tags?.includes("main"))
    .sort((a, b) => {
      const aOrder = a.data.order ?? Infinity;
      const bOrder = b.data.order ?? Infinity;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return parseStartDate(b.data.date.start) - parseStartDate(a.data.date.start);
    })
    .map((p) => ({
      url: p.url,
      title: p.data.title,
      description: p.data.description,
      date: p.data.date,
      thumbnail: p.data.thumbnail,
      tags: p.data.tags?.filter((t) => !/^\d+$/.test(t) && t !== "main"),
    }));

  return (
    <div>
      {/* <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
        <div className="h1-title absolute-center">
          <h1>웹퍼블리셔 홍성필 포트폴리오</h1>
        </div>
      </div> */}

      <GeminiHero />

      <BentoGalleryFlip />

      {/* <HorizontalTextReveal>책임감, 효율적인, 능동적인</HorizontalTextReveal> */}

      <TextReveal
        text="책임감, 효율적인, 능동적인"
      />

      <LottieScrollSection />
{/* 
    <div className="py-4 hidden md:block">
      <ScrollSyncReveal content={content} />
    </div> */}

      {/* <GsapListSlide /> */}

      {/* section01 자기소개 */}
      <section className="section01 intro overflow-x-hidden w-full">
        <div className="mx-auto max-w-lg py-20 text-2xl font-bold tracking-tight md:text-4xl"></div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl overflow-x-hidden">
          <div className="PointerHighlight">
            홍성필의
            <PointerHighlight>
              <span className="text-6xl">문제해결력</span>
            </PointerHighlight>
            더 자세히 보기
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
            <div className="my-5 cursor-pointer w-full 2xl:w-auto">
              <EvervaultCardDemo
                title="극한의 효율을 찾는 과정"
                description="클릭해서 자세히 보기"
                hoverText="3시간 → 5분"
                modalContent={<ThreeHourToFiveMinContent />}
              />
            </div>
            <div className="my-5 cursor-pointer w-full 2xl:w-auto">
              <EvervaultCardDemo
                title="비동기 데이터 처리"
                description="클릭해서 자세히 보기"
                hoverText="API 데이터 바인딩"
                modalContent={<Fullstack />}
              />
            </div>
            <div className="my-5 cursor-pointer w-full 2xl:w-auto">
              <EvervaultCardDemo
                title="외주 비용 절감 프로젝트"
                description="클릭해서 자세히 보기"
                hoverText="3,000만원"
                modalContent={<Three />}
              />
            </div>

            {/* <div className="my-5 cursor-pointer">
              <EvervaultCardDemo
                title="풀스택 개발 과제"
                description="클릭해서 자세히 보기"
                hoverText="소비자 고발 해결 "
                modalContent={<ThreeHourToFiveMinContent />}
              />
            </div>

            <div className="my-5 cursor-pointer">
              <EvervaultCardDemo
                title="카페24 API 연동"
                description="클릭해서 자세히 보기"
                hoverText="3,000만원"
                modalContent={<ThreeHourToFiveMinContent />}
              />
            </div> */}
          </div>

          <div className="mx-auto w-80"></div>
        </div>
      </section>
      {/* section01 자기소개 */}
      {/* section02 기술스택 + FallingText 래퍼 */}
      <div style={{ position: "relative" }}>

        {/* skills 섹션 — FallingText(999)보다 높은 z-index */}
        <section className="section02 text" style={{ position: "relative", zIndex: 1000 }}>
          <div className="sec02-container">
            <div className="flex flex-col gap-2  text-center title">
              <h2 className="font-medium text-4xl md:text-5xl tracking-tighter">
                Skills
              </h2>
              <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
                프로젝트를 완성도로 이끄는 기술적 역량과 도구들을 다룹니다.
              </p>
            </div>

            {/* PC용 전체 그리드 (1024px 이상) */}
            <div className="skills-grid-desktop">
              {allSkills.map((skill, index) => (
                <SpotlightCard
                  key={index}
                  className="custom-spotlight-card flex flex-col items-start justify-center p-5 gap-2"
                  spotlightColor="rgba(0, 229, 255, 0.15)"
                >
                  <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200 w-full">
                    {skill.icon}
                    <p className="skill-title font-semibold text-lg flex-1">
                      {skill.title}
                    </p>
                    {skill.trend && (
                      <span className="skill-trend-badge">🔥 Trend</span>
                    )}
                  </div>
                  <p className="skill-prd text-sm text-gray-600 dark:text-gray-400 leading-snug">
                    {skill.desc}
                  </p>
                </SpotlightCard>
              ))}
            </div>

            {/* 모바일용 마퀴 (1023px 이하) */}
            <div className="skills-accordion-mobile">
              <SkillsMarquee />
              <div className="flex justify-center mt-8">
                <Link
                  href="/skills"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-sm font-medium"
                >
                  스킬 자세히 보기
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 착지 공간: skills 아래 350px — 단어들이 여기 쌓임 */}
        <div style={{ height: "10rem" }} />

        {/* FallingText 오버레이
            - skills 섹션 상단부터 착지 공간 하단까지 전체를 커버
            - z-index 999로 낙하 중 시각적으로 앞에 보임
            - pointer-events: none → 낙하 중에도 skills 카드 인터랙션 유지
            - 단어들은 physics floor(착지공간 바닥)에서 멈춤 */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          pointerEvents: "none",
        }}>
          {/* 데스크톱: 전체 스킬 */}
          <div className="hidden md:block h-full">
            <FallingText
              text={allSkills.map((s) => s.title).join(" ")}
              highlightWords={allSkills.filter((s) => s.trend).map((s) => s.title)}
              trigger="scroll"
              gravity={0.8}
              fontSize="1.4rem"
            />
          </div>
          {/* 모바일: 트렌드 중심 절반만 */}
          <div className="block md:hidden h-full">
            <FallingText
              text="Html5 CSS3 Tailwind Figma JavaScript Gsap React Firebase 카페24 Notion git Jira Claude"
              highlightWords={["Figma", "Tailwind", "React", "Jira", "Claude"]}
              trigger="scroll"
              gravity={0.8}
              fontSize="1.2rem"
            />
          </div>
        </div>

      </div>
      {/* section02 기술스택 */}
      <div className="absolute top-0 left-0 z-0 w-full h-[200px] overflow-hidden [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>
      <div className="p-4 md:p-6 border-b border-border flex flex-col gap-6 min-h-[200px] justify-center relative z-10 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full px-4">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="font-medium text-4xl md:text-5xl tracking-tighter">
              Projects
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              기획부터 퍼블리싱까지 직접 참여한 프로젝트들을 소개합니다.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 overflow-x-hidden">
        <ProjectsGridHome projects={latestFour} />
        <div className="flex justify-center py-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-sm font-medium"
          >
            모든 프로젝트 보기
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
