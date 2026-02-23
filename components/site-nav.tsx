/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/projects", label: "프로젝트" },
  { href: "/about", label: "About Me" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto w-full flex h-14 items-center justify-between px-6">

        {/* 로고 + PC 네비게이션 */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center h-10 w-28 rounded-md overflow-hidden"
          >
            <img
              src="/thumbnails/SeongPil_logo-1.png"
              alt="홍성필 포트폴리오"
              className="w-full h-full object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 다크모드 토글 + 모바일 햄버거 */}
        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-sm text-muted-foreground">다크 모드</span>
          <AnimatedThemeToggler />
          <button
            className="md:hidden p-1.5 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur px-6 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
