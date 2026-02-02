import { render, screen } from '@testing-library/react';
import CodeRenderer from './CodeRenderer';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('CodeRenderer', () => {
  beforeEach(() => {
    // Reset window.KotlinPlayground before each test
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).KotlinPlayground;
    vi.clearAllMocks();
  });

  it('renders normal code block correctly', () => {
    render(
      <CodeRenderer className="language-javascript">
        {`console.log('hello');`}
      </CodeRenderer>
    );

    const codeElement = screen.getByText("console.log('hello');");
    expect(codeElement).toBeInTheDocument();
    expect(codeElement).toHaveClass('language-javascript');
    // Normal code block should have the copy button
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('renders inline code correctly', () => {
    render(
      <CodeRenderer inline className="language-javascript">
        const a = 1;
      </CodeRenderer>
    );

    const codeElement = screen.getByText('const a = 1;');
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.tagName).toBe('CODE');
    // Inline code should not be wrapped in pre/div and no copy button
    expect(screen.queryByText('Copy')).not.toBeInTheDocument();
  });

  it('initializes Kotlin Playground when window.KotlinPlayground is available', () => {
    const mockKotlinPlayground = vi.fn();
    window.KotlinPlayground = mockKotlinPlayground;

    render(
      <CodeRenderer className="language-kotlin">
        {`fun main() { println("Hello") }`}
      </CodeRenderer>
    );

    expect(mockKotlinPlayground).toHaveBeenCalledTimes(1);
    // Kotlin block has specific style
    const wrapper = screen.getByText('fun main() { println("Hello") }').closest('div');
    expect(wrapper).toHaveStyle({ padding: '0px', overflow: 'hidden' });
  });

  it('initializes Kotlin Playground on "kotlin-playground-loaded" event if not initially available', () => {
    const mockKotlinPlayground = vi.fn();
    // Initially undefined
    expect(window.KotlinPlayground).toBeUndefined();

    render(
      <CodeRenderer className="language-kotlin">
        val x = 10
      </CodeRenderer>
    );

    // Should not have been called yet
    expect(mockKotlinPlayground).not.toHaveBeenCalled();

    // Define the global function and dispatch event
    window.KotlinPlayground = mockKotlinPlayground;
    window.dispatchEvent(new Event('kotlin-playground-loaded'));

    expect(mockKotlinPlayground).toHaveBeenCalledTimes(1);
  });

  it('does not initialize Kotlin Playground for inline kotlin code', () => {
    const mockKotlinPlayground = vi.fn();
    window.KotlinPlayground = mockKotlinPlayground;

    render(
      <CodeRenderer inline className="language-kotlin">
        val x = 1
      </CodeRenderer>
    );

    expect(mockKotlinPlayground).not.toHaveBeenCalled();
    const codeElement = screen.getByText('val x = 1');
    expect(codeElement.tagName).toBe('CODE');
  });
});
