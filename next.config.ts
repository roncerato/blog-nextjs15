import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s.gravatar.com', 'lh3.googleusercontent.com', 'lh3.googleusercontent.com']
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);