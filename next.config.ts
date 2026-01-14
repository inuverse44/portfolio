import type { NextConfig } from "next";

// Allow basePath to be configured via env for GitHub Pages
const isDev = process.env.NODE_ENV !== 'production';
// Default to empty for production (GCP), use env for GitHub Pages
const basePathFromEnv = isDev ? '' : (process.env.NEXT_BASE_PATH || '');

// Determine output mode (default to 'standalone' for Cloud Run/Docker, 'export' for GitHub Pages)
const outputMode = process.env.NEXT_OUTPUT_MODE === 'export' ? 'export' : 'standalone';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: outputMode,
  basePath: basePathFromEnv,
  images: {
    unoptimized: true,
  },
  // If you need it, you can also set assetPrefix via env:
  // assetPrefix: process.env.NEXT_ASSET_PREFIX || undefined,
};

export default nextConfig;
