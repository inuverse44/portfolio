import type { NextConfig } from "next";

// Allow basePath to be configured via env for GitHub Pages
const isDev = process.env.NODE_ENV !== 'production';
// Default to empty for production (GCP), use env for GitHub Pages
const basePathFromEnv = isDev ? '' : (process.env.NEXT_BASE_PATH || '');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  basePath: basePathFromEnv,
  images: {
    unoptimized: true,
  },
  // If you need it, you can also set assetPrefix via env:
  // assetPrefix: process.env.NEXT_ASSET_PREFIX || undefined,
};

export default nextConfig;
