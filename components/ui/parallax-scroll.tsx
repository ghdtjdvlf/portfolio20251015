"use client";
import { useScroll, useTransform, motion, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

function Lightbox({
  images,
  index,
  onClose,
}: {
  images: string[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);
  const [zoom, setZoom] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);
  const isDragging = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const prev = useCallback(() => { setCurrent((c) => (c - 1 + images.length) % images.length); setZoom(1); }, [images.length]);
  const next = useCallback(() => { setCurrent((c) => (c + 1) % images.length); setZoom(1); }, [images.length]);

  const handleZoom = useCallback(() => {
    setZoom((z) => z >= 2.5 ? 1 : parseFloat((z + 0.5).toFixed(1)));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose]);

  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/90"
      style={{ zIndex: 999999 }}
    >
      {/* 좌측 절반 클릭 → 이전 */}
      <div className="absolute inset-y-0 left-0 w-1/2 cursor-pointer" onClick={prev} />
      {/* 우측 절반 클릭 → 다음 */}
      <div className="absolute inset-y-0 right-0 w-1/2 cursor-pointer" onClick={next} />

      {/* 닫기 — drag 포인터 캡처에 방해받지 않도록 onPointerDown 차단 */}
      <button
        style={{ zIndex: 999999 }}
        className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none"
        onPointerDown={(e) => { e.stopPropagation(); }}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        ✕
      </button>

      {/* 이미지 + 버튼 */}
      <div className="relative z-10">
        {/* 이전 버튼 */}
        <button
          className="absolute top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl px-3 py-2"
          style={{ right: "calc(100% + 200px)" }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); prev(); }}
        >
          ‹
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            ref={imgRef}
            src={images[current]}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: zoom }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            drag={zoom > 1 ? "y" : false}
            dragConstraints={{
              top: -(imgRef.current?.offsetHeight ?? 0) * (zoom - 1) / 2,
              bottom: (imgRef.current?.offsetHeight ?? 0) * (zoom - 1) / 2,
            }}
            dragElastic={0.1}
            onDragStart={() => { isDragging.current = true; }}
            onDragEnd={() => { setTimeout(() => { isDragging.current = false; }, 0); }}
            style={{ cursor: zoom > 1 ? "grab" : zoom >= 2.5 ? "zoom-out" : "zoom-in" }}
            whileDrag={{ cursor: "grabbing" }}
            className="max-h-[90vh] max-w-[80vw] object-contain rounded-lg"
            onClick={(e) => { e.stopPropagation(); if (!isDragging.current) handleZoom(); }}
          />
        </AnimatePresence>

        {/* 다음 버튼 */}
        <button
          className="absolute top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-5xl px-3 py-2"
          style={{ left: "calc(100% + 200px)" }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); next(); }}
        >
          ›
        </button>
      </div>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 flex gap-1.5" style={{ zIndex: 999999 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all",
              i === current ? "bg-white w-4" : "bg-white/40"
            )}
          />
        ))}
      </div>
    </motion.div>
  );

  if (!mounted) return null;
  return createPortal(content, document.body);
}

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  // 열별 인덱스 → 전체 인덱스 매핑
  const getIndex = (col: number, idx: number) => {
    if (col === 0) return idx;
    if (col === 1) return third + idx;
    return third * 2 + idx;
  };

  return (
    <>
      <div ref={gridRef} className={cn("w-full", className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-10 px-10">
          <div className="grid gap-10">
            {firstPart.map((el, idx) => (
              <motion.div style={{ y: translateFirst }} key={"grid-1" + idx}>
                <img
                  src={el}
                  className="h-80 w-full object-cover object-left-top rounded-lg !m-0 !p-0 cursor-zoom-in"
                  height="400"
                  width="400"
                  alt="thumbnail"
                  onClick={() => setLightboxIndex(getIndex(0, idx))}
                />
              </motion.div>
            ))}
          </div>
          <div className="grid gap-10">
            {secondPart.map((el, idx) => (
              <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
                <img
                  src={el}
                  className="h-80 w-full object-cover object-left-top rounded-lg !m-0 !p-0 cursor-zoom-in"
                  height="400"
                  width="400"
                  alt="thumbnail"
                  onClick={() => setLightboxIndex(getIndex(1, idx))}
                />
              </motion.div>
            ))}
          </div>
          <div className="grid gap-10">
            {thirdPart.map((el, idx) => (
              <motion.div style={{ y: translateThird }} key={"grid-3" + idx}>
                <img
                  src={el}
                  className="h-80 w-full object-cover object-left-top rounded-lg !m-0 !p-0 cursor-zoom-in"
                  height="400"
                  width="400"
                  alt="thumbnail"
                  onClick={() => setLightboxIndex(getIndex(2, idx))}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
