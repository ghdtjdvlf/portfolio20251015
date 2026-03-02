"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ArrowUpDown, ArrowUp, ArrowDown ,Clock } from "lucide-react";

export function SortFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "latest";

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === "latest") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground hidden md:inline">
        정렬:
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => handleSortChange("latest")}
          className={`h-8 flex items-center gap-1 px-3 rounded-lg border text-sm transition-colors whitespace-nowrap ${
            currentSort === "latest"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:bg-muted"
          }`}
        >
          <ArrowDown className="h-3.5 w-3.5 shrink-0" />
          최신순
        </button>
        <button
          onClick={() => handleSortChange("oldest")}
          className={`h-8 flex items-center gap-1 px-3 rounded-lg border text-sm transition-colors whitespace-nowrap ${
            currentSort === "oldest"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:bg-muted"
          }`}
        >
          <ArrowUp className="h-3.5 w-3.5 shrink-0" />
          오래된순
        </button>
        <button
          onClick={() => handleSortChange("duration")}
          className={`h-8 flex items-center gap-1 px-3 rounded-lg border text-sm transition-colors whitespace-nowrap ${
            currentSort === "duration"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border hover:bg-muted"
          }`}
        >
          <Clock className="h-3.5 w-3.5 shrink-0" />
          작업기간순
        </button>
      </div>
    </div>
  );
}
