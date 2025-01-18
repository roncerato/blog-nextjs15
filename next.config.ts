import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s.gravatar.com', 'lh3.googleusercontent.com', 'lh3.googleusercontent.com']
  }
};

export default nextConfig;
