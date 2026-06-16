import { getAllGenres, mockMangas } from "@/lib/mock";
import type {
  Manga,
  MangaDemographic,
  MangaGenre,
  MangaStatus,
} from "@/types/manga";

export type BrowseSortOption =
  | "popular"
  | "latest-updated"
  | "highest-rated"
  | "newest"
  | "most-chapters"
  | "a-z";

export type BrowseFilterState = {
  search: string;
  genres: MangaGenre[];
  statuses: MangaStatus[];
  demographics: MangaDemographic[];
  years: number[];
  minRating: number | null;
};

export type CatalogStats = {
  totalTitles: number;
  genreCount: number;
  ongoingCount: number;
  completedCount: number;
};

export const DEFAULT_BROWSE_FILTERS: BrowseFilterState = {
  search: "",
  genres: [],
  statuses: [],
  demographics: [],
  years: [],
  minRating: null,
};

export const BROWSE_SORT_OPTIONS: {
  value: BrowseSortOption;
  label: string;
}[] = [
  { value: "popular", label: "Popular" },
  { value: "latest-updated", label: "Latest Updated" },
  { value: "highest-rated", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "most-chapters", label: "Most Chapters" },
  { value: "a-z", label: "A–Z" },
];

export const RATING_FILTER_OPTIONS = [
  { value: null, label: "Any rating" },
  { value: 9, label: "9.0+" },
  { value: 8, label: "8.0+" },
  { value: 7, label: "7.0+" },
] as const;

export function getCatalogStats(): CatalogStats {
  return {
    totalTitles: mockMangas.length,
    genreCount: getAllGenres().length,
    ongoingCount: mockMangas.filter((m) => m.status === "ongoing").length,
    completedCount: mockMangas.filter((m) => m.status === "completed").length,
  };
}

export function getAllDemographics(): MangaDemographic[] {
  const demographics = new Set<MangaDemographic>();
  for (const manga of mockMangas) {
    demographics.add(manga.demographic);
  }
  return [...demographics].sort();
}

export function getAllReleaseYears(): number[] {
  const years = new Set<number>();
  for (const manga of mockMangas) {
    years.add(manga.releaseYear);
  }
  return [...years].sort((a, b) => b - a);
}

export function hasActiveFilters(filters: BrowseFilterState): boolean {
  return (
    filters.search.trim().length > 0 ||
    filters.genres.length > 0 ||
    filters.statuses.length > 0 ||
    filters.demographics.length > 0 ||
    filters.years.length > 0 ||
    filters.minRating !== null
  );
}

export function filterMangas(
  mangas: Manga[],
  filters: BrowseFilterState,
): Manga[] {
  const query = filters.search.trim().toLowerCase();

  return mangas.filter((manga) => {
    if (query) {
      const haystack = [
        manga.title,
        manga.author,
        manga.description,
        ...manga.alternativeTitles,
        ...manga.genres,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(query)) return false;
    }

    if (
      filters.genres.length > 0 &&
      !filters.genres.some((genre) => manga.genres.includes(genre))
    ) {
      return false;
    }

    if (
      filters.statuses.length > 0 &&
      !filters.statuses.includes(manga.status)
    ) {
      return false;
    }

    if (
      filters.demographics.length > 0 &&
      !filters.demographics.includes(manga.demographic)
    ) {
      return false;
    }

    if (
      filters.years.length > 0 &&
      !filters.years.includes(manga.releaseYear)
    ) {
      return false;
    }

    if (
      filters.minRating !== null &&
      manga.rating.average < filters.minRating
    ) {
      return false;
    }

    return true;
  });
}

export function sortMangas(
  mangas: Manga[],
  sort: BrowseSortOption,
): Manga[] {
  const sorted = [...mangas];

  switch (sort) {
    case "popular":
      return sorted.sort((a, b) => b.views - a.views);
    case "latest-updated":
      return sorted.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    case "highest-rated":
      return sorted.sort(
        (a, b) =>
          b.rating.average - a.rating.average ||
          b.rating.count - a.rating.count,
      );
    case "newest":
      return sorted.sort(
        (a, b) =>
          b.releaseYear - a.releaseYear || b.updatedAt.localeCompare(a.updatedAt),
      );
    case "most-chapters":
      return sorted.sort((a, b) => b.chapterCount - a.chapterCount);
    case "a-z":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}
