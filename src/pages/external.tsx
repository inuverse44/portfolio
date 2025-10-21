import Head from 'next/head';
import React from 'react';
import { SITE_TITLE } from '@/constants/site';

const ExternalLinkPage = () => {
  return (
    <>
      <Head>
        <title>External Link</title>
      </Head>
      <div>
        <p>External Link Page</p>
      </div>
    </>
  );
};

export default ExternalLinkPage;