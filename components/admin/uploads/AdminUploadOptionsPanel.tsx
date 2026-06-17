import type { Manga } from "@/types/manga";
import { Button } from "@/components/ui/Button";
import { useMemo } from "react";

type AdminUploadOptionsPanelProps = {
  mangas: Manga[];
  selectedMangaId: string;
  selectedChapter: string;
  assetType: string;
  autoOptimize: boolean;
  convertWebP: boolean;
  generateThumbnails: boolean;
  visibility: "public" | "private";
  onChange: (field: string, value: string | boolean) => void;
  onSave: () => void;
};

const chapters = [
  { id: "98", label: "Chapter 98" },
  { id: "76", label: "Chapter 76" },
  { id: "87", label: "Chapter 87" },
];

export function AdminUploadOptionsPanel({
  mangas,
  selectedMangaId,
  selectedChapter,
  assetType,
  autoOptimize,
  convertWebP,
  generateThumbnails,
  visibility,
  onChange,
  onSave,
}: AdminUploadOptionsPanelProps) {
  const selectedManga = useMemo(
    () => mangas.find((m) => m.id === selectedMangaId),
    [mangas, selectedMangaId],
  );

  return (
    <div className="glass rounded-3xl p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Upload options</h3>
          <p className="mt-1 text-sm text-muted">Configure metadata before saving your upload.</p>
        </div>
        <Button variant="primary" size="md" onClick={onSave}>
          Save Upload
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-white">Select Manga</label>
          <select
            value={selectedMangaId}
            onChange={(e) => onChange("selectedMangaId", e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
          >
            {mangas.map((manga) => (
              <option key={manga.id} value={manga.id}>{manga.title}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-white">Asset Type</label>
          <select
            value={assetType}
            onChange={(e) => onChange("assetType", e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
          >
            <option value="cover">Cover</option>
            <option value="chapter_page">Chapter Page</option>
            <option value="avatar">Avatar</option>
            <option value="banner">Banner</option>
          </select>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-white">Linked Chapter</label>
          <select
            value={selectedChapter}
            onChange={(e) => onChange("selectedChapter", e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
          >
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>{chapter.label}</option>
            ))}
          </select>
          {selectedManga && (
            <p className="text-xs text-muted">Linked to {selectedManga.title}</p>
          )}
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-white">Visibility</label>
          <select
            value={visibility}
            onChange={(e) => onChange("visibility", e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
          <span className="text-sm text-white">Auto-optimize</span>
          <input
            type="checkbox"
            checked={autoOptimize}
            onChange={(e) => onChange("autoOptimize", e.target.checked)}
            className="h-5 w-5 rounded border-white/10 bg-slate-900 text-accent-purple"
          />
        </label>
        <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
          <span className="text-sm text-white">Convert to WebP</span>
          <input
            type="checkbox"
            checked={convertWebP}
            onChange={(e) => onChange("convertWebP", e.target.checked)}
            className="h-5 w-5 rounded border-white/10 bg-slate-900 text-accent-purple"
          />
        </label>
        <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
          <span className="text-sm text-white">Generate Thumbnails</span>
          <input
            type="checkbox"
            checked={generateThumbnails}
            onChange={(e) => onChange("generateThumbnails", e.target.checked)}
            className="h-5 w-5 rounded border-white/10 bg-slate-900 text-accent-purple"
          />
        </label>
      </div>
    </div>
  );
}
