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

  // 🚀 성능 최적화
  reactStrictMode: true,

  // 🎯 번들 크기 최적화
  experimental: {
    optimizePackageImports: [
      '@emotion/react',
      '@emotion/styled',
      '@tabler/icons-react',
      'react-icons',
      'lucide-react',
    ],
  },

  // 📦 이미지 최적화
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 1080, 1920],
    imageSizes: [256, 512],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // 🗜️ 압축 활성화
  compress: true,

  // 🔍 번들 분석을 위한 설정 (선택사항)
  webpack: (config, { isServer }) => {
    // 불필요한 소스맵 제거로 빌드 속도 향상
    if (!isServer) {
      config.devtool = false;
    }
    return config;
  },
};

// ✅ fumadocs-mdx 플러그인 적용 후 내보내기
export default withMDX(nextConfig);
