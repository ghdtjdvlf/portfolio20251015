// 커스터마이징 가능한 로딩 스피너 컴포넌트
// 원하는 UI로 교체 가능

import { loadingConfig } from './config';
import { LoaderOne } from "@/components/ui/loader";

interface LoadingSpinnerProps {
  isLoading: boolean;
}

export function LoadingSpinner({ isLoading }: LoadingSpinnerProps) {
  if (!isLoading || !loadingConfig.pageTransition.enabled) return null;

  const { position, size, color, colorDark, borderWidth, animationSpeed, overlay } =
    loadingConfig.pageTransition;

  return (
    <>
      {/* 오버레이 */}
      {overlay.enabled && (
        <div className="loading-overlay" />
      )}

      {/* 스피너 컨테이너 */}
      <div className="loading-spinner-container">
        {/*

        */}
        <LoaderOne />

      </div>

      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: ${overlay.backgroundColor};
          z-index: ${loadingConfig.pageTransition.zIndex};
          pointer-events: none;
        }

        @media (prefers-color-scheme: dark) {
          .loading-overlay {
            background-color: ${overlay.backgroundColorDark};
          }
        }

        :global(.dark) .loading-overlay {
          background-color: ${overlay.backgroundColorDark};
        }

        .loading-spinner-container {
          position: fixed;
          top: ${position.top};
          left: ${position.left};
          transform: ${position.transform};
          z-index: ${loadingConfig.pageTransition.zIndex + 1};
          pointer-events: none;
        }

        .loading-spinner {
          width: ${size}px;
          height: ${size}px;
          border: ${borderWidth}px solid transparent;
          border-top-color: ${color};
          border-radius: 50%;
          animation: spin ${animationSpeed} linear infinite;
        }

        @media (prefers-color-scheme: dark) {
          .loading-spinner {
            border-top-color: ${colorDark};
          }
        }

        :global(.dark) .loading-spinner {
          border-top-color: ${colorDark};
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
