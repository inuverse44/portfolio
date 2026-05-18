import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkWikiLinks } from './src/plugins/remarkWikiLinks.ts';
import { remarkMermaid } from './src/plugins/remarkMermaid.ts';
import { remarkKotlin } from './src/plugins/remarkKotlin.ts';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import fs from 'node:fs';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));

function buildSlugTitleMap() {
  const postsDir = join(__dirname, 'src/content/posts');
  const map = new Map();

  function readDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        readDir(join(dir, entry.name));
      } else if (entry.name.endsWith('.md')) {
        try {
          const content = fs.readFileSync(join(dir, entry.name), 'utf-8');
          const { data } = matter(content);
          if (typeof data.slug === 'string' && data.title) {
            map.set(data.slug, String(data.title));
          }
        } catch {
          // skip malformed files
        }
      }
    }
  }

  readDir(postsDir);
  return map;
}

const slugTitleMap = buildSlugTitleMap();

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  markdown: {
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      [remarkWikiLinks, { slugTitleMap }],
      remarkMermaid,
      remarkKotlin,
    ],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'one-dark-pro',
    }
  }
});
