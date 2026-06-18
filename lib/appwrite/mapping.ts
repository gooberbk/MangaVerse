import type { MangaDocument } from "./mangas";
import type { Manga } from "@/types/manga";

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
