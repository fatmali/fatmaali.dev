import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure output to 'export' for Static Web Apps
  output: 'export',
  basePath: '',
  images: {
    unoptimized: true, // Required when using 'export' output
    domains: ['fatmaali.dev'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fatmaali.dev',
      }
    ],
  },
  // Optional: Add trailing slashes to URLs
  trailingSlash: true,
  // Enable app directory
  experimental: {
    optimizeCss: true,
  },
  transpilePackages: ['next-mdx-remote'],
  // Exclude functions directory from the build
  webpack: (config) => {
    config.externals = [...(config.externals || []), { 'src/functions': 'src/functions' }];
    return config;
  },
  // Environment variables that will be available on the client
  env: {
    NEXT_PUBLIC_FUNCTION_APP_URL: process.env.FUNCTION_APP_URL || '',
  },
};

export default nextConfig;
