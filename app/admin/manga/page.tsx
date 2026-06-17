"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTablePreview } from "@/components/admin/AdminTablePreview";
import { AdminPlaceholderPanel } from "@/components/admin/AdminPlaceholderPanel";
import { mockMangas } from "@/lib/mock/mangas";
import { statusColor, formatViews } from "@/lib/utils";

const mangaTableColumns = [
  { key: "title", label: "Title", width: "w-1/4" },
  { key: "author", label: "Author", width: "w-1/6" },
  { key: "chapters", label: "Chapters", width: "w-1/8" },
  { key: "status", label: "Status", width: "w-1/8" },
  { key: "views", label: "Views", width: "w-1/8" },
  { key: "rating", label: "Rating", width: "w-1/8" },
];

const mangaTableData = mockMangas.slice(0, 8).map((manga) => ({
  title: (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${manga.coverGradient}`}
      >
        <span className="text-lg">📚</span>
      </div>
      <div>
        <p className="font-medium text-white">{manga.title}</p>
        <p className="text-xs text-muted">{manga.genres.slice(0, 2).join(", ")}</p>
      </div>
    </div>
  ),
  author: manga.author,
  chapters: manga.chapterCount,
  status: (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium border ${statusColor(manga.status)}`}
    >
      {manga.status}
    </span>
  ),
  views: formatViews(manga.views),
  rating: manga.rating.average.toFixed(1),
}));

export default function AdminMangaPage() {
  return (
    <AdminShell
      title="Manga Management"
      description="Manage your manga library and content"
    >
      <AdminPageHeader
        title="Manga Library"
        description="View and manage all manga in your library"
        action={{ label: "+ Add Manga", href: "#" }}
      />

      <div className="space-y-6">
        {/* Stats row */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">{mockMangas.length}</p>
            <p className="text-sm text-muted">Total Manga</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">
              {mockMangas.filter((m) => m.status === "ongoing").length}
            </p>
            <p className="text-sm text-muted">Ongoing</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">
              {mockMangas.filter((m) => m.status === "completed").length}
            </p>
            <p className="text-sm text-muted">Completed</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">
              {mockMangas.filter((m) => m.isTrending).length}
            </p>
            <p className="text-sm text-muted">Trending</p>
          </div>
        </div>

        {/* Manga table */}
        <AdminTablePreview columns={mangaTableColumns} data={mangaTableData} />

        {/* CTA for adding manga */}
        <AdminPlaceholderPanel
          icon="📚"
          title="Add New Manga"
          description="Expand your library by adding new manga series with full metadata, cover images, and chapter management."
          action={{ label: "Create New Manga", onClick: () => {} }}
        />
      </div>
    </AdminShell>
  );
}
