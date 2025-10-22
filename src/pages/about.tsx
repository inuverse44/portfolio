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
        <h2>About This Blog</h2>
        <p>このブログでは。最新のソフトウェア技術や学んだことをまとめると同時に、最新の科学情報（特に宇宙）のことについても取り上げます。</p>
        <p>気軽にポストをご観覧ください！</p>

        <h2>About Me</h2>
        <ul>
          <li>2024年に博士（理学）を取得</li>
          <li>宇宙論を専攻、特に初期宇宙論におけるインフレーションや原始重力波、初期ゆらぎの量子論を専門とした。</li>
          <li>趣味：バスケットボール、一眼レフカメラ</li>
          <li>言語：Japanese, English（誠意学習中...）</li>
          <li>プログラミング言語：C, Python, Kotlin, Rust, JavaScript, TypeScript</li>
          <li>フレームワーク：Quarkus, React</li>
          <li>Cloud: Google Cloud Platform (GCP)</li>
          <li>インフラ: Terraform</li>
          <li>その他：Mathematica, TeX</li>
        </ul>

        <h2>Published</h2>
        <ul>
          <li><a href='https://journals.aps.org/prd/abstract/10.1103/PhysRevD.109.063518'>Generalized early dark energy and its cosmological consequences</a></li>
          <li><a href='https://iopscience.iop.org/article/10.1088/1475-7516/2023/05/050'>Nonminimally assisted inflation: a general analysis</a></li>
          <li><a href='https://journals.aps.org/prd/abstract/10.1103/PhysRevD.105.063542'>Relaxing inflation models with nonminimal coupling: A general study</a></li>
        </ul>

        <h2>Technologies I’ve Been Curious About Lately</h2>
        <p>Deep LearningやData science分野は気になっています。ブラックボックスだったり、サイエンスなのか微妙な領域ですが、比較的勉強しがいがある分野だと感じています。</p>
      </div>
    </>
  );
};

export default AboutPage;
