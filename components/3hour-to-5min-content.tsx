"use client";

import React, { useState, useEffect, useRef } from "react";
import { ImageCarousel } from "./ImageCarousel";
import { ImageLightbox } from "./ImageLightbox";
import { Compare } from "@/components/ui/compare";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { motion } from "motion/react";
import { LinkPreview } from "@/components/ui/link-preview";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const ThreeHourToFiveMinContent = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<
    { src: string; alt: string }[]
  >([]);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const steps = [
    { id: "pain-point", label: "Pain Point" },
    { id: "step1", label: "3시간 → 2시간" },
    { id: "step2", label: "2시간30분 → 1시간30분" },
    { id: "step3", label: "1시간 30분 → 20분" },
    { id: "step4", label: "20분 → 10분" },
    { id: "step5", label: "10분 → 5분" },
    { id: "end", label: "느낀점" },

  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && contentRef.current) {
      const elementTop = element.offsetTop;
      const offset = 120; // progress bar + sticky 버튼 높이 + 여유 공간
      contentRef.current.scrollTo({
        top: elementTop - offset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollTop = contentRef.current.scrollTop;
      const scrollHeight =
        contentRef.current.scrollHeight - contentRef.current.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;

      setScrollProgress(Math.min(progress, 100));

      // 스크롤이 100px 이상이면 sticky 활성화
      setIsSticky(scrollTop > 100);
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
      return () => contentElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      ref={contentRef}
      className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 max-h-[100vh] sm:max-h-[80vh] overflow-y-auto overflow-x-hidden relative w-full"
    >
      {/* Progress Bar - 상단 고정 */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 pb-3 sm:pb-4 z-100">
        <div className="w-full h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ">
          <div
            className="h-full bg-blue-500 dark:bg-blue-600 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* 타이틀 섹션 */}
      <section className="text-center py-6 sm:py-8 border-b-2 border-gray-200 dark:border-gray-700">
        <h1 className="main-title">작업 프로세스 개선</h1>
        <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 px-4">
          3시간 걸린 작업을 최적화를 통해 5분으로 단축
        </p>
      </section>

      {/* 버튼 네비게이션 - 햄버거 메뉴 포함 */}
      <div
        className={`transition-all duration-300 ${
          isSticky
            ? "sticky top-5 z-30 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 -mt-8"
            : "mt-6"
        }`}
        id="modalTitle"
      >
        {/* 모바일 햄버거 버튼 */}
        <div className="md:hidden flex justify-between items-center px-4 py-3">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {steps.find(s => {
              const el = document.getElementById(s.id);
              if (!el || !contentRef.current) return false;
              const rect = el.getBoundingClientRect();
              const containerRect = contentRef.current.getBoundingClientRect();
              return rect.top >= containerRect.top && rect.top <= containerRect.top + 200;
            })?.label || ""}
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="메뉴 열기"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300  ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 아코디언 메뉴 */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-2 space-y-2 bg-gray-50 dark:bg-gray-800/50 [&>button]:m-1">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => {
                  scrollToSection(step.id);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium border border-gray-200 dark:border-gray-700"
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        {/* 데스크톱 가로 네비게이션 */}
        <div className="hidden md:flex justify-center items-center gap-2 lg:gap-4 flex-wrap font-semibold px-4 py-3">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {index > 0 && <span className="text-gray-400">→</span>}
              <button
                onClick={() => scrollToSection(step.id)}
                className="px-3 py-2 lg:px-4 rounded-lg transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm lg:text-base font-medium border border-gray-200 dark:border-gray-700 underline underline-offset-[4px] whitespace-nowrap"
              >
                {step.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-4 md:mt-7 px-4 md:px-0">
        <div className="relative flex flex-col items-center w-full">
          <Compare
            firstImage="/images/단순.png"
            secondImage="/images/복잡.png"
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="h-[300px] w-[260px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px] mx-auto"
            slideMode="hover"
          />
        </div>
      </div>
      {/* Pain Point 섹션 */}
      <section
        id="pain-point"
        className="space-y-4 sm:space-y-6 scroll-mt-20 px-4 md:px-0 overflow-x-hidden w-full"
      >
        <div className="section-header">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-500 dark:bg-red-600 text-white flex items-center justify-center text-lg sm:text-xl font-bold shadow-sm">
            ⚠
          </div>
          <h2 className="section-title">PainPoint</h2>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-red-500 dark:text-red-400">
            문제 상황
          </h3>
          <p className="body-text text-center">
            7개 사이트 유지보수에 3시간 소요. <br />
            비효율적인 반복 작업이 핵심 문제였다.
          </p>

          <div className="my-6 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 [&>img]:rounded-[10px] [&>img]:w-full [&>img]:object-cover [&>img]:aspect-square [&>img]:cursor-pointer [&>img]:hover:opacity-80 [&>img]:transition-opacity [&>img]:touch-manipulation">
            <img
              src="images/1-01.png"
              alt="이미지 1"
              onClick={() => {
                setLightboxImages([
                  { src: "images/1-01.png", alt: "이미지 1" },
                  { src: "images/1-02.png", alt: "이미지 2" },
                  { src: "images/1-03.png", alt: "이미지 3" },
                  { src: "images/1-04.png", alt: "이미지 4" },
                ]);
                setLightboxInitialIndex(0);
                setLightboxOpen(true);
              }}
            />
            <img
              src="images/1-02.png"
              alt="이미지 2"
              onClick={() => {
                setLightboxImages([
                  { src: "images/1-01.png", alt: "이미지 1" },
                  { src: "images/1-02.png", alt: "이미지 2" },
                  { src: "images/1-03.png", alt: "이미지 3" },
                  { src: "images/1-04.png", alt: "이미지 4" },
                ]);
                setLightboxInitialIndex(1);
                setLightboxOpen(true);
              }}
            />
            <img
              src="images/1-03.png"
              alt="이미지 3"
              onClick={() => {
                setLightboxImages([
                  { src: "images/1-01.png", alt: "이미지 1" },
                  { src: "images/1-02.png", alt: "이미지 2" },
                  { src: "images/1-03.png", alt: "이미지 3" },
                  { src: "images/1-04.png", alt: "이미지 4" },
                ]);
                setLightboxInitialIndex(2);
                setLightboxOpen(true);
              }}
            />
            <img
              src="images/1-04.png"
              alt="이미지 4"
              onClick={() => {
                setLightboxImages([
                  { src: "images/1-01.png", alt: "이미지 1" },
                  { src: "images/1-02.png", alt: "이미지 2" },
                  { src: "images/1-03.png", alt: "이미지 3" },
                  { src: "images/1-04.png", alt: "이미지 4" },
                ]);
                setLightboxInitialIndex(3);
                setLightboxOpen(true);
              }}
            />
          </div>
          
          <div className="my-6 p-3 sm:p-4 bg-red-50/50 dark:bg-red-900/20 rounded-xl border border-red-200/50 dark:border-red-800/50">
            <h4 className="font-semibold text-red-600 dark:text-red-400 text-sm sm:text-base mb-2">
              주요 문제점
            </h4>
            <ul className="space-y-2 body-text list-disc list-inside [&>li]:text-white">
              <li>HTML, CSS, JS를 각각 3개 파일로 분리 관리</li>
              <li>PC/모바일 페이지를 별도로 관리 (반응형 X)</li>
              <li>확장성 부족 - 100개 상품 = 100회 반복 작업</li>
            </ul>
          </div>

        </div>
      </section>

      {/* 1단계: 3시간 → 2시간30분 */}
      <section
        id="step1"
        className="space-y-4 sm:space-y-6 scroll-mt-20 px-4 md:px-0 overflow-x-hidden w-full max-w-full"
      >
        <div className="section-header">
          <span className="step-badge">1</span>
          <h2 className="section-title">3시간 → 2시간</h2>
        </div>

        <div className="space-y-4">
          <h3 className="subtitle-blue">파일 통합</h3>
          <p className="body-text text-center">
            1번 수정하려면 PC/MO 각각 HTML, JS, CSS를 수정해야 했다. <br />
            총 6번의 반복 작업이 필요했다.
          </p>



          <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 [&>div>img]:rounded-2xl [&>div>img]:w-full [&>div>img]:object-cover [&>div>img]:aspect-[4/3] [&>div>img]:cursor-pointer [&>div>img]:hover:opacity-80 [&>div>img]:transition-opacity [&>div>img]:touch-manipulation text-center [&>div>p]:mt-2 [&>div>p]:text-sm [&>div>p]:md:text-base [&>div>p]:text-gray-400">
            <div>
              <img
                src="images/1-05.png"
                alt="html파일"
                
                onClick={() => {
                  setLightboxImages([
                    { src: "images/1-05.png", alt: "HTML파일" },
                    { src: "images/1-06.png", alt: "CSS파일" },
                    { src: "images/1-07.png", alt: "JS파일" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />
              <p>HTML파일</p>
            </div>
            <div>
              <img
                src="images/1-06.png"
                alt="css파일"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/1-05.png", alt: "HTML파일" },
                    { src: "images/1-06.png", alt: "CSS파일" },
                    { src: "images/1-07.png", alt: "JS파일" },
                  ]);
                  setLightboxInitialIndex(1);
                  setLightboxOpen(true);
                }}
              />
              <p>CSS파일</p>
            </div>
            <div>
              <img
                src="images/1-07.png"
                alt="js파일"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/1-05.png", alt: "HTML파일" },
                    { src: "images/1-06.png", alt: "CSS파일" },
                    { src: "images/1-07.png", alt: "JS파일" },
                  ]);
                  setLightboxInitialIndex(2);
                  setLightboxOpen(true);
                }}
              />
              <p>JS파일</p>
            </div>
          </div>

          <p className="body-text text-center py-10">
            자세히 보니 코드가 몇 줄 안 되는데도 파일을 나눠놓은 경우가 많았다.
          </p>

          <div className="p-4 sm:p-6 md:p-10 bg-[#462a2b] rounded-2xl overflow-x-hidden max-w-full break-words">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal mb-3 break-words">
              {" "}
              성필 : 이렇게 코드가 몇줄 안되는데 혹시 이유가 있어서 html js
              css를 나눈건가요?
            </p>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-3 break-words">
              {" "}
              전임 : 기존 방식을 따라서 했고 그래왔기에 그냥 한다
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal mb-3 break-words">
              {" "}
              성필 : 혹시 개선 해봐도 될까요?
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold break-words">
              {" "}
              전임 : 원하시면 해보셔도 괜찮다.{" "}
            </p>
          </div>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            그래서 HTML, CSS, JS를 하나의 파일로 통합했다. <br className="hidden sm:block" />
            6회 작업이 2회로 줄어들었다.
          </p>

          <img
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl m-auto bdrd my-6 sm:my-8 md:my-10 cursor-pointer"
            src="images/1-08.png"
            alt="합쳐진 코드"
            onClick={() => {
              setLightboxImages([{ src: "images/1-08.png", alt: "합쳐진 코드" }]);
              setLightboxInitialIndex(0);
              setLightboxOpen(true);
            }}
          />

          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2  ">
            위처럼 단일 파일로 통합 관리
          </p>

          <div className="py-5">
            <img
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl m-auto bdrd my-6 sm:my-8 md:my-10 cursor-pointer"
              src="images/1-09.png"
              alt="import 코드"
              onClick={() => {
                setLightboxImages([{ src: "images/1-09.png", alt: "import 코드" }]);
                setLightboxInitialIndex(0);
                setLightboxOpen(true);
              }}
            />

            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
              필요한 곳에 import 코드 한 줄만 넣으면 끝
            </p>
          </div>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2  ">
            결과적으로 42회 작업이 14회로 줄었다. <br className="hidden sm:block" />
            (7개 브랜드 × PC/MO 2회)
          </p>

          <div className="result-box-blue">
            <p className="result-text-blue">결과: 3시간 → 2시간 (1시간 단축)</p>
          </div>
        </div>
      </section>

      {/* 2단계: 2시간 → 1시간30분 */}
      <section
        id="step2"
        className="space-y-4 sm:space-y-6 scroll-mt-20 px-4 md:px-0 overflow-x-hidden w-full max-w-full"
      >
        <div className="section-header">
          <span className="step-badge">2</span>
          <h2 className="section-title">2시간 → 1시간30분</h2>
        </div>

        <h3 className="subtitle-blue">Root</h3>

        <div className="space-y-4">
          <div className="space-y-3">
            <p className="body-text text-center">
              다음은 CSS 요소들이 문제였다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4  [&>img]:w-full [&>img]:object-cover [&>img]:h-full">
              <img
                className="bdrd cursor-pointer"
                src="images/2-02.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/2-02.png", alt: "CSS 요소들 1" },
                    { src: "images/2-03.png", alt: "CSS 요소들 2" },
                    { src: "images/2-04.png", alt: "CSS 요소들 3" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />
              <img
                className="bdrd cursor-pointer"
                src="images/2-03.png"
                alt="CSS 요소들 2"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/2-02.png", alt: "CSS 요소들 1" },
                    { src: "images/2-03.png", alt: "CSS 요소들 2" },
                    { src: "images/2-04.png", alt: "CSS 요소들 3" },
                  ]);
                  setLightboxInitialIndex(1);
                  setLightboxOpen(true);
                }}
              />
              <img
                className="bdrd cursor-pointer"
                src="images/2-04.png"
                alt="CSS 요소들 3"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/2-02.png", alt: "CSS 요소들 1" },
                    { src: "images/2-03.png", alt: "CSS 요소들 2" },
                    { src: "images/2-04.png", alt: "CSS 요소들 3" },
                  ]);
                  setLightboxInitialIndex(2);
                  setLightboxOpen(true);
                }}
              />
            </div>

            <p className="body-text text-center">
              7개 쇼핑몰을 관리하는 상황에서 <br />
              컬러 하나 바꾸려면 엄청난 시간이 걸릴 게 뻔했다.
            </p>

            <p className="body-text text-center">
              게다가 5개 쇼핑몰을 더 만든다고 들었다. <br />
              이대로는 안 되겠다고 생각했다.
            </p>

            <img
              className="bdrd m-auto my-10 cursor-pointer"
              src="images/2-01.png"
              alt="CSS root 활용"
              onClick={() => {
                setLightboxImages([{ src: "images/2-01.png", alt: "CSS root 활용" }]);
                setLightboxInitialIndex(0);
                setLightboxOpen(true);
              }}
            />

            <p className="body-text text-center">
              CSS Root 변수를 활용했다. <br />
              10~20번 바꿔야 할 컬러를 1번만 바꾸면 끝이다.
            </p>

            <div className="result-box-blue">
              <p className="result-text-blue">
                결과: 2시간 → 1시간 30분 (30분 단축)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3단계: 1시간 30분 → 20분 */}
      <section
        id="step3"
        className="space-y-4 sm:space-y-6 scroll-mt-20 px-4 md:px-0 overflow-x-hidden w-full max-w-full"
      >
        <div className="section-header">
          <span className="step-badge">3</span>
          <h2 className="section-title">1시간 30분 → 20분</h2>
        </div>

        <div className="space-y-4">
          <h3 className="subtitle-blue">Firebase</h3>

          <div className="space-y-3 text-center">
            <p className="body-text">
              하지만 여전히 문제가 있었다.
            </p>

            <p className="body-text">
              작업은 14회로 줄었지만, 브랜드가 늘어나면 <br />
              브랜드 × 2회(PC/MO)만큼 작업이 계속 늘어난다.
            </p>

            <p className="body-text !text-gray-300">
              (전임자는 52개 쇼핑몰을 관리 중이었다)
            </p>

            <p className="body-text">
              100번, 200번 반복 작업은 불가능하다. <br />
              근본적인 해결책이 필요했다.
            </p>

            <img
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl m-auto bdrd my-6 sm:my-8 md:my-10 cursor-pointer"
              src="images/3-01.png"
              alt="Firebase 도입"
              onClick={() => {
                setLightboxImages([{ src: "images/3-01.png", alt: "Firebase 도입" }]);
                setLightboxInitialIndex(0);
                setLightboxOpen(true);
              }}
            />

            <div className="my-10 flex justify-center">
              <div></div>
            </div>

            <div className="text-center">
              <p className="body-text">
                Firebase를 떠올렸다.
              </p>

              <p className="body-text">
                구글에서 만든 웹앱 개발 플랫폼으로, <br />
                백엔드 작업을 간편하게 처리할 수 있다.
              </p>

              <p className="body-text py-5">
                여기에 내 코드를 JS 파일로 배포하면 <br />
                모든 사이트에서 한 번에 불러올 수 있겠다고 생각했다.
              </p>

              <p className="body-text">
                작은 규모지만 나만의 SDK를 만들어보기로 했다.
              </p>
            </div>

            <img
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl m-auto bdrd my-6 sm:my-8 md:my-10 cursor-pointer"
              src="images/3-02.png"
              alt="Firebase SDK 배포"
              onClick={() => {
                setLightboxImages([
                  { src: "images/3-02.png", alt: "Firebase SDK 배포" },
                  { src: "images/3-03.png", alt: "Firebase SDK 배포 2" }
                ]);
                setLightboxInitialIndex(0);
                setLightboxOpen(true);
              }}
            />
            <img
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl m-auto bdrd my-6 sm:my-8 md:my-10 cursor-pointer"
              src="images/3-03.png"
              alt="Firebase SDK 배포 2"
              onClick={() => {
                setLightboxImages([
                  { src: "images/3-02.png", alt: "Firebase SDK 배포" },
                  { src: "images/3-03.png", alt: "Firebase SDK 배포 2" }
                ]);
                setLightboxInitialIndex(1);
                setLightboxOpen(true);
              }}
            />

            <p className="body-text">
              기존에는 HTML 파일을 저장하고 import 해야 했다.
            </p>

            <p className="body-text">
              수정사항이 생기면 모든 브랜드의 PC/MO HTML 파일을 <br />
              하나하나 수정해야 했다.
            </p>

            <img
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl m-auto bdrd my-6 sm:my-8 md:my-10 cursor-pointer"
              src="images/3-04.png"
              alt="스크립트 한줄로 코드 불러오기"
              onClick={() => {
                setLightboxImages([{ src: "images/3-04.png", alt: "스크립트 한줄로 코드 불러오기" }]);
                setLightboxInitialIndex(0);
                setLightboxOpen(true);
              }}
            />

            <div className="body-text">
              하지만 Firebase에 JS 파일로 업로드하면 <br />
              <LinkPreview
                url="https://sp-cafe24api.web.app/pages/test.html"
                className="font-bold underline underline-offset-6 text-gray-500 text-xl mx-1 inline"
              >
                스크립트 한 줄
              </LinkPreview>
              만으로 코드를 불러올 수 있다.
            </div>

            <p className="body-text">
              유지보수는 더욱 간편해진다. <br />
              메인 HTML 하나만 수정하면 모든 사이트에 즉시 반영된다.
            </p>

            <p className="body-text">여기서 의문이 생길 수 있다.</p>

            <p className="body-text">
              "브랜드가 7개인데, 브랜드별 CSS나 텍스트는 어떻게 다르게 처리하지?"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center mt-10">
              <img
                src="images/3-05.png"
                className="m-auto w-full max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
                alt="브랜드별 CSS 분기 처리 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/3-05.png", alt: "브랜드별 CSS 분기 처리 1" },
                    { src: "images/3-06.png", alt: "브랜드별 CSS 분기 처리 2" }
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />
              <img
                src="images/3-06.png"
                className="m-auto w-full max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
                alt="브랜드별 CSS 분기 처리 2"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/3-05.png", alt: "브랜드별 CSS 분기 처리 1" },
                    { src: "images/3-06.png", alt: "브랜드별 CSS 분기 처리 2" }
                  ]);
                  setLightboxInitialIndex(1);
                  setLightboxOpen(true);
                }}
              />
            </div>

            <p className="body-text">
              data-brand 속성을 활용했다. <br />
              브랜드명을 자동으로 인식해 해당 브랜드 컬러와 텍스트를 적용한다.
            </p>
          </div>

          <div className="result-box-blue">
            <p className="result-text-blue">
              결과: 1시간 30분 → 20분 (1시간 10분 단축)
            </p>
          </div>
        </div>
      </section>

      {/* 4단계: 20분 → 10분 */}
      <section
        id="step4"
        className="space-y-4 sm:space-y-6 scroll-mt-20 px-4 md:px-0 overflow-x-hidden w-full max-w-full "
      >
        <div className="section-header">
          <span className="step-badge">4</span>
          <h2 className="section-title">20분 → 10분</h2>
        </div>

        <div className="space-y-4">
          <h3 className="subtitle-blue">자동 삽입</h3>

          <div className="space-y-3">
            <p className="body-text text-center">
              여기서 멈출 수도 있었다. <br />
              하지만 더 개선할 방법이 보였다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center mt-10">
              <img
                src="images/4-01.png"
                className="m-auto w-full max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
                alt="자동 삽입 이전 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/4-01.png", alt: "자동 삽입 이전 1" },
                    { src: "images/4-02.png", alt: "자동 삽입 이전 2" }
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />
              <img
                src="images/4-02.png"
                className="m-auto w-full max-w-sm md:max-w-md cursor-pointer"
                alt="자동 삽입 이전 2"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/4-01.png", alt: "자동 삽입 이전 1" },
                    { src: "images/4-02.png", alt: "자동 삽입 이전 2" }
                  ]);
                  setLightboxInitialIndex(1);
                  setLightboxOpen(true);
                }}
              />
            </div>

            <p className="body-text text-center py-5">
              스크립트를 붙여넣는 건 간단하지만, <br />
              정확한 위치를 찾는 게 번거로웠다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center mt-10">
              <img
                src="images/4-03.png"
                className="m-auto w-full max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
                alt="적절한 위치에 요소 생성 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/4-03.png", alt: "적절한 위치에 요소 생성 1" },
                    { src: "images/4-04.png", alt: "적절한 위치에 요소 생성 2" }
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />
              <img
                src="images/4-04.png"
                className="m-auto w-full max-w-sm md:max-w-md cursor-pointer"
                alt="적절한 위치에 요소 생성 2"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/4-03.png", alt: "적절한 위치에 요소 생성 1" },
                    { src: "images/4-04.png", alt: "적절한 위치에 요소 생성 2" }
                  ]);
                  setLightboxInitialIndex(1);
                  setLightboxOpen(true);
                }}
              />
            </div>

            <p className="body-text text-center">
              타이머는 구매 버튼 위, 알림은 최상단에 배치해야 한다. <br />
              위치를 정확히 찾아 스크립트를 넣어야 했다.
            </p>

            <p className="body-text text-center">
              브랜드마다 비슷하긴 했지만, <br />
              매번 찾는 건 여전히 불편했다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center mt-10">
              <img
                src="images/4-05.png"
                className="m-auto w-full max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
                alt="템플릿 구조 활용 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/4-05.png", alt: "템플릿 구조 활용 1" },
                    { src: "images/4-06.png", alt: "템플릿 구조 활용 2" }
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />
              <img
                src="images/4-06.png"
                className="m-auto w-full max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
                alt="템플릿 구조 활용 2"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/4-05.png", alt: "템플릿 구조 활용 1" },
                    { src: "images/4-06.png", alt: "템플릿 구조 활용 2" }
                  ]);
                  setLightboxInitialIndex(1);
                  setLightboxOpen(true);
                }}
              />
            </div>

            <p className="body-text text-center">
              사내 쇼핑몰은 같은 템플릿을 사용한다. <br />
              특정 클래스를 기준으로 자동 삽입하면 되겠다고 생각했다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center mt-10">
              <img
                src="images/4-07.png"
                className="m-auto w-full max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
                alt="클래스 위치 기반 생성 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/4-07.png", alt: "클래스 위치 기반 생성 1" },
                    { src: "images/4-08.png", alt: "클래스 위치 기반 생성 2" }
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />
              <img
                src="images/4-08.png"
                className="m-auto w-full max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
                alt="클래스 위치 기반 생성 2"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/4-07.png", alt: "클래스 위치 기반 생성 1" },
                    { src: "images/4-08.png", alt: "클래스 위치 기반 생성 2" }
                  ]);
                  setLightboxInitialIndex(1);
                  setLightboxOpen(true);
                }}
              />
            </div>

            <p className="body-text text-center">
              타이머는 항상 .option-area 위에 있다. <br />
              그 클래스를 찾아 자동으로 위에 삽입하도록 코드를 작성했다.
            </p>

            <div className="grid grid-cols-1 gap-4 md:gap-6 items-center mt-10">
              <img
                src="images/4-09.png"
                className="m-auto w-full max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
                alt="원하는 위치에 요소 삽입"
                onClick={() => {
                  setLightboxImages([{ src: "images/4-09.png", alt: "원하는 위치에 요소 삽입" }]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />
            </div>

            <p className="body-text text-center">
              이제 아무 곳에 넣어도 알아서 제자리를 찾아간다. <br />
              위치 찾는 시간이 사라졌고, 20분이 10분으로 줄었다.
            </p>
          </div>

          <div className="result-box-blue">
            <p className="result-text-blue">결과: 20분 → 10분 (10분 단축)</p>
          </div>
        </div>
      </section>

      {/* 5단계: 10분 → 5분 */}
      <section
        id="step5"
        className="space-y-4 sm:space-y-6 scroll-mt-20 px-4 md:px-0 overflow-x-hidden w-full max-w-full"
      >
        <div className="section-header">
          <span className="step-badge-green">5</span>
          <h2 className="section-title">10분 → 5분</h2>
        </div>

        <div className="space-y-4">
          <h3 className="subtitle-green">URL 기반 브랜드 자동 판별</h3>

          <div className="space-y-3 [&>p]:text-center [&>p]:px-2 [&>p]:break-words [&>p]:max-w-full">
            <p className="body-text">
              마지막으로 한 가지가 더 남았다.
            </p>

            <div className="grid grid-cols-1 gap-4 md:gap-6 items-center mt-10">
              <img
                src="images/5-01.png"
                className="m-auto w-full max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
                alt="URL 기반 브랜드 자동 판별 이전"
                onClick={() => {
                  setLightboxImages([{ src: "images/5-01.png", alt: "URL 기반 브랜드 자동 판별 이전" }]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />
            </div>

            <p className="body-text">
              여전히 브랜드명과 PC/MO를 <br />
              스크립트마다 직접 입력해야 했다.
            </p>
            <p className="body-text">
              이것도 자동화할 수 없을까?
            </p>

            <p className="body-text px-2">힌트는 URL에 있었다.</p>

            <div className="body-text px-2 break-words overflow-hidden max-w-full text-center">
               <div className="w-[100%]">
                 <span className="inline">나이키는 </span>
                <LinkPreview
                  url="https://www.nike.com/"
                  className="font-bold underline underline-offset-4 md:underline-offset-6 text-gray-500 text-sm md:text-base lg:text-xl mx-1 inline"
                >
                  www.nike.com 
                </LinkPreview>
               </div>
             <span className="inline"> 애플은 </span>
              <LinkPreview
                url="https://www.apple.com/"
                className="font-bold underline underline-offset-4 md:underline-offset-6 text-gray-500 text-sm md:text-base lg:text-xl mx-1 inline"
              >
                www.apple.com
              </LinkPreview>
              <span className="inline"> 이였다</span>
            </div>

            <p className="body-text px-2">눈치챘을까?</p>

            <p className="body-text">
              대부분의 브랜드는 URL에 브랜드명을 넣는다. <br />
              우리 7개 사이트도 전부 그랬다.
            </p>

            <p className="body-text">
              URL에서 브랜드명을 자동으로 파싱하는 로직을 추가했다.
            </p>

            <div className="grid grid-cols-1 gap-4 md:gap-6 items-center mt-10">
              <img
                src="images/5-02.png"
                className="m-auto w-full max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
                alt="URL 체크 코드"
                onClick={() => {
                  setLightboxImages([{ src: "images/5-02.png", alt: "URL 체크 코드" }]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />
            </div>

            <p className="body-text break-words">
              URL이 <span className="inline-block">udit.co.kr</span>이면 udit 스타일, <br className="hidden sm:block" />
              <span className="inline-block">itix.co.kr</span>이면 itix 스타일을 자동 적용한다.
            </p>

            <div className="grid grid-cols-1 gap-4 md:gap-6 items-center mt-10">
              <img
                src="images/5-03.png"
                className="m-auto w-full max-w-sm md:max-w-md lg:max-w-lg cursor-pointer"
                alt="최종 삽입된 스크립트"
                onClick={() => {
                  setLightboxImages([{ src: "images/5-03.png", alt: "최종 삽입된 스크립트" }]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />
            </div>

            <p className="body-text break-words">
              이제 스크립트 한 줄만 넣으면 <br className="hidden sm:block" />
              브랜드와 위치를 자동으로 인식한다.
            </p>
            <p className="body-text">최종적으로 10분에서 5분으로 단축됐다.</p>
          </div>


        </div>
      </section>

      {/* 느낀점 */}


      {/* 최종 요약 */}
      <section className="text-white p-4 sm:p-6 md:p-8 rounded-xl mx-2 sm:mx-0 shadow-lg" >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center">
          최종 결과
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="bg-white/20 p-4 sm:p-6 rounded-lg border border-white/30">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-2 opacity-90">
              작업 시간 (기존)
            </p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold">3시간</p>
          </div>
          <div className="bg-white/20 p-4 sm:p-6 rounded-lg border border-white/30">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-2 opacity-90">
              작업 시간 (최적화 후)
            </p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold">5분</p>
          </div>
        </div>
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
            총 2시간 55분 단축 (약 97% 개선)
          </p>
        </div>
      </section>

            <section className="space-y-4 sm:space-y-6 bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl mx-2 sm:mx-0 border border-gray-200 dark:border-gray-700 scroll-mt-20" id="end">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
            느낀점
          </h2>

          <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-relaxed">

                <span className="mb-3 sm:mb-5 inline-block">아무도 시키지 않았고, 오히려 말렸지만 해냈다.</span> <br className="hidden sm:block" />
                다른 개발자라면 어떻게 접근했을지, <br className="hidden sm:block" /> 더 나은 방법이 있었을지 궁금하다.


              </p>


          </div>
        </div>
      </section>

      {/* ImageLightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        initialIndex={lightboxInitialIndex}
      />
    </div>
  );
};
