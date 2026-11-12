import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/articles',
  }),

  schema: z.object({
    // Article title and publication information
    title: z.string().min(1, 'Article title is required'),

    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Date must use YYYY-MM-DD format',
    }),

    updatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Updated date must use YYYY-MM-DD format',
    }).optional(),

    // Search and social descriptions
    description: z.string().optional(),
    excerpt: z.string().optional(),

    // Reading information
    readTime: z.number().int().positive().optional(),

    // Author information
    author: z.string().optional(),
    authorHandle: z.string().optional(),
    authorUrl: z.string().url().optional(),

    // Social sharing image
    ogImage: z.string().optional(),
    ogImageAlt: z.string().optional(),
  }),
});

export const collections = { articles };
