import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ActivityHeatmap from './ActivityHeatmap';

// Mock next/router
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const mockActivities = {
  '2026-01-01': [
    {
      slug: 'post-1',
      frontmatter: { title: 'Post 1', date: '2026-01-01', tags: [] },
    },
  ],
  '2026-01-02': [
    {
      slug: 'post-2',
      frontmatter: { title: 'Post 2', date: '2026-01-02', tags: [] },
    },
    {
      slug: 'post-3',
      frontmatter: { title: 'Post 3', date: '2026-01-02', tags: [] },
    },
  ],
};

describe('ActivityHeatmap', () => {
  it('renders correctly with default year', () => {
    render(<ActivityHeatmap activities={mockActivities} today="2026-01-04" />);
    expect(screen.getByText('Posting Activity')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('shows year picker on click', () => {
    render(<ActivityHeatmap activities={mockActivities} today="2026-01-04" />);
    const button = screen.getByText('2026');
    fireEvent.click(button);
    // It should show available years. Since we only have 2026 in mock, it might just show 2026.
    // If we add another year to mock...
  });

  it('displays placeholder text when no day is hovered', () => {
    render(<ActivityHeatmap activities={mockActivities} today="2026-01-04" />);
    expect(screen.getByText(/Hover over a square/i)).toBeInTheDocument();
  });
});
