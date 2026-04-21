'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import Image from 'next/image';
import Lenis from 'lenis';
import DetailView from './DetailView';
import SplitText from '@/components/SplitText';

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageCard: string;
  meta: { client: string; services: string; date: string };
  content: { heading: string; description: string; additionalImage: string };
  awards?: { name: string; award: string }[];
  link?: string;
};

const TRANSITION = { duration: 0.8, ease: [0.76, 0, 0.24, 1] };
const CARD_W = 'clamp(360px, 36vw, 510px)';
const CARD_H = 'clamp(480px, 48vw, 680px)';

// --- 커스텀 커서 ---
const CustomCursor = ({ isHovered, viewMode, isOverUI }) => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 40 });
  useEffect(() => {
    const move = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);
  const visible = !isOverUI && (viewMode === 'home' || isHovered);
  return (
    <motion.div
      style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      className="fixed top-0 left-0 w-[120px] h-[120px] bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center pointer-events-none z-[200] text-white text-[14px] tracking-[0.25em] font-semibold border border-white/25"
      animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      {viewMode === 'home' ? 'VIEW' : 'SCROLL'}
    </motion.div>
  );
};

// --- 네비게이션 ---
const Navigation = ({ view, onLogoClick }) => (
  <header className="fixed top-0 left-0 w-full px-10 md:px-14 py-8 flex justify-between items-center z-[100] pointer-events-none">
    <div className="flex items-center gap-4">
      <div
        className="cursor-pointer pointer-events-auto select-none"
        onClick={onLogoClick}
      />
    </div>
  </header>
);

// --- 홈 뷰 ---
const HomeView = ({ project, direction, onMouseEnter, onMouseLeave, onCardClick, isCollapsing }) => (
  <motion.div
    key="home-wrapper"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.01 }}
    className="fixed inset-0 z-10 cursor-pointer"
    onClick={!isCollapsing ? onCardClick : undefined}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

    {/* 카드 — 화면 정중앙 */}
    <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
      <motion.div
        animate={{ height: isCollapsing ? 0 : CARD_H, opacity: isCollapsing ? 0 : 1 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        style={{ width: CARD_W, overflow: 'hidden' }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="relative"
      >
        <div style={{ height: CARD_H, position: 'relative' }}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={project.id}
              custom={direction}
              initial={{ y: direction > 0 ? '-100%' : '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: direction > 0 ? '100%' : '-100%' }}
              transition={TRANSITION}
              className="absolute inset-0 overflow-hidden"
            >
              <motion.div
                className="absolute inset-x-0 h-[120%] top-[-10%]"
                initial={{ y: direction > 0 ? '20%' : '-20%' }}
                animate={{ y: '0%' }}
                exit={{ y: direction > 0 ? '-20%' : '20%' }}
                transition={TRANSITION}
              >
                <Image
                  src={project.imageCard}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 36vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>

    {/* 텍스트 — 왼쪽, 카드 왼쪽 경계를 절대 넘지 않음 */}
    <div
      className="absolute pointer-events-none flex items-center"
      style={{
        left: '16%',
        top: 0,
        bottom: 0,
        maxWidth: 'calc(50% - clamp(210px, 21vw, 310px) - 32px)',
      }}
    >
      <motion.div
        animate={{ opacity: isCollapsing ? 0 : 1, y: isCollapsing ? -16 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1 className="font-bold leading-tight tracking-tight text-white" style={{ fontSize: 'clamp(1.6rem, 4.2vw, 4.9rem)' }}>
              {project.title.split('\n').map((line, i) => (
                <SplitText
                  key={`${project.id}-${i}`}
                  text={line}
                  tag="span"
                  className="block"
                  splitType="word"
                  from={{ y: '110%' }}
                  delay={130}
                  duration={0.8}
                  ease={[0.165, 0.84, 0.44, 1]}
                  initialDelay={0}
                  once={false}
                />
              ))}
            </h1>
            <SplitText
              key={`${project.id}-sub`}
              text={project.subtitle}
              tag="p"
              className="text-white/55 mt-4 tracking-[0.15em] font-medium"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.4rem)' }}
              splitType="word"
              from={{ y: '110%' }}
              delay={130}
              duration={0.8}
              ease={[0.165, 0.84, 0.44, 1]}
              initialDelay={0}
              once={false}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  </motion.div>
);

// --- 그리드 뷰 ---
const GridView = ({ projects, onClose, onSelect }: {
  projects: Project[];
  onClose: () => void;
  onSelect: (index: number) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

    let raf: number;
    const animate = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(animate); };
    raf = requestAnimationFrame(animate);

    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
  <motion.div
    ref={scrollRef}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    data-lenis-prevent
    className="fixed inset-0 z-[80] bg-[#0a0a0a]/95 backdrop-blur-sm overflow-y-auto no-scrollbar"
  >
    {/* 닫기 */}
    <button
      onClick={onClose}
      className="fixed top-8 right-10 md:right-14 z-10 text-[10px] font-semibold tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors flex items-center gap-2"
    >
      <span>✕</span> Close
    </button>

    <div ref={contentRef} className="px-10 md:px-14 pt-28 pb-20">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[11px] tracking-[0.35em] uppercase text-white/30 mb-2"
      >
        All Projects
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="font-light text-white mb-16 leading-tight"
        style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
      >
        Work
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.76, 0, 0.24, 1] }}
            onClick={() => onSelect(i)}
            className="group cursor-pointer"
          >
            {/* 이미지 */}
            <div className="relative overflow-hidden bg-white/5" style={{ aspectRatio: '3/4' }}>
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              >
                <Image
                  src={project.imageCard || project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              {/* 호버 오버레이 */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white bg-black/40 backdrop-blur-sm px-4 py-2 border border-white/20">
                  View
                </span>
              </motion.div>
            </div>
            {/* 텍스트 */}
            <div className="mt-4">
              <p className="text-white font-light text-lg leading-tight group-hover:opacity-70 transition-opacity">
                {project.title}
              </p>
              <p className="text-white/40 text-[11px] tracking-[0.15em] mt-1">{project.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <style>{`
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
  </motion.div>
  );
};

// --- MAIN ---
export default function ExoApe({ projects, mdxContents = {} }: { projects: Project[]; mdxContents?: Record<string, React.ReactNode> }) {
  const [view, setView] = useState('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isOverUI, setIsOverUI] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const isWheeling = useRef(false);

  const currentProject = useMemo(
    () => projects[currentIndex] ?? projects[0],
    [projects, currentIndex]
  );

  if (!projects.length || !currentProject) return null;

  // 페이지 자체 스크롤바 숨기기
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      if (view !== 'home' || isWheeling.current || isCollapsing) return;
      if (Math.abs(e.deltaY) > 30) {
        isWheeling.current = true;
        const newDir = e.deltaY > 0 ? 1 : -1;
        setDirection(newDir);
        setCurrentIndex((prev) => (prev + newDir + projects.length) % projects.length);
        setTimeout(() => { isWheeling.current = false; }, 800);
      }
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [view, isCollapsing, projects.length]);

  const handleCardClick = () => {
    setIsCollapsing(true);
    setTimeout(() => {
      setView('detail');
      setIsCollapsing(false);
    }, 700);
  };

  return (
    <>
    <div className="bg-[#0d0d0d] text-white h-screen w-full select-none relative overflow-hidden">
      <CustomCursor isHovered={isHovered} viewMode={view} isOverUI={isOverUI} />
      <Navigation view={view} onLogoClick={() => { setView('home'); setIsHovered(false); }} />

      {/* 배경 */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={`bg-${currentProject.id}`}
            custom={direction}
            initial={{ y: direction > 0 ? '100%' : '-100%', filter: 'brightness(0.2)' }}
            animate={{
              y: 0,
              filter: (isCollapsing || view === 'detail') ? 'brightness(0.6)' : 'brightness(0.72)',
              scale: (isCollapsing || view === 'detail') ? 1.0 : 1.05,
            }}
            exit={{ y: direction > 0 ? '-100%' : '100%' }}
            transition={{ ...TRANSITION, scale: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="absolute inset-0 w-full h-full"
          >
            {currentProject.image.endsWith('.mp4') ? (
              <video
                src={currentProject.image}
                className="w-full h-full object-cover"
                autoPlay muted loop playsInline
              />
            ) : (
              <Image
                src={currentProject.image}
                alt=""
                fill
                priority={currentIndex === 0}
                sizes="100vw"
                className="object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <HomeView
            key="home"
            project={currentProject}
            direction={direction}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onCardClick={handleCardClick}
            isCollapsing={isCollapsing}
          />
        )}
      </AnimatePresence>

      {/* 푸터 */}
      <footer
        className="fixed bottom-10 left-0 w-full px-10 md:px-14 flex justify-between items-center z-[100] pointer-events-none"
        onMouseEnter={() => setIsOverUI(true)}
        onMouseLeave={() => setIsOverUI(false)}
      >
        <div
          className={`flex items-center space-x-3 text-white pointer-events-auto cursor-pointer group transition-opacity duration-300 ${view === 'detail' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          onClick={() => setShowGrid(prev => !prev)}
        >
          <div className="grid grid-cols-2 gap-[3px] opacity-60 group-hover:opacity-100 transition-opacity">
            {[...Array(4)].map((_, i) => (<div key={i} className="w-[3px] h-[3px] rounded-full bg-white" />))}
          </div>
          <span className="text-[20px] font-semibold tracking-[0.2em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">
            {showGrid ? 'Close' : 'All Projects'}
          </span>
        </div>
        <div className="text-[22px] font-black tracking-[0.2em] text-white" style={{ fontWeight: 900 }}>
          {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>

    {/* GridView */}
    <AnimatePresence>
      {showGrid && (
        <GridView
          key="grid"
          projects={projects}
          onClose={() => setShowGrid(false)}
          onSelect={(index) => {
            setCurrentIndex(index);
            setShowGrid(false);
            setTimeout(() => setView('detail'), 300);
          }}
        />
      )}
    </AnimatePresence>

    {/* DetailView — overflow-hidden 밖에서 렌더링해야 스크롤 가능 */}
    <AnimatePresence>
      {view === 'detail' && (
        <DetailView
          key="detail"
          project={currentProject}
          mdxContent={mdxContents[currentProject.id]}
          onClose={() => { setView('home'); setIsHovered(false); }}
        />
      )}
    </AnimatePresence>
    </>
  );
}
