import React from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import styles from './PostBody.module.css';

interface PostBodyProps {
  content?: string;
  slug: string;
}

const PostBody = ({ content = '', slug }: PostBodyProps) => {
  const router = useRouter();

  const resolveSrc = (src?: string) => {
    if (!src) return '';
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('#')) return src;
    if (src.startsWith('/')) return `${router.basePath}${src}`;
    return `${router.basePath}/posts/${slug}/${src}`;
  };

  const components: Components = {
    img: ({ src, alt, ...rest }) => {
      const srcStr = typeof src === 'string' ? src : undefined;
      // eslint-disable-next-line @next/next/no-img-element
      return <img {...rest} src={resolveSrc(srcStr)} alt={alt ?? ''} />;
    },
    a: ({ href, children, ...rest }) => {
      const hrefStr = typeof href === 'string' ? href : undefined;
      const isExternal = typeof hrefStr === 'string' && /^(https?:)?\/\//.test(hrefStr);
      return (
        <a
          href={hrefStr}
          {...rest}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
  };

  return (
    <div className={styles.postContent}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeHighlight, rehypeKatex]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default PostBody;
