"use client";

import { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import type { MangaStatus } from "@/types/manga";
import { cn } from "@/lib/utils";

type FilterOptions = {
  search: string;
  status: MangaStatus | "all";
  featured: boolean | "all";
  sortBy: "updated" | "rating" | "views" | "chapters" | "title";
};

type AdminMangaFiltersProps = {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
};

const SORT_OPTIONS = [
  { value: "updated", label: "Latest Updated" },
  { value: "rating", label: "Highest Rated" },
  { value: "views", label: "Most Viewed" },
  { value: "chapters", label: "Most Chapters" },
  { value: "title", label: "A-Z" },
] as const;

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "hiatus", label: "Hiatus" },
] as const;

export function AdminMangaFilters({
  filters,
  onFiltersChange,
}: AdminMangaFiltersProps) {
  const handleSearchChange = useCallback(
    (value: string) => {
      onFiltersChange({ ...filters, search: value });
    },
    [filters, onFiltersChange],
  );

  const handleStatusChange = useCallback(
    (status: MangaStatus | "all") => {
      onFiltersChange({ ...filters, status });
    },
    [filters, onFiltersChange],
  );

  const handleFeaturedChange = useCallback(
    (featured: boolean | "all") => {
      onFiltersChange({ ...filters, featured });
    },
    [filters, onFiltersChange],
  );

  const handleSortChange = useCallback(
    (sortBy: "updated" | "rating" | "views" | "chapters" | "title") => {
      onFiltersChange({ ...filters, sortBy });
    },
    [filters, onFiltersChange],
  );

  const handleReset = useCallback(() => {
    onFiltersChange({
      search: "",
      status: "all",
      featured: "all",
      sortBy: "updated",
    });
  }, [onFiltersChange]);

  const hasActiveFilters = useMemo(
    () =>
      filters.search !== "" ||
      filters.status !== "all" ||
      filters.featured !== "all" ||
      filters.sortBy !== "updated",
    [filters],
  );

  return (
    <div className="mb-8 space-y-4">
      {/* Search bar */}
      <div className="glass rounded-xl p-4 shadow-lg shadow-black/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by title, author, artist, or genre..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted/50 focus:border-accent-purple/50 focus:outline-none focus:ring-1 focus:ring-accent-purple/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Filter controls */}
      <div className="glass rounded-xl p-4 shadow-lg shadow-black/20">
        <div className="space-y-4">
          {/* Row 1: Status and Featured */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-muted uppercase">
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleStatusChange(option.value as MangaStatus | "all")
                    }
                    className={cn(
                      "rounded-lg px-3 py-2 text-xs font-medium transition-all",
                      filters.status === option.value
                        ? "bg-accent-purple text-white shadow-lg shadow-purple-500/25"
                        : "glass glass-hover text-muted hover:text-white",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-muted uppercase">
                Featured
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "All" },
                  { value: true, label: "Featured" },
                  { value: false, label: "Regular" },
                ].map((option) => (
                  <button
                    key={String(option.value)}
                    onClick={() =>
                      handleFeaturedChange(
                        option.value as boolean | "all",
                      )
                    }
                    className={cn(
                      "rounded-lg px-3 py-2 text-xs font-medium transition-all",
                      filters.featured === option.value
                        ? "bg-accent-purple text-white shadow-lg shadow-purple-500/25"
                        : "glass glass-hover text-muted hover:text-white",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Sort */}
          <div>
            <label className="mb-2 block text-xs font-semibold text-muted uppercase">
              Sort By
            </label>
            <div className="flex flex-wrap gap-2">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    handleSortChange(
                      option.value as
                        | "updated"
                        | "rating"
                        | "views"
                        | "chapters"
                        | "title",
                    )
                  }
                  className={cn(
                    "rounded-lg px-3 py-2 text-xs font-medium transition-all",
                    filters.sortBy === option.value
                      ? "bg-accent-pink text-white shadow-lg shadow-pink-500/25"
                      : "glass glass-hover text-muted hover:text-white",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reset button */}
          {hasActiveFilters && (
            <div className="pt-2 border-t border-white/10">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs"
              >
                ↻ Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
