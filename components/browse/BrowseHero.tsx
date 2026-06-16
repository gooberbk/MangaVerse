"use client";

import { StatBadge } from "@/components/ui/StatBadge";
import type { CatalogStats } from "@/lib/browse/catalog";
import { cn } from "@/lib/utils";

type BrowseHeroProps = {
  stats: CatalogStats;
  search: string;
  onSearchChange: (value: string) => void;
};

export function BrowseHero({
  stats,
  search,
  onSearchChange,
}: BrowseHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-pink/10" />
      <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-accent-purple/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-48 w-48 rounded-full bg-accent-pink/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-purple">
            Catalog
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Browse Manga
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Explore our full library of fictional series. Filter by genre,
            status, and more to find your next obsession.
          </p>
        </div>

        <label className="relative mt-8 block max-w-xl">
          <span className="sr-only">Search manga catalog</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, author, or genre..."
            className={cn(
              "glass w-full rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white",
              "placeholder:text-muted/70 outline-none transition-all duration-200",
              "focus:border-accent-purple/40 focus:ring-2 focus:ring-accent-purple/20",
            )}
          />
        </label>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <StatBadge label="Total Titles" value={stats.totalTitles} />
          <StatBadge label="Genres" value={stats.genreCount} />
          <StatBadge label="Ongoing" value={stats.ongoingCount} />
          <StatBadge label="Completed" value={stats.completedCount} />
        </div>
      </div>
    </section>
  );
}

function SearchIcon({ className }: { className?: string }) {
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
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
