import type { NextConfig } from "next";

// Allow basePath to be configured via env for GitHub Pages
const basePathFromEnv = process.env.NEXT_BASE_PATH || '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: basePathFromEnv,
  images: {
    unoptimized: true,
  },
  // If you need it, you can also set assetPrefix via env:
  // assetPrefix: process.env.NEXT_ASSET_PREFIX || undefined,
};

export default nextConfig;
