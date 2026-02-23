"use client";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function VisitorTracker() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const hasLoggedRef = useRef<boolean>(false);

  useEffect(() => {
    // 페이지 진입 시간 기록
    startTimeRef.current = Date.now();
    hasLoggedRef.current = false;

    // 페이지 이탈 시 체류시간 기록
    const handleBeforeUnload = () => {
      if (hasLoggedRef.current) return;

      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);

      // sendBeacon을 사용하여 페이지 이탈 시에도 로그 전송
      const data = JSON.stringify({ path: pathname, duration });
      navigator.sendBeacon('/api/save-visitor-log', data);
      hasLoggedRef.current = true;
    };

    // visibilitychange 이벤트로 탭 전환 시에도 기록
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !hasLoggedRef.current) {
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);

        if (duration > 3) { // 3초 이상 머문 경우만 기록
          const data = JSON.stringify({ path: pathname, duration });
          navigator.sendBeacon('/api/save-visitor-log', data);
          hasLoggedRef.current = true;
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname]);

  return null;
}
