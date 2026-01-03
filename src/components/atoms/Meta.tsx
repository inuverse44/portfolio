import Head from 'next/head';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/constants/site';

import { useRouter } from 'next/router';

interface MetaProps {
  title?: string;
  description?: string;
}

const Meta = ({ title, description }: MetaProps) => {
  const router = useRouter();
  const pageTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  const pageDescription = description || SITE_DESCRIPTION;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href={`${router.basePath}/favicon.png`} />
    </Head>
  );
};

export default Meta;
