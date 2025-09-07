import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["eu.ui-avatars.com"],
    unoptimized: true,
  },
  output: "standalone",
  swcMinify: true,
};

export default nextConfig;