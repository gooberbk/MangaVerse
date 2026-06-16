import type { Chapter, ChapterPage } from "@/types/chapter";
import type { Manga } from "@/types/manga";
import {
  getChapterByNumber as getMockChapterByNumber,
  getChapterBySlug as getMockChapterBySlug,
  getChapterPages as getMockChapterPages,
  getChaptersByMangaSlug as getMockChaptersByMangaSlug,
  getMangaBySlug as getMockMangaBySlug,
  mockMangas,
} from "@/lib/mock";

/** Backend-ready data access — swap mock imports for Appwrite later */

export async function fetchAllMangas(): Promise<Manga[]> {
  return mockMangas;
}

export async function fetchMangaBySlug(slug: string): Promise<Manga | null> {
  return getMockMangaBySlug(slug) ?? null;
}

export async function fetchChaptersByMangaSlug(
  slug: string,
): Promise<Chapter[]> {
  return getMockChaptersByMangaSlug(slug);
}

export async function fetchChapterBySlug(
  mangaSlug: string,
  chapterSlug: string,
): Promise<Chapter | null> {
  return getMockChapterBySlug(mangaSlug, chapterSlug) ?? null;
}

export async function fetchChapterByNumber(
  mangaId: string,
  number: number,
): Promise<Chapter | null> {
  return getMockChapterByNumber(mangaId, number) ?? null;
}

export async function fetchChapterPages(
  chapterId: string,
): Promise<ChapterPage[]> {
  return getMockChapterPages(chapterId);
}
