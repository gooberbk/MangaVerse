"use client";

import { BROWSE_SORT_OPTIONS, type BrowseSortOption } from "@/lib/browse/catalog";
import { cn } from "@/lib/utils";

type BrowseSortProps = {
  value: BrowseSortOption;
  onChange: (value: BrowseSortOption) => void;
  resultCount: number;
  totalCount: number;
};

export function BrowseSort({
  value,
  onChange,
  resultCount,
  totalCount,
}: BrowseSortProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted">
        Showing{" "}
        <span className="font-semibold text-white">{resultCount}</span> of{" "}
        <span className="font-semibold text-white">{totalCount}</span> titles
      </p>

      <div className="flex flex-wrap gap-2">
        {BROWSE_SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200",
              value === option.value
                ? "border-accent-purple/50 bg-accent-purple/20 text-white shadow-sm shadow-purple-500/10"
                : "border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:bg-white/[0.06] hover:text-white",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
