import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articleSchema = z.object({
  title: z.string(),
  icon: z.string(),
  abst: z.string(),
  date: z.coerce.date().optional(),
  words: z.array(z.string()).optional(),
});

const article = defineCollection({
  loader: glob({ pattern: "**/index.{md,mdx}", base: "./article" }),
  schema: articleSchema,
});

export const collections = { article };
