import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  transpilePackages: ["geist"],

  // ✅ 빌드 시 ESLint 에러 무시
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ 빌드 시 TypeScript 에러 무시
  typescript: {
    ignoreBuildErrors: true,
  },
};

// ✅ fumadocs-mdx 플러그인 적용 후 내보내기
export default withMDX(nextConfig);
