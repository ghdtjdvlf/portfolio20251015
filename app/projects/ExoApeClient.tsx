'use client';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import type { Project } from './exo-ape/ExoApe';

const ExoApe = dynamic(() => import('./exo-ape/ExoApe'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#0d0d0d]" />
  ),
});

interface ExoApeClientProps {
  projects: Project[];
  mdxContents: Record<string, React.ReactNode>;
}

function ExoApeInner({ projects, mdxContents }: ExoApeClientProps) {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') ?? undefined;
  return <ExoApe projects={projects} mdxContents={mdxContents} initialId={initialId} />;
}

export default function ExoApeClient({ projects, mdxContents }: ExoApeClientProps) {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-[#0d0d0d]" />}>
      <ExoApeInner projects={projects} mdxContents={mdxContents} />
    </Suspense>
  );
}
