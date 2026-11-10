// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    readTime: z.number().optional(),
    author: z.string().optional(),        // <-- Added this
    authorHandle: z.string().optional(),  // <-- Added this
    authorUrl: z.string().optional(),     // <-- Added this
  }),
});

export const collections = { articles };
