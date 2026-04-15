"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ViewTransitionProvider() {
  const router = useRouter();

  useEffect(() => {
    if (!("startViewTransition" in document)) return;

    const handleClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;

      const href = a.getAttribute("href");
      if (
        !href ||
        !href.startsWith("/") ||
        href.startsWith("//") ||
        a.target === "_blank" ||
        a.hasAttribute("download") ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) return;

      e.preventDefault();

      (document as any).startViewTransition(() => {
        router.push(href);
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [router]);

  return null;
}
