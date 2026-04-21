import { docs, meta } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import ExoApe from './exo-ape/ExoApe';
import { getMDXComponents } from '@/mdx-components';

type Project = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageCard: string;
  meta: { client: string; services: string; date: string };
  content: { heading: string; description: string; additionalImage: string };
  awards?: { name: string; award: string }[];
};

const blogSource = loader({
  baseUrl: '/blog',
  source: createMDXSource(docs, meta),
});

export default function ProjectsPage() {
  const pages = blogSource.getPages();

  const projects: Project[] = pages
    .sort((a, b) => ((a.data.order ?? 99) - (b.data.order ?? 99)))
    .map(page => {
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
      };
    });

  const mdxContents: Record<string, React.ReactNode> = {};
  for (const page of pages) {
    const id = page.slugs[0] ?? (page.data as any).title;
    const Body = (page.data as any).body;
    if (Body) {
      mdxContents[id] = <Body components={getMDXComponents()} />;
    }
  }

  return <ExoApe projects={projects} mdxContents={mdxContents} />;
}
