import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'files.gelato.com' },
      { protocol: 'https', hostname: 'cdn.gelato.com' },
    ],
  },
}

export default nextConfig
