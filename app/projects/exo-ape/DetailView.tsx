'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, ChevronRight } from 'lucide-react';
import Lenis from 'lenis';

const EASE = [0.76, 0, 0.24, 1] as const;

// ─── 재사용 애니메이션 컴포넌트 ───────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 55 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealLine({ delay = 0 }: { delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });
  return (
    <div ref={ref} className="overflow-hidden h-px w-full bg-white/10">
      <motion.div
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay, ease: EASE }}
        className="h-full w-full bg-white/20"
      />
    </div>
  );
}

// 스크롤 패럴랙스 이미지
function ParallaxImage({
  src,
  alt,
  containerRef,
  className = '',
}: {
  src: string;
  alt: string;
  containerRef: React.RefObject<HTMLElement | null>;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.25 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function AwardRow({ name, award, index }: { name: string; award: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
    >
      <RevealLine />
      <div className="flex justify-between items-center py-7 group cursor-pointer hover:opacity-60 transition-opacity">
        <span className="text-xl md:text-2xl font-light text-white">{name}</span>
        <div className="flex items-center gap-6">
          <span className="text-sm text-white/35 tracking-wide hidden md:block">{award}</span>
          <ArrowUpRight size={18} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── 메인 DetailView ─────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  meta: { client: string; services: string; date: string };
  content: { heading: string; description: string; additionalImage: string };
  awards?: { name: string; award: string }[];
}

export default function DetailView({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // 부드러운 스크롤 (Lenis)
  useEffect(() => {
    const wrapper = scrollRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      setScrolled(scroll > 60);
    });

    let raf: number;
    const animate = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      ref={scrollRef}
      data-lenis-prevent
      className="fixed inset-0 z-[50] overflow-y-auto no-scrollbar bg-[#0a0a0a] text-white"
    >
      {/* ── 왼쪽 중앙 뒤로가기 버튼 ── */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        onClick={onClose}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-[160] flex flex-col items-center gap-4 group cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
          <X size={22} strokeWidth={2} className="text-white group-hover:text-black transition-colors duration-300" />
        </div>
        <span
          className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors duration-300"
          style={{ writingMode: 'vertical-rl' }}
        >
          Back
        </span>
      </motion.button>

      <div ref={contentRef}>
      {/* ══════════════════════════════════════════
          1. HERO — 전체 화면
         ══════════════════════════════════════════ */}
      <motion.section
        layoutId={`hero-${project.id}`}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* layoutId 공유 이미지 — 애니메이션 없이 즉시 표시 */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* 그라데이션 오버레이 — 레이아웃 전환 후 페이드인 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"
        />

        {/* 타이틀 */}
        <div className="absolute bottom-16 left-10 md:left-16 right-10 md:right-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: EASE }}
            className="text-white/50 text-[11px] tracking-[0.35em] uppercase mb-4"
          >
            {project.subtitle}
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6, duration: 1.1, ease: EASE }}
              className="font-light leading-[0.88] tracking-tight text-white"
              style={{ fontSize: 'clamp(4rem, 10vw, 11rem)' }}
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Visit website 버튼 */}
          <motion.a
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
            href="#"
            className="mt-8 inline-flex items-center gap-3 border border-white/30 px-6 py-3 text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-white hover:text-black transition-all duration-300 group"
          >
            Visit website
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>

        {/* 스크롤 힌트 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 right-10 md:right-16 flex flex-col items-center gap-2"
        >
          <div className="h-12 w-px bg-white/20 overflow-hidden">
            <motion.div
              className="h-full w-full bg-white/60"
              animate={{ y: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <span className="text-[9px] tracking-[0.35em] uppercase text-white/40">Scroll</span>
        </motion.div>
      </motion.section>

      {/* ══════════════════════════════════════════
          2. 인트로 — 프로젝트 설명 + 메타
         ══════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] px-10 md:px-20 lg:px-32 py-32 md:py-48">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/35 mb-12">Overview</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2
              className="font-light leading-tight tracking-tight text-white mb-20"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 6rem)' }}
            >
              {project.content.heading}
            </h2>
          </FadeUp>

          <RevealLine delay={0.15} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-20">
            {/* 본문 */}
            <FadeUp delay={0.2} className="lg:col-span-7">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-white/65">
                {project.content.description}
              </p>
            </FadeUp>

            {/* 메타 */}
            <div className="lg:col-span-4 lg:col-start-9 space-y-10">
              {[
                { label: 'Client', value: project.meta.client },
                { label: 'Services', value: project.meta.services },
                { label: 'Date', value: project.meta.date },
              ].map(({ label, value }, i) => (
                <FadeUp key={label} delay={0.25 + i * 0.08}>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/30 mb-2">{label}</p>
                  <p className="text-base font-light text-white/80 leading-relaxed">{value}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. 전체폭 이미지 (패럴랙스)
         ══════════════════════════════════════════ */}
      <section className="relative w-full" style={{ height: '80vh' }}>
        <ParallaxImage
          src={project.content.additionalImage || project.image}
          alt={project.title}
          containerRef={scrollRef}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* ══════════════════════════════════════════
          4. 피처 섹션 — 두 컬럼 텍스트
         ══════════════════════════════════════════ */}
      <section className="bg-[#0f0f0f] px-10 md:px-20 lg:px-32 py-36 md:py-52">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-start">
          <FadeUp>
            <h3
              className="font-light leading-tight tracking-tight text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
            >
              Unforgettable<br />in every scroll
            </h3>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-lg md:text-xl font-light leading-relaxed text-white/55 mt-4 md:mt-6">
              Every interaction was designed to create an emotional connection — balancing
              sensory-rich visuals with frictionless usability. The result is a digital experience
              that users remember long after they leave the screen.
            </p>
            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
              className="mt-10 inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/60 hover:text-white transition-colors group"
            >
              View case study
              <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. 두 번째 이미지 (가로 전체)
         ══════════════════════════════════════════ */}
      <section className="relative w-full" style={{ height: '65vh' }}>
        <ParallaxImage
          src={project.image}
          alt={project.title}
          containerRef={scrollRef}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40" />
        <FadeUp className="absolute bottom-12 left-10 md:left-20 right-10 md:right-20 pointer-events-none">
          <p
            className="font-light tracking-tight text-white/80"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 4rem)' }}
          >
            "Boundary-pushing work that<br />sets a new standard."
          </p>
          <p className="mt-4 text-sm text-white/40 tracking-[0.2em]">— {project.meta.client}</p>
        </FadeUp>
      </section>

      {/* ══════════════════════════════════════════
          6. AWARDS
         ══════════════════════════════════════════ */}
      {project.awards && project.awards.length > 0 && (
        <section className="bg-[#0a0a0a] px-10 md:px-20 lg:px-32 py-32 md:py-48">
          <div className="max-w-[1400px] mx-auto">
            <FadeUp>
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/30 mb-12">Recognition</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h3
                className="font-light tracking-tight text-white mb-16"
                style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)' }}
              >
                Awards &<br />Recognitions
              </h3>
            </FadeUp>

            <div className="space-y-0">
              {project.awards.map(({ name, award }, i) => (
                <AwardRow key={name} name={name} award={award} index={i} />
              ))}
              <RevealLine />
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          7. NEXT PROJECT
         ══════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden cursor-pointer group"
        style={{ height: '60vh' }}
        onClick={onClose}
      >
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000"
            alt="Next project"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/35 transition-colors duration-500" />

        <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-20">
          <FadeUp>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/40 mb-4">Next Project</p>
            <div className="flex items-end justify-between">
              <h4
                className="font-light text-white leading-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 6rem)' }}
              >
                Back to<br />Projects
              </h4>
              <motion.div
                whileHover={{ x: 6, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight size={40} className="text-white/50 group-hover:text-white transition-colors" />
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      </div>
    </motion.div>
  );
}
