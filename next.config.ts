import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "atkkbaibnjzrzymxnbmo.supabase.co" },
    ],
  },
  /* config options here */
  transpilePackages: ["react-icons"],
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
