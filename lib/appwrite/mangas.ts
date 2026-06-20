import { Query, type Models } from "appwrite";
import { databases } from "./client";
import {
  APPWRITE_COLLECTIONS,
  APPWRITE_DATABASE_ID,
} from "./config";

export type MangaDocument = Models.Document & {
  slug?: unknown;
  title?: unknown;
  description?: unknown;
  synopsis?: unknown;
  alternativeTitles?: unknown;
  author?: unknown;
  artist?: unknown;
  coverUrl?: unknown;
  coverGradient?: unknown;
  genres?: unknown;
  status?: unknown;
  demographic?: unknown;
  language?: unknown;
  releaseYear?: unknown;
  rating?: unknown;
  views?: unknown;
  totalBookmarks?: unknown;
  chapterCount?: unknown;
  isTrending?: unknown;
  isNew?: unknown;
  isFeatured?: unknown;
};

export type ChapterDocument = Models.Document & {
  mangaId?: unknown;
  slug?: unknown;
  number?: unknown;
  chapterNumber?: unknown;
  title?: unknown;
  publishedAt?: unknown;
  pageCount?: unknown;
  isPublished?: unknown;
};

export type ChapterPageDocument = Models.Document & {
  chapterId?: unknown;
  mangaId?: unknown;
  pageNumber?: unknown;
  imageUrl?: unknown;
  storageFileId?: unknown;
  width?: unknown;
  height?: unknown;
  alt?: unknown;
};

const assertMangasConfigured = () => {
  if (!APPWRITE_DATABASE_ID || !APPWRITE_COLLECTIONS.mangas) {
    throw new Error(
      "Appwrite mangas are not configured. Add NEXT_PUBLIC_APPWRITE_DATABASE_ID and NEXT_PUBLIC_APPWRITE_MANGAS_COLLECTION_ID to .env.local.",
    );
  }
};

const assertChaptersConfigured = () => {
  if (!APPWRITE_DATABASE_ID || !APPWRITE_COLLECTIONS.chapters) {
    throw new Error(
      "Appwrite chapters are not configured. Add NEXT_PUBLIC_APPWRITE_DATABASE_ID and NEXT_PUBLIC_APPWRITE_CHAPTERS_COLLECTION_ID to .env.local.",
    );
  }
};

const assertChapterPagesConfigured = () => {
  if (!APPWRITE_DATABASE_ID || !APPWRITE_COLLECTIONS.chapterPages) {
    throw new Error(
      "Appwrite chapter pages are not configured. Add NEXT_PUBLIC_APPWRITE_DATABASE_ID and NEXT_PUBLIC_APPWRITE_CHAPTER_PAGES_COLLECTION_ID to .env.local.",
    );
  }
};

function isNotFoundError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    Number((error as { code: unknown }).code) === 404
  );
}

export async function listMangas(): Promise<MangaDocument[]> {
  assertMangasConfigured();

  try {
    const result = await databases.listDocuments<MangaDocument>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.mangas,
    );
    return result.documents;
  } catch (error) {
    console.error("Failed to list mangas:", error);
    return [];
  }
}

export async function getFeaturedMangas(): Promise<MangaDocument[]> {
  assertMangasConfigured();

  try {
    const result = await databases.listDocuments<MangaDocument>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.mangas,
      [
        Query.equal("isFeatured", true),
      ],
    );
    return result.documents;
  } catch (error) {
    console.error("Failed to get featured mangas:", error);
    return [];
  }
}

export async function getLatestMangas(): Promise<MangaDocument[]> {
  assertMangasConfigured();

  try {
    const result = await databases.listDocuments<MangaDocument>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.mangas,
      [
        Query.orderDesc("$updatedAt"),
      ],
    );
    return result.documents;
  } catch (error) {
    console.error("Failed to get latest mangas:", error);
    return [];
  }
}

export async function getPopularMangas(): Promise<MangaDocument[]> {
  assertMangasConfigured();

  try {
    const result = await databases.listDocuments<MangaDocument>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.mangas,
      [
        Query.orderDesc("views"),
      ],
    );
    return result.documents;
  } catch (error) {
    console.error("Failed to get popular mangas:", error);
    return [];
  }
}

export async function getMangaBySlug(slug: string): Promise<MangaDocument | null> {
  assertMangasConfigured();

  try {
    const result = await databases.listDocuments<MangaDocument>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.mangas,
      [
        Query.equal("slug", slug),
      ],
    );
    
    const manga = result.documents[0] || null;
    return manga;
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }
    console.error(`Failed to get manga by slug "${slug}":`, error);
    return null;
  }
}

export async function listChaptersByMangaId(mangaId: string): Promise<ChapterDocument[]> {
  assertChaptersConfigured();

  try {
    const result = await databases.listDocuments<ChapterDocument>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.chapters,
      [
        Query.equal("mangaId", mangaId),
        Query.orderDesc("chapterNumber"),
      ],
    );
    
    return result.documents;
  } catch (error) {
    console.warn(
      `Failed to list chapters ordered by chapterNumber for manga "${mangaId}". Retrying with number.`,
      error,
    );
  }

  try {
    const result = await databases.listDocuments<ChapterDocument>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.chapters,
      [
        Query.equal("mangaId", mangaId),
        Query.orderDesc("number"),
      ],
    );

    return result.documents;
  } catch (error) {
    console.error(`Failed to list chapters for manga "${mangaId}":`, error);
    return [];
  }
}

export async function listChapters(): Promise<ChapterDocument[]> {
  assertChaptersConfigured();

  try {
    const result = await databases.listDocuments<ChapterDocument>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.chapters,
      [
        Query.orderDesc("chapterNumber"),
      ],
    );

    return result.documents;
  } catch (error) {
    console.warn(
      "Failed to list chapters ordered by chapterNumber. Retrying with number.",
      error,
    );
  }

  try {
    const result = await databases.listDocuments<ChapterDocument>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.chapters,
      [
        Query.orderDesc("number"),
      ],
    );

    return result.documents;
  } catch (error) {
    console.error("Failed to list chapters:", error);
    return [];
  }
}

export async function getChapterBySlug(mangaSlug: string, chapterSlug: string): Promise<ChapterDocument | null> {
  assertChaptersConfigured();

  try {
    // First get the manga by slug to get the mangaId
    const manga = await getMangaBySlug(mangaSlug);
    if (!manga) {
      return null;
    }

    const result = await databases.listDocuments<ChapterDocument>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.chapters,
      [
        Query.equal("slug", chapterSlug),
        Query.equal("mangaId", manga.$id),
      ],
    );
    
    const chapter = result.documents[0] || null;
    return chapter;
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }
    console.error(`Failed to get chapter by slug "${chapterSlug}":`, error);
    return null;
  }
}

export async function getChapterByNumber(mangaId: string, chapterNumber: number): Promise<ChapterDocument | null> {
  assertChaptersConfigured();

  try {
    const result = await databases.listDocuments<ChapterDocument>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.chapters,
      [
        Query.equal("mangaId", mangaId),
        Query.equal("chapterNumber", chapterNumber),
      ],
    );
    
    const chapter = result.documents[0] || null;
    return chapter;
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }
    console.warn(
      `Failed to get chapter by chapterNumber "${chapterNumber}". Retrying with number.`,
      error,
    );
  }

  try {
    const result = await databases.listDocuments<ChapterDocument>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.chapters,
      [
        Query.equal("mangaId", mangaId),
        Query.equal("number", chapterNumber),
      ],
    );

    const chapter = result.documents[0] || null;
    return chapter;
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }
    console.error(`Failed to get chapter by number "${chapterNumber}":`, error);
    return null;
  }
}

export async function listChapterPages(chapterId: string): Promise<ChapterPageDocument[]> {
  assertChapterPagesConfigured();

  try {
    const result = await databases.listDocuments<ChapterPageDocument>(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTIONS.chapterPages,
      [
        Query.equal("chapterId", chapterId),
        Query.orderAsc("pageNumber"),
      ],
    );
    
    return result.documents;
  } catch (error) {
    console.error(`Failed to list pages for chapter "${chapterId}":`, error);
    return [];
  }
}
