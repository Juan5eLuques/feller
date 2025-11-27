/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'fellerbackend-production.up.railway.app'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'fellerbackend-production.up.railway.app',
        pathname: '/images/**',
      },
    ],
  },
}

module.exports = nextConfig
