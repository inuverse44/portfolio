import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Navigation from './Navigation';
import styles from './Navigation.module.css';

const mockItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
];

describe('Navigation', () => {
  it('renders a list of links', () => {
    render(<Navigation items={mockItems} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog');
  });

  it('applies vertical class when orientation is vertical', () => {
    const { container } = render(<Navigation items={mockItems} orientation="vertical" />);
    expect(container.firstChild).toHaveClass(styles.navVertical);
  });
});
