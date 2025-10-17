import "./section01.css";
import skillCategories, { allSkills } from "@/app/data/skills"

import { docs, meta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { Suspense } from "react";
import { BlogCard } from "@/components/blog-card";
import { TagFilter } from "@/components/tag-filter";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { MacbookScrollDemo } from "@/components/ui/macbook-scroll copy";

import { PointerHighlight } from "@/components/ui/pointer-highlight";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import { SkillsAccordion } from '@/components/SkillsAccordion';
import SpotlightCard from '@/components/SpotlightCard';
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { TextReveal } from "@/components/ui/text-reveal"
import  CometCard from "@/components/ui/comet-card";

interface BlogData {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  readTime?: string;
  author?: string;
  authorImage?: string;
  thumbnail?: string;
}

interface BlogPage {
  url: string;
  data: BlogData;
}

const blogSource = loader({
  baseUrl: "/blog",
  source: createMDXSource(docs, meta),
});

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const allPages = blogSource.getPages() as BlogPage[];
  const sortedBlogs = allPages.sort((a, b) => {
    const dateA = new Date(a.data.date).getTime();
    const dateB = new Date(b.data.date).getTime();
    return dateB - dateA;
  });

  const allTags = [
    "All",
    ...Array.from(
      new Set(sortedBlogs.flatMap((blog) => blog.data.tags || []))
    ).sort(),
  ];

  const selectedTag = resolvedSearchParams.tag || "All";
  const filteredBlogs =
    selectedTag === "All"
      ? sortedBlogs
      : sortedBlogs.filter((blog) => blog.data.tags?.includes(selectedTag));

  const tagCounts = allTags.reduce((acc, tag) => {
    if (tag === "All") {
      acc[tag] = sortedBlogs.length;
    } else {
      acc[tag] = sortedBlogs.filter((blog) =>
        blog.data.tags?.includes(tag)
      ).length;
    }
    return acc;
  }, {} as Record<string, number>);

  const items = [
    {
      title: "늘 밝고 긍정적인 에너지를 지니고 있어요 (웃는상)",
      image:
        "https://images.unsplash.com/photo-1732310216648-603c0255c000?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "귀여운 강아지,고양이와 같이 살아요",
      image:
        "https://images.unsplash.com/photo-1697909623564-3dae17f6c20b?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "빠른 습득력과 적응력이 장점",
      image:
        "https://images.unsplash.com/photo-1697909623564-3dae17f6c20b?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "아임웹, 카페24 기반 실무 경험 있어요!",
      image:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "원스톤 쇼핑몰에서 1년간 디자인,퍼블리싱 직무로 근무 했어요",
      image:
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "피그마와 퍼블리싱에 자신있어요",
      image:
        "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "저는 00년생 26살 홍성필입니다.",
      image:
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "한장씩 넘겨주세요!",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];

  const blogContent = {
  slug: "amazing-tailwindcss-grid-layouts",
  author: "Manu Arora",
  date: "28th March, 2023",
  title: "Amazing Tailwindcss Grid Layout Examples",
  description:
    "Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
  image: "/demo/thumbnail.png",
  authorAvatar: "/manu.png",
}



;
 
const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex items-center space-x-2">
    <img
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="h-[30rem] flex items-center justify-center">
        <TextHoverEffect text="퍼블리셔 홍성필" />
      </div>
      z
      <div className="h1-title">
        {" "}
        <h1>웹 퍼블리셔 홍성필 포트폴리오</h1>
      </div>
      <TextReveal>Magic UI will change the way you design.</TextReveal>
      <section className="section00">
        <div className="intro_wrap">
          <div className="CometCard-container">
            <CometCard>
              <button
                type="button"
                className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-0 md:my-20 md:p-4"
                aria-label="View invite F7RA"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "none",
                  opacity: 1,
                }}
              >
                <div className="mx-2 flex-1">
                  <div className="relative mt-2 aspect-[3/4] ">
                    <img
                      loading="lazy"
                      className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75"
                      alt="Invite background"
                      src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                        opacity: 1,
                      }}
                    />
                  </div>
                </div>
                <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
                  <div className="text-xs">Comet Invitation</div>
                  <div className="text-xs text-gray-300 opacity-50">#F7RA</div>
                </div>
              </button>
            </CometCard>
          </div>
          <div className="text_wrap">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />
              Numquam suscipit voluptas molestiae doloremque velit laboriosam
              quibusdam, <br />
              laudantium harum temporibus rem sint sequi quia et! <br />
              Itaque adipisci quam quis expedita ducimus.
            </p>
          </div>
        </div>
      </section>
      {/* section01 자기소개 */}
      <section className="section01 intro">
        <div className="mx-auto max-w-lg py-20 text-2xl font-bold tracking-tight md:text-4xl "></div>

        <div className="container">
          <div className="PointerHighlight">
            The best way to grow is to
            <PointerHighlight>
              <span>name</span>
            </PointerHighlight>
          </div>
          <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
            <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
              If its your first day at Fight Club, you have to fight.
            </p>
            {items.map((item) => (
              <DraggableCardBody className={item.className}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="pointer-events-none relative z-10 h-80 w-80 object-cover"
                />
                <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                  {item.title}
                </h3>
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>

          <div className="mx-auto w-80"></div>
        </div>
      </section>
      {/* section01 자기소개 */}
      {/* section02 기술스택 */}
      <section className="section02 text">
        <div className="sec02-container">
          <div className="flex flex-col gap-2  text-center title">
            <h2 className="font-medium text-4xl md:text-5xl tracking-tighter">
              Projects
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              Latest news and updates from Magic UI.
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
                <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
                  {skill.icon}
                  <p className="skill-title font-semibold text-lg">
                    {skill.title}
                  </p>
                </div>
                <p className="skill-prd text-sm text-gray-600 dark:text-gray-400 leading-snug">
                  {skill.desc}
                </p>
              </SpotlightCard>
            ))}
          </div>

          {/* 모바일용 아코디언 (1023px 이하) */}
          <div className="skills-accordion-mobile">
            <SkillsAccordion categories={skillCategories} />
          </div>
        </div>
      </section>
      {/* section02 기술스택 */}
      <div className="absolute top-0 left-0 z-0 w-full h-[200px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>
      <div className="p-6 border-b border-border flex flex-col gap-6 min-h-[250px] justify-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2  text-center title">
            <h2 className="font-medium text-4xl md:text-5xl tracking-tighter">
              Projects
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              Latest news and updates from Magic UI.
            </p>
          </div>
        </div>
        {allTags.length > 0 && (
          <div className="max-w-7xl mx-auto w-full">
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              tagCounts={tagCounts}
            />
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-0">
        <Suspense fallback={<div>Loading articles...</div>}>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden border-x border-border ${
              filteredBlogs.length < 4 ? "border-b" : "border-b-0"
            }`}
          >
            {filteredBlogs.map((blog) => {
              const date = new Date(blog.data.date);
              const formattedDate = formatDate(date);

              return (
                <BlogCard
                  key={blog.url} // ✅ 고유 key 추가
                  url={blog.url}
                  title={blog.data.title}
                  description={blog.data.description}
                  date={formattedDate}
                  thumbnail={blog.data.thumbnail}
                  showRightBorder={filteredBlogs.length < 3}
                />
              );
            })}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
