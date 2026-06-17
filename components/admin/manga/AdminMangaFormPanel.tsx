"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import type { Manga, MangaStatus, MangaDemographic, MangaGenre } from "@/types/manga";
import { cn } from "@/lib/utils";

const DEMOGRAPHICS: MangaDemographic[] = [
  "Shōnen",
  "Seinen",
  "Shōjo",
  "Josei",
  "Kodomo",
];

const GENRES: MangaGenre[] = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Dystopian",
  "Fantasy",
  "Horror",
  "Mecha",
  "Mystery",
  "Post-Apocalyptic",
  "Psychological",
  "Romance",
  "School",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

const STATUSES: MangaStatus[] = ["ongoing", "completed", "hiatus"];

const GRADIENTS = [
  "from-violet-600 via-fuchsia-500 to-rose-500",
  "from-red-700 via-rose-600 to-orange-500",
  "from-blue-600 via-indigo-500 to-violet-600",
  "from-purple-800 via-pink-600 to-fuchsia-400",
  "from-green-600 via-teal-500 to-blue-600",
  "from-amber-600 via-orange-500 to-red-500",
  "from-pink-600 via-purple-500 to-indigo-600",
  "from-cyan-600 via-blue-500 to-purple-600",
];

type AdminMangaFormPanelProps = {
  manga: Manga | null;
  isOpen: boolean;
  isLoading: boolean;
  onSave: (manga: Partial<Manga>) => void;
  onCancel: () => void;
};

export function AdminMangaFormPanel({
  manga,
  isOpen,
  isLoading,
  onSave,
  onCancel,
}: AdminMangaFormPanelProps) {
  const [formData, setFormData] = useState<Partial<Manga>>(
    manga || {
      title: "",
      description: "",
      synopsis: "",
      alternativeTitles: [],
      author: "",
      artist: "",
      coverGradient: GRADIENTS[0],
      genres: [],
      status: "ongoing",
      demographic: "Shōnen",
      releaseYear: new Date().getFullYear(),
      isFeatured: false,
      isNew: false,
      isTrending: false,
    },
  );

  useEffect(() => {
    if (manga) {
      setFormData(manga);
    }
  }, [manga, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleGenreToggle = (genre: MangaGenre) => {
    const currentGenres = formData.genres || [];
    const newGenres = currentGenres.includes(genre)
      ? currentGenres.filter((g) => g !== genre)
      : [...currentGenres, genre];
    setFormData({ ...formData, genres: newGenres });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto">
      {/* Panel */}
      <div className="glass relative m-4 w-full max-w-2xl rounded-2xl shadow-2xl shadow-black/40 my-8">
        {/* Background accent */}
        <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 blur-2xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="relative p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-semibold text-white">
                {manga ? "Edit Manga" : "Add New Manga"}
              </h3>
              <p className="mt-1 text-xs text-muted">
                {manga ? "Update manga details" : "Create a new manga entry"}
              </p>
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="text-muted hover:text-white text-xl transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted/50 focus:border-accent-purple/50 focus:outline-none focus:ring-1 focus:ring-accent-purple/50 transition-all"
                placeholder="Manga Title"
              />
            </div>

            {/* Author and Artist */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase mb-1">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted/50 focus:border-accent-purple/50 focus:outline-none focus:ring-1 focus:ring-accent-purple/50 transition-all"
                  placeholder="Author name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted uppercase mb-1">
                  Artist
                </label>
                <input
                  type="text"
                  value={formData.artist || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, artist: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted/50 focus:border-accent-purple/50 focus:outline-none focus:ring-1 focus:ring-accent-purple/50 transition-all"
                  placeholder="Artist name"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase mb-1">
                Description
              </label>
              <textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full h-20 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted/50 focus:border-accent-purple/50 focus:outline-none focus:ring-1 focus:ring-accent-purple/50 transition-all resize-none"
                placeholder="Short description"
              />
            </div>

            {/* Status and Demographic */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-muted uppercase mb-1">
                  Status
                </label>
                <select
                  value={formData.status || "ongoing"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as MangaStatus,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-accent-purple/50 focus:outline-none focus:ring-1 focus:ring-accent-purple/50 transition-all"
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted uppercase mb-1">
                  Demographic
                </label>
                <select
                  value={formData.demographic || "Shōnen"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      demographic: e.target.value as MangaDemographic,
                    })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-accent-purple/50 focus:outline-none focus:ring-1 focus:ring-accent-purple/50 transition-all"
                >
                  {DEMOGRAPHICS.map((demo) => (
                    <option key={demo} value={demo}>
                      {demo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Release Year */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase mb-1">
                Release Year
              </label>
              <input
                type="number"
                value={formData.releaseYear || new Date().getFullYear()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    releaseYear: parseInt(e.target.value),
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-accent-purple/50 focus:outline-none focus:ring-1 focus:ring-accent-purple/50 transition-all"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            {/* Genres */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase mb-2">
                Genres
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleGenreToggle(genre)}
                    className={cn(
                      "rounded-lg px-3 py-2 text-xs font-medium transition-all",
                      (formData.genres || []).includes(genre)
                        ? "bg-accent-purple text-white shadow-lg shadow-purple-500/25"
                        : "glass glass-hover text-muted hover:text-white",
                    )}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Cover Gradient */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase mb-2">
                Cover Gradient
              </label>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                {GRADIENTS.map((gradient) => (
                  <button
                    key={gradient}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, coverGradient: gradient })
                    }
                    className={cn(
                      "h-8 rounded-lg border-2 transition-all",
                      formData.coverGradient === gradient
                        ? "border-white scale-110"
                        : "border-white/30 hover:border-white/50",
                      `bg-gradient-to-br ${gradient}`,
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured || false}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <span className="text-sm text-white">Featured</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNew || false}
                  onChange={(e) =>
                    setFormData({ ...formData, isNew: e.target.checked })
                  }
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <span className="text-sm text-white">New</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTrending || false}
                  onChange={(e) =>
                    setFormData({ ...formData, isTrending: e.target.checked })
                  }
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <span className="text-sm text-white">Trending</span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-white/10 pt-4">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? "Saving..." : manga ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
