import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import styles from './PostBody.module.css';
import CodeRenderer from './CodeRenderer';

const REMARK_PLUGINS = [remarkGfm, remarkMath];
const REHYPE_PLUGINS = [rehypeHighlight, rehypeKatex];

const LinkRenderer: Components['a'] = ({ href, children, ...rest }) => {
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
};

const TableRenderer: Components['table'] = ({ children, ...rest }) => (
  <div className={styles.tableWrap}>
    <table {...rest}>{children}</table>
  </div>
);

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
    img: ({ src, alt }) => {
      const srcStr = typeof src === 'string' ? src : undefined;
      const resolved = resolveSrc(srcStr);
      return (
        <Image
          src={resolved}
          alt={typeof alt === 'string' ? alt : ''}
          width={0}
          height={0}
          sizes="(max-width: 800px) 100vw, 800px"
          style={{ width: '100%', height: 'auto' }}
          unoptimized
        />
      );
    },
    a: LinkRenderer,
    table: TableRenderer,
    code: CodeRenderer as unknown as Components['code'],
  };

  return (
    <div className={`${styles.postContent} markdown`}>
      <ReactMarkdown remarkPlugins={REMARK_PLUGINS} rehypePlugins={REHYPE_PLUGINS} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default PostBody;
