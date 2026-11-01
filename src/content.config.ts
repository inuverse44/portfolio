import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS } from './constants/categories';

// glob ローダーは frontmatter の `slug` を entry.id に使う。URL（/posts/<slug>）はこれで維持される。
const posts = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
	schema: z.object({
		title: z.string(),
		date: z.string().or(z.date()).transform((val) => new Date(val)),
		// 一覧（src/constants/categories.ts）にある slug を必ず 1 つ書く。
		category: z.enum(CATEGORY_SLUGS, {
			error: (issue) =>
				`category ${issue.input === undefined || issue.input === null ? 'がありません' : `"${String(issue.input)}" は一覧にありません`}。次のどれかを書いてください：${CATEGORY_SLUGS.join(', ')}（新しく作るなら src/constants/categories.ts に足す）`,
		}),
		tags: z.array(z.string()).optional(),
		cover: z.string().optional().nullable(),
		published: z.boolean().optional(),
		description: z.string().optional(),
	}),
});

export const collections = { posts };
