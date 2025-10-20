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
          width={150} // Adjust width as needed
          height={150} // Adjust height as needed
          className={styles.profileImage} // Add a class for styling
          priority // Prioritize loading for LCP
        />
        <h1>Hello, I&apos;m {SITE_TITLE}!</h1> {/* Corrected: I'm -> I&apos;m */}
        <p className={styles.homeDescription}>
          Welcome to my personal space where I share my thoughts on technology, development, science, cosmology, and life.
          I&apos;m passionate about creating engaging web experiences and exploring new ideas. {/* Corrected: I'm -> I&apos;m */}
        </p>
        <p className={styles.homeDescription}>
          Feel free to browse my <Link href="/blog">blog posts</Link> or learn more <Link href="/about">about me</Link>.
        </p>
      </div>
    </>
  );
}
