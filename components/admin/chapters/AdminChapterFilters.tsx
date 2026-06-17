"use client";

import { useCallback, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import type { Manga } from "@/types/manga";

type FilterOptions = {
  search: string;
  mangaId: string | "all";
  status: "all" | "published" | "draft" | "scheduled";
  sortBy: "updated" | "newest" | "oldest" | "pages" | "manga";
};

type AdminChapterFiltersProps = {
  filters: FilterOptions;
  onFiltersChange: (f: FilterOptions) => void;
  mangas: Manga[];
};

export function AdminChapterFilters({ filters, onFiltersChange, mangas }: AdminChapterFiltersProps) {
  const handleSearch = useCallback((v: string) => onFiltersChange({ ...filters, search: v }), [filters, onFiltersChange]);
  const handleManga = useCallback((m: string | "all") => onFiltersChange({ ...filters, mangaId: m }), [filters, onFiltersChange]);
  const handleStatus = useCallback((s: FilterOptions["status"]) => onFiltersChange({ ...filters, status: s }), [filters, onFiltersChange]);
  const handleSort = useCallback((s: FilterOptions["sortBy"]) => onFiltersChange({ ...filters, sortBy: s }), [filters, onFiltersChange]);
  const handleReset = useCallback(() => onFiltersChange({ search: "", mangaId: "all", status: "all", sortBy: "updated" }), [onFiltersChange]);

  const hasActive = useMemo(() => filters.search !== "" || filters.mangaId !== "all" || filters.status !== "all" || filters.sortBy !== "updated", [filters]);

  return (
    <div className="mb-8 space-y-4">
      <div className="glass rounded-xl p-4 shadow-lg shadow-black/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by manga title, chapter title or number..."
              value={filters.search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted/50 focus:border-accent-purple/50 focus:outline-none focus:ring-1 focus:ring-accent-purple/50 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filters.mangaId}
              onChange={(e) => handleManga(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="all">All Manga</option>
              {mangas.map((m) => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
            <select
              value={filters.status}
              onChange={(e) => handleStatus(e.target.value as FilterOptions["status"])}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSort(e.target.value as FilterOptions["sortBy"])}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="updated">Latest Updated</option>
              <option value="newest">Newest Chapter</option>
              <option value="oldest">Oldest Chapter</option>
              <option value="pages">Most Pages</option>
              <option value="manga">Manga A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {hasActive && (
        <div className="glass rounded-xl p-3 text-right">
          <Button variant="ghost" size="sm" onClick={handleReset}>↻ Reset Filters</Button>
        </div>
      )}
    </div>
  );
}
