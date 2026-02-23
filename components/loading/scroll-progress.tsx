'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { loadingConfig } from './config';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Y=0일 때 progress=0, 스크롤할수록 증가
      const scrollableHeight = documentHeight - windowHeight;
      const scrollPercent = scrollableHeight > 0
        ? (scrollTop / scrollableHeight) * 100
        : 0;

      setProgress(Math.min(Math.max(scrollPercent, 0), 100));
    };

    window.addEventListener('scroll', calculateProgress, { passive: true });
    calculateProgress(); // 초기 실행

    return () => window.removeEventListener('scroll', calculateProgress);
  }, [pathname]);

  if (!loadingConfig.scrollProgress.enabled) return null;

  const { position, height, backgroundColor, barColor, barColorDark, zIndex } =
    loadingConfig.scrollProgress;

  return (
    <>
      <div className="scroll-progress-container">
        <div
          className="scroll-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <style jsx>{`
        .scroll-progress-container {
          position: fixed;
          ${position}: 0;
          left: 0;
          right: 0;
          height: ${height}px;
          background-color: ${backgroundColor};
          z-index: ${zIndex};
          pointer-events: none;
        }

        .scroll-progress-bar {
          height: 100%;
          background-color: ${barColor};
          transition: width 0.1s ease;
        }

        @media (prefers-color-scheme: dark) {
          .scroll-progress-bar {
            background-color: ${barColorDark};
          }
        }

        :global(.dark) .scroll-progress-bar {
          background-color: ${barColorDark};
        }
      `}</style>
    </>
  );
}
