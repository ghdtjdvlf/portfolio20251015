'use client';
import dynamic from 'next/dynamic';
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

export default function ExoApeClient({ projects, mdxContents }: ExoApeClientProps) {
  return <ExoApe projects={projects} mdxContents={mdxContents} />;
}
