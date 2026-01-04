import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import Meta from '@/components/atoms/Meta';
import { SITE_TITLE } from '@/constants/site';
import { getAllPosts, Post } from '@/lib/posts/api';
import ActivityHeatmap from '@/components/molecules/ActivityHeatmap';
import PostCard from '@/components/molecules/PostCard';

interface HomeProps {
  latestPosts: Post[];
  activityData: Record<string, number>;
}

export default function Home({ latestPosts, activityData }: HomeProps) {
  const router = useRouter();
  return (
    <>
      <Meta />

      <div className={styles.homeContainer}>
        <div className={styles.heroSection}>
          <Image
            src={`${router.basePath}/images/profile.jpg`}
            alt="Profile Picture"
            width={150}
            height={150}
            className={styles.profileImage}
            priority 
          />
          <h2 className={styles.heroTitle}>Hello, I&apos;m {SITE_TITLE}!</h2>
          <p className={styles.homeDescription}>
            Inuverseのパーソナルスペースへようこそ！ここでは技術や開発、ソフトウェア、科学、宇宙論、そして生活についてシェアするよ。
          </p>
          <p className={styles.homeQuote}>アイディアのタイムカプセル。</p>
          <p className={styles.homeDescription}>
            <Link href="/blog">blog</Link>や<Link href="/about">about</Link>でポストや私、このブログについて深く知ることができます。
          </p>
        </div>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Activity</h3>
          <ActivityHeatmap activities={activityData} />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Recent Posts</h3>
            <Link href="/blog" className={styles.viewAll}>View all →</Link>
          </div>
          <div className={styles.recentPostsGrid}>
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 3);

  const activityData: Record<string, number> = {};
  allPosts.forEach((post) => {
    const date = post.frontmatter.date; // Assuming ISO string YYYY-MM-DD
    activityData[date] = (activityData[date] || 0) + 1;
  });

  return {
    props: {
      latestPosts,
      activityData,
    },
  };
}
