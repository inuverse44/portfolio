import "@/styles/globals.css";
import 'highlight.js/styles/github.css';
import 'katex/dist/katex.min.css';
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Playfair_Display, Roboto_Mono, Playwrite_US_Modern, Hachi_Maru_Pop } from 'next/font/google';

// Configure Roboto Mono for code
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

// Configure Hachi Maru Pop for body text
const hachiMaruPop = Hachi_Maru_Pop({
  subsets: ['latin'],
  weight: ['400'], // Hachi Maru Pop typically has only one weight
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
