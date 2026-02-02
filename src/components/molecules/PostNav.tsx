import React from 'react';
import styles from './PostNav.module.css';

export type SimplePost = {
  slug: string;
  title: string;
};

interface PostNavProps {
  prev?: SimplePost | null;
  next?: SimplePost | null;
}

const PostNav = ({ prev, next }: PostNavProps) => {
  if (!prev && !next) return null;

  return (
    <nav className={styles.container} aria-label="記事ナビゲーション">
      {prev ? (
        <a href={`/posts/${prev.slug}`} className={`${styles.card} ${styles.prev}`}>
          <span className={styles.arrow} aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <div className={styles.texts}>
            <span className={styles.kicker}>前の記事</span>
            <span className={styles.title}>{prev.title}</span>
          </div>
        </a>
      ) : <span />}

      {next ? (
        <a href={`/posts/${next.slug}`} className={`${styles.card} ${styles.next}`}>
          <div className={styles.texts}>
            <span className={styles.kicker}>次の記事</span>
            <span className={styles.title}>{next.title}</span>
          </div>
          <span className={styles.arrow} aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </a>
      ) : <span />}
    </nav>
  );
};

export default PostNav;