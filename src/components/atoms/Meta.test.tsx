import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Meta from './Meta';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/constants/site';

describe('Meta', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  it('renders default title and description', () => {
    render(<Meta />);
    
    expect(document.title).toBe(SITE_TITLE);
    const description = document.head.querySelector('meta[name="description"]');
    expect(description?.getAttribute('content')).toBe(SITE_DESCRIPTION);
  });

  it('renders custom title and description', () => {
    const customTitle = 'Custom Page';
    const customDesc = 'Custom Description';
    render(<Meta title={customTitle} description={customDesc} />);
    
    expect(document.title).toBe(`${customTitle} | ${SITE_TITLE}`);
    const description = document.head.querySelector('meta[name="description"]');
    expect(description?.getAttribute('content')).toBe(customDesc);
  });
});
