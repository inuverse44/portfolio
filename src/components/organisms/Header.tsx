import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { SITE_TITLE } from '@/constants/site';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link href="/">{SITE_TITLE}</Link>
      </h1>
    </header>
  );
};

export default Header;
