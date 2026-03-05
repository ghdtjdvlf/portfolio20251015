'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { LoadingSpinner } from './loading-spinner';

export function PageTransition() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 페이지 변경 완료 시 로딩 종료
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // 안전장치: 로딩이 2초 이상 지속되면 강제 종료
  useEffect(() => {
    if (!isLoading) return;
    const failsafe = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(failsafe);
  }, [isLoading]);

  // 링크 클릭 감지
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');

      // 현재 페이지와 같은 링크 클릭 시 로딩 표시 안 함
      if (href === pathname) return;

      // 내부 링크 클릭 시 로딩 표시
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('#') &&
        target.target !== '_blank'
      ) {
        setIsLoading(true);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  return <LoadingSpinner isLoading={isLoading} />;
}
