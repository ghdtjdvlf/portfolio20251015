"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectItem {
  url: string;
  title: string;
  description: string;
  date: { start: string; end: string; day?: string };
  thumbnail?: string;
  tags?: string[];
}

interface ProjectsListProps {
  projects: ProjectItem[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        해당 태그의 프로젝트가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {projects.map((project, index) => {
        const isEven = index % 2 === 0;
        const isHovered = hoveredIndex === index;
        const isDimmed = hoveredIndex !== null && !isHovered;

        return (
          <Link
            key={project.url}
            href={project.url}
            className={cn(
              "group relative flex flex-col md:flex-row",
              "rounded-2xl border border-border overflow-hidden",
              "min-h-[340px] md:min-h-[420px]",
              "transition-opacity duration-300",
              isDimmed ? "opacity-40" : "opacity-100"
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* 이미지 블록 */}
            <div
              className={cn(
                "relative flex-shrink-0",
                "w-full h-60 md:h-auto md:w-[58%]",
                isEven ? "md:order-1" : "md:order-2"
              )}
            >
              {project.thumbnail ? (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  unoptimized={project.thumbnail.endsWith(".gif")}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  이미지 없음
                </div>
              )}
            </div>

            {/* 텍스트 블록 */}
            <div
              className={cn(
                "flex flex-col justify-center gap-4 p-7 md:p-10 md:w-[42%]",
                "bg-background",
                isEven ? "md:order-2" : "md:order-1"
              )}
            >
              {/* 인덱스 번호 */}
              <span className="text-7xl font-bold text-muted-foreground/100 leading-none select-none -mb-2">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* 태그 */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 제목 */}
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight group-hover:underline underline-offset-4">
                {project.title}
              </h2>

              {/* 설명 */}
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
                {project.description}
              </p>

              {/* 날짜 */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time>{project.date.start} ~ {project.date.end}</time>
                {project.date.day && (
                  <span className="bg-muted px-2 py-0.5 rounded-full text-xs">
                    {project.date.day}
                  </span>
                )}
              </div>

              {/* CTA */}
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary mt-1 group-hover:gap-3 transition-all duration-200 w-fit">
                자세히 보기
                <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
