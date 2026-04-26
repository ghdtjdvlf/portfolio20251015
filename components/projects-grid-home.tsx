"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ProjectItem {
  url: string;
  title: string;
  description: string;
  date: { start: string; end: string; day?: string };
  thumbnail?: string;
  tags?: string[];
}

interface ProjectsGridHomeProps {
  projects: ProjectItem[];
  hrefOverride?: string;
}

export function ProjectsGridHome({ projects, hrefOverride }: ProjectsGridHomeProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const renderCard = (project: ProjectItem, originalIndex: number) => {
    const isHovered = hoveredIndex === originalIndex;
    const isDimmed = hoveredIndex !== null && !isHovered;

    return (
      <Link
        key={project.url}
        href={hrefOverride ?? project.url}
        className={cn(
          "group flex flex-col rounded-2xl border border-border overflow-hidden",
          "transition-opacity duration-300",
          isDimmed ? "opacity-40" : "opacity-100"
        )}
        onMouseEnter={() => setHoveredIndex(originalIndex)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {project.thumbnail && (
          <div className="relative w-full h-70 flex-shrink-0">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              unoptimized={project.thumbnail.endsWith(".gif")}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        <div className="p-5 flex flex-col gap-2 bg-background flex-1">
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-muted px-2.5 py-0.5 rounded-full text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h3 className="text-lg font-semibold text-card-foreground group-hover:underline underline-offset-4">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {project.description}
          </p>
          <time className="block text-xs text-muted-foreground mt-auto pt-2">
            {project.date.start} ~ {project.date.end}
          </time>
          {project.date.day && (
            <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full w-fit">
              {project.date.day}
            </span>
          )}
        </div>
      </Link>
    );
  };

  const leftProjects = projects.filter((_, i) => i % 2 === 0);
  const rightProjects = projects.filter((_, i) => i % 2 !== 0);

  return (
    <>
      {/* 모바일: 단일 열 */}
      <div className="flex flex-col gap-4 md:hidden">
        {projects.map((project, i) => renderCard(project, i))}
      </div>

      {/* 데스크톱: 두 열 - 오른쪽 열을 아래로 오프셋 */}
      <div className="hidden md:flex gap-6 items-start">
        <div className="flex flex-col gap-6 flex-1">
          {leftProjects.map((project, i) => renderCard(project, i * 2))}
        </div>
        <div className="flex flex-col gap-6 flex-1 mt-10">
          {rightProjects.map((project, i) => renderCard(project, i * 2 + 1))}
        </div>
      </div>
    </>
  );
}
