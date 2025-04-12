import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // Optional: Add trailing slashes to URLs
  trailingSlash: true,
};

export default nextConfig;
