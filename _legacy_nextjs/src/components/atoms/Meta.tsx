import Head from 'next/head';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, TWITTER_ID } from '@/constants/site';

import { useRouter } from 'next/router';

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

const Meta = ({ title, description, image, type = 'website' }: MetaProps) => {
  const router = useRouter();
  const pageTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  const pageDescription = description || SITE_DESCRIPTION;
  const canonicalUrl = `${SITE_URL}${router.basePath}${router.asPath === '/' ? '' : router.asPath}`;
  const ogImage = image ? `${SITE_URL}${router.basePath}${image}` : `${SITE_URL}${router.basePath}/images/logo.png`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href={`${router.basePath}/favicon.png`} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="google-site-verification" content="GVJsI0qiXxw6sq96joFwtrhEnsyC4NxFaXYUtG81IK0" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={TWITTER_ID} />
      <meta name="twitter:creator" content={TWITTER_ID} />
    </Head>
  );
};

export default Meta;
