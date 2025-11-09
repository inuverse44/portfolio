import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image
import { useRouter } from 'next/router';
import Navigation from '@/components/molecules/Navigation';
import styles from './Header.module.css';
import { SITE_TITLE } from '@/constants/site';

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'External Link', href: '/external' },
  ];

  // Close menu on route change
  useEffect(() => {
    const handleRoute = () => setOpen(false);
    router.events?.on('routeChangeComplete', handleRoute);
    return () => router.events?.off('routeChangeComplete', handleRoute);
  }, [router.events]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>
          <Link href="/">
            <span className={styles.logoLight}>
              <Image
                src={`${router.basePath}/images/logo.png`}
                alt="Site Logo"
                width={100} // Adjust width as needed
                height={100} // Adjust height as needed
              />
            </span>
            <span className={styles.logoDark}>
              <Image
                src={`${router.basePath}/images/logo-darkmode.png`}
                alt="Site Logo in Dark Mode"
                width={100} // Adjust width as needed
                height={100} // Adjust height as needed
              />
            </span>
            {SITE_TITLE}
          </Link>
        </h1>
        <nav className={styles.desktopNav} aria-label="Primary">
          <Navigation items={navItems} />
        </nav>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {/* simple hamburger icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Menu
        </button>
      </div>
      {/* Overlay and sliding sidebar */}
      <div
        className={`${styles.mobileMenuOverlay} ${open ? styles.mobileMenuOverlayOpen : ''}`}
        role={open ? 'presentation' : undefined}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      />
      <aside
        id="mobile-menu"
        className={`${styles.mobileSidebar} ${open ? styles.mobileSidebarOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        onClick={(e) => e.stopPropagation()}
      >
        <Navigation items={navItems} orientation="vertical" onNavigate={() => setOpen(false)} />
      </aside>
    </header>
  );
};

export default Header;
