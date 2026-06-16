export {
  featuredManga,
  getMangaById,
  getMangaBySlug,
  getRelatedMangas,
  mockMangas,
} from "./mangas";

export {
  genreGradients,
  getAllGenres,
  getAllLatestUpdates,
  getLatestUpdates,
  getPopularMangas,
  getPopularThisWeek,
  getTrendingMangas,
} from "./home";

export {
  genreToSlug,
  getGenreStats,
  getMangaCountByGenre,
  getMangasByGenre,
  slugToGenre,
  type GenreStat,
} from "./genres";

export {
  getCatalogTitleCount,
  getCompletedMangas,
  getContinueReadingEntries,
  getFavoriteMangas,
  getLibraryStats,
  getReadingHistoryEntries,
  getUserLibrary,
  type ContinueReadingEntry,
  type ContinueReadingItem,
  type HistoryEntry,
  type LibraryStats,
  type ReadingHistoryItem,
  type UserLibrary,
} from "./library";

export {
  getAdjacentChapterNumbers,
  getAllChapterNumbers,
  getChapterByMangaSlugAndNumber,
  getChapterByNumber,
  getChapterBySlug,
  getChapterPages,
  getChapterPagesForMangaChapter,
  getChaptersByMangaId,
  getChaptersByMangaSlug,
  mockChapters,
} from "./chapters";
