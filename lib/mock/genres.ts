import type { Manga, MangaGenre } from "@/types/manga";
import { mockMangas } from "./mangas";
import { getAllGenres } from "./home";

export function genreToSlug(genre: MangaGenre): string {
  return genre.toLowerCase().replace(/\s+/g, "-");
}

export function slugToGenre(slug: string): MangaGenre | undefined {
  return getAllGenres().find((genre) => genreToSlug(genre) === slug);
}

export function getMangaCountByGenre(genre: MangaGenre): number {
  return mockMangas.filter((manga) => manga.genres.includes(genre)).length;
}

export type GenreStat = {
  genre: MangaGenre;
  count: number;
  slug: string;
};

export function getGenreStats(): GenreStat[] {
  return getAllGenres().map((genre) => ({
    genre,
    count: getMangaCountByGenre(genre),
    slug: genreToSlug(genre),
  }));
}

export function getMangasByGenre(genre: MangaGenre): Manga[] {
  return mockMangas.filter((manga) => manga.genres.includes(genre));
}
