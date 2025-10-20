import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image
import { useRouter } from 'next/router';
import Navigation from '@/components/molecules/Navigation';
import styles from './Header.module.css';
import { SITE_TITLE } from '@/constants/site';

const Header = () => {
  const router = useRouter();
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>
          <Link href="/">
            <Image
              src={`${router.basePath}/images/logo.png`}
              alt="Site Logo"
              width={100} // Adjust width as needed
              height={100} // Adjust height as needed
              className={styles.logo} // Add a class for styling
            />
            {SITE_TITLE}
          </Link>
        </h1>
        <Navigation items={navItems} />
      </div>
    </header>
  );
};

export default Header;
