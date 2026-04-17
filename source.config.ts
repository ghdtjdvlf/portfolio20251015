import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";

export default defineConfig({
  lastModifiedTime: "git",
  mdxOptions: {
    providerImportSource: "@/mdx-components",
  },
});

export const { docs, meta } = defineDocs({
  dir: "blog/content",
  docs: {
    schema: frontmatterSchema.extend({
      date: z.object({
        start: z.string(),
        end: z.string(),
        day: z.string(),
      }),
      tags: z.array(z.string()).optional(),
      featured: z.boolean().optional().default(false),
      readTime: z.string().optional(),
      author: z.string().optional(),
      thumbnail: z.string().optional(),
      order: z.number().optional(),
      subtitle: z.string().optional(),
      client: z.string().optional(),
      services: z.string().optional(),
      projectDate: z.string().optional(),
      heading: z.string().optional(),
      additionalImage: z.string().optional(),
      awards: z.array(z.object({ name: z.string(), award: z.string() })).optional(),
    }),
  },
});

export const { docs: workDocs, meta: workMeta } = defineDocs({
  dir: "content/work",
  docs: {
    schema: frontmatterSchema.extend({
      subtitle: z.string(),
      image: z.string(),
      client: z.string(),
      services: z.string(),
      projectDate: z.string(),
      heading: z.string(),
      additionalImage: z.string().optional(),
      order: z.number().optional(),
    }),
  },
});
