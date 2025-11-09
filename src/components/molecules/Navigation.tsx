
import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

interface NavItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items: NavItem[];
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: () => void;
}

const Navigation = ({ items, orientation = 'horizontal', onNavigate }: NavigationProps) => {
  const navClass = orientation === 'vertical' ? `${styles.nav} ${styles.navVertical}` : styles.nav;
  return (
    <nav className={navClass}>
      {items.map((item) => (
        <div key={item.href} className={styles.navItem}>
          <Link href={item.href} onClick={onNavigate}>{item.label}</Link>
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
