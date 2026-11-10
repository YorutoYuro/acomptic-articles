import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    slug: z.string().optional(),
  }),
});

export const collections = {
  'articles': articlesCollection,
};
