import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["covers.openlibrary.org"],
  },
};

export default nextConfig;
