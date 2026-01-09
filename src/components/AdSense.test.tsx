import { render } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import AdSense from './AdSense';

describe('AdSense', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    // @ts-expect-error test shim
    window.adsbygoogle = [];
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
  });

  it('renders nothing when no slot is provided', () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = 'ca-pub-test';
    const { container } = render(<AdSense /> as any);
    expect(container.querySelector('ins.adsbygoogle')).toBeNull();
  });

  it('renders nothing when client env is missing', () => {
    delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    const { container } = render(<AdSense slot="123" />);
    expect(container.querySelector('ins.adsbygoogle')).toBeNull();
  });

  it('renders an ins tag with required attributes when env and slot are set', () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = 'ca-pub-test';
    const { container } = render(<AdSense slot="123" />);
    const ins = container.querySelector('ins.adsbygoogle');
    expect(ins).toBeTruthy();
    if (ins) {
      expect(ins.getAttribute('data-ad-client')).toBe('ca-pub-test');
      expect(ins.getAttribute('data-ad-slot')).toBe('123');
    }
  });
});
