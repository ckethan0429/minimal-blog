import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/book",
        destination: "/books",
        permanent: true,
      },
    ];
  },
  // Smaller responses for text assets
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Tree-shake heavy packages when imported as namespaces
  experimental: {
    optimizePackageImports: ["@content-collections/mdx"],
  },
  // Avoid incorrect monorepo root inference when parent lockfiles exist
  turbopack: {
    root: process.cwd(),
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
