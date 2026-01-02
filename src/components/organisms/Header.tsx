import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image
import { useRouter } from 'next/router';
import DesktopNav from '@/components/organisms/DesktopNav';
import MobileSidebar from '@/components/organisms/MobileSidebar';
import MenuButton from '@/components/molecules/MenuButton';
import styles from './Header.module.css';
import { SITE_TITLE, NAV_ITEMS } from '@/constants/site';
import { useScrollLock } from '@/hooks/useScrollLock';

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navItems = NAV_ITEMS;

  // Close menu on route change
  useEffect(() => {
    const handleRoute = () => setOpen(false);
    router.events?.on('routeChangeComplete', handleRoute);
    return () => router.events?.off('routeChangeComplete', handleRoute);
  }, [router.events]);

  // Body scroll lock while sidebar is open (mobile)
  useScrollLock(open);

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
        <DesktopNav items={navItems} className={styles.desktopNav} />
        <MenuButton
          ref={buttonRef}
          open={open}
          controlsId="mobile-menu"
          className={styles.menuButton}
          onClick={() => setOpen((v) => !v)}
        />
      </div>
      <MobileSidebar open={open} items={navItems} onClose={() => setOpen(false)} returnFocusRef={buttonRef} />
    </header>
  );
};

export default Header;
