import type { Chapter, ChapterPage } from "@/types/chapter";
import { createChapterPages } from "./chapter-pages";
import { mockMangas } from "./mangas";

const RECENT_CHAPTER_WINDOW = 6;

const CHAPTER_TITLES = [
  "Signal in the Rain",
  "Broken Protocol",
  "The Last Archive",
  "Echo Chamber",
  "Midnight Departure",
  "Glass Horizon",
  "Static Bloom",
  "Under Neon Skies",
  "Paper Trail",
  "Silent Frequency",
] as const;

function chapterSlug(number: number): string {
  return `chapter-${number}`;
}

type MangaChapterSource = {
  id: string;
  slug: string;
  chapterCount: number;
  coverGradient: string;
  updatedAt: string;
};

function createChapterForManga(
  manga: MangaChapterSource,
  number: number,
): Chapter {
  const offset = manga.chapterCount - number;
  const publishedAt = new Date(manga.updatedAt);
  publishedAt.setDate(publishedAt.getDate() - offset * 3);

  return {
    id: `${manga.id}-ch-${number}`,
    mangaId: manga.id,
    slug: chapterSlug(number),
    number,
    title: CHAPTER_TITLES[(number - 1) % CHAPTER_TITLES.length],
    publishedAt: publishedAt.toISOString(),
    pageCount: 8 + (number % 5),
  };
}

function buildRecentChaptersForManga(manga: MangaChapterSource): Chapter[] {
  const start = Math.max(1, manga.chapterCount - RECENT_CHAPTER_WINDOW + 1);
  const chapters: Chapter[] = [];

  for (let number = start; number <= manga.chapterCount; number += 1) {
    chapters.push(createChapterForManga(manga, number));
  }

  return chapters;
}

export const mockChapters: Chapter[] = mockMangas.flatMap(buildRecentChaptersForManga);

const chapterPagesById = new Map<string, ChapterPage[]>(
  mockChapters.map((chapter) => {
    const manga = mockMangas.find((entry) => entry.id === chapter.mangaId);
    const pages = createChapterPages(
      manga?.coverGradient ?? "from-slate-800 via-zinc-700 to-stone-800",
      chapter.number,
      chapter.pageCount,
    );
    return [chapter.id, pages];
  }),
);

function getMangaBySlugInternal(slug: string) {
  return mockMangas.find((entry) => entry.slug === slug);
}

export function getChaptersByMangaId(mangaId: string): Chapter[] {
  return mockChapters
    .filter((chapter) => chapter.mangaId === mangaId)
    .sort((a, b) => b.number - a.number);
}

export function getChaptersByMangaSlug(slug: string): Chapter[] {
  const manga = getMangaBySlugInternal(slug);
  if (!manga) return [];
  return getChaptersByMangaId(manga.id);
}

export function getChapterBySlug(
  mangaSlug: string,
  chapterSlugValue: string,
): Chapter | undefined {
  const manga = getMangaBySlugInternal(mangaSlug);
  if (!manga) return undefined;

  return mockChapters.find(
    (chapter) =>
      chapter.mangaId === manga.id && chapter.slug === chapterSlugValue,
  );
}

export function getChapterByNumber(
  mangaId: string,
  number: number,
): Chapter | undefined {
  const cached = mockChapters.find(
    (chapter) => chapter.mangaId === mangaId && chapter.number === number,
  );
  if (cached) return cached;

  const manga = mockMangas.find((entry) => entry.id === mangaId);
  if (
    !manga ||
    !Number.isFinite(number) ||
    number < 1 ||
    number > manga.chapterCount
  ) {
    return undefined;
  }

  return createChapterForManga(manga, Math.floor(number));
}

export function getChapterByMangaSlugAndNumber(
  mangaSlug: string,
  chapterNumber: number,
): Chapter | undefined {
  const manga = getMangaBySlugInternal(mangaSlug);
  if (!manga) return undefined;

  if (
    !Number.isFinite(chapterNumber) ||
    chapterNumber < 1 ||
    chapterNumber > manga.chapterCount
  ) {
    return undefined;
  }

  return getChapterByNumber(manga.id, Math.floor(chapterNumber));
}

export function getChapterPages(chapterId: string): ChapterPage[] {
  return chapterPagesById.get(chapterId) ?? [];
}

export function getChapterPagesForMangaChapter(
  mangaSlug: string,
  chapterNumber: number,
): ChapterPage[] {
  const chapter = getChapterByMangaSlugAndNumber(mangaSlug, chapterNumber);
  if (!chapter) return [];

  const cached = chapterPagesById.get(chapter.id);
  if (cached) return cached;

  const manga = getMangaBySlugInternal(mangaSlug);
  const pages = createChapterPages(
    manga?.coverGradient ?? "from-slate-800 via-zinc-700 to-stone-800",
    chapter.number,
    chapter.pageCount,
  );
  chapterPagesById.set(chapter.id, pages);
  return pages;
}

export function getAdjacentChapterNumbers(
  mangaSlug: string,
  currentNumber: number,
): { prev: number | null; next: number | null } {
  const manga = getMangaBySlugInternal(mangaSlug);
  if (!manga) return { prev: null, next: null };

  return {
    prev: currentNumber > 1 ? currentNumber - 1 : null,
    next: currentNumber < manga.chapterCount ? currentNumber + 1 : null,
  };
}

export function getAllChapterNumbers(mangaSlug: string): number[] {
  const manga = getMangaBySlugInternal(mangaSlug);
  if (!manga) return [];
  return Array.from({ length: manga.chapterCount }, (_, index) => index + 1);
}
