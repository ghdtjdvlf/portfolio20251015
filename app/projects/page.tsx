import { docs, meta } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import { getMDXComponents } from '@/mdx-components';
import ExoApeClient from './ExoApeClient';

type Project = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageCard: string;
  meta: { client: string; services: string; date: string };
  content: { heading: string; description: string; additionalImage: string };
  awards?: { name: string; award: string }[];
  link?: string;
};

const blogSource = loader({
  baseUrl: '/blog',
  source: createMDXSource(docs, meta),
});

function ProjectMDX({ page }: { page: ReturnType<typeof blogSource.getPages>[0] }) {
  const Body = (page.data as any).body;
  if (!Body) return null;
  return <Body components={getMDXComponents()} />;
}

export default function ProjectsPage() {
  const pages = blogSource.getPages().sort(
    (a, b) => ((a.data.order ?? 99) - (b.data.order ?? 99))
  );

  const projects: Project[] = pages.map(page => {
    const d = page.data as any;
    const thumbnail = d.thumbnail ?? '';
    return {
      id: page.slugs[0] ?? d.title,
      title: d.title,
      subtitle: d.subtitle ?? '',
      image: thumbnail,
      imageCard: d.thumbnailCard ?? thumbnail,
      meta: {
        client: d.client ?? '개인 프로젝트',
        services: d.services ?? '',
        date: d.projectDate ?? d.date?.end ?? '',
      },
      content: {
        heading: d.heading ?? d.title,
        description: d.description ?? '',
        additionalImage: d.additionalImage ?? thumbnail,
      },
      awards: d.awards,
      link: d.link,
    };
  });

  const mdxContents: Record<string, React.ReactNode> = {};
  for (const page of pages) {
    const id = page.slugs[0] ?? (page.data as any).title;
    mdxContents[id] = <ProjectMDX page={page} />;
  }

  return <ExoApeClient projects={projects} mdxContents={mdxContents} />;
}
