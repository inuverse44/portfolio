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
        <p>This is a personal blog with scientific and technological perspective</p>
        <p>Feel free to explore the posts and features!</p>

        <h1>About Me</h1>
        <ul>
          <li>Earned a Ph.D. in Physics in 2024.</li>
          <li>Majored in cosmology, especially the early Universe.</li>
          <li>Likes: play basketball, take photo</li>
          <li>Language: Japanese, English (still improving, TOEIC Score 625/990)</li>
          <li>Programming Language: C, Python, Kotlin, Rust, JavaScript, TypeScript</li>
          <li>Framework: Quarkus, React</li>
          <li>Cloud: Google Cloud Platform (GCP)</li>
          <li>Infrastracture: Terraform</li>
        </ul>

        <h1>Published</h1>
        <ul>
          <li><a href='https://journals.aps.org/prd/abstract/10.1103/PhysRevD.109.063518'>Generalized early dark energy and its cosmological consequences</a></li>
          <li><a href='https://iopscience.iop.org/article/10.1088/1475-7516/2023/05/050'>Nonminimally assisted inflation: a general analysis</a></li>
          <li><a href='https://journals.aps.org/prd/abstract/10.1103/PhysRevD.105.063542'>Relaxing inflation models with nonminimal coupling: A general study</a></li>
        </ul>
      </div>
    </>
  );
};

export default AboutPage;
