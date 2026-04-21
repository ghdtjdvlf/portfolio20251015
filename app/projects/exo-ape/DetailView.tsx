'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import Lenis from 'lenis';
import SplitText from '@/components/SplitText';

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
  mdxContent,
  onClose,
}: {
  project: Project;
  mdxContent?: React.ReactNode;
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
      className="fixed inset-0 z-[50] overflow-y-auto no-scrollbar text-white"
    >
      {/* ── 왼쪽 중앙 뒤로가기 버튼 ── */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        onClick={onClose}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-[160] flex flex-col items-center gap-4 group cursor-pointer"
      >
        <div className="w-16 h-16 rounded-full border border-white/30 bg-black flex items-center justify-center group-hover:bg-white transition-colors duration-300">
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
      {/* ══ 1. HERO — ExoApe 배경이 그대로 비치는 투명 섹션 ══ */}
      <section className="relative w-full h-screen">
        {/* 그라데이션 오버레이 — 카드 붕괴 후 서서히 등장 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
        />

        {/* 스크롤 힌트 — 상단 왼쪽 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="absolute top-24 left-10 md:left-16 flex items-center gap-3"
        >
          <div className="w-8 h-px bg-white/30 overflow-hidden relative">
            <motion.div
              className="absolute inset-0 bg-white/70"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">Scroll</span>
        </motion.div>

        {/* 타이틀 — 하단 왼쪽 */}
        <div className="absolute bottom-16 left-10 md:left-16">
          <h1 className="font-normal leading-[0.9] tracking-tight text-white" style={{ fontSize: 'clamp(2rem, 7.7vw, 9rem)' }}>
            {project.title.split('\n').map((line, i) => (
              <SplitText
                key={line + i}
                text={line}
                tag="span"
                className="block"
                splitType="word"
                from={{ y: '110%' }}
                delay={130}
                duration={0.8}
                ease={[0.165, 0.84, 0.44, 1]}
                initialDelay={0}
                once={true}
              />
            ))}
          </h1>
          <SplitText
            text={project.subtitle}
            tag="p"
            className="text-white/60 text-[13px] tracking-[0.25em] uppercase mt-5"
            splitType="word"
            from={{ y: '110%' }}
            delay={130}
            duration={0.8}
            ease={[0.165, 0.84, 0.44, 1]}
            initialDelay={0}
            once={true}
          />
        </div>

        {/* Visit website — 하단 오른쪽 */}
        <motion.a
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
          href="#"
          className="absolute bottom-16 right-10 md:right-16 inline-flex items-center gap-3 border border-white/30 px-6 py-3 text-[11px] font-semibold tracking-[0.22em] uppercase hover:bg-white hover:text-black transition-all duration-300 group"
        >
          Visit website
          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.a>
      </section>

      {/* 히어로 아래 콘텐츠: bg 적용해서 ExoApe 배경 가림 */}
      <div className="bg-[#0a0a0a]">

      {/* ══════════════════════════════════════════
          2. 인트로 — 메타
         ══════════════════════════════════════════ */}
      <section className="bg-[#0a0a0a] px-10 md:px-20 lg:px-32 pt-20 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <RevealLine delay={0.1} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-14 text-center">
            {[
              { label: 'Client', value: project.meta.client },
              { label: 'Services', value: project.meta.services },
              { label: 'Date', value: project.meta.date },
            ].map(({ label, value }, i) => (
              <FadeUp key={label} delay={0.1 + i * 0.07}>
                <p className="text-lg md:text-xl font-light text-white/60 leading-relaxed mb-2">{value}</p>
                <p className="font-semibold text-white" style={{ fontSize: '0.6em' }}>{label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. MDX 본문
         ══════════════════════════════════════════ */}
      {mdxContent ? (
        <div className="mdx-detail px-10 md:px-20 lg:px-32 py-16 max-w-[1400px] mx-auto text-white">
          {mdxContent}
        </div>
      ) : (
        <section className="px-10 md:px-20 lg:px-32 py-32">
          <div className="max-w-[1400px] mx-auto">
            <FadeUp>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-white/65">
                {project.content.description}
              </p>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          4. NEXT PROJECT
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
        .mdx-detail h2 { font-size: clamp(1.6rem, 3vw, 2.8rem); font-weight: 300; line-height: 1.25; margin-top: 3rem; margin-bottom: 1rem; color: rgba(255,255,255,0.9); }
        .mdx-detail h3 { font-size: clamp(1.1rem, 2vw, 1.6rem); font-weight: 400; margin-top: 2.5rem; margin-bottom: 0.75rem; color: rgba(255,255,255,0.8); }
        .mdx-detail p { font-size: 1.05rem; line-height: 1.8; color: rgba(255,255,255,0.6); margin-bottom: 1rem; }
        .mdx-detail ul, .mdx-detail ol { color: rgba(255,255,255,0.6); padding-left: 1.5rem; margin-bottom: 1rem; line-height: 1.8; }
        .mdx-detail li { margin-bottom: 0.3rem; }
        .mdx-detail strong { color: rgba(255,255,255,0.85); font-weight: 500; }
        .mdx-detail hr { border-color: rgba(255,255,255,0.1); margin: 2.5rem 0; }
        .mdx-detail a { color: rgba(255,255,255,0.7); text-decoration: underline; text-underline-offset: 3px; }
        .mdx-detail code { background: rgba(255,255,255,0.08); padding: 0.15em 0.4em; border-radius: 3px; font-size: 0.88em; color: rgba(255,255,255,0.75); }
      `}</style>
      </div>{/* bg-[#0a0a0a] 닫기 */}
      </div>{/* contentRef 닫기 */}
    </motion.div>
  );
}
