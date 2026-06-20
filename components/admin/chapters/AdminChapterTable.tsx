"use client";

import { Button } from "@/components/ui/Button";
import type { Chapter } from "@/types/chapter";
import { cn } from "@/lib/utils";
import { formatPublishedDate } from "@/lib/utils";
import Link from "next/link";

type AdminChapterTableProps = {
  chapters: (Chapter & {
    mangaTitle: string;
    mangaSlug?: string;
    coverGradient: string;
    status?: string;
  })[];
  onEdit: (c: Chapter) => void;
  onDelete: (c: Chapter) => void;
};

export function AdminChapterTable({ chapters, onEdit, onDelete }: AdminChapterTableProps) {
  return (
    <div>
      <div className="hidden lg:block glass rounded-2xl shadow-lg shadow-black/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">Manga</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">Chapter</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">Title</th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted">Pages</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">Published</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">Updated</th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {chapters.map((ch) => (
                <tr key={ch.id} className="transition-colors hover:bg-white/5">
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg shrink-0 text-lg bg-gradient-to-br", ch.coverGradient)}>
                        📚
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-white">{ch.mangaTitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">Ch. {ch.number}</td>
                  <td className="px-6 py-4 text-sm text-white">{ch.title}</td>
                  <td className="px-6 py-4 text-center text-sm text-white">{ch.pageCount}</td>
                  <td className="px-6 py-4 text-sm text-muted">{formatPublishedDate(ch.publishedAt)}</td>
                  <td className="px-6 py-4 text-sm text-muted">{formatPublishedDate(ch.publishedAt)}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={ch.mangaSlug ? `/manga/${ch.mangaSlug}/chapter/${ch.number}` : "#"} className="text-xs">
                        <Button variant="ghost" size="sm">▶️ View</Button>
                      </Link>
                      <Button variant="ghost" size="sm" onClick={() => onEdit(ch)}>✏️</Button>
                      <Button variant="ghost" size="sm" onClick={() => onDelete(ch)} className="hover:text-rose-400">🗑️</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        {chapters.map((ch) => (
          <div key={ch.id} className="glass rounded-xl p-4 shadow-lg shadow-black/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-3 flex-1 min-w-0">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg shrink-0 text-xl bg-gradient-to-br", ch.coverGradient)}>
                  📚
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-white truncate">{ch.mangaTitle} — Ch. {ch.number}</h4>
                  <p className="text-xs text-muted truncate">{ch.title}</p>
                </div>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-2 text-center text-sm">
              <div>
                <p className="text-muted text-xs mb-1">Pages</p>
                <p className="font-semibold text-white">{ch.pageCount}</p>
              </div>
              <div>
                <p className="text-muted text-xs mb-1">Published</p>
                <p className="font-semibold text-white">{formatPublishedDate(ch.publishedAt)}</p>
              </div>
              <div>
                <p className="text-muted text-xs mb-1">Updated</p>
                <p className="font-semibold text-white">{formatPublishedDate(ch.publishedAt)}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link href={ch.mangaSlug ? `/manga/${ch.mangaSlug}/chapter/${ch.number}` : "#"} className="flex-1">
                <Button variant="secondary" size="sm" className="flex-1">View Reader</Button>
              </Link>
              <Button variant="secondary" size="sm" onClick={() => onEdit(ch)} className="flex-1">Edit</Button>
              <Button variant="secondary" size="sm" onClick={() => onDelete(ch)} className="flex-1 text-rose-400 hover:text-rose-300">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
