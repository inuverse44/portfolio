import React, { useRef, useState } from 'react';
import styles from './PostBody.module.css';

type CodeProps = React.ComponentPropsWithoutRef<'code'> & {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const CodeRenderer = ({ inline, className, children }: CodeProps) => {
  const codeRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);

  const isBlock = inline === false || (typeof className === 'string' && className.includes('language-'));

  if (!isBlock) {
    return <code className={className}>{children}</code>;
  }

  const handleCopy = async () => {
    try {
      const text = codeRef.current?.innerText ?? String(children as unknown as string);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <pre className={styles.codeBlock}>
      <button
        type="button"
        className={styles.copyButton}
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <code ref={codeRef as React.RefObject<HTMLElement>} className={className}>
        {children}
      </code>
    </pre>
  );
};

export default CodeRenderer;

