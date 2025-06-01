/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.e-doc.bg'],
  },
  i18n: {
    locales: ['bg'],
    defaultLocale: 'bg',
  },
  env: {
    RUNPOD_API_KEY: process.env.RUNPOD_API_KEY,
  },
  async redirects() {
    return [
      {
        source: '/schetobot',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
