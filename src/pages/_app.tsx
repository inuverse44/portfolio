import "@/styles/globals.css";
import 'highlight.js/styles/github.css';
import 'katex/dist/katex.min.css';
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Playfair_Display, Roboto_Mono, Playwrite_US_Modern } from 'next/font/google'; // Corrected font name

// Configure Playfair Display for headings (will be replaced by Playwrite US Modern)
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

// Configure Roboto Mono for body text and code
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

// Configure Playwrite US Modern for headings
const playwriteUSModern = Playwrite_US_Modern({
  subsets: ['latin'],
  weight: ['400'], // Playwrite US Modern typically has specific weights
  variable: '--font-playwrite-us-modern', // Corrected variable name
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <div className={`${playfairDisplay.variable} ${robotoMono.variable} ${playwriteUSModern.variable}`}>
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}
