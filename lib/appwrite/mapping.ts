import type { MangaDocument, ChapterDocument, ChapterPageDocument } from "./mangas";
import type { Manga } from "@/types/manga";
import type { Chapter, ChapterPage } from "@/types/chapter";

export function mapMangaDocumentToManga(doc: MangaDocument): Manga {
  return {
    id: doc.$id,
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    synopsis: doc.synopsis,
    alternativeTitles: doc.alternativeTitles,
    author: doc.author,
    artist: doc.artist,
    coverGradient: doc.coverGradient,
    genres: doc.genres,
    status: doc.status,
    demographic: doc.demographic,
    language: doc.language,
    releaseYear: doc.releaseYear,
    rating: doc.rating,
    views: doc.views,
    totalBookmarks: doc.totalBookmarks,
    chapterCount: doc.chapterCount,
    updatedAt: doc.$updatedAt,
    isTrending: doc.isTrending,
    isNew: doc.isNew,
    isFeatured: doc.isFeatured,
  };
}

export function mapMangaDocumentsToMangas(docs: MangaDocument[]): Manga[] {
  return docs.map(mapMangaDocumentToManga);
}

export function mapChapterDocumentToChapter(doc: ChapterDocument): Chapter {
  return {
    id: doc.$id,
    mangaId: doc.mangaId,
    slug: doc.slug,
    number: doc.number,
    title: doc.title,
    publishedAt: doc.publishedAt,
    pageCount: doc.pageCount,
  };
}

export function mapChapterDocumentsToChapters(docs: ChapterDocument[]): Chapter[] {
  return docs.map(mapChapterDocumentToChapter);
}

export function mapChapterPageDocumentToChapterPage(doc: ChapterPageDocument): ChapterPage {
  return {
    index: doc.pageNumber,
    gradient: "from-slate-800 via-zinc-700 to-stone-800", // Fallback gradient when imageUrl is not available
    alt: doc.alt ?? `Page ${doc.pageNumber}`,
    imageUrl: doc.imageUrl, // Use Appwrite imageUrl when present
  };
}

export function mapChapterPageDocumentsToChapterPages(docs: ChapterPageDocument[]): ChapterPage[] {
  return docs.map(mapChapterPageDocumentToChapterPage);
}
