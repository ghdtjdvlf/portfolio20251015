"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

type ViewMode = "strip" | "grid";

/* ─────────────────────────────────────────────
   아이콘: 스트립 뷰
───────────────────────────────────────────── */
function StripIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      {[2, 5.5, 9, 12.5, 16].map((x) => (
        <rect
          key={x}
          x={x}
          y="2"
          width="2.5"
          height="16"
          rx="1"
          fill={active ? "currentColor" : "currentColor"}
          opacity={active ? 1 : 0.35}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   아이콘: 그리드 뷰
───────────────────────────────────────────── */
function GridIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      {[2, 8.5].map((y) =>
        [2, 8.5, 15].map((x) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="5.5"
            height="5.5"
            rx="1"
            fill="currentColor"
            opacity={active ? 1 : 0.35}
          />
        ))
      )}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   스태거 오프셋 (홀짝 번갈아)
───────────────────────────────────────────── */
function getStaggerY(index: number): number {
  return index % 2 === 0 ? -24 : 24;
}

/* ─────────────────────────────────────────────
   단일 스트립 카드
───────────────────────────────────────────── */
function Strip({
  project,
  isHovered,
  anyHovered,
  staggerY,
  onEnter,
  onLeave,
}: {
  project: ProjectItem;
  isHovered: boolean;
  anyHovered: boolean;
  staggerY: number;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="relative min-w-0 cursor-pointer"
      style={{
        flex: isHovered ? "4 1 0" : anyHovered ? "0.6 1 0" : "1 1 0",
        transition: "flex 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="relative w-full h-full overflow-hidden rounded-xl"
        animate={{
          y: isHovered ? 0 : staggerY,
          scaleY: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        style={{ originY: "center" }}
      >
        <Link href={project.url} className="block w-full h-full">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              unoptimized={project.thumbnail.endsWith(".gif")}
              className={cn(
                "object-cover transition-all duration-500",
                isHovered ? "grayscale-0 scale-[1.06]" : "grayscale scale-100"
              )}
              sizes="20vw"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
              No Image
            </div>
          )}
          <div
            className={cn(
              "absolute inset-0 transition-all duration-400",
              isHovered ? "bg-black/0" : "bg-black/35"
            )}
          />
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-10 bg-gradient-to-t from-black/70 to-transparent"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
              >
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   스트립 뷰 하단 타이틀
───────────────────────────────────────────── */
function TitleArea({ project }: { project: ProjectItem | null }) {
  return (
    <div className="h-16 flex flex-col items-center justify-center text-center select-none">
      <AnimatePresence mode="wait">
        {project ? (
          <motion.div
            key={project.url}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-1"
          >
            <Link href={project.url}>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight hover:underline underline-offset-4">
                {project.title}
              </h2>
            </Link>
            <span className="text-xs text-muted-foreground">
              {project.date.start} ~ {project.date.end}
              {project.date.day && ` · ${project.date.day}`}
            </span>
          </motion.div>
        ) : (
          <motion.p
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-sm text-muted-foreground"
          >
            프로젝트 위로 마우스를 올려보세요
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   그리드 카드 (버전 2)
───────────────────────────────────────────── */
function GridCard({ project }: { project: ProjectItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
    >
      <Link href={project.url} className="group block">
        {/* 썸네일 */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-muted">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              unoptimized={project.thumbnail.endsWith(".gif")}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
              No Image
            </div>
          )}
          {/* 호버 오버레이 */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        </div>

        {/* 텍스트 */}
        <div className="mt-3 flex flex-col gap-1">
          <h2 className="font-semibold text-base md:text-lg tracking-tight text-foreground group-hover:underline underline-offset-4 leading-snug">
            {project.title}
          </h2>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mt-0.5">
            {project.description}
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="text-xs text-muted-foreground">
              {project.date.start} ~ {project.date.end}
            </span>
            {project.tags && project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   메인 컴포넌트
───────────────────────────────────────────── */
export function ProjectsList({ projects }: ProjectsListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("strip");

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        해당 태그의 프로젝트가 없습니다.
      </div>
    );
  }

  const anyHovered = hoveredIndex !== null;
  const hoveredProject = hoveredIndex !== null ? projects[hoveredIndex] : null;

  return (
    <div className="flex flex-col gap-3">
      {/* 뷰 토글 버튼 */}
      <div className="flex justify-end gap-2 px-6 md:px-12 lg:px-20">
        <button
          onClick={() => setViewMode("strip")}
          className={cn(
            "p-2 rounded-lg border border-border transition-colors duration-200",
            viewMode === "strip"
              ? "bg-foreground text-background"
              : "bg-background text-foreground hover:bg-muted"
          )}
          aria-label="스트립 뷰"
        >
          <StripIcon active={viewMode === "strip"} />
        </button>
        <button
          onClick={() => setViewMode("grid")}
          className={cn(
            "p-2 rounded-lg border border-border transition-colors duration-200",
            viewMode === "grid"
              ? "bg-foreground text-background"
              : "bg-background text-foreground hover:bg-muted"
          )}
          aria-label="그리드 뷰"
        >
          <GridIcon active={viewMode === "grid"} />
        </button>
      </div>

      {/* 버전 1: 스트립 갤러리 */}
      {viewMode === "strip" && (
        <>
          <div
            className="flex gap-3 md:gap-4 items-stretch py-12 px-6 md:px-12 lg:px-20"
            style={{ height: "clamp(480px, 70vh, 760px)" }}
          >
            {projects.map((project, index) => (
              <Strip
                key={project.url}
                project={project}
                isHovered={hoveredIndex === index}
                anyHovered={anyHovered}
                staggerY={getStaggerY(index)}
                onEnter={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
          <TitleArea project={hoveredProject} />
        </>
      )}

      {/* 버전 2: 3단 그리드 */}
      {viewMode === "grid" && (
        <div className="max-w-6xl mx-auto w-full px-6 md:px-12 lg:px-20 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <GridCard key={project.url} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
