import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import Meta from '@/components/atoms/Meta';
import { SITE_TITLE } from '@/constants/site';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Meta />

      <div className={styles.homeContainer}>
        <Image
          src={`${router.basePath}/images/profile.jpg`}
          alt="Profile Picture"
          width={150}
          height={150}
          className={styles.profileImage}
          priority 
        />
        <h2>Hello, I&apos;m {SITE_TITLE}!</h2>
        <p className={styles.homeDescription}>
          Inuverseのパーソナルスペースへようこそ！ここでは技術や開発、ソフトウェア、科学、宇宙論、そして生活についてシェアするよ。
        </p>
        <p>アイディアのタイムカプセル。</p>
        <p className={styles.homeDescription}>
          <Link href="/blog">blog</Link>や<Link href="/about">about</Link>でポストや私、このブログについて深く知ることができます。
        </p>
      </div>
    </>
  );
}
