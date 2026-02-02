import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export', // Force static export for SSG
  images: {
    unoptimized: true,
  },
  // Static export requires trailingSlash to be consistent with Hosting
  trailingSlash: true,
};

export default nextConfig;
