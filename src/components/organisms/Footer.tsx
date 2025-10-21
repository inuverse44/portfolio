import { SITE_TITLE } from '@/constants/site';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './Footer.module.css';

const Footer = () => {
  const router = useRouter();
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} {SITE_TITLE}</p>
      <div className={styles.socialLinks}>
        <a href="https://twitter.com/your_twitter" target="_blank" rel="noopener noreferrer">
          <Image src={`${router.basePath}/images/social/x.svg`} alt="X (formerly Twitter)" width={24} height={24} />
        </a>
        <a href="https://github.com/your_github" target="_blank" rel="noopener noreferrer">
          <Image src={`${router.basePath}/images/social/github.svg`} alt="GitHub" width={24} height={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
