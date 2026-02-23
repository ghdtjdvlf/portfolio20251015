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

  // 링크 클릭 감지
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');

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
  }, []);

  return <LoadingSpinner isLoading={isLoading} />;
}
