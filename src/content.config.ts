import { defineCollection, type SchemaContext, z } from "astro:content";
import { glob } from "astro/loaders";

const articleSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    abst: z.string().optional(),
    words: z.array(z.string()).optional(),
    cover: image().optional(),
  });

const article = defineCollection({
  loader: glob({ pattern: "**/index.{md,mdx}", base: "./article" }),
  schema: articleSchema,
});

export const collections = { article };
