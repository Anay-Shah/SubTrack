import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "@prisma/client/runtime/library", ".prisma/client", "@prisma/engines"],
  outputFileTracingIncludes: {
    "**": ["./src/generated/prisma/**/*"],
  },
  // devIndicators: { appIsrStatus: true, buildActivity: true, buildActivityPosition: "bottom-right" },
  devIndicators: false,
};

export default nextConfig;
