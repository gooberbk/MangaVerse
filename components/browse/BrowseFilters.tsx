"use client";

import {
  hasActiveFilters,
  RATING_FILTER_OPTIONS,
  type BrowseFilterState,
} from "@/lib/browse/catalog";
import { cn, statusLabel } from "@/lib/utils";
import type { MangaDemographic, MangaGenre, MangaStatus } from "@/types/manga";

type BrowseFiltersProps = {
  filters: BrowseFilterState;
  genres: MangaGenre[];
  demographics: MangaDemographic[];
  years: number[];
  onChange: (filters: BrowseFilterState) => void;
  onReset: () => void;
  className?: string;
};

const STATUSES: MangaStatus[] = ["ongoing", "completed", "hiatus"];

export function BrowseFilters({
  filters,
  genres,
  demographics,
  years,
  onChange,
  onReset,
  className,
}: BrowseFiltersProps) {
  const active = hasActiveFilters(filters);

  function toggleGenre(genre: MangaGenre) {
    const genres = filters.genres.includes(genre)
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];
    onChange({ ...filters, genres });
  }

  function toggleStatus(status: MangaStatus) {
    const statuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];
    onChange({ ...filters, statuses });
  }

  function toggleDemographic(demographic: MangaDemographic) {
    const demographics = filters.demographics.includes(demographic)
      ? filters.demographics.filter((d) => d !== demographic)
      : [...filters.demographics, demographic];
    onChange({ ...filters, demographics });
  }

  function toggleYear(year: number) {
    const years = filters.years.includes(year)
      ? filters.years.filter((y) => y !== year)
      : [...filters.years, year];
    onChange({ ...filters, years });
  }

  function setMinRating(minRating: number | null) {
    onChange({ ...filters, minRating });
  }

  return (
    <aside
      className={cn(
        "glass flex flex-col gap-6 rounded-2xl p-5 sm:p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Filters</h2>
          <p className="mt-0.5 text-xs text-muted">Refine your discovery</p>
        </div>
        {active && (
          <button
            type="button"
            onClick={onReset}
            className="shrink-0 text-xs font-medium text-accent-pink transition-colors hover:text-white"
          >
            Reset
          </button>
        )}
      </div>

      <FilterSection title="Genre">
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <FilterChip
              key={genre}
              label={genre}
              active={filters.genres.includes(genre)}
              onClick={() => toggleGenre(genre)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Status">
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((status) => (
            <FilterChip
              key={status}
              label={statusLabel(status)}
              active={filters.statuses.includes(status)}
              onClick={() => toggleStatus(status)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Demographic">
        <div className="flex flex-wrap gap-2">
          {demographics.map((demographic) => (
            <FilterChip
              key={demographic}
              label={demographic}
              active={filters.demographics.includes(demographic)}
              onClick={() => toggleDemographic(demographic)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Release Year">
        <div className="flex flex-wrap gap-2">
          {years.map((year) => (
            <FilterChip
              key={year}
              label={String(year)}
              active={filters.years.includes(year)}
              onClick={() => toggleYear(year)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Minimum Rating">
        <div className="flex flex-wrap gap-2">
          {RATING_FILTER_OPTIONS.map((option) => (
            <FilterChip
              key={option.label}
              label={option.label}
              active={filters.minRating === option.value}
              onClick={() => setMinRating(option.value)}
            />
          ))}
        </div>
      </FilterSection>

      <button
        type="button"
        onClick={onReset}
        disabled={!active}
        className={cn(
          "mt-auto w-full rounded-xl border py-2.5 text-sm font-medium transition-all duration-200",
          active
            ? "border-white/15 bg-white/[0.04] text-white hover:border-white/25 hover:bg-white/[0.08]"
            : "cursor-not-allowed border-white/5 text-muted/50",
        )}
      >
        Reset filters
      </button>
    </aside>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </h3>
      {children}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-2.5 py-1 text-xs font-medium transition-all duration-200",
        active
          ? "border-accent-purple/50 bg-accent-purple/20 text-white"
          : "border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:bg-white/[0.06] hover:text-white",
      )}
    >
      {label}
    </button>
  );
}
