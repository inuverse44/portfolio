import "@/styles/globals.css";
import "@/styles/markdown.css";
import 'highlight.js/styles/github.css';
import 'katex/dist/katex.min.css';
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Roboto_Mono, Hachi_Maru_Pop } from 'next/font/google';

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <div className={`${hachiMaruPop.variable} ${robotoMono.variable}`}>
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}
