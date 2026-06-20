"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminMangaStats } from "./AdminMangaStats";
import { AdminMangaFilters } from "./AdminMangaFilters";
import { AdminMangaTable } from "./AdminMangaTable";
import { AdminMangaEmptyState } from "./AdminMangaEmptyState";
import type { Manga, MangaStatus } from "@/types/manga";

type FilterOptions = {
  search: string;
  status: MangaStatus | "all";
  featured: boolean | "all";
  sortBy: "updated" | "rating" | "views" | "chapters" | "title";
};

type AdminMangaPageClientProps = {
  mangas: Manga[];
  isMockFallback?: boolean;
};

export function AdminMangaPageClient({
  mangas,
  isMockFallback = false,
}: AdminMangaPageClientProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    status: "all",
    featured: "all",
    sortBy: "updated",
  });

  const filteredMangas = useMemo(() => {
    let result = [...mangas];

    // Apply search filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (manga) =>
          manga.title.toLowerCase().includes(query) ||
          manga.author.toLowerCase().includes(query) ||
          manga.artist.toLowerCase().includes(query) ||
          manga.genres.some((g) => g.toLowerCase().includes(query)),
      );
    }

    // Apply status filter
    if (filters.status !== "all") {
      result = result.filter((manga) => manga.status === filters.status);
    }

    // Apply featured filter
    if (filters.featured !== "all") {
      result = result.filter((manga) => manga.isFeatured === filters.featured);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "rating":
        result.sort((a, b) => b.rating.average - a.rating.average);
        break;
      case "views":
        result.sort((a, b) => b.views - a.views);
        break;
      case "chapters":
        result.sort((a, b) => b.chapterCount - a.chapterCount);
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "updated":
      default:
        result.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
    }

    return result;
  }, [mangas, filters]);

  // Stats
  const stats = useMemo(() => {
    const ongoing = mangas.filter((m) => m.status === "ongoing").length;
    const completed = mangas.filter((m) => m.status === "completed").length;
    const featured = mangas.filter((m) => m.isFeatured).length;
    const avgRating =
      mangas.length > 0
        ? mangas.reduce((sum, m) => sum + m.rating.average, 0) / mangas.length
        : 0;

    return { ongoing, completed, featured, avgRating };
  }, [mangas]);

  const showNotConnectedMessage = useCallback(() => {
    alert("Real admin editing is not connected yet. Use Appwrite Console for now.");
  }, []);

  return (
    <AdminShell
      title="Manga Management"
      description="Manage your manga library and content"
    >
      {/* Header with CTAs */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manga Management</h1>
          <p className="mt-2 text-muted">
            Manage and organize your manga catalog
          </p>
        </div>
        <div className="flex gap-3 flex-wrap sm:flex-nowrap">
          <Button
            variant="secondary"
            size="md"
            onClick={showNotConnectedMessage}
            className="text-sm"
          >
            📥 Import CSV
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={showNotConnectedMessage}
            className="text-sm"
          >
            ➕ Add Manga
          </Button>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
        {isMockFallback ? (
          <span className="font-semibold">Mock fallback</span>
        ) : (
          <span className="font-semibold">Read-only Appwrite data</span>
        )}
        <span className="text-amber-100/80">
          {" "}
          - Real admin editing is not connected yet. Use Appwrite Console for
          create, update, and delete actions.
        </span>
      </div>

      <AdminMangaStats
        totalManga={mangas.length}
        ongoing={stats.ongoing}
        completed={stats.completed}
        featured={stats.featured}
        averageRating={stats.avgRating}
      />

      {/* Filters */}
      <AdminMangaFilters
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Table or Empty State */}
      {filteredMangas.length > 0 ? (
        <AdminMangaTable
          mangas={filteredMangas}
          onEdit={showNotConnectedMessage}
          onDelete={showNotConnectedMessage}
        />
      ) : (
        <AdminMangaEmptyState
          message={
            mangas.length === 0
              ? "No Appwrite manga found. Add manga rows in Appwrite Console."
              : "No manga matches your current filters. Try adjusting your search criteria or reset the filters to see all titles."
          }
          actionLabel={mangas.length === 0 ? undefined : "Reset Filters"}
          onResetFilters={() => setFilters({
            search: "",
            status: "all",
            featured: "all",
            sortBy: "updated",
          })}
        />
      )}
    </AdminShell>
  );
}
