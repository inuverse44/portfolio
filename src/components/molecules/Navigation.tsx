
import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

interface NavItem {
  label: string;
  href: string;
}

interface NavigationProps {
  items: NavItem[];
}

const Navigation = ({ items }: NavigationProps) => {
  return (
    <nav className={styles.nav}>
      {items.map((item) => (
        <div key={item.href} className={styles.navItem}>
          <Link href={item.href}>{item.label}</Link>
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
