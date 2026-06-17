"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import type { Chapter } from "@/types/chapter";
import type { Manga } from "@/types/manga";

type AdminChapterFormPanelProps = {
  chapter: (Chapter & { mangaId?: string }) | null;
  mangas: Manga[];
  isOpen: boolean;
  isLoading: boolean;
  onSave: (data: Partial<Chapter> & { mangaId: string }) => void;
  onCancel: () => void;
};

export function AdminChapterFormPanel({ chapter, mangas, isOpen, isLoading, onSave, onCancel }: AdminChapterFormPanelProps) {
  type FormState = {
    mangaId: string;
    number: number;
    title: string;
    publishedAt: string;
    pageCount: number;
    notes: string;
    status: string;
  };

  const [form, setForm] = useState<FormState>({
    mangaId: mangas[0]?.id ?? "",
    number: 1,
    title: "",
    publishedAt: new Date().toISOString().slice(0, 16),
    pageCount: 8,
    notes: "",
    status: "published",
  });

  useEffect(() => {
    if (chapter) {
      setForm({
        mangaId: chapter.mangaId,
        number: chapter.number,
        title: chapter.title,
        publishedAt: chapter.publishedAt,
        pageCount: chapter.pageCount,
        notes: "",
        status: chapter.publishedAt ? "published" : "draft",
      });
    }
  }, [chapter]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      mangaId: form.mangaId,
      number: Number(form.number),
      title: form.title,
      publishedAt: form.publishedAt,
      pageCount: Number(form.pageCount),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="glass relative m-4 w-full max-w-xl rounded-2xl shadow-2xl shadow-black/40 my-8">
        <form onSubmit={handleSubmit} className="relative p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">{chapter ? "Edit Chapter" : "Add Chapter"}</h3>
              <p className="mt-1 text-xs text-muted">{chapter ? "Update chapter metadata" : "Create a new chapter entry"}</p>
            </div>
            <button type="button" onClick={onCancel} className="text-muted hover:text-white text-xl">✕</button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted uppercase mb-1">Manga</label>
              <select value={form.mangaId} onChange={(e) => setForm({ ...form, mangaId: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white">
                {mangas.map((m) => <option key={m.id} value={m.id}>{m.title}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase mb-1">Chapter Number</label>
                <input type="number" value={form.number} onChange={(e) => setForm({ ...form, number: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted uppercase mb-1">Page Count</label>
                <input type="number" value={form.pageCount} onChange={(e) => setForm({ ...form, pageCount: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase mb-1">Title</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase mb-1">Published / Scheduled</label>
              <input type="datetime-local" value={form.publishedAt} onChange={(e) => setForm({ ...form, publishedAt: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted uppercase mb-1">Notes</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white h-24" />
            </div>
          </div>

          <div className="flex gap-3 border-t border-white/10 pt-4">
            <Button type="button" variant="secondary" size="md" onClick={onCancel} disabled={isLoading} className="flex-1">Cancel</Button>
            <Button type="submit" variant="primary" size="md" disabled={isLoading} className="flex-1">{isLoading ? "Saving..." : chapter ? "Update" : "Create"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
