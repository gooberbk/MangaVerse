import type { Manga } from "@/types/manga";
import { getMangaById, mockMangas } from "./mangas";

export type ContinueReadingItem = {
  mangaId: string;
  currentChapter: number;
  progressPercent: number;
  lastReadAt: string;
};

export type ReadingHistoryItem = {
  mangaId: string;
  chapterNumber: number;
  progressPercent: number;
  readAt: string;
};

export type LibraryStats = {
  savedTitles: number;
  continueReadingCount: number;
  completedCount: number;
  readingStreakDays: number;
};

export type UserLibrary = {
  stats: LibraryStats;
  continueReading: ContinueReadingItem[];
  favoriteMangaIds: string[];
  history: ReadingHistoryItem[];
  completedMangaIds: string[];
};

export type ContinueReadingEntry = ContinueReadingItem & { manga: Manga };
export type HistoryEntry = ReadingHistoryItem & { manga: Manga };

const mockUserLibrary: UserLibrary = {
  stats: {
    savedTitles: 8,
    continueReadingCount: 6,
    completedCount: 2,
    readingStreakDays: 12,
  },
  continueReading: [
    {
      mangaId: "1",
      currentChapter: 87,
      progressPercent: 61,
      lastReadAt: "2026-06-15T21:30:00.000Z",
    },
    {
      mangaId: "7",
      currentChapter: 8,
      progressPercent: 90,
      lastReadAt: "2026-06-15T19:00:00.000Z",
    },
    {
      mangaId: "3",
      currentChapter: 12,
      progressPercent: 78,
      lastReadAt: "2026-06-14T16:45:00.000Z",
    },
    {
      mangaId: "9",
      currentChapter: 55,
      progressPercent: 45,
      lastReadAt: "2026-06-14T11:20:00.000Z",
    },
    {
      mangaId: "2",
      currentChapter: 42,
      progressPercent: 33,
      lastReadAt: "2026-06-13T22:10:00.000Z",
    },
    {
      mangaId: "5",
      currentChapter: 30,
      progressPercent: 22,
      lastReadAt: "2026-06-12T18:00:00.000Z",
    },
  ],
  favoriteMangaIds: ["1", "2", "3", "5", "9", "10", "11", "12"],
  history: [
    {
      mangaId: "1",
      chapterNumber: 87,
      progressPercent: 61,
      readAt: "2026-06-15T21:30:00.000Z",
    },
    {
      mangaId: "7",
      chapterNumber: 8,
      progressPercent: 90,
      readAt: "2026-06-15T19:00:00.000Z",
    },
    {
      mangaId: "3",
      chapterNumber: 12,
      progressPercent: 78,
      readAt: "2026-06-14T16:45:00.000Z",
    },
    {
      mangaId: "9",
      chapterNumber: 55,
      progressPercent: 45,
      readAt: "2026-06-14T11:20:00.000Z",
    },
    {
      mangaId: "12",
      chapterNumber: 24,
      progressPercent: 100,
      readAt: "2026-06-13T09:15:00.000Z",
    },
    {
      mangaId: "2",
      chapterNumber: 41,
      progressPercent: 100,
      readAt: "2026-06-12T20:40:00.000Z",
    },
    {
      mangaId: "5",
      chapterNumber: 29,
      progressPercent: 100,
      readAt: "2026-06-11T14:30:00.000Z",
    },
    {
      mangaId: "4",
      chapterNumber: 64,
      progressPercent: 100,
      readAt: "2026-06-10T10:00:00.000Z",
    },
  ],
  completedMangaIds: ["4", "8"],
};

export function getUserLibrary(): UserLibrary {
  return mockUserLibrary;
}

export function getContinueReadingEntries(): ContinueReadingEntry[] {
  return mockUserLibrary.continueReading
    .map((item) => {
      const manga = getMangaById(item.mangaId);
      if (!manga) return null;
      return { ...item, manga };
    })
    .filter((entry): entry is ContinueReadingEntry => entry !== null);
}

export function getFavoriteMangas(): Manga[] {
  return mockUserLibrary.favoriteMangaIds
    .map((id) => getMangaById(id))
    .filter((manga): manga is Manga => manga !== undefined);
}

export function getReadingHistoryEntries(): HistoryEntry[] {
  return mockUserLibrary.history
    .map((item) => {
      const manga = getMangaById(item.mangaId);
      if (!manga) return null;
      return { ...item, manga };
    })
    .filter((entry): entry is HistoryEntry => entry !== null);
}

export function getCompletedMangas(): Manga[] {
  return mockUserLibrary.completedMangaIds
    .map((id) => getMangaById(id))
    .filter((manga): manga is Manga => manga !== undefined);
}

export function getLibraryStats(): LibraryStats {
  return mockUserLibrary.stats;
}

/** Total saved titles across the mock catalog for empty-state demos. */
export function getCatalogTitleCount(): number {
  return mockMangas.length;
}
