import { docs, meta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { Suspense } from "react";
import { ProjectsList } from "@/components/projects-list";
import { TagFilter } from "@/components/tag-filter";
import { SortFilter } from "@/components/sort-filter";

interface BlogData {
  title: string;
  description: string;
  date: { start: string; end: string; day: string };
  tags?: string[];
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

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}) {
  const resolvedParams = await searchParams;
  const sortOrder = resolvedParams.sort || "latest";
  const selectedTag = resolvedParams.tag || "All";

  const allPages = blogSource.getPages() as BlogPage[];

  const sorted = [...allPages].sort((a, b) => {
    if (sortOrder === "duration") {
      const getDays = (s?: string) => {
        if (!s) return 0;
        const match = s.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
      };
      return getDays(b.data.date.day) - getDays(a.data.date.day);
    }
    if (sortOrder === "latest") {
      const aOrder = a.data.order ?? Infinity;
      const bOrder = b.data.order ?? Infinity;
      if (aOrder !== bOrder) return aOrder - bOrder;
    }
    const dateA = new Date(a.data.date.end).getTime();
    const dateB = new Date(b.data.date.end).getTime();
    return sortOrder === "oldest" ? dateA - dateB : dateB - dateA;
  });

  const allTags = [
    "All",
    ...Array.from(
      new Set(
        sorted.flatMap((p) =>
          (p.data.tags || []).filter((t) => !/^\d+$/.test(t) && t !== "main")
        )
      )
    ).sort(),
  ];

  const filtered =
    selectedTag === "All"
      ? sorted
      : sorted.filter((p) => p.data.tags?.includes(selectedTag));

  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] =
      tag === "All"
        ? sorted.length
        : sorted.filter((p) => p.data.tags?.includes(tag)).length;
    return acc;
  }, {} as Record<string, number>);

  const projects = filtered.map((p) => ({
    url: p.url,
    title: p.data.title,
    description: p.data.description,
    date: p.data.date,
    thumbnail: p.data.thumbnail,
    tags: p.data.tags?.filter((t) => !/^\d+$/.test(t) && t !== "main"),
  }));

  return (
    <div className="min-h-screen">
      {/* 페이지 헤더 */}
      <div className="p-4 md:p-6 border-b border-border flex flex-col gap-6 min-h-[200px] justify-center">
        <div className="max-w-7xl mx-auto w-full px-4">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="font-medium text-4xl md:text-5xl tracking-tighter">
              Projects
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              기획부터 퍼블리싱까지 직접 참여한 프로젝트들을 소개합니다.
            </p>
          </div>
        </div>

        {allTags.length > 0 && (
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-4 md:items-center md:justify-between px-4">
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              tagCounts={tagCounts}
            />
            <Suspense fallback={<div className="h-8" />}>
              <SortFilter />
            </Suspense>
          </div>
        )}
      </div>

      {/* 프로젝트 목록 */}
      <div className="mx-auto w-full px-4 md:px-6 py-8">
        <ProjectsList projects={projects} />
      </div>
    </div>
  );
}
