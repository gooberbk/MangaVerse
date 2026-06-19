export type Chapter = {
  id: string;
  mangaId: string;
  slug: string;
  number: number;
  title: string;
  publishedAt: string;
  pageCount: number;
};

/** Page for the reader — can be gradient placeholder or actual image URL */
export type ChapterPage = {
  index: number;
  gradient: string;
  alt: string;
  imageUrl?: string;
};
