import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'archive.org',
        port: '',
        pathname: '/services/img/**',
      },
    ],
  },
};

export default nextConfig;
