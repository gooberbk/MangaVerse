"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminMangaStats } from "./AdminMangaStats";
import { AdminMangaFilters } from "./AdminMangaFilters";
import { AdminMangaTable } from "./AdminMangaTable";
import { AdminMangaFormPanel } from "./AdminMangaFormPanel";
import { AdminMangaDeleteDialog } from "./AdminMangaDeleteDialog";
import { AdminMangaEmptyState } from "./AdminMangaEmptyState";
import { mockMangas } from "@/lib/mock/mangas";
import type { Manga, MangaStatus } from "@/types/manga";

type FilterOptions = {
  search: string;
  status: MangaStatus | "all";
  featured: boolean | "all";
  sortBy: "updated" | "rating" | "views" | "chapters" | "title";
};

export function AdminMangaPageClient() {
  const [mangas, setMangas] = useState<Manga[]>(mockMangas);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    status: "all",
    featured: "all",
    sortBy: "updated",
  });

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingManga, setEditingManga] = useState<Manga | null>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);

  // Delete dialog state
  const [deleteConfirm, setDeleteConfirm] = useState<Manga | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  // Filtered and sorted manga
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
      mangas.reduce((sum, m) => sum + m.rating.average, 0) / mangas.length;

    return { ongoing, completed, featured, avgRating };
  }, [mangas]);

  // Handlers
  const handleAddManga = useCallback(() => {
    setEditingManga(null);
    setIsFormOpen(true);
  }, []);

  const handleEditManga = useCallback((manga: Manga) => {
    setEditingManga(manga);
    setIsFormOpen(true);
  }, []);

  const handleDeleteManga = useCallback((manga: Manga) => {
    setDeleteConfirm(manga);
  }, []);

  const handleSaveManga = useCallback(
    async (formData: Partial<Manga>) => {
      setIsFormLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (editingManga) {
        // Update existing
        setMangas((prev) =>
          prev.map((m) =>
            m.id === editingManga.id ? { ...m, ...formData } : m,
          ),
        );
      } else {
        // Add new
        const newManga: Manga = {
          id: String(mangas.length + 1),
          slug: formData.title?.toLowerCase().replace(/\s+/g, "-") || "new-manga",
          ...formData,
        } as Manga;
        setMangas((prev) => [newManga, ...prev]);
      }

      setIsFormOpen(false);
      setEditingManga(null);
      setIsFormLoading(false);
    },
    [editingManga, mangas.length],
  );

  const handleConfirmDelete = useCallback(
    async (manga: Manga) => {
      setIsDeleteLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setMangas((prev) => prev.filter((m) => m.id !== manga.id));
      setDeleteConfirm(null);
      setIsDeleteLoading(false);
    },
    [],
  );

  const handleCancelForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingManga(null);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setDeleteConfirm(null);
  }, []);

  const handleImportCSV = useCallback(() => {
    // UI-only - just show a placeholder alert
    alert("CSV import feature is UI-only. In production, this would allow bulk manga uploads.");
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
            onClick={handleImportCSV}
            className="text-sm"
          >
            📥 Import CSV
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleAddManga}
            className="text-sm"
          >
            ➕ Add Manga
          </Button>
        </div>
      </div>

      {/* Stats Row */}
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
          onEdit={handleEditManga}
          onDelete={handleDeleteManga}
        />
      ) : (
        <AdminMangaEmptyState onResetFilters={() => setFilters({
          search: "",
          status: "all",
          featured: "all",
          sortBy: "updated",
        })} />
      )}

      {/* Form Panel */}
      <AdminMangaFormPanel
        manga={editingManga}
        isOpen={isFormOpen}
        isLoading={isFormLoading}
        onSave={handleSaveManga}
        onCancel={handleCancelForm}
      />

      {/* Delete Dialog */}
      <AdminMangaDeleteDialog
        manga={deleteConfirm}
        isOpen={!!deleteConfirm}
        isLoading={isDeleteLoading}
        onConfirm={() => deleteConfirm && handleConfirmDelete(deleteConfirm)}
        onCancel={handleCancelDelete}
      />
    </AdminShell>
  );
}
