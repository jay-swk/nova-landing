import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nova-landing",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
