import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ActivityHeatmap from './ActivityHeatmap';

const mockActivities = {
  '2026-01-01': [
    {
      slug: 'post-1',
      data: { title: 'Post 1', date: new Date('2026-01-01') },
    },
  ],
  '2026-01-02': [
    {
      slug: 'post-2',
      data: { title: 'Post 2', date: new Date('2026-01-02') },
    },
    {
      slug: 'post-3',
      data: { title: 'Post 3', date: new Date('2026-01-02') },
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
  });

  it('displays placeholder text when no day is hovered', () => {
    render(<ActivityHeatmap activities={mockActivities} today="2026-01-04" />);
    expect(screen.getByText(/Hover over a square/i)).toBeInTheDocument();
  });
});