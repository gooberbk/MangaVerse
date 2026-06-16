export type Chapter = {
  id: string;
  mangaId: string;
  slug: string;
  number: number;
  title: string;
  publishedAt: string;
  pageCount: number;
};

/** Placeholder page for the reader — gradient stand-ins until real assets are wired */
export type ChapterPage = {
  index: number;
  gradient: string;
  alt: string;
};
