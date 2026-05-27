/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'files.gelato.com' },
      { protocol: 'https', hostname: 'cdn.gelato.com' },
    ],
  },
}

export default nextConfig
