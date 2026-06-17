"use client";

import { useState, useMemo, useCallback } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/Button";
import { AdminChapterStats } from "./AdminChapterStats";
import { AdminChapterFilters } from "./AdminChapterFilters";
import { AdminChapterTable } from "./AdminChapterTable";
import { AdminChapterFormPanel } from "./AdminChapterFormPanel";
import { AdminChapterDeleteDialog } from "./AdminChapterDeleteDialog";
import { AdminChapterEmptyState } from "./AdminChapterEmptyState";
import { mockChapters } from "@/lib/mock/chapters";
import { mockMangas } from "@/lib/mock/mangas";
import type { Chapter } from "@/types/chapter";

type FilterOptions = {
  search: string;
  mangaId: string | "all";
  status: "all" | "published" | "draft" | "scheduled";
  sortBy: "updated" | "newest" | "oldest" | "pages" | "manga";
};

export function AdminChaptersPageClient() {
  type EnrichedChapter = Chapter & { mangaTitle: string; coverGradient: string; status?: string };

  const [chapters, setChapters] = useState<EnrichedChapter[]>(() => {
    // Enrich chapters with manga info
    return mockChapters.map((c) => {
      const manga = mockMangas.find((m) => m.id === c.mangaId);
      return {
        ...c,
        mangaTitle: manga?.title ?? "Unknown",
        coverGradient: manga?.coverGradient ?? "from-slate-700 via-slate-600 to-slate-500",
        status: c.publishedAt ? "published" : "draft",
      } as EnrichedChapter;
    });
  });

  const [filters, setFilters] = useState<FilterOptions>({ search: "", mangaId: "all", status: "all", sortBy: "updated" });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Chapter | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Chapter | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleAdd = useCallback(() => { setEditing(null); setIsFormOpen(true); }, []);
  const handleEdit = useCallback((c: Chapter) => { setEditing(c); setIsFormOpen(true); }, []);
  const handleDelete = useCallback((c: Chapter) => setDeleteTarget(c), []);

  const handleSave = useCallback(async (data: Partial<Chapter> & { mangaId: string }) => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    if (editing) {
      setChapters((prev) => prev.map((p) => p.id === editing.id ? { ...p, ...data } as EnrichedChapter : p));
    } else {
      const newChap: EnrichedChapter = {
        id: `local-${Date.now()}`,
        slug: `ch-${data.number ?? 1}`,
        mangaId: data.mangaId,
        number: data.number ?? 1,
        title: data.title ?? "Untitled",
        publishedAt: data.publishedAt ?? new Date().toISOString(),
        pageCount: data.pageCount ?? 0,
        mangaTitle: mockMangas.find((m) => m.id === data.mangaId)?.title ?? "Unknown",
        coverGradient: mockMangas.find((m) => m.id === data.mangaId)?.coverGradient ?? "from-slate-700 via-slate-600 to-slate-500",
        status: data.publishedAt ? "published" : "draft",
      };
      setChapters((prev) => [newChap, ...prev]);
    }
    setIsSaving(false);
    setIsFormOpen(false);
    setEditing(null);
  }, [editing]);

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    await new Promise((r) => setTimeout(r, 400));
    setChapters((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
    setIsDeleting(false);
  }, [deleteTarget]);

  const handleImport = useCallback(() => {
    alert("Bulk import is UI-only in this demo.");
  }, []);

  return (
    <AdminShell title="Chapter Management" description="Manage manga chapters and publication status">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Chapter Management</h1>
          <p className="mt-2 text-muted">Manage and publish chapters across your catalog</p>
        </div>
        <div className="flex gap-3 flex-wrap sm:flex-nowrap">
          <Button variant="secondary" size="md" onClick={handleImport} className="text-sm">📥 Bulk Import</Button>
          <Button variant="primary" size="md" onClick={handleAdd} className="text-sm">➕ Add Chapter</Button>
        </div>
      </div>

      <AdminChapterStats totalChapters={stats.total} published={stats.published} drafts={stats.drafts} scheduled={stats.scheduled} avgPages={stats.avg} />

      <AdminChapterFilters filters={filters} onFiltersChange={setFilters} mangas={mockMangas} />

      {filtered.length > 0 ? (
        <AdminChapterTable chapters={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <AdminChapterEmptyState onReset={() => setFilters({ search: "", mangaId: "all", status: "all", sortBy: "updated" })} />
      )}

      <AdminChapterFormPanel chapter={editing} mangas={mockMangas} isOpen={isFormOpen} isLoading={isSaving} onSave={handleSave} onCancel={() => { setIsFormOpen(false); setEditing(null); }} />

      <AdminChapterDeleteDialog chapter={deleteTarget} isOpen={!!deleteTarget} isLoading={isDeleting} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />
    </AdminShell>
  );
}
