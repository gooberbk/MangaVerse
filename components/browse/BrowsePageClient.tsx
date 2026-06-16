"use client";

import { useMemo, useState } from "react";
import { BrowseFilters } from "@/components/browse/BrowseFilters";
import { BrowseHero } from "@/components/browse/BrowseHero";
import { BrowseSort } from "@/components/browse/BrowseSort";
import { CatalogEmptyState } from "@/components/browse/CatalogEmptyState";
import { MangaGrid } from "@/components/browse/MangaGrid";
import {
  DEFAULT_BROWSE_FILTERS,
  filterMangas,
  sortMangas,
  type BrowseFilterState,
  type BrowseSortOption,
  type CatalogStats,
} from "@/lib/browse/catalog";
import { cn } from "@/lib/utils";
import type { Manga, MangaDemographic, MangaGenre } from "@/types/manga";

type BrowsePageClientProps = {
  mangas: Manga[];
  genres: MangaGenre[];
  demographics: MangaDemographic[];
  years: number[];
  stats: CatalogStats;
};

export function BrowsePageClient({
  mangas,
  genres,
  demographics,
  years,
  stats,
}: BrowsePageClientProps) {
  const [filters, setFilters] = useState<BrowseFilterState>(
    DEFAULT_BROWSE_FILTERS,
  );
  const [sort, setSort] = useState<BrowseSortOption>("popular");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredMangas = useMemo(
    () => sortMangas(filterMangas(mangas, filters), sort),
    [mangas, filters, sort],
  );

  function handleSearchChange(search: string) {
    setFilters((prev) => ({ ...prev, search }));
  }

  function handleReset() {
    setFilters(DEFAULT_BROWSE_FILTERS);
    setMobileFiltersOpen(false);
  }

  return (
    <>
      <BrowseHero
        stats={stats}
        search={filters.search}
        onSearchChange={handleSearchChange}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <p className="text-sm text-muted">
            {filteredMangas.length} result
            {filteredMangas.length !== 1 ? "s" : ""}
          </p>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((open) => !open)}
            className="glass glass-hover flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white"
          >
            <FilterIcon />
            Filters
          </button>
        </div>

        <div className="flex gap-8 lg:gap-10">
          <div className="hidden w-64 shrink-0 lg:block xl:w-72">
            <div className="sticky top-24">
              <BrowseFilters
                filters={filters}
                genres={genres}
                demographics={demographics}
                years={years}
                onChange={setFilters}
                onReset={handleReset}
              />
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-6">
            <BrowseSort
              value={sort}
              onChange={setSort}
              resultCount={filteredMangas.length}
              totalCount={mangas.length}
            />

            {filteredMangas.length > 0 ? (
              <MangaGrid mangas={filteredMangas} />
            ) : (
              <CatalogEmptyState onReset={handleReset} />
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <MobileFilterDrawer
          filters={filters}
          genres={genres}
          demographics={demographics}
          years={years}
          onChange={setFilters}
          onReset={handleReset}
          onClose={() => setMobileFiltersOpen(false)}
        />
      )}
    </>
  );
}

function MobileFilterDrawer({
  filters,
  genres,
  demographics,
  years,
  onChange,
  onReset,
  onClose,
}: {
  filters: BrowseFilterState;
  genres: MangaGenre[];
  demographics: MangaDemographic[];
  years: number[];
  onChange: (filters: BrowseFilterState) => void;
  onReset: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col",
          "border-l border-white/10 bg-surface/95 shadow-2xl backdrop-blur-xl",
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-base font-semibold text-white">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="glass glass-hover flex h-9 w-9 items-center justify-center rounded-lg text-muted"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <BrowseFilters
            filters={filters}
            genres={genres}
            demographics={demographics}
            years={years}
            onChange={onChange}
            onReset={() => {
              onReset();
              onClose();
            }}
            className="border-0 bg-transparent p-0 backdrop-blur-none"
          />
        </div>
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:brightness-110"
          >
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 3h4" />
      <path d="M12 16v5" />
      <path d="M8 21h8" />
      <path d="M12 3v8" />
      <path d="M4 7h16" />
      <path d="M6 7v4" />
      <path d="M18 7v4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
