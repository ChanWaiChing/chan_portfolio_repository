import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  typescript: {
    tsconfigPath: "tsconfig.build.json",
  },
};

export default nextConfig;
