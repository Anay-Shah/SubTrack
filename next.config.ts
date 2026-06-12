import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
  // devIndicators: { appIsrStatus: true, buildActivity: true, buildActivityPosition: "bottom-right" },
  devIndicators: false,
};

export default nextConfig;
