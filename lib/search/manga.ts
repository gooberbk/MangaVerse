import { mockMangas } from "@/lib/mock/mangas";
import type { Manga } from "@/types/manga";

const DEFAULT_LIMIT = 6;

export function searchMangas(query: string, limit = DEFAULT_LIMIT): Manga[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const scored = mockMangas
    .map((manga) => ({
      manga,
      score: getSearchScore(manga, normalized),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ manga }) => manga);
}

function getSearchScore(manga: Manga, query: string): number {
  const title = manga.title.toLowerCase();
  const author = manga.author.toLowerCase();
  const artist = manga.artist.toLowerCase();

  if (title === query) return 100;
  if (title.startsWith(query)) return 90;
  if (title.includes(query)) return 80;
  if (author.includes(query) || artist.includes(query)) return 70;

  const genreMatch = manga.genres.some((genre) =>
    genre.toLowerCase().includes(query),
  );
  if (genreMatch) return 60;

  const haystack = [
    manga.description,
    ...manga.alternativeTitles,
    ...manga.genres,
  ]
    .join(" ")
    .toLowerCase();

  if (haystack.includes(query)) return 40;

  return 0;
}
