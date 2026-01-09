import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('renders disabled Prev on page 1 and Next to page 2', () => {
    render(<Pagination currentPage={1} totalPages={3} indexPath="/blog" basePath="/blog/page" />);
    expect(screen.getByText('← Prev').tagName).toBe('SPAN');
    const next = screen.getByText('Next →').closest('a');
    expect(next).toHaveAttribute('href', '/blog/page/2');
    expect(screen.getByText('Page 1 / 3')).toBeInTheDocument();
  });

  it('links Prev to indexPath on page 2 and Next to page 3', () => {
    render(<Pagination currentPage={2} totalPages={3} indexPath="/blog" basePath="/blog/page" />);
    const prev = screen.getByText('← Prev').closest('a');
    expect(prev).toHaveAttribute('href', '/blog');
    const next = screen.getByText('Next →').closest('a');
    expect(next).toHaveAttribute('href', '/blog/page/3');
  });

  it('renders nothing when totalPages <= 1', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} />);
    expect(container).toBeEmptyDOMElement();
  });
});
