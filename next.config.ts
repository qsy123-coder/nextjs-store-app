import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
  /* config options here */
  transpilePackages: ["react-icons"],
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
