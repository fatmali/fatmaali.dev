import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove 'output: export' to enable API routes
  // output: 'export',
  basePath: '',
  // Remove distDir as it's only needed for static export
  // distDir: 'out',
  images: {
    unoptimized: true,
  },
  // Optional: Add trailing slashes to URLs
  trailingSlash: true,
};

export default nextConfig;
