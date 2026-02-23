"use client";

import { useRef, useEffect } from "react";
import Lottie, { AnimationItem } from "lottie-web";

export type LottieContainerProps = {
  /**
   * Lottie 애니메이션 파일명 (확장자 포함)
   * 예: "handshake.json"
   */
  fileName: string;

  /**
   * Lottie 파일이 위치한 폴더 경로 (public 기준)
   * @default "/images/lottie"
   */
  folderPath?: string;

  /**
   * 애니메이션 반복 여부
   * @default true
   */
  loop?: boolean;

  /**
   * 자동 재생 여부
   * @default true
   */
  autoplay?: boolean;

  /**
   * 컨테이너 클래스명
   */
  className?: string;

  /**
   * 애니메이션 속도
   * @default 1
   */
  speed?: number;

  /**
   * 애니메이션 너비 (px 단위 또는 % 문자열)
   */
  width?: string | number;

  /**
   * 애니메이션 높이 (px 단위 또는 % 문자열)
   */
  height?: string | number;
};

/**
 * Props로 Lottie 파일명을 받아서 애니메이션을 표시하는 컴포넌트
 *
 * @example
 * ```tsx
 * // 기본 사용 (기본 경로: /images/lottie)
 * <LottieContainer fileName="handshake.json" />
 *
 * // 크기 지정
 * <LottieContainer fileName="handshake.json" width={400} height={400} />
 *
 * // 커스텀 경로와 옵션
 * <LottieContainer
 *   fileName="handshake.json"
 *   folderPath="/animations"
 *   loop={false}
 *   speed={1.5}
 *   width={500}
 *   height={500}
 *   className="my-custom-class"
 * />
 * ```
 */
export const LottieContainer = ({
  fileName,
  folderPath = "/images/lottie",
  loop = true,
  autoplay = true,
  className = "",
  speed = 1.5,
  width,
  height,
}: LottieContainerProps) => {
  const lottieContainer = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  // 전체 경로 생성
  const animationPath = `${folderPath}/${fileName}`;

  useEffect(() => {
    if (!lottieContainer.current) return;

    // Lottie 애니메이션 로드
    animationRef.current = Lottie.loadAnimation({
      container: lottieContainer.current,
      renderer: "svg",
      loop,
      autoplay,
      path: animationPath,
    });

    // 재생 속도 설정
    if (animationRef.current) {
      animationRef.current.setSpeed(speed);
    }

    // 클린업
    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, [animationPath, loop, autoplay, speed]);

  return (
    <div
      ref={lottieContainer}
      className={className}
      style={{
        width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
        height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
      }}
    />
  );
};

export default LottieContainer;