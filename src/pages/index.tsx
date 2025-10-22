import Head from 'next/head';
import Image from 'next/image'; // Import Image component
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import Link for internal navigation
import { SITE_TITLE } from '@/constants/site';
import styles from '@/styles/Home.module.css'; // Import styles

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Home | {SITE_TITLE}</title>
        <meta name="description" content="Welcome to my personal blog" />
      </Head>

      <div className={styles.homeContainer}> {/* Add a container for styling */}
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
          <Link href="/blog">blog posts</Link>や<Link href="/about">about me</Link>でポストやこのブログについて深く知ることができます。
        </p>
      </div>
    </>
  );
}
