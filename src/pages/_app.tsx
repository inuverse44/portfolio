import "@/styles/globals.css";
import "@/styles/markdown.css";
import 'highlight.js/styles/github.css';
import 'katex/dist/katex.min.css';
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Roboto_Mono, Noto_Sans_JP } from 'next/font/google';
import type { NextPage } from 'next';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});


const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

type NextPageWithWide = NextPage & {
  wide?: boolean;
};

type AppPropsWithWide = AppProps & {
  Component: NextPageWithWide;
};

export default function App({ Component, pageProps }: AppPropsWithWide) {
  // Use a custom property 'wide' on the page component to switch layout width
  const isWide = Component.wide || false;

  return (
    <div className={`${notoSansJP.variable} ${robotoMono.variable}`}>
      <Layout wide={isWide}>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
