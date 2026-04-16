import { ParallaxHeroImages, ImageItem } from "@/components/ui/parallax-hero-images";

const images: ImageItem[] = [
  {
    src: "/images/new/main.webp",
    title: "뉴발란스 운영",
    href: "/blog/뉴발란스 운영",
  },
  {
    src: "/thumbnails/부평.webp",
    title: "부평종합시장 3인 협업",
    href: "/blog/부평종합시장 3인 협업 프로젝트",
  },
  {
    src: "/thumbnails/애플.webp",
    title: "애플 클론 페이지",
    href: "/blog/애플 클론 사이트",
  },
  {
    src: "/thumbnails/중고차.webp",
    title: "굿카스 랜딩페이지",
    href: "/blog/굿카스 랜딩페이지",
  },
  {
    src: "/thumbnails/넥서스비전.webp",
    title: "Nexus Vision",
    href: "/blog/Nexus Vision",
  },
  {
    src: "/thumbnails/토스.webp",
    title: "토스 클론 페이지",
    href: "/blog/토스 클론 사이트",
  },
];

export function ParallaxHeroSection() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background -mt-16">
      <ParallaxHeroImages images={images} />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4 pointer-events-none">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          홍성필 포트폴리오
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          웹퍼블리셔 · 프론트엔드 개발자
        </p>
      </div>
    </div>
  );
}
