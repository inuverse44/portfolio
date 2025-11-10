import Head from 'next/head';
import React from 'react';

const ExternalLinkPage = () => {
  return (
    <>
      <Head>
        <title>External Link</title>
      </Head>
      <div>
        <h2>SNS</h2>
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

        <h2>Cosmology</h2>
        <dt>
          <li>
            arXiv: <a href='https://arxiv.org/'>https://arxiv.org/</a>
          </li>
          <li>
            iNSPIRE HEP: <a href='https://inspirehep.net/'>https://inspirehep.net/</a>
          </li>
          <li>
            NASA ADS: <a href='https://ui.adsabs.harvard.edu'>https://ui.adsabs.harvard.edu</a>
          </li>
        </dt>

        <h2>Tech</h2>
        <dt>
          <li>
            Rust Official Page: <a href='https://rust-lang.org/ja/'>https://rust-lang.org/ja/</a>
          </li>
          <li>
            Rust The Book: <a href='https://doc.rust-lang.org/book/'>https://doc.rust-lang.org/book/</a>
          </li>
          <li>
            compass: <a href='https://connpass.com/user/inuverse/'>https://connpass.com/user/inuverse/</a>
          </li>
          <li>
            Zenn: <a href='https://zenn.dev/tatsukikodama'>https://zenn.dev/tatsukikodama</a>
          </li>
        </dt>
      </div>
    </>
  );
};

export default ExternalLinkPage;