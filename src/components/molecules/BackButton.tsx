import React from 'react';
import Link from 'next/link';
import styles from './BackButton.module.css';

const BackButton = () => {
  return (
    <Link href="/blog" className={styles.backButton} aria-label="ブログ一覧に戻る">
      <span className={styles.icon} aria-hidden>
        {/* inline left arrow icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span className={styles.label}>戻る</span>
    </Link>
  );
};

export default BackButton;
