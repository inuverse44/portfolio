import Head from 'next/head';
import React from 'react';

const ExternalLinkPage = () => {
  return (
    <>
      <Head>
        <title>External Link</title>
      </Head>
      <div>
        <h1>SNS</h1>
        <dt>
          <li>
            X: <a href='https://twitter.com/mochi_dog_phys'>https://twitter.com/mochi_dog_phys</a>
          </li>
          <li>
            GitHub: <a href='https://github.com/inuverse44'>https://github.com/inuverse44</a>
          </li>
          <li>
            Note: <a href='https://note.com/inunoute_scitech'>https://note.com/inunoute_scitech</a>
          </li>
        </dt>

        <h1>Cosmology</h1>
        <dt>
          <li>
            arXiv: <a href='https://arxiv.org/'>https://arxiv.org/</a>
          </li>
          <li>
            iNSPIRE HEP: <a href='https://inspirehep.net/'>https://inspirehep.net/</a>
          </li>
        </dt>

        <h1>Tech</h1>
        <dt>
          <li>
            Rust: <a href='https://arxiv.org/'>https://arxiv.org/</a>
          </li>
          <li>
            compass: <a href='https://connpass.com/user/inuverse/'>https://connpass.com/user/inuverse/</a>
          </li>
        </dt>
      </div>
    </>
  );
};

export default ExternalLinkPage;