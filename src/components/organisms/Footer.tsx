import React from 'react';
import styles from './Footer.module.css';
import { SITE_TITLE } from '@/constants/site';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} {SITE_TITLE}</p>
    </footer>
  );
};

export default Footer;
