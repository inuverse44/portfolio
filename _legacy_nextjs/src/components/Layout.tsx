import React from 'react';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';
import styles from '@/styles/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  wide?: boolean;
}

const Layout = ({ children, wide = false }: LayoutProps) => {
  const containerClass = wide ? `${styles.container} ${styles.wideContainer}` : styles.container;
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={containerClass}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
