"use client";
import React, { useState, useEffect } from "react";
import { EvervaultCard, Icon } from "../ui/evervault-card";
import { motion, AnimatePresence } from "motion/react";

interface ProjectInfo {
  period: string;
  role: string;
  contribution: string;
}

interface Links {
  demo?: string;
  github?: string;
}

interface EvervaultCardDemoProps {
  title?: string;
  description?: string;
  hoverText?: string;
  modalContent?: React.ReactNode;
  modalTitle?: string;
  modalDescription?: string;
  projectOverview?: string;
  features?: string[];
  techStack?: string[];
  screenshots?: string[];
  projectInfo?: ProjectInfo;
  links?: Links;
  mainImage?: string;
}

export function EvervaultCardDemo({
  title = "Hover over this card to reveal an awesome effect. Running out of copy here.",
  description = "Watch me hover",
  hoverText = "hover",
  modalContent,
  modalTitle,
  modalDescription,
  projectOverview,
  features = [],
  techStack = [],
  screenshots = [],
  projectInfo,
  links,
  mainImage,
}: EvervaultCardDemoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    // Netlify Edge Function으로 모달 클릭 로그 전송
    fetch('/api/log-modal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modalTitle: title || modalTitle })
    }).catch(() => {}); // 에러 무시

    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <>
      <div
        onClick={openModal}
        className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem] cursor-pointer hover:border-black/[0.4] dark:hover:border-white/[0.4] transition-colors"
      >
        <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

        <EvervaultCard text={hoverText} className="text-[30px]" />

        <h2 className="dark:text-white  text-black mt-4 text-lg font-light">
          {title}
        </h2>

        <p className="text-lg border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-4 py-0.5">
          {description}
        </p>
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm cursor-default p-0 md:p-4"
            onClick={closeModal}
          >
            <motion.div

              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="dark bg-gray-900 rounded-none md:rounded-lg shadow-xl w-screen h-screen md:w-[75vw] md:h-auto md:max-h-[100vh] overflow-y-auto p-4 md:p-6 relative cursor-auto scrollbar-hide py-30"
              onClick={(e) => e.stopPropagation()}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {/* 닫기 버튼 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="absolute top-2 right-2 md:top-4 md:right-4 z-1000 text-gray-400 hover:text-gray-200 transition-colors bg-gray-900/80 md:bg-transparent rounded-full p-2 md:p-1"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 모달 내용 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-white"
              >
                {modalContent || (
                  <>
                    {/* 헤더 */}
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold mb-2 text-white">{modalTitle || title}</h2>
                      <p className="text-gray-400">{modalDescription || description}</p>
                    </div>

                    {/* 이미지 */}
                    {mainImage && (
                      <div className="mb-6 rounded-lg overflow-hidden">
                        <img
                          src={mainImage}
                          alt="Project preview"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}

                    {/* 프로젝트 정보 */}
                    <div className="space-y-4 mb-6">
                      {projectOverview && (
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white">프로젝트 개요</h3>
                          <p className="text-gray-300 leading-relaxed">
                            {projectOverview}
                          </p>
                        </div>
                      )}

                      {features.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white">주요 기능</h3>
                          <ul className="list-disc list-inside space-y-2 text-gray-300">
                            {features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {techStack.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white">기술 스택</h3>
                          <div className="flex flex-wrap gap-2">
                            {techStack.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {screenshots.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white">스크린샷</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {screenshots.map((screenshot, index) => (
                              <img
                                key={index}
                                src={screenshot}
                                alt={`Screenshot ${index + 1}`}
                                className="w-full h-40 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {projectInfo && (
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white">개발 기간 및 역할</h3>
                          <p className="text-gray-300">
                            <strong>기간:</strong> {projectInfo.period}<br/>
                            <strong>역할:</strong> {projectInfo.role}<br/>
                            <strong>기여도:</strong> {projectInfo.contribution}
                          </p>
                        </div>
                      )}

                      {links && (
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white">링크</h3>
                          <div className="flex gap-4">
                            {links.demo && (
                              <a
                                href={links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                라이브 데모
                              </a>
                            )}
                            {links.github && (
                              <a
                                href={links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors"
                              >
                                GitHub
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default EvervaultCardDemo;
