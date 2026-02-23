'use client';

import { Suspense } from 'react';
import { ScrollProgress } from './scroll-progress';
import { PageTransition } from './page-transition';

export function Loading() {
  return (
    <>
      <ScrollProgress />
      <Suspense fallback={null}>
        <PageTransition />
      </Suspense>
    </>
  );
}

// 개별 컴포넌트도 export
export { ScrollProgress } from './scroll-progress';
export { PageTransition } from './page-transition';
export { LoadingSpinner } from './loading-spinner';
export { loadingConfig } from './config';
