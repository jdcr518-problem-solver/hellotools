import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/disclaimer',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/:locale(es|de|fr|pt|ja)/tools',
        destination: '/:locale',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
