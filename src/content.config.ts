import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// glob ローダーは frontmatter の `slug` を entry.id に使う。URL（/posts/<slug>）はこれで維持される。
const posts = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
	schema: z.object({
		title: z.string(),
		date: z.string().or(z.date()).transform((val) => new Date(val)),
		category: z.string().optional().nullable(),
		tags: z.array(z.string()).optional(),
		cover: z.string().optional().nullable(),
		published: z.boolean().optional(),
		description: z.string().optional(),
	}),
});

export const collections = { posts };
