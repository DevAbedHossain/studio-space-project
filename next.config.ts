import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.mixkit.co" },
      { protocol: "https", hostname: "static.vecteezy.com" },
      { protocol: "https", hostname: "img.magnific.com" },
    ],
    // Owner-provided images are large originals; keep the resized versions
    // cached for a month so repeat visits don't re-download them.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    agentFeedback: true,
  },
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
