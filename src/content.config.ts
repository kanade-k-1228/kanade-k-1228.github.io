import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articleSchema = ({ image }: { image: () => z.ZodType }) =>
  z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    description: z.string().optional(),
    ogp: image().optional(),
    toc: z.boolean().default(true),
    draft: z.boolean().default(false),
  });

const article = defineCollection({
  loader: glob({ pattern: "**/index.{md,mdx}", base: "./article" }),
  schema: ({ image }) => articleSchema({ image }),
});

export const collections = { article };
