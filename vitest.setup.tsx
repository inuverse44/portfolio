import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

// Mock next/router
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
  }),
}));

// Mock next/image: strip Next-specific props that HTMLImageElement doesn't accept
vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line react/display-name
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    const { src, alt, unoptimized, priority, fill, loader, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src as string} alt={(alt as string) || ''} {...rest} />;
  },
}));

// Mock next/head
vi.mock('next/head', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  },
}));
