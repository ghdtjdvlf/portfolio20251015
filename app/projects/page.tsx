import { docs, meta } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';
import ExoApe from './exo-ape/ExoApe';

type Project = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
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

  return <ExoApe projects={projects} />;
}
