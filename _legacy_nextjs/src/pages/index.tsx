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
  activityData: Record<string, Post[]>;
  today: string;
}

export default function Home({ latestPosts, activityData, today }: HomeProps) {
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
            Inuverseのポートフォリオへようこそ！ここでは技術や開発、ソフトウェア、科学、宇宙論、そして生活についてシェアします。
          </p>
          <p className={styles.homeQuote}>ーーアイディアのタイムカプセル⏳💊</p>
          <p className={styles.homeDescription}>
            <Link href="/blog">blog</Link>や<Link href="/about">about</Link>でポストや私、このブログについて深く知ることができます。
          </p>
        </div>

        <section className={styles.activitySection}>
          <h3 className={styles.sectionTitle}>Activity</h3>
          <ActivityHeatmap activities={activityData} today={today} />
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
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const activityData: Record<string, Post[]> = {};
  allPosts.forEach((post) => {
    // Standardize to YYYY-MM-DD local string
    const d = new Date(post.frontmatter.date);
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    if (!activityData[date]) {
      activityData[date] = [];
    }
    activityData[date].push(post);
  });

  return {
    props: {
      latestPosts,
      activityData,
      today,
    },
  };
}
