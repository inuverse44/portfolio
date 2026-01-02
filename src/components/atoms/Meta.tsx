import Head from 'next/head';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/constants/site';

interface MetaProps {
  title?: string;
  description?: string;
}

const Meta = ({ title, description }: MetaProps) => {
  const pageTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  const pageDescription = description || SITE_DESCRIPTION;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
