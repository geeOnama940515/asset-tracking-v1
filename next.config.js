/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  // Configure for Docker deployment
  experimental: {
    outputFileTracingRoot: undefined,
  },
};

module.exports = nextConfig;