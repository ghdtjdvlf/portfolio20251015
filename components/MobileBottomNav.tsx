"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderKanban, Code2, User } from "lucide-react";

const NAV_ITEMS = [
  { name: "홈", link: "/", icon: Home },
  { name: "프로젝트", link: "/projects", icon: FolderKanban },
  { name: "Skills", link: "/skills", icon: Code2 },
  { name: "About", link: "/about", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-bottom-nav md:hidden">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.link === "/" ? pathname === "/" : pathname.startsWith(item.link);

        return (
          <Link
            key={item.link}
            href={item.link}
            className={`mobile-bottom-nav-item ${isActive ? "active" : ""}`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.2 : 1.6} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
