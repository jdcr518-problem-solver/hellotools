import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: '/:locale(es|de|fr|pt|ja)/tools',
        destination: '/:locale',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
