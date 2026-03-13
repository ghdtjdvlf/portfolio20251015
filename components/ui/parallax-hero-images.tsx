"use client";
import React, { useEffect, useState, useMemo, memo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ImageItem = {
  src: string;
  title?: string;
  href?: string;
};

type ImagePosition = {
  src: string;
  title?: string;
  href?: string;
  position:
    | "top-left"
    | "top-right"
    | "mid-left"
    | "mid-right"
    | "bottom-left"
    | "bottom-right"
    | "far-left"
    | "far-right";
  depth: number;
  delay: number;
};

const positionStyles: Record<
  ImagePosition["position"],
  { top: string; left?: string; right?: string }
> = {
  "top-left": { top: "8%", left: "4%" },
  "top-right": { top: "8%", right: "4%" },
  "mid-left": { top: "38%", left: "6%" },
  "mid-right": { top: "38%", right: "6%" },
  "bottom-left": { top: "68%", left: "4%" },
  "bottom-right": { top: "68%", right: "4%" },
  "far-left": { top: "52%", left: "2%" },
  "far-right": { top: "52%", right: "2%" },
};

const positionOrder: ImagePosition["position"][] = [
  "top-left",
  "top-right",
  "mid-left",
  "mid-right",
  "bottom-left",
  "bottom-right",
  "far-left",
  "far-right",
];

type DepthVariant = "default" | "edge-focus";

const depthValuesByVariant: Record<DepthVariant, number[]> = {
  default: [0.3, 0.35, 0.9, 0.85, 0.4, 0.45, 0.25, 0.2],
  "edge-focus": [0.85, 0.9, 0.3, 0.35, 0.8, 0.85, 0.4, 0.45],
};

const SPRING_CONFIG = { damping: 25, stiffness: 120 };

export interface ParallaxHeroImagesProps {
  images: ImageItem[] | string[];
  className?: string;
  imageClassName?: string;
  variant?: DepthVariant;
}

export const ParallaxHeroImages = ({
  images,
  className,
  imageClassName,
  variant = "default",
}: ParallaxHeroImagesProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, SPRING_CONFIG);
  const smoothMouseY = useSpring(mouseY, SPRING_CONFIG);

  const positions = useMemo(() => {
    const normalized: ImageItem[] = images.slice(0, 8).map((img) =>
      typeof img === "string" ? { src: img } : img
    );
    const depthValues = depthValuesByVariant[variant];
    return normalized.map((item, index) => ({
      ...item,
      position: positionOrder[index],
      depth: depthValues[index],
      delay: index * 0.12,
    }));
  }, [images, variant]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {positions.map((pos, index) => (
        <ParallaxImage
          key={`${pos.src}-${index}`}
          src={pos.src}
          title={pos.title}
          href={pos.href}
          position={pos.position}
          depth={pos.depth}
          delay={pos.delay}
          imageClassName={imageClassName}
          smoothMouseX={smoothMouseX}
          smoothMouseY={smoothMouseY}
        />
      ))}
    </div>
  );
};

interface ParallaxImageProps extends ImagePosition {
  imageClassName?: string;
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
}

const ParallaxImage = memo(function ParallaxImage({
  src,
  title,
  href,
  position,
  depth,
  delay,
  imageClassName,
  smoothMouseX,
  smoothMouseY,
}: ParallaxImageProps) {
  const [hovered, setHovered] = useState(false);
  const maxOffset = 40;

  const translateX = useTransform(
    smoothMouseX,
    [-1, 1],
    [-maxOffset * depth, maxOffset * depth],
  );

  const translateY = useTransform(
    smoothMouseY,
    [-1, 1],
    [-maxOffset * depth, maxOffset * depth],
  );

  const posStyle = positionStyles[position];
  const hasInteraction = !!(title || href);

  return (
    <motion.div
      className="absolute"
      style={{
        top: posStyle.top,
        left: posStyle.left,
        right: posStyle.right,
        x: translateX,
        y: translateY,
        zIndex: hovered ? 50 : Math.round(depth * 10),
      }}
      initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => hasInteraction && setHovered(true)}
        onMouseLeave={() => hasInteraction && setHovered(false)}
      >
        {/* 이미지 */}
        <motion.img
          src={src}
          alt={title ?? ""}
          loading="lazy"
          decoding="async"
          animate={{ filter: hovered ? "blur(3px) brightness(0.6)" : "blur(0px) brightness(1)" }}
          transition={{ duration: 0.25 }}
          className={cn(
            "aspect-4/3 h-20 w-32 rounded-lg object-cover shadow-sm ring-1 ring-black/10 sm:h-40 sm:w-56 md:h-60 md:w-100 dark:ring-white/10",
            imageClassName,
          )}
        />

        {/* 호버 시 제목 */}
        <AnimatePresence>
          {hovered && title && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center rounded-lg px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-white font-semibold text-xs sm:text-sm md:text-base text-center leading-snug drop-shadow-md">
                {title}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 호버 시 보러가기 버튼 슬라이드업 */}
        <AnimatePresence>
          {hovered && href && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 sm:pb-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Link
                href={href}
                onClick={(e) => e.stopPropagation()}
                className="rounded-full bg-white/90 px-3 py-1 text-[10px] sm:text-xs font-semibold text-gray-900 shadow hover:bg-white transition-colors"
              >
                보러가기 →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});
