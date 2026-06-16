export type MangaStatus = "ongoing" | "completed" | "hiatus";

export type MangaDemographic =
  | "Shōnen"
  | "Seinen"
  | "Shōjo"
  | "Josei"
  | "Kodomo";

export type MangaGenre =
  | "Action"
  | "Adventure"
  | "Comedy"
  | "Drama"
  | "Dystopian"
  | "Fantasy"
  | "Horror"
  | "Mecha"
  | "Mystery"
  | "Post-Apocalyptic"
  | "Psychological"
  | "Romance"
  | "School"
  | "Sci-Fi"
  | "Slice of Life"
  | "Sports"
  | "Supernatural"
  | "Thriller";

export type MangaRating = {
  average: number;
  count: number;
};

export type Manga = {
  id: string;
  slug: string;
  title: string;
  /** Short tagline for cards and homepage sections */
  description: string;
  /** Long-form plot summary for the detail page */
  synopsis: string;
  alternativeTitles: string[];
  author: string;
  artist: string;
  coverGradient: string;
  genres: MangaGenre[];
  status: MangaStatus;
  demographic: MangaDemographic;
  language: string;
  releaseYear: number;
  rating: MangaRating;
  views: number;
  totalBookmarks: number;
  chapterCount: number;
  updatedAt: string;
  isTrending: boolean;
  isNew: boolean;
  isFeatured: boolean;
};
