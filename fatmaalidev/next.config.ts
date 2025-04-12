import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '',
  images: {
    unoptimized: true,
  },
  // Optional: Add trailing slashes to URLs
  trailingSlash: true,
};

export default nextConfig;
