import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PostBody from './PostBody';

// Mock useRouter for resolveSrc
vi.mock('next/router', () => ({
  useRouter: () => ({
    basePath: '',
  }),
}));

describe('PostBody', () => {
  it('renders markdown content', () => {
    const content = '# Hello World\nThis is a test.';
    render(<PostBody content={content} slug="test" />);
    
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('This is a test.')).toBeInTheDocument();
  });

  it('handles image resizing via URL fragment', () => {
    const content = '![Alt](test.jpg#width=300&height=200)';
    render(<PostBody content={content} slug="test" />);
    
    const img = screen.getByAltText('Alt');
    expect(img).toHaveStyle({
      width: '300px',
      height: '200px',
    });
  });

  it('defaults to 100% width when no width fragment is provided', () => {
    const content = '![Alt](test.jpg)';
    render(<PostBody content={content} slug="test" />);
    
    const img = screen.getByAltText('Alt');
    expect(img).toHaveStyle({
      width: '100%',
      height: 'auto',
    });
  });

  it('renders external links with target="_blank"', () => {
    const content = '[Google](https://google.com)';
    render(<PostBody content={content} slug="test" />);
    
    const link = screen.getByRole('link', { name: 'Google' });
    expect(link).toHaveAttribute('href', 'https://google.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders internal links without target="_blank"', () => {
    const content = '[About](/about)';
    render(<PostBody content={content} slug="test" />);
    
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toHaveAttribute('href', '/about');
    expect(link).not.toHaveAttribute('target');
  });
});
