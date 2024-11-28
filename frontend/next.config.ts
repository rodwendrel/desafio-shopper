import type { NextConfig } from "next";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/maps/api/**',
      },
    ],
  },
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
};

export default nextConfig;
