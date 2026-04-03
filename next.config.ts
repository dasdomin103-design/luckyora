import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Remove this line ❌
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;