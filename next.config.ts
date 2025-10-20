import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export', // Enables static HTML export
  basePath: '/portfolio', // Your repository name
  // Optional: assetPrefix: isProd ? '/portfolio/' : '',
};

export default nextConfig;
