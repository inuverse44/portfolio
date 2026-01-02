import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Tag from './Tag';

describe('Tag', () => {
  it('renders correctly', () => {
    render(<Tag>Kotlin</Tag>);
    expect(screen.getByText('Kotlin')).toBeInTheDocument();
  });

  it('links to the correct tag page', () => {
    render(<Tag>Kotlin</Tag>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/tags/Kotlin');
  });
});
