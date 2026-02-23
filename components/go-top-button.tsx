'use client';

import { useEffect, useState } from 'react';

// ⚙️ 설정 - 여기서 스타일과 동작 수정
const GO_TOP_CONFIG = {
  // 버튼이 나타나는 스크롤 위치 (px)
  showAfterScroll: 300,

  // 버튼 위치
  position: {
    bottom: '30px',
    right: '30px',
  },

  // 버튼 크기
  size: 50, // px

  // 버튼 색상
  backgroundColor: '#000000',
  backgroundColorDark: '#ffffff',
  iconColor: '#ffffff',
  iconColorDark: '#000000',

  // 호버 효과
  hoverOpacity: 0.8,

  // 스크롤 애니메이션 속도
  scrollBehavior: 'smooth' as 'smooth' | 'auto',

  // z-index
  zIndex: 9998,
};

export function GoTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > GO_TOP_CONFIG.showAfterScroll;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기 체크

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: GO_TOP_CONFIG.scrollBehavior,
    });
  };

  if (!isVisible) return null;

  const { position, size, backgroundColor, backgroundColorDark, iconColor, iconColorDark, hoverOpacity, zIndex } = GO_TOP_CONFIG;

  return (
    <>
      <button
        onClick={scrollToTop}
        className="go-top-button"
        aria-label="맨 위로 이동"
        type="button"
      >
        {/* 위쪽 화살표 아이콘 */}
        <svg
          width={size * 0.5}
          height={size * 0.5}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      <style jsx>{`
        .go-top-button {
          position: fixed;
          bottom: ${position.bottom};
          right: ${position.right};
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background-color: ${backgroundColor};
          color: ${iconColor};
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: ${zIndex};
          transition: opacity 0.3s ease, transform 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .go-top-button:hover {
          opacity: ${hoverOpacity};
          transform: translateY(-2px);
        }

        .go-top-button:active {
          transform: translateY(0);
        }

        @media (prefers-color-scheme: dark) {
          .go-top-button {
            background-color: ${backgroundColorDark};
            color: ${iconColorDark};
          }
        }

        :global(.dark) .go-top-button {
          background-color: ${backgroundColorDark};
          color: ${iconColorDark};
        }

        /* 모바일에서 크기 조정 */
        @media (max-width: 768px) {
          .go-top-button {
            bottom: 20px;
            right: 20px;
            width: ${size * 0.8}px;
            height: ${size * 0.8}px;
          }
        }
      `}</style>
    </>
  );
}
