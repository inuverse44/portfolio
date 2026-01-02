import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllPosts, getPostBySlug } from './api';
import fs from 'fs';

vi.mock('fs');

describe('api', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllPosts', () => {
    it('should return a list of published posts', () => {
      vi.spyOn(fs, 'readdirSync').mockImplementation((() => ['post1.md', 'post2.md']) as unknown as typeof fs.readdirSync);
      vi.spyOn(fs, 'readFileSync').mockImplementation(((path: string) => {
        if (path.endsWith('post1.md')) {
          return `---
title: Post 1
date: '2023-01-01'
tags: ['tag1']
published: true
---
content`;
        }
        return `---
title: Post 2
date: '2023-01-02'
tags: ['tag2']
published: false
---
content`;
      }) as unknown as typeof fs.readFileSync);

      const posts = getAllPosts(false);
      expect(posts).toHaveLength(1);
      expect(posts[0].frontmatter.title).toBe('Post 1');
    });

    it('should return drafts when includeDrafts is true', () => {
      vi.spyOn(fs, 'readdirSync').mockImplementation((() => ['post1.md', 'post2.md']) as unknown as typeof fs.readdirSync);
      vi.spyOn(fs, 'readFileSync').mockImplementation(((path: string) => {
        if (path.endsWith('post1.md')) {
          return `---
title: Post 1
date: '2023-01-01'
tags: ['tag1']
published: true
---
content`;
        }
        return `---
title: Post 2
date: '2023-01-02'
tags: ['tag2']
published: false
---
content`;
      }) as unknown as typeof fs.readFileSync);

      const posts = getAllPosts(true);
      expect(posts).toHaveLength(2);
    });
  });

  describe('getPostBySlug', () => {
    it('should return post content and metadata', () => {
      vi.spyOn(fs, 'readFileSync').mockImplementation((() => `---
title: Test Post
date: '2023-01-01'
tags: ['test']
published: true
---
Content`) as unknown as typeof fs.readFileSync);

      const post = getPostBySlug('post1');
      expect(post.frontmatter.title).toBe('Post 1');
      expect(post.content).toBe('content1');
    });
  });
});
