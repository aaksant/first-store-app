import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      },
      {
        protocol: 'https',
        hostname: 'fmkuphczqcyiavrulrcl.supabase.co'
      },
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com'
      }
    ]
  }
};

export default nextConfig;
