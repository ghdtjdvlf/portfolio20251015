import "./section01.css";
import { docs, meta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import Link from "next/link";
import { Preloader } from "@/components/Preloader";
import { DiagonalNavCards } from "@/components/DiagonalNavCards";
import { ProjectsGridHome } from "@/components/projects-grid-home";
import { ParallaxHeroSection } from "@/components/ParallaxHeroSection";
import { SkillsInteractive } from "@/components/SkillsInteractive";
import { AboutContent } from "@/components/AboutContent";



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


export default async function HomePage() {
  const allPages = blogSource.getPages() as BlogPage[];

  // 전체 프로젝트 이미지/비디오 URL 수집 (프리로드용)
  const preloadUrls = Array.from(new Set(
    allPages.flatMap((p) => {
      const d = p.data as any;
      return [d.thumbnail, d.thumbnailCard, d.additionalImage].filter(Boolean);
    })
  ));

  const parseStartDate = (s: string) => {
    const parts = s.replace(/\./g, "-").split("-").filter(Boolean);
    if (parts.length === 2) parts.push("01");
    return new Date(parts.join("-")).getTime();
  };

  const latestFour = allPages
    .filter((p) => p.data.tags?.includes("main"))
    .sort((a, b) => {
      const aOrder = a.data.order ?? Infinity;
      const bOrder = b.data.order ?? Infinity;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return parseStartDate(b.data.date.start) - parseStartDate(a.data.date.start);
    })
    .map((p) => ({
      url: `/projects?id=${encodeURIComponent(p.url.replace("/blog/", ""))}`,
      title: p.data.title,
      description: p.data.description,
      date: p.data.date,
      thumbnail: p.data.thumbnail,
      tags: p.data.tags?.filter((t) => !/^\d+$/.test(t) && t !== "main"),
    }));

  return (
    <div>
      <Preloader urls={preloadUrls} />
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



      <ParallaxHeroSection />

      {/*
    <div className="py-4 hidden md:block">
      <ScrollSyncReveal content={content} />
    </div> */}

      {/* <GsapListSlide /> */}

      <AboutContent />
      {/* section02 기술스택 */}
      <SkillsInteractive />
      {/* section02 기술스택 end */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-medium">Projects</span>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"
          >
            모든 프로젝트 보기
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <ProjectsGridHome projects={latestFour} />
      </div>
      <DiagonalNavCards />
    </div>
  );
}
