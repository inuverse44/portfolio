import React, { useState, useRef } from 'react';
import DesktopNav from '@/components/organisms/DesktopNav';
import MobileSidebar from '@/components/organisms/MobileSidebar';
import MenuButton from '@/components/molecules/MenuButton';
import styles from './Header.module.css';
import { SITE_TITLE, NAV_ITEMS } from '@/constants/site';
import { useScrollLock } from '@/hooks/useScrollLock';

const Header = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navItems = NAV_ITEMS;

  // Body scroll lock while sidebar is open (mobile)
  useScrollLock(open);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>
          <a href="/">
            <img
              src="/images/logo.png"
              alt="Site Logo"
              width={100}
              height={100}
              style={{ marginRight: '10px' }}
            />
            {SITE_TITLE}
          </a>
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
