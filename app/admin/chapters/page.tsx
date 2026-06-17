"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminTablePreview } from "@/components/admin/AdminTablePreview";
import { AdminPlaceholderPanel } from "@/components/admin/AdminPlaceholderPanel";
import { recentChapters } from "@/lib/mock/admin";
import { formatUpdatedDate } from "@/lib/utils";

const chapterTableColumns = [
  { key: "chapter", label: "Chapter", width: "w-1/6" },
  { key: "manga", label: "Manga", width: "w-1/4" },
  { key: "title", label: "Title", width: "w-1/3" },
  { key: "pages", label: "Pages", width: "w-1/8" },
  { key: "uploaded", label: "Uploaded", width: "w-1/6" },
];

const chapterTableData = recentChapters.map((chapter) => ({
  chapter: `Ch. ${chapter.number}`,
  manga: (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${chapter.coverGradient}`}
      >
        <span className="text-sm">📚</span>
      </div>
      <span className="font-medium text-white">{chapter.mangaTitle}</span>
    </div>
  ),
  title: chapter.title,
  pages: chapter.pageCount,
  uploaded: formatUpdatedDate(chapter.publishedAt),
}));

export default function AdminChaptersPage() {
  return (
    <AdminShell
      title="Chapter Management"
      description="Upload and manage manga chapters"
    >
      <AdminPageHeader
        title="Chapters"
        description="View and manage all uploaded chapters"
        action={{ label: "+ Add Chapter", href: "#" }}
      />

      <div className="space-y-6">
        {/* Stats row */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">{recentChapters.length}</p>
            <p className="text-sm text-muted">Total Chapters</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">
              {recentChapters.reduce((sum, ch) => sum + ch.pageCount, 0)}
            </p>
            <p className="text-sm text-muted">Total Pages</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">8</p>
            <p className="text-sm text-muted">Manga Series</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-sm text-muted">Pending Review</p>
          </div>
        </div>

        {/* Chapter table */}
        <AdminTablePreview columns={chapterTableColumns} data={chapterTableData} />

        {/* CTA for adding chapters */}
        <AdminPlaceholderPanel
          icon="📖"
          title="Upload New Chapter"
          description="Add new chapters to existing manga series with page-by-page upload functionality and automatic optimization."
          action={{ label: "Upload Chapter", onClick: () => {} }}
        />
      </div>
    </AdminShell>
  );
}
