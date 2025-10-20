import Head from 'next/head';
import React from 'react';
import { SITE_TITLE } from '@/constants/site';

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About | {SITE_TITLE}</title>
      </Head>
      <div>
        <h1>About This Blog</h1>
        <p>This is a sample blog built with Next.js and TypeScript, demonstrating atomic design principles, Markdown rendering, and Google Fonts integration.</p>
        <p>Feel free to explore the posts and features!</p>
      </div>
    </>
  );
};

export default AboutPage;
