import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
	type: 'content',
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
