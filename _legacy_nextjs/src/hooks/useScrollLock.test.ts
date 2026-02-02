import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useScrollLock } from './useScrollLock';

describe('useScrollLock', () => {
  beforeEach(() => {
    document.body.style.overflow = 'visible';
  });

  it('should lock scroll when lock is true', () => {
    renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should not lock scroll when lock is false', () => {
    renderHook(() => useScrollLock(false));
    expect(document.body.style.overflow).toBe('visible');
  });

  it('should restore original style when unmounted', () => {
    const { unmount } = renderHook(() => useScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('visible');
  });
});
