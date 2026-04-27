import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "웹 퍼블리셔 홍성필 소개 페이지입니다. 경력, 기술 스택, 개발 스토리를 확인하세요.",
  openGraph: {
    title: "About | 홍성필 포트폴리오",
    description:
      "웹 퍼블리셔 홍성필 소개 페이지입니다. 경력, 기술 스택, 개발 스토리를 확인하세요.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AboutContent />
    </div>
  );
}
