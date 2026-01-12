import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TagPage from '@/pages/tags/[tag]';
import { getAllPosts, getAllTagsCount } from '@/lib/posts/api';
import { getStaticProps, getStaticPaths } from '@/pages/tags/[tag]';

// Mock the API
vi.mock('@/lib/posts/api', () => ({
  getAllPosts: vi.fn(),
  getAllTagsCount: vi.fn(),
}));

describe('TagPage', () => {
  const mockPosts = [
    {
      slug: 'post-1',
      frontmatter: {
        title: 'Post 1',
        date: '2023-01-01',
        tags: ['tech'],
        cover: '/img1.png',
      },
    },
    {
      slug: 'post-2',
      frontmatter: {
        title: 'Post 2',
        date: '2023-01-02',
        tags: ['life'],
        cover: null,
      },
    },
  ];

  it('renders the tag name and posts', () => {
    render(<TagPage posts={[mockPosts[0]]} tag="tech" />);
    
    expect(screen.getByText(/Posts tagged:/)).toBeInTheDocument();
    expect(screen.getAllByText('tech').length).toBeGreaterThan(0);
    expect(screen.getByText('Post 1')).toBeInTheDocument();
  });

  describe('getStaticPaths', () => {
    it('returns paths for all tags', async () => {
      vi.mocked(getAllTagsCount).mockReturnValue({ tech: 1, life: 1 });
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await getStaticPaths({} as any);
      
      expect(result).toEqual({
        paths: [
          { params: { tag: 'tech' } },
          { params: { tag: 'life' } },
        ],
        fallback: false,
      });
    });
  });

  describe('getStaticProps', () => {
    it('filters posts by tag', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(getAllPosts).mockReturnValue(mockPosts as any);
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await getStaticProps({ params: { tag: 'tech' } } as any);
      
      expect(result).toEqual({
        props: {
          posts: [mockPosts[0]],
          tag: 'tech',
        },
      });
    });
  });
});
