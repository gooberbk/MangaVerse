"use client";

import { Button } from "@/components/ui/Button";
import { AdminBadge } from "./AdminBadge";
import type { Manga } from "@/types/manga";
import { statusColor, formatViews, formatPublishedDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type AdminMangaTableProps = {
  mangas: Manga[];
  onEdit: (manga: Manga) => void;
  onDelete: (manga: Manga) => void;
};

export function AdminMangaTable({
  mangas,
  onEdit,
  onDelete,
}: AdminMangaTableProps) {
  // Desktop table view
  return (
    <div>
      {/* Desktop view - hidden on mobile */}
      <div className="hidden lg:block glass rounded-2xl shadow-lg shadow-black/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Author
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Genres
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted">
                  Rating
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted">
                  Views
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted">
                  Chapters
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Updated
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mangas.map((manga) => (
                <tr
                  key={manga.id}
                  className="transition-colors hover:bg-white/5"
                >
                  {/* Title */}
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg shrink-0 text-lg bg-gradient-to-br",
                          manga.coverGradient,
                        )}
                      >
                        📚
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate">
                          {manga.title}
                        </p>
                        <div className="mt-1 flex gap-1 flex-wrap">
                          {manga.isFeatured && (
                            <AdminBadge type="featured">Featured</AdminBadge>
                          )}
                          {manga.isNew && (
                            <AdminBadge type="new">New</AdminBadge>
                          )}
                          {manga.isTrending && (
                            <AdminBadge type="trending">Trending</AdminBadge>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Author */}
                  <td className="px-6 py-4 text-sm text-muted">
                    {manga.author}
                  </td>

                  {/* Genres */}
                  <td className="px-6 py-4 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {manga.genres.slice(0, 2).map((genre) => (
                        <span
                          key={genre}
                          className="text-xs px-2 py-1 rounded bg-white/5 text-muted"
                        >
                          {genre}
                        </span>
                      ))}
                      {manga.genres.length > 2 && (
                        <span className="text-xs px-2 py-1 rounded bg-white/5 text-muted">
                          +{manga.genres.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium border",
                        statusColor(manga.status),
                      )}
                    >
                      {manga.status.charAt(0).toUpperCase() + manga.status.slice(1)}
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-4 text-sm text-center text-white font-medium">
                    {manga.rating.average.toFixed(1)} ⭐
                  </td>

                  {/* Views */}
                  <td className="px-6 py-4 text-sm text-center text-muted">
                    {formatViews(manga.views)}
                  </td>

                  {/* Chapters */}
                  <td className="px-6 py-4 text-sm text-center text-white font-medium">
                    {manga.chapterCount}
                  </td>

                  {/* Updated */}
                  <td className="px-6 py-4 text-sm text-muted">
                    {formatPublishedDate(manga.updatedAt)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(manga)}
                        className="text-xs"
                      >
                        ✏️
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(manga)}
                        className="text-xs hover:text-rose-400"
                      >
                        🗑️
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile view - cards */}
      <div className="lg:hidden space-y-4">
        {mangas.map((manga) => (
          <div
            key={manga.id}
            className="glass rounded-xl p-4 shadow-lg shadow-black/20"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-3 flex-1 min-w-0">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg shrink-0 text-xl bg-gradient-to-br",
                    manga.coverGradient,
                  )}
                >
                  📚
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-white truncate">
                    {manga.title}
                  </h4>
                  <p className="text-xs text-muted">{manga.author}</p>
                </div>
              </div>

              {/* Status badge */}
              <span
                className={cn(
                  "inline-flex rounded-full px-2.5 py-1 text-xs font-medium border whitespace-nowrap ml-2",
                  statusColor(manga.status),
                )}
              >
                {manga.status.charAt(0).toUpperCase() + manga.status.slice(1)}
              </span>
            </div>

            {/* Badges */}
            {(manga.isFeatured || manga.isNew || manga.isTrending) && (
              <div className="mb-4 flex flex-wrap gap-1">
                {manga.isFeatured && (
                  <AdminBadge type="featured">Featured</AdminBadge>
                )}
                {manga.isNew && <AdminBadge type="new">New</AdminBadge>}
                {manga.isTrending && (
                  <AdminBadge type="trending">Trending</AdminBadge>
                )}
              </div>
            )}

            {/* Genres */}
            {manga.genres.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-muted mb-2">Genres</p>
                <div className="flex flex-wrap gap-1">
                  {manga.genres.map((genre) => (
                    <span
                      key={genre}
                      className="text-xs px-2 py-1 rounded bg-white/5 text-muted"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="mb-4 grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <p className="text-muted text-xs mb-1">Rating</p>
                <p className="font-semibold text-white">
                  {manga.rating.average.toFixed(1)} ⭐
                </p>
              </div>
              <div>
                <p className="text-muted text-xs mb-1">Views</p>
                <p className="font-semibold text-white">
                  {formatViews(manga.views)}
                </p>
              </div>
              <div>
                <p className="text-muted text-xs mb-1">Chapters</p>
                <p className="font-semibold text-white">{manga.chapterCount}</p>
              </div>
            </div>

            {/* Updated date */}
            <p className="text-xs text-muted mb-4">
              Updated: {formatPublishedDate(manga.updatedAt)}
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(manga)}
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onDelete(manga)}
                className="flex-1 text-rose-400 hover:text-rose-300"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
