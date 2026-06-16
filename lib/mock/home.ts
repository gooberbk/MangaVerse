import type { Manga, MangaGenre } from "@/types/manga";
import { mockMangas } from "./mangas";

export function getTrendingMangas(): Manga[] {
  return mockMangas.filter((m) => m.isTrending);
}

export function getLatestUpdates(limit = 6): Manga[] {
  return getAllLatestUpdates().slice(0, limit);
}

export function getAllLatestUpdates(): Manga[] {
  return [...mockMangas].sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getPopularThisWeek(limit = 5): Manga[] {
  return getPopularMangas().slice(0, limit);
}

export function getPopularMangas(): Manga[] {
  return [...mockMangas].sort(
    (a, b) =>
      b.views - a.views ||
      b.totalBookmarks - a.totalBookmarks ||
      b.rating.average - a.rating.average,
  );
}

export function getAllGenres(): MangaGenre[] {
  const genres = new Set<MangaGenre>();
  for (const manga of mockMangas) {
    for (const genre of manga.genres) {
      genres.add(genre);
    }
  }
  return [...genres].sort();
}

export const genreGradients: Record<MangaGenre, string> = {
  Action: "from-red-600/40 via-rose-500/30 to-orange-500/20",
  Adventure: "from-emerald-600/40 via-teal-500/30 to-cyan-500/20",
  Comedy: "from-yellow-500/40 via-amber-400/30 to-orange-400/20",
  Drama: "from-purple-700/40 via-violet-600/30 to-indigo-600/20",
  Dystopian: "from-slate-600/40 via-zinc-500/30 to-stone-500/20",
  Fantasy: "from-violet-600/40 via-purple-500/30 to-fuchsia-500/20",
  Horror: "from-stone-800/40 via-red-900/30 to-black/20",
  Mecha: "from-slate-500/40 via-blue-700/30 to-cyan-600/20",
  Mystery: "from-indigo-700/40 via-blue-600/30 to-violet-600/20",
  "Post-Apocalyptic": "from-amber-800/40 via-orange-700/30 to-red-800/20",
  Psychological: "from-fuchsia-700/40 via-purple-600/30 to-indigo-700/20",
  Romance: "from-pink-600/40 via-rose-500/30 to-red-400/20",
  School: "from-sky-600/40 via-blue-500/30 to-indigo-500/20",
  "Sci-Fi": "from-cyan-600/40 via-blue-500/30 to-indigo-600/20",
  "Slice of Life": "from-teal-500/40 via-emerald-400/30 to-green-500/20",
  Sports: "from-orange-500/40 via-red-500/30 to-yellow-500/20",
  Supernatural: "from-purple-600/40 via-violet-500/30 to-blue-600/20",
  Thriller: "from-red-800/40 via-rose-700/30 to-purple-900/20",
};
