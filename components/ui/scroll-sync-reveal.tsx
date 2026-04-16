"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

export const ScrollSyncReveal = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const containerHeight = container.clientHeight;

      // 스크롤이 끝에 가까우면 마지막 카드 활성화
      if (scrollTop + containerHeight >= scrollHeight - 50) {
        setActiveCard(content.length - 1);
        return;
      }

      // 각 텍스트 섹션의 위치를 확인
      let newActiveCard = 0;
      textRefs.current.forEach((textElement, index) => {
        if (!textElement) return;

        const rect = textElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const containerMiddle = containerRect.top + containerRect.height / 2;

        // 섹션의 중간 지점이 컨테이너 중앙을 지났으면 해당 섹션 활성화
        const elementMiddle = rect.top + rect.height / 2;

        if (elementMiddle <= containerMiddle) {
          newActiveCard = index;
        }
      });

      setActiveCard(newActiveCard);
    };

    handleScroll(); // 초기 실행
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [content.length]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-md p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-gray-900"
    >
      {/* 왼쪽: 스크롤되는 텍스트 */}
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div
              key={item.title + index}
              ref={(el) => (textRefs.current[index] = el)}
              className="my-20 min-h-[150px] "
            >
              <motion.h2
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                className="mt-10 max-w-sm text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-[600px]" />
        </div>
      </div>

      {/* 오른쪽: sticky 이미지 */}
      <div
        className={`hidden h-100 w-100 lg:block ${
          activeCard === content.length - 1
            ? 'sticky top-1/2 -translate-y-1/2' // 마지막 요소 CSS (여기 수정)
            : 'sticky top-1/2 -translate-y-1/2' // 나머지 요소 CSS
        }`}
      >
        <motion.div
          key={activeCard}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`h-full w-full overflow-hidden rounded-md ${contentClassName || ""}`}
        >
          {content[activeCard]?.content ?? null}
        </motion.div>
      </div>
    </div>
  );
};
