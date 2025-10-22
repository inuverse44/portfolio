import { SITE_TITLE } from '@/constants/site';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './Footer.module.css';

const WIDTH = 24;
const HEIGHT = 24;

const Footer = () => {
  const router = useRouter();
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} {SITE_TITLE}</p>
      <div className={styles.socialLinks}>
        <a href="https://twitter.com/mochi_dog_phys" target="_blank" rel="noopener noreferrer">
          <Image src={`${router.basePath}/images/social/x.png`} alt="X (formerly Twitter)" width={WIDTH} height={HEIGHT} />
        </a>
        <a href="https://github.com/inuverse44" target="_blank" rel="noopener noreferrer">
          <Image src={`${router.basePath}/images/social/github.svg`} alt="GitHub" width={WIDTH} height={HEIGHT} />
        </a>
        <a href="https://note.com/inunoute_scitech" target="_blank" rel='noopener noreferrer'>
          <Image src={`${router.basePath}/images/social/note.png`} alt="note" width={WIDTH} height={HEIGHT} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
