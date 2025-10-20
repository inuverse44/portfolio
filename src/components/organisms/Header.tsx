import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/molecules/Navigation'; // Import Navigation
import styles from './Header.module.css';
import { SITE_TITLE } from '@/constants/site';

const Header = () => {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/' }, // Blog is the home page for now
    { label: 'About', href: '/about' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}> {/* Add a div to contain title and nav */}
        <h1 className={styles.title}>
          <Link href="/">{SITE_TITLE}</Link>
        </h1>
        <Navigation items={navItems} />
      </div>
    </header>
  );
};

export default Header;
