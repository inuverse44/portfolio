import "@/styles/globals.css";
import "@/styles/markdown.css";
import 'highlight.js/styles/github.css';
import 'katex/dist/katex.min.css';
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Roboto_Mono, Hachi_Maru_Pop } from 'next/font/google';
import type { NextPage } from 'next';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});


const hachiMaruPop = Hachi_Maru_Pop({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-hachi-maru-pop',
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
    <div className={`${hachiMaruPop.variable} ${robotoMono.variable}`}>
      <Layout wide={isWide}>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
