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
      vi.spyOn(fs, 'readdirSync').mockReturnValue(['post1.md', 'post2.md'] as any);
      vi.spyOn(fs, 'readFileSync').mockReturnValueOnce(`---
title: Post 1
date: '2023-01-01'
published: true
---
content1`).mockReturnValueOnce(`---
title: Post 2
date: '2023-01-02'
published: false
---
content2`);

      const posts = getAllPosts(false);
      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe('post1');
    });

    it('should return drafts when includeDrafts is true', () => {
      vi.spyOn(fs, 'readdirSync').mockReturnValue(['post1.md', 'post2.md'] as any);
      vi.spyOn(fs, 'readFileSync').mockReturnValueOnce(`---
title: Post 1
date: '2023-01-01'
published: true
---
content1`).mockReturnValueOnce(`---
title: Post 2
date: '2023-01-02'
published: false
---
content2`);

      const posts = getAllPosts(true);
      expect(posts).toHaveLength(2);
    });
  });

  describe('getPostBySlug', () => {
    it('should return a single post by slug', () => {
      vi.spyOn(fs, 'readFileSync').mockReturnValue(`---
title: Post 1
date: '2023-01-01'
tags: ['tag1']
published: true
---
content1`);

      const post = getPostBySlug('post1');
      expect(post.frontmatter.title).toBe('Post 1');
      expect(post.content).toBe('content1');
    });
  });
});
