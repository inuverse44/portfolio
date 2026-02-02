import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PostCard from './PostCard';

const mockPost = {
  slug: 'test-post',
  frontmatter: {
    title: 'Test Post Title',
    date: '2023-01-01',
    tags: ['tag1', 'tag2'],
  },
};

describe('PostCard', () => {
  it('renders post title and date', () => {
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('links to the post page', () => {
    render(<PostCard post={mockPost} />);
    
    const link = screen.getByRole('link', { name: 'Test Post Title' });
    expect(link).toHaveAttribute('href', '/posts/test-post');
  });
});
