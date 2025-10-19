/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"


export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto w-full flex h-14 items-center justify-between px-6">
        <div className="mr-4 flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 font-medium text-lg tracking-tighter h-8 w-8 rounded-md overflow-hidden"
          >
            <img
              src="http://ghdvlftjd.dothome.co.kr/wp-content/uploads/2025/07/SeongPil_logo-1.png"
              alt=""
              className="w-10 h-10 object-cover h-logo"
            />
          </Link>
        </div>

        <div className="flex flex-1 w-full justify-end">
          <nav className="flex items-center">
            <p className="mr-4">다크 모드</p>
            <AnimatedThemeToggler />
          </nav>
        </div>
      </div>
    </header>
  );
}
