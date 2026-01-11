import React, { useRef, useState, useEffect } from 'react';
import styles from './PostBody.module.css';

type CodeProps = React.ComponentPropsWithoutRef<'code'> & {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

declare global {
  interface Window {
    KotlinPlayground: (selector: string | HTMLElement) => void;
  }
}

const CodeRenderer = ({ inline, className, children }: CodeProps) => {
  const codeRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const isBlock = inline === false || (typeof className === 'string' && className.includes('language-'));
  const isKotlin = !inline && typeof className === 'string' && className.includes('language-kotlin');

  useEffect(() => {
    if (isKotlin && codeRef.current && typeof window !== 'undefined' && window.KotlinPlayground) {
      window.KotlinPlayground(codeRef.current);
    }
  }, [isKotlin, children]);

  if (!isBlock) {
    return <code className={className}>{children}</code>;
  }

  if (isKotlin) {
    return (
      <div className={styles.codeBlock} style={{ padding: 0, overflow: 'hidden' }}>
        <code ref={codeRef as React.RefObject<HTMLElement>} className={className}>
          {children}
        </code>
      </div>
    );
  }

  const handleCopy = async () => {
    if (isCopying) return;
    setIsCopying(true);
    try {
      const text = codeRef.current?.innerText ?? String(children as unknown as string);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <pre className={styles.codeBlock}>
      <button
        type="button"
        className={styles.copyButton}
        onClick={handleCopy}
        aria-label="Copy code"
        aria-live="polite"
        aria-busy={isCopying}
        disabled={isCopying}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <span className={styles.srOnly} aria-live="polite">{copied ? 'Copied' : ''}</span>
      <code ref={codeRef as React.RefObject<HTMLElement>} className={className}>
        {children}
      </code>
    </pre>
  );
};

export default CodeRenderer;
