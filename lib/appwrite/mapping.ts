import type { MangaDocument, ChapterDocument, ChapterPageDocument } from "./mangas";
import type {
  Manga,
  MangaDemographic,
  MangaGenre,
  MangaRating,
  MangaStatus,
} from "@/types/manga";
import type { Chapter, ChapterPage } from "@/types/chapter";

const SAFE_COVER_URL =
  "https://placehold.co/600x900/111827/ffffff.png?text=MangaVerse";
const SAFE_COVER_GRADIENT = "from-slate-800 via-zinc-700 to-stone-800";
const VALID_STATUSES: MangaStatus[] = ["ongoing", "completed", "hiatus"];

function warnMalformedDocument(
  collection: "manga" | "chapter" | "chapter page",
  id: string,
  issues: string[],
) {
  if (issues.length === 0) return;

  console.warn(`Malformed Appwrite ${collection} document; using fallbacks.`, {
    id,
    issues,
  });
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toNonEmptyString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function readRequiredString(
  value: unknown,
  fallback: string,
  field: string,
  issues: string[],
): string {
  const normalized = toNonEmptyString(value);
  if (normalized) return normalized;

  issues.push(`${field} is missing or invalid`);
  return fallback;
}

function readOptionalString(value: unknown, fallback: string): string {
  return toNonEmptyString(value) ?? fallback;
}

function toFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function readOptionalNumber(
  value: unknown,
  fallback: number,
  field: string,
  issues: string[],
): number {
  const normalized = toFiniteNumber(value);
  if (normalized !== null) return normalized;

  if (value !== undefined && value !== null) {
    issues.push(`${field} is not a valid number`);
  }
  return fallback;
}

function readBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }
  return fallback;
}

function readUrl(
  value: unknown,
  fallback: string | undefined,
  field: string,
  issues: string[],
  required = false,
): string | undefined {
  const normalized = toNonEmptyString(value);
  if (normalized) {
    try {
      return new URL(normalized).toString();
    } catch {
      issues.push(`${field} is not a valid URL`);
      return fallback;
    }
  }

  if (required) {
    issues.push(`${field} is missing or invalid`);
  }
  return fallback;
}

function readIsoDate(value: unknown, fallback: string): string {
  const normalized = toNonEmptyString(value);
  if (!normalized) return fallback;

  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? fallback : normalized;
}

function readGenres(value: unknown, issues: string[]): MangaGenre[] {
  if (Array.isArray(value)) {
    return value
      .map((genre) => toNonEmptyString(genre))
      .filter((genre): genre is string => Boolean(genre)) as MangaGenre[];
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((genre) => genre.trim())
      .filter(Boolean) as MangaGenre[];
  }

  if (value !== undefined && value !== null) {
    issues.push("genres is not a string or array");
  }
  return [];
}

function readAlternativeTitles(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((title) => toNonEmptyString(title))
      .filter((title): title is string => Boolean(title));
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((title) => title.trim())
      .filter(Boolean);
  }

  return [];
}

function readStatus(value: unknown, issues: string[]): MangaStatus {
  const normalized = toNonEmptyString(value)?.toLowerCase();
  if (normalized && VALID_STATUSES.includes(normalized as MangaStatus)) {
    return normalized as MangaStatus;
  }

  if (value !== undefined && value !== null) {
    issues.push("status is not one of ongoing, completed, or hiatus");
  }
  return "ongoing";
}

function readRating(value: unknown, issues: string[]): MangaRating {
  const numericRating = toFiniteNumber(value);
  if (numericRating !== null) {
    return { average: numericRating, count: 0 };
  }

  if (isObject(value)) {
    const average = readOptionalNumber(value.average, 0, "rating.average", issues);
    const count = readOptionalNumber(value.count, 0, "rating.count", issues);
    return { average, count };
  }

  if (value !== undefined && value !== null) {
    issues.push("rating is not a number or rating object");
  }
  return { average: 0, count: 0 };
}

function readChapterNumber(doc: ChapterDocument, slug: string, issues: string[]) {
  const chapterNumber = toFiniteNumber(doc.chapterNumber);
  if (chapterNumber !== null) return chapterNumber;

  const legacyNumber = toFiniteNumber(doc.number);
  if (legacyNumber !== null) return legacyNumber;

  const slugMatch = slug.match(/\d+(?:\.\d+)?/);
  if (slugMatch) {
    const slugNumber = Number(slugMatch[0]);
    if (Number.isFinite(slugNumber)) return slugNumber;
  }

  issues.push("chapterNumber is missing or invalid");
  return 1;
}

export function mapMangaDocumentToManga(doc: MangaDocument): Manga {
  const issues: string[] = [];
  const now = new Date().toISOString();
  const title = readRequiredString(doc.title, "MangaVerse Series", "title", issues);
  const description = readRequiredString(
    doc.description,
    "Synopsis will be available soon.",
    "description",
    issues,
  );
  const slug = readRequiredString(doc.slug, doc.$id, "slug", issues);
  const updatedAt = readIsoDate(doc.$updatedAt, readIsoDate(doc.$createdAt, now));

  const manga = {
    id: doc.$id,
    slug,
    title,
    description,
    synopsis: readOptionalString(doc.synopsis, description),
    alternativeTitles: readAlternativeTitles(doc.alternativeTitles),
    author: readOptionalString(doc.author, "Creator TBA"),
    artist: readOptionalString(doc.artist, "Studio TBA"),
    coverUrl: readUrl(doc.coverUrl, SAFE_COVER_URL, "coverUrl", issues, true),
    coverGradient: readOptionalString(doc.coverGradient, SAFE_COVER_GRADIENT),
    genres: readGenres(doc.genres, issues),
    status: readStatus(doc.status, issues),
    demographic: readOptionalString(doc.demographic, "Unknown") as MangaDemographic,
    language: readOptionalString(doc.language, "Unknown"),
    releaseYear: readOptionalNumber(
      doc.releaseYear,
      new Date().getFullYear(),
      "releaseYear",
      issues,
    ),
    rating: readRating(doc.rating, issues),
    views: readOptionalNumber(doc.views, 0, "views", issues),
    totalBookmarks: readOptionalNumber(
      doc.totalBookmarks,
      0,
      "totalBookmarks",
      issues,
    ),
    chapterCount: readOptionalNumber(doc.chapterCount, 0, "chapterCount", issues),
    updatedAt,
    isTrending: readBoolean(doc.isTrending, false),
    isNew: readBoolean(doc.isNew, false),
    isFeatured: readBoolean(doc.isFeatured, false),
  };

  warnMalformedDocument("manga", doc.$id, issues);
  return manga;
}

export function mapMangaDocumentsToMangas(docs: MangaDocument[]): Manga[] {
  return docs.map(mapMangaDocumentToManga);
}

export function mapChapterDocumentToChapter(doc: ChapterDocument): Chapter {
  const issues: string[] = [];
  const now = new Date().toISOString();
  const slug = readRequiredString(doc.slug, "chapter-1", "slug", issues);
  const chapterNumber = readChapterNumber(doc, slug, issues);
  const publishedAt = readIsoDate(
    doc.publishedAt,
    readIsoDate(doc.$updatedAt, readIsoDate(doc.$createdAt, now)),
  );

  const chapter = {
    id: doc.$id,
    mangaId: readRequiredString(doc.mangaId, "", "mangaId", issues),
    slug,
    number: chapterNumber,
    title: readRequiredString(
      doc.title,
      `Chapter ${chapterNumber}`,
      "title",
      issues,
    ),
    publishedAt,
    pageCount: readOptionalNumber(doc.pageCount, 0, "pageCount", issues),
  };

  warnMalformedDocument("chapter", doc.$id, issues);
  return chapter;
}

export function mapChapterDocumentsToChapters(docs: ChapterDocument[]): Chapter[] {
  return docs.map(mapChapterDocumentToChapter);
}

export function mapChapterPageDocumentToChapterPage(
  doc: ChapterPageDocument,
  fallbackIndex = 1,
): ChapterPage {
  const issues: string[] = [];
  const pageNumber = readOptionalNumber(
    doc.pageNumber,
    fallbackIndex,
    "pageNumber",
    issues,
  );
  const imageUrl = readUrl(doc.imageUrl, undefined, "imageUrl", issues, true);

  const page = {
    index: pageNumber,
    gradient: SAFE_COVER_GRADIENT,
    alt: readOptionalString(doc.alt, `Page ${pageNumber}`),
    imageUrl,
  };

  warnMalformedDocument("chapter page", doc.$id, issues);
  return page;
}

export function mapChapterPageDocumentsToChapterPages(docs: ChapterPageDocument[]): ChapterPage[] {
  return docs.map((doc, index) => mapChapterPageDocumentToChapterPage(doc, index + 1));
}
