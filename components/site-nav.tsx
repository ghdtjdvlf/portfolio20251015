/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
} from "@/components/ui/resizable-navbar";

const NAV_LINKS = [
  { name: "홈", link: "/" },
  { name: "프로젝트", link: "/projects" },
  { name: "Skills", link: "/skills" },
  { name: "About Me", link: "/about" },
];

function Logo({ className }: { className?: string }) {
  return (
    <span className={className}>
      {/* 라이트모드 */}
      <img
        src="/images/icon/SeongPil_logo-2-black.png"
        alt="홍성필 포트폴리오"
        className="w-full h-full object-cover block dark:hidden"
      />
      {/* 다크모드 */}
      <img
        src="/images/icon/SeongPil_logo-1-white.png"
        alt="홍성필 포트폴리오"
        className="w-full h-full object-cover hidden dark:block"
      />
    </span>
  );
}

export function SiteNav() {
  return (
    <Navbar>
      {/* PC */}
      <NavBody>
        <Link href="/" className="relative z-20 flex items-center h-10 w-28">
          <Logo className="flex w-full h-full" />
        </Link>

        <NavItems items={NAV_LINKS} />

        <div className="relative z-20 flex items-center gap-3">
          <AnimatedThemeToggler />
        </div>
      </NavBody>

      {/* 모바일 상단: 로고 + 테마 토글만 */}
      <MobileNav>
        <MobileNavHeader>
          <Link href="/" className="flex items-center h-10 w-28">
            <Logo className="flex w-full h-full" />
          </Link>
          <AnimatedThemeToggler />
        </MobileNavHeader>
      </MobileNav>
    </Navbar>
  );
}
