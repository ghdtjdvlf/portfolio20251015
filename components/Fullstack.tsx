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

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Fullstack = () => {
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
    { id: "pain-point", label: "미리 보기" },
    { id: "step1", label: "문제 발생" },
    { id: "step2", label: "API요청" },
    { id: "step3", label: "CORS" },
    { id: "step4", label: "성공/유지보수" },
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
        <h1 className="main-title">API 연동 및 구현</h1>
        <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 px-4">
          프론트엔드 개발자의 작업을 진행하다
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
        </div>
      </div>
      {/* Pain Point 섹션 */}
  <section
        id="pain-point"
        className="space-y-4 sm:space-y-6 scroll-mt-20 px-4 md:px-0 overflow-x-hidden w-full"
      >
        <div className="section-header">

          <h2 className="section-title">미리 보기</h2>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-500 dark:text-blue-400">
            Cafe24 API 연동 및 데이터 통신
          </h3>

                    
          <div className="my-6 p-3 sm:p-4 bg-red-50/50 dark:bg-blue-900/20 rounded-xl border border-red-200/50 dark:border-blue-800/50">
            <h4 className="font-semibold text-blue-600 dark:blue-red-400 text-sm sm:text-base mb-2">
              미리보기
            </h4>
            <ul className="space-y-2 body-text list-disc list-inside [&>li]:text-white">
           <li className="text-white">
                문서 분석 : Cafe24 Developers API 명세서를 분석하여 필요 데이터를 도출
            </li>
            <li className="text-white">
  
                인증 처리 : OAuth 2.0 기반의 Access Token 발급 및 만료 시 재발급 로직 이해
  
            </li>
            <li className="text-white">
  
                데이터 바인딩 :fetch 또는 axios를 활용해 상품 리스트/상세 정보를 호출하여 화면에 렌더링
  
            </li>
            <li className="text-white">
                트러블 슈팅 : API 호출 시 발생하는 CORS 문제 및 비동기 처리 이슈 해결
            </li>
            </ul>
          </div>


          <div className="my-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-3 md:gap-4 [&>img]:rounded-[10px] [&>img]:w-full [&>img]:object-cover [&>img]:aspect-square [&>img]:cursor-pointer [&>img]:hover:opacity-80 [&>img]:transition-opacity [&>img]:touch-manipulation">            

            <div className="grid grid-cols-1 gap-4 md:gap-6 items-center mt-10">
              <img src="images/full/2-0.png" className="m-auto w-full max-w-sm md:max-w-md lg:max-w-lg" alt="" />
            </div>
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
          <h2 className="section-title">대표님 요청</h2>
        </div>

        <div className="space-y-4">
          <h3 className="subtitle-blue"></h3>



          <div className="my-6 grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6 [&>div>img]:rounded-2xl [&>div>img]:w-full [&>div>img]:object-cover [&>div>img]:aspect-[4/3] [&>div>img]:cursor-pointer [&>div>img]:hover:opacity-80 [&>div>img]:transition-opacity [&>div>img]:touch-manipulation text-center [&>div>p]:mt-2 [&>div>p]:text-sm [&>div>p]:md:text-base [&>div>p]:text-gray-400">

            <div>
            </div>
          </div>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
                   <img
                  className="bdrd cursor-pointer mx-auto"
                  src="images/full/2-02.png"
                  alt="CSS 요소들 1"
                  onClick={() => {
                    setLightboxImages([
                      { src: "images/full/2-02.png", alt: "CSS 요소들 1" },
                      { src: "images/full/2-03.png", alt: "CSS 요소들 2" },
                    ]);
                    setLightboxInitialIndex(0);
                    setLightboxOpen(true);
                  }}
                />
                <img
                  className="bdrd cursor-pointer mx-auto"
                  src="images/full/2-03.png"
                  alt="CSS 요소들 2"
                  onClick={() => {
                    setLightboxImages([
                      { src: "images/full/2-02.png", alt: "CSS 요소들 1" },
                      { src: "images/full/2-03.png", alt: "CSS 요소들 2" },
                    ]);
                    setLightboxInitialIndex(1);
                    setLightboxOpen(true);
                  }}
                />
                </div>
              
                


          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            UI를 <span className="font-bold">실제 데이터와 연결</span>해달라는 요청을 받았다. <br />
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            API 연동 작업은 <span className="font-bold">외주도 고가인 수준</span>이었지만,
          </p>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            해보고 싶었고 해내고 싶었다.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            입사 2주 차, 꽤 중요한 과제를 받았다.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-center break-words px-2 ">
            3일 안에 시도해보고 안 되면 이야기하라고 하셨다.
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
                src="images/full/2-04.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-04.png", alt: "CSS 요소들 1" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />

            </div>

            <p className="body-text text-center">
              카페24는 코딩 없이 쓰는 플랫폼인 줄 알았는데, <br />
              API 문서를 보니 <span className="fb">사용자에 따라 활용도가 달라진다</span>는 걸 알았다.
            </p>


             <img
                className="bdrd cursor-pointer m-auto my-10 w-[40rem]"
                src="images/full/2-05.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-05.png", alt: "CSS 요소들 1" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />

            <p className="body-text text-center">
             API 데이터가 정말 많았다. <br />
             필요한 건 일별 매출 통계였기에 <span className="fb">'Salesreport' API를 확인했다.</span>
            </p>

                     <img
                className="bdrd cursor-pointer m-auto my-10 w-[40rem]"
                src="images/full/2-06.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-06.png", alt: "CSS 요소들 1" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />

                          <p className="body-text text-center">
             API 요청을 하면 상품별 <span className="fb">매출 정보 확인이 가능</span>했다. <br />
             이제 API 요청만 하면 된다.
            </p>



                          <p className="body-text text-center">
             하지만 그 전에 <span className="font-bold">액세스 토큰 발급</span>이 필요했다.
            </p>

            
                     <img
                className="bdrd cursor-pointer m-auto my-10 w-[40rem]"
                src="images/full/2-07.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-07.png", alt: "CSS 요소들 1" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />

                          <p className="body-text text-center">
             토큰 발급에 Postman을 사용했다.
            </p>

                     <img
                className="bdrd cursor-pointer m-auto my-10 w-[40rem]"
                src="images/full/2-08.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-08.png", alt: "CSS 요소들 1" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />

                          <p className="body-text text-center">
                <LinkPreview
                  url="https://developers.cafe24.com/app/front/app/develop/oauth/token"
                  className="font-bold underline underline-offset-4 md:underline-offset-6 text-gray-500 text-sm md:text-base lg:text-xl mx-1 inline"
                >
                  액세스 토큰 발급 문서
                </LinkPreview>를 참고해 토큰 발급에 성공했다.
            </p> 

            


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
          <h2 className="section-title">CORS</h2>
        </div>

        <div className="space-y-4">
          <h3 className="subtitle-blue">CORS가 도대체 뭐야</h3>

          <div className="space-y-3 text-center">
            <p className="body-text">
              토큰 발급 후 정확한 요청값과 파라미터를 넣어 API를 호출했는데, 계속 에러가 발생했다.
            </p>

                       <img
                className="bdrd cursor-pointer m-auto my-10 w-[40rem]"
                src="images/full/2-09.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-09.png", alt: "CSS 요소들 1" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />

            <p className="body-text">
             확인해보니 CORS 정책 위반으로 데이터 수신이 불가능했다.
            </p>
            <p className="body-text">
              3일 안에 정석적인 서버 구축을 공부하기엔 시간이 부족했다. <br />
              다른 방법을 찾아봤다.
            </p>
                        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4  [&>img]:w-full [&>img]:object-cover [&>img]:h-full">
              <img
                className="bdrd cursor-pointer"
                src="images/full/2-10.svg"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-10.svg", alt: "CSS 요소들 1" },
                    { src: "images/full/2-11.png", alt: "CSS 요소들 2" },
                    { src: "images/full/2-12.png", alt: "CSS 요소들 3" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />
              <img
                className="bdrd cursor-pointer"
                src="images/full/2-11.png"
                alt="CSS 요소들 2"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-10.svg", alt: "CSS 요소들 1" },
                    { src: "images/full/2-11.png", alt: "CSS 요소들 2" },
                    { src: "images/full/2-12.png", alt: "CSS 요소들 3" },
                  ]);
                  setLightboxInitialIndex(1);
                  setLightboxOpen(true);
                }}
              />
              <img
                className="bdrd cursor-pointer"
                src="images/full/2-12.png"
                alt="CSS 요소들 3"
                onClick={() => {
                  setLightboxImages([
                     { src: "images/full/2-10.svg", alt: "CSS 요소들 1" },
                    { src: "images/full/2-11.png", alt: "CSS 요소들 2" },
                    { src: "images/full/2-12.png", alt: "CSS 요소들 3" },
                  ]);
                  setLightboxInitialIndex(2);
                  setLightboxOpen(true);
                }}
              />
            </div>
            <p className="body-text text-center">
              서버리스 플랫폼을 활용하면 단기간에 해결할 수 있겠다고 판단했다. <br />
              그중 가장 흥미로웠던 Firebase를 공부했다.
            </p>

              <img
                className="bdrd cursor-pointer m-auto my-10 w-[40rem]"
                src="images/full/2-13.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-13.png", alt: "CSS 요소들 1" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />

            <p className="body-text">
            CORS 처리를 한 뒤 API 요청 함수를 Firebase에 배포하고 주소를 불러오면 해결된다.
            </p>
              <img
                className="bdrd cursor-pointer m-auto my-10 w-[40rem]"
                src="images/full/2-14.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-14.png", alt: "CSS 요소들 1" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />

            <p className="body-text">
           axios로 API를 호출했고,
            </p>

              <img
                className="bdrd cursor-pointer m-auto my-10 w-[40rem]"
                src="images/full/2-15.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-15.png", alt: "CSS 요소들 1" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />

            <p className="body-text">
           반환 데이터를 JSON으로 변환해 실제 데이터를 UI에 표시하는 데 성공했다.
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
          <h2 className="section-title">토큰 발급 자동화</h2>
        </div>

        <div className="space-y-4">
          <h3 className="subtitle-blue">2시간 마다 만료가 되는 토큰</h3>

          <div className="space-y-3">
            <p className="body-text">
              실제 데이터를 UI에 표시해 민원 대응이 가능해졌다. <br />
              문제는 2시간마다 액세스 토큰이 만료된다는 점. <br />
              재발급해서 토큰을 교체해야 했다.
            </p>

            <img
                className="bdrd cursor-pointer m-auto my-10 w-[40rem]"
                src="images/full/2-18.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-18.png", alt: "CSS 요소들 1" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />

            <p className="body-text text-center">
              증거자료 제출 시 토큰을 넣어 2시간 동안 사용하고, <br />
              그 외에는 더미 데이터를 쓰자는 결론이 나왔다.
            </p>

            <p className="body-text text-center pt-5">
              하지만 다른 곳에서도 이렇게 쓸 리 없었고, <br />
              자동화가 가능할 거라 생각했다.
            </p>

              <img
                className="bdrd cursor-pointer m-auto my-10 w-[40rem]"
                src="images/full/2-19.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-19.png", alt: "CSS 요소들 1" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />

                       <p className="body-text text-center">
           위 과정으로 토큰을 발급할 수 있었다. <br />
           토큰 자동화 문서를 찾아보니 Firebase를 활용하면 더 간편하게 구현할 수 있을 것 같았다.
            </p>

              <img
                className="bdrd cursor-pointer m-auto my-10 w-[40rem]"
                src="images/full/2-20.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-20.png", alt: "CSS 요소들 1" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />

                  <p className="body-text text-center">
             Firebase에 토큰 자동화 코드를 배포했다. <br />
             90분마다 자동으로 재발급된다.
            </p>

              <img
                className="bdrd cursor-pointer m-auto my-10 w-[40rem]"
                src="images/full/2-21.png"
                alt="CSS 요소들 1"
                onClick={() => {
                  setLightboxImages([
                    { src: "images/full/2-21.png", alt: "CSS 요소들 1" },
                  ]);
                  setLightboxInitialIndex(0);
                  setLightboxOpen(true);
                }}
              />

                  <p className="body-text text-center">
             토큰 발급 내역과 API 로그는 Firestore Database에 저장된다.
            </p>

                  <p className="body-text text-center">
             프론트엔드와 백엔드 지식이 모두 필요했던 과제를 성공했다. <br />
             나의 탐구력과 문제 해결 능력이 나쁘지 않다는 생각이 들었다.
            </p>

      
          </div>
        </div>
      </section>

      {/* 느낀점 */}


      {/* 최종 요약 */}

            <section className="space-y-4 sm:space-y-6 bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl mx-2 sm:mx-0 border border-gray-200 dark:border-gray-700 scroll-mt-20" id="end">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8">
            느낀점
          </h2>

          <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-relaxed">

                <span className="mb-3 sm:mb-5 inline-block">이번 업무를 하면서 정말 많이 배웠는데, <br />
내용이 길어질까 봐 자세히는 쓰지 못했다.</span> <br className="hidden sm:block" />
                현업 종사자나 개발 공부를 하신 분들에겐 <br />
쉬운 업무일 수 있다. <br className="hidden sm:block" /> <br /> 하지만 사수 없이 혼자 문서를 보고 공부해야 하는 상황에서
스스로 탐구하고 해결했다는 점이 <br className="hidden sm:block" /> <br />매우 뜻깊고 의미 있었다.
 <br className="hidden sm:block" /> 이걸 활용하면 재미있는 걸 많이 만들 수 있겠다는 생각이 들었다.
(조회수 UI, 매출 UI, 리뷰 UI 등)

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
