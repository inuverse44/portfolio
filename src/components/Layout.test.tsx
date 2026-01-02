import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Layout from './Layout';

describe('Layout', () => {
  it('renders children and common elements', () => {
    render(
      <Layout>
        <div data-testid="child">Content</div>
      </Layout>
    );
    
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
  });
});
