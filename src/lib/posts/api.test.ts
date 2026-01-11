import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllPosts, getPostBySlug, getAllTagsCount, getAdjacentPosts } from './api';
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
      expect(post.frontmatter.title).toBe('Test Post');
      expect(post.content).toBe('Content');
    });
  });

  describe('getAllTagsCount', () => {
    it('should return a record of tags and their counts', () => {
      vi.spyOn(fs, 'readdirSync').mockImplementation((() => ['post1.md', 'post2.md']) as unknown as typeof fs.readdirSync);
      vi.spyOn(fs, 'readFileSync').mockImplementation(((path: string) => {
        if (path.endsWith('post1.md')) {
          return `---
title: Post 1
date: '2023-01-01'
tags: ['tag1', 'tag2']
published: true
---
content`;
        }
        return `---
title: Post 2
date: '2023-01-02'
tags: ['tag1']
published: true
---
content`;
      }) as unknown as typeof fs.readFileSync);

      const counts = getAllTagsCount();
      expect(counts).toEqual({
        tag1: 2,
        tag2: 1,
      });
    });
  });

  describe('getAdjacentPosts', () => {
    it('should return older as prev and newer as next', () => {
      vi.spyOn(fs, 'readdirSync').mockImplementation((() => ['a.md', 'b.md', 'c.md']) as unknown as typeof fs.readdirSync);
      vi.spyOn(fs, 'readFileSync').mockImplementation(((path: string) => {
        if (path.endsWith('a.md')) {
          return `---\n title: A\n date: '2023-01-03'\n tags: []\n published: true\n---\n`;
        }
        if (path.endsWith('b.md')) {
          return `---\n title: B\n date: '2023-01-02'\n tags: []\n published: true\n---\n`;
        }
        return `---\n title: C\n date: '2023-01-01'\n tags: []\n published: true\n---\n`;
      }) as unknown as typeof fs.readFileSync);

      // Sorted desc: [a(03), b(02), c(01)]
      const adjB = getAdjacentPosts('b');
      expect(adjB.prev?.title).toBe('C'); // older
      expect(adjB.next?.title).toBe('A'); // newer

      const adjA = getAdjacentPosts('a');
      expect(adjA.prev?.title).toBe('B');
      expect(adjA.next).toBeNull();

      const adjC = getAdjacentPosts('c');
      expect(adjC.prev).toBeNull();
      expect(adjC.next?.title).toBe('B');
    });
  });
});
