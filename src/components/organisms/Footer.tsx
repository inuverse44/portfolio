import React from 'react';
import styles from './Footer.module.css';
import { SITE_TITLE } from '@/constants/site';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} {SITE_TITLE}</p>
      <div className={styles.socialLinks}>
        <a href="https://twitter.com/your_twitter" target="_blank" rel="noopener noreferrer">
          <Image src="/images/social/x.png" alt="X (formerly Twitter)" width={24} height={24} />
        </a>
        <a href="https://github.com/inuverse" target="_blank" rel="noopener noreferrer">
          <Image src="/images/social/github.svg" alt="GitHub" width={24} height={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
