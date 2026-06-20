"use client";

import { useState, useMemo, useCallback } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { AdminChapterStats } from "./AdminChapterStats";
import { AdminChapterFilters } from "./AdminChapterFilters";
import { AdminChapterTable } from "./AdminChapterTable";
import { AdminChapterEmptyState } from "./AdminChapterEmptyState";
import type { Chapter } from "@/types/chapter";
import type { Manga } from "@/types/manga";

type FilterOptions = {
  search: string;
  mangaId: string | "all";
  status: "all" | "published" | "draft" | "scheduled";
  sortBy: "updated" | "newest" | "oldest" | "pages" | "manga";
};

type EnrichedChapter = Chapter & {
  mangaTitle: string;
  mangaSlug?: string;
  coverGradient: string;
  status?: string;
};

type AdminChaptersPageClientProps = {
  chapters: EnrichedChapter[];
  mangas: Manga[];
  isMockFallback?: boolean;
};

export function AdminChaptersPageClient({
  chapters,
  mangas,
  isMockFallback = false,
}: AdminChaptersPageClientProps) {
  const [filters, setFilters] = useState<FilterOptions>({ search: "", mangaId: "all", status: "all", sortBy: "updated" });

  const filtered = useMemo(() => {
    let result = [...chapters];
    const q = filters.search.trim().toLowerCase();

    if (q) {
      result = result.filter((c) =>
        c.title.toLowerCase().includes(q) ||
        String(c.number).includes(q) ||
        c.mangaTitle.toLowerCase().includes(q),
      );
    }

    if (filters.mangaId !== "all") {
      result = result.filter((c) => c.mangaId === filters.mangaId);
    }

    if (filters.status !== "all") {
      result = result.filter((c) => c.status === filters.status);
    }

    switch (filters.sortBy) {
      case "newest":
        result.sort((a, b) => b.number - a.number);
        break;
      case "oldest":
        result.sort((a, b) => a.number - b.number);
        break;
      case "pages":
        result.sort((a, b) => b.pageCount - a.pageCount);
        break;
      case "manga":
        result.sort((a, b) => a.mangaTitle.localeCompare(b.mangaTitle));
        break;
      case "updated":
      default:
        result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    return result;
  }, [chapters, filters]);

  const stats = useMemo(() => {
    const total = chapters.length;
    const published = chapters.filter((c) => c.status === "published").length;
    const drafts = chapters.filter((c) => c.status === "draft").length;
    const scheduled = chapters.filter((c) => c.status === "scheduled").length;
    const avg = chapters.reduce((s, c) => s + c.pageCount, 0) / Math.max(1, chapters.length);
    return { total, published, drafts, scheduled, avg };
  }, [chapters]);

  const showNotConnectedMessage = useCallback(() => {
    alert("Real admin editing is not connected yet. Use Appwrite Console for now.");
  }, []);

  return (
    <AdminShell title="Chapter Management" description="Manage manga chapters and publication status">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Chapter Management</h1>
          <p className="mt-2 text-muted">Manage and publish chapters across your catalog</p>
        </div>
        <div className="flex gap-3 flex-wrap sm:flex-nowrap">
          <Button variant="secondary" size="md" onClick={showNotConnectedMessage} className="text-sm">📥 Bulk Import</Button>
          <Button variant="primary" size="md" onClick={showNotConnectedMessage} className="text-sm">➕ Add Chapter</Button>
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
          chapter create, update, and delete actions.
        </span>
      </div>

      <AdminChapterStats totalChapters={stats.total} published={stats.published} drafts={stats.drafts} scheduled={stats.scheduled} avgPages={stats.avg} />

      <AdminChapterFilters filters={filters} onFiltersChange={setFilters} mangas={mangas} />

      {filtered.length > 0 ? (
        <AdminChapterTable chapters={filtered} onEdit={showNotConnectedMessage} onDelete={showNotConnectedMessage} />
      ) : (
        <AdminChapterEmptyState
          message={
            chapters.length === 0
              ? "No Appwrite chapters found. Add chapter rows in Appwrite Console."
              : "No chapters match your current filters. Try expanding your search or reset the filters to see all chapters."
          }
          actionLabel={chapters.length === 0 ? undefined : "Reset Filters"}
          onReset={() => setFilters({ search: "", mangaId: "all", status: "all", sortBy: "updated" })}
        />
      )}
    </AdminShell>
  );
}
