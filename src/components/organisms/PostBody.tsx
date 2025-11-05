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
    img: ({ node: _node, src, alt, ...rest }) => {
      // eslint-disable-next-line @next/next/no-img-element
      return <img {...rest} src={resolveSrc(src)} alt={alt ?? ''} />;
    },
    a: ({ node: _node, href, children, ...rest }) => {
      const isExternal = typeof href === 'string' && /^(https?:)?\/\//.test(href);
      return (
        <a
          href={href as string | undefined}
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
