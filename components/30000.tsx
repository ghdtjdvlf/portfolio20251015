"use client";

import React, { useState, useEffect, useRef } from "react";
import { ImageCarousel } from "./ImageCarousel";
import { ImageLightbox } from "./ImageLightbox";
import { Compare } from "@/components/ui/compare";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { motion } from "motion/react";
import { LinkPreview } from "@/components/ui/link-preview";
import { Tooltip } from "@/components/ui/tooltip-card";
import { LottieContainer } from "./LottieContainer";
import { LottieSequence } from "./LottieSequence";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Three = () => {
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
    { id: "step1", label: "문제 발생" },
    { id: "step2", label: "과정" },
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
        <h1 className="main-title"> 매년 3,000만원을 아끼게 만들다</h1>
        <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 px-4">
          년간 비용 3,000만원을 해결했던 이야기
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
            {steps.find((s) => {
              const el = document.getElementById(s.id);
              if (!el || !contentRef.current) return false;
              const rect = el.getBoundingClientRect();
              const containerRect = contentRef.current.getBoundingClientRect();
              return (
                rect.top >= containerRect.top &&
                rect.top <= containerRect.top + 200
              );
            })?.label || ""}
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="메뉴 열기"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300  ${
                isMobileMenuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 아코디언 메뉴 */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
        <div className="relative flex flex-col items-center w-full"></div>
      </div>
      {/* Pain Point 섹션 */}


      {/* 1단계: 3시간 → 2시간30분 */}
      <section
        id="step1"
        className="space-y-4 sm:space-y-6 scroll-mt-20 px-4 md:px-0 overflow-x-hidden w-full max-w-full"
      >
        <div className="section-header">
          <span className="step-badge">1</span>
          <h2 className="section-title">문제 발생</h2>
        </div>

        <div className="space-y-4">
          <h3 className="subtitle-blue">문제 상황 인식</h3>

          
            <p className="body-text text-center">
              카페24는 코딩이 필요 없는 CMS 플랫폼이다.
            </p>
            <p className="body-text text-center">
              하지만 정해진 틀을 벗어나면 <br />
              커스터마이징에 코드 작업이 필수다.
            </p>
            <p className="body-text text-center">
              가끔 수정하는 정도라면 개발자를 고용하기엔 비효율적이다.
            </p>
                       <LottieContainer
              fileName="handshake.json"
              width={200}
              height={200}
              className="m-auto my-6 sm:my-8 md:my-10"
            />
            <p className="body-text text-center">
              그래서 보통 외주를 맡긴다.
            </p>

          <div className="my-6 grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6 [&>div>img]:rounded-2xl [&>div>img]:w-full [&>div>img]:object-cover [&>div>img]:aspect-[4/3] [&>div>img]:cursor-pointer [&>div>img]:hover:opacity-80 [&>div>img]:transition-opacity [&>div>img]:touch-manipulation text-center [&>div>p]:mt-2 [&>div>p]:text-sm [&>div>p]:md:text-base [&>div>p]:text-gray-400">
            <div>
              <img
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl m-auto bdrd my-6 sm:my-8 md:my-10 cursor-pointer"
                src="images/3/2-01.png"
                alt="import 코드"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/3/2-01.png", alt: "import 코드" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />
            </div>
            <p className="body-text text-center">
              외주 시스템은 이렇게 다양하게 운영된다.
            </p>
            <div></div>
          </div>

          <div>
            <img
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl m-auto bdrd my-6 sm:my-8 md:my-10 cursor-pointer"
              src="images/3/2-02.png"
              alt="import 코드"
              onClick={() => {
                setLightboxImages([
                  { src: "images/3/2-02.png", alt: "import 코드" },
                ]);
                setLightboxInitialIndex(0);
                setLightboxOpen(true);
              }}
            />
 
          </div>
          <p className="body-text text-center">
            간단한 텍스트 수정 같은 가벼운 유지보수부터
          </p>
          <div></div>
          <div>
            <img
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl m-auto bdrd my-6 sm:my-8 md:my-10 cursor-pointer"
              src="images/3/2-03.png"
              alt="import 코드"
              onClick={() => {
                setLightboxImages([
                  { src: "images/3/2-03.png", alt: "import 코드" },
                ]);
                setLightboxInitialIndex(0);
                setLightboxOpen(true);
              }}
            />
          </div>
          <p className="body-text text-center">
            프론트엔드, 백엔드 개발이 필요한 고가의 유지보수도 있다.
          </p>
          <div></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
            <img
              className="bdrd cursor-pointer mx-auto"
              src="images/3/2-04.png"
              alt="CSS 요소들 1"
              onClick={() => {
                setLightboxImages([
                  { src: "images/3/2-04.png", alt: "CSS 요소들 1" },
                  { src: "images/3/2-05.png", alt: "CSS 요소들 2" },
                ]);
                setLightboxInitialIndex(0);
                setLightboxOpen(true);
              }}
            />
            <img
              className="bdrd cursor-pointer mx-auto"
              src="images/3/2-05.png"
              alt="CSS 요소들 2"
              onClick={() => {
                setLightboxImages([
                  { src: "images/3/2-04.png", alt: "CSS 요소들 1" },
                  { src: "images/3/2-05.png", alt: "CSS 요소들 2" },
                ]);
                setLightboxInitialIndex(1);
                setLightboxOpen(true);
              }}
            />
          </div> 

          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            그 중 아무래도 인기가 많은 유지보수는
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            타임세일 타이머 와 카카오톡 1초 로그인이다
          </p>

           <img
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl m-auto bdrd my-6 sm:my-8 md:my-10 cursor-pointer"
              src="images/3/2-06.png"
              alt="import 코드"
              onClick={() => {
                setLightboxImages([
                  { src: "images/3/2-06.png", alt: "import 코드" },
                ]);
                setLightboxInitialIndex(0);
                setLightboxOpen(true);
              }}
            />
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            그중 타이머가 3,000만원 이야기의 주인공이다.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            회사는 외주 타이머를 사용하고 있었다.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            초기 가격은 조회수에 따라 증가하는 구조였고, <br />
            처음엔 저렴했다고 한다.
          </p>
          <LottieContainer
              fileName="growing-graph.json"
              width={200}
              height={200}
              className="m-auto my-6 sm:my-8 md:my-10"
            />
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            하지만 매출이 늘어나면서 트래픽도 증가했고
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            결국 월 80~100만원까지 지불하게 됐다.
          </p>
          <LottieContainer
              fileName="money-bag.json"
              width={200}
              height={200}
              className="m-auto my-6 sm:my-8 md:my-10"
            />

          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            7개 브랜드 모두 사용 중이었으니 <br />
            월 250~300만원이 <br />
            타이머 하나에만 쓰이고 있었다.
          </p>


                    <LottieContainer
              fileName="business-people-solving-business-problems.json"
              width={400}
              height={400}
              className="m-auto my-6 sm:my-8 md:my-10"
            />
            
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            왜 비싼 타이머를 계속 사용하는지 물어봤다.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            "타이머 종료 시 구매 버튼 자동 비활성화 기능이 좋은데, <br />
            이걸 지원하는 곳이 여기밖에 없었다."
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            누군가 만들었다는 건 나도 만들 수 있다는 뜻이다. <br />
            바로 실행에 옮겼다.
          </p>
        </div>
      </section>

      {/* 2단계: 2시간 → 1시간30분 */}
      <section
        id="step2"
        className="space-y-4 sm:space-y-6 scroll-mt-20 px-4 md:px-0 overflow-x-hidden w-full max-w-full"
      >
        <div className="section-header">
          <span className="step-badge">2</span>
          <h2 className="section-title">API요청</h2>
        </div>

        <h3 className="subtitle-blue">카페24 개발자 문서</h3>

        <div className="space-y-4">
          <div className="space-y-3">
            <p className="body-text text-center">
              가장 먼저
              <LinkPreview
                url="https://developers.cafe24.com/docs/api/#introduction"
                className="font-bold underline underline-offset-4 md:underline-offset-6 text-gray-500 text-sm md:text-base lg:text-xl mx-1 inline"
              >
                카페24 개발자 문서
              </LinkPreview>
              를 확인했다.
            </p>

            <div className="grid grid-cols-1 gap-3 md:gap-4  [&>img]:w-full [&>img]:object-cover [&>img]:h-full">
              <img
                className="bdrd cursor-pointer m-auto"
                src="images/3/2-07.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/3/2-07.png", alt: "CSS 요소들 1" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />
            </div>

            <p className="body-text text-center">
              API 문서를 보니 충분히 가능해 보였다. <br />
              바로 실행에 옮겼다.
            </p>

            <p className="body-text text-center">
              다행히 이전에 API 작업 경험이 있어서 어렵지 않았다.
            </p>

            <img
              className="bdrd cursor-pointer m-auto my-10 w-[40rem]"
              src="images/3/2-08.png"
              alt="CSS 요소들 1"
              onClick={() => {
                setLightboxImages([
                  { src: "images/3/2-08.png", alt: "CSS 요소들 1" },
                ]);
                setLightboxInitialIndex(0);
                setLightboxOpen(true);
              }}
            />

            <p className="body-text text-center">
              타이머 시간에 맞춰 products.selling 값을 F로 변경하면 <br />
              구매 버튼이 비활성화된다.
            </p>

            <img
              className="bdrd cursor-pointer m-auto my-10 w-[40rem]"
              src="images/3/2-09.png"
              alt="CSS 요소들 1"
              onClick={() => {
                setLightboxImages([
                  { src: "images/3/2-09.png", alt: "CSS 요소들 1" },
                ]);
                setLightboxInitialIndex(0);
                setLightboxOpen(true);
              }}
            />

            <p className="body-text text-center">
              타이머 코드를 작성해 Firebase에 업로드했다.
            </p>
            <p className="body-text text-center">
              &lt;script src="https://sp-cafe24api.web.app/js/timer.js"&gt;&lt;/script&gt;
            </p>
            <p className="body-text text-center">
              이 코드 한 줄로 연간 3,000만원을 절약하게 됐다.
            </p>

  
              
               
          

         

        
          </div>
        </div>
      </section>


      {/* 느낀점 */}

      {/* 최종 요약 */}

      <section
        className=" space-y-4 sm:space-y-6 bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl mx-2 sm:mx-0 border border-gray-200 dark:border-gray-700 scroll-mt-20"
        id="end"
      >
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
            느낀점
          </h2>

          <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-relaxed">
              <span className="mb-3 sm:mb-5 inline-block">
                카톡 1초 로그인 (카톡API연동) , 리뷰 관리 시스템(리뷰 API연동)  같은 것들은
생각보다 비싼 값에 외주를 맡겨 진행중이였고
              </span>{" "}
              <span className="mb-3 sm:mb-5 inline-block">
                내가 조금만 더 연구를 한다면 충분히 사내 자체 솔루션 구축이 충분히 가능할거라 생각했다
              </span>{" "}
              <span className="mb-3 sm:mb-5 inline-block">
                사실 회사에서는 가볍게 HTML CSS 수정, 카페24 관리 정도로 생각하고 채용을 하고 업무도 진행예정이였는데 
              </span>{" "}
              <span className="mb-3 sm:mb-5 inline-block">
                혹시 가능하신가요? 에서 시작된 책임감은 나를 성장 시켰다
              </span>{" "}
              <span className="mb-3 sm:mb-5 inline-block">
                퇴근 후 집에가는 1시간 반, 집에와서 자기전 2~3시간을 공부하면서 들었던 생각은 
힘들다, 괜히했나? 라는 생각보다는 성과를 내서 인정받고싶다, 완수 함으로써 성장하고 싶다
라는 생각이 훨씬 컸기에 잠을 줄여가면서 했었고
              </span>{" "}
              <span className="mb-3 sm:mb-5 inline-block">
                나는 책임감이 부여되면 정말 강해지는 사람이구나를 다시한번 느끼게 됐다
              </span>{" "}

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
