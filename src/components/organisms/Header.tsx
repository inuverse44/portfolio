import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link href="/">My Blog</Link>
      </h1>
    </header>
  );
};

export default Header;
