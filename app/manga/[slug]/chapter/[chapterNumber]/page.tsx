import { MangaReader } from "@/components/reader/MangaReader";
import {
  getAdjacentChapterNumbers,
  getAllChapterNumbers,
  getChapterByMangaSlugAndNumber,
  getChapterPagesForMangaChapter,
  getChaptersByMangaSlug,
  getMangaBySlug as getMockMangaBySlug,
  getRelatedMangas,
  mockMangas,
} from "@/lib/mock";
import {
  getChapterByNumber,
  getMangaBySlug,
  listChapterPages,
} from "@/lib/appwrite/mangas";
import {
  mapChapterPageDocumentsToChapterPages,
  mapChapterDocumentsToChapters,
  mapMangaDocumentToManga,
} from "@/lib/appwrite/mapping";
import type { ChapterPage } from "@/types/chapter";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ChapterReaderPageProps = {
  params: Promise<{ slug: string; chapterNumber: string }>;
};

function parseChapterNumber(value: string): number | null {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return null;
  return parsed;
}

export async function generateStaticParams() {
  return mockMangas.flatMap((manga) => {
    const recentNumbers = getChaptersByMangaSlug(manga.slug).map(
      (chapter) => chapter.number,
    );
    const numbers = new Set([1, ...recentNumbers]);

    return [...numbers].map((chapterNumber) => ({
      slug: manga.slug,
      chapterNumber: String(chapterNumber),
    }));
  });
}

export async function generateMetadata({
  params,
}: ChapterReaderPageProps): Promise<Metadata> {
  const { slug, chapterNumber: chapterNumberParam } = await params;
  const chapterNumber = parseChapterNumber(chapterNumberParam);

  if (chapterNumber === null) {
    return { title: "Chapter Not Found" };
  }

  // Try Appwrite first
  let manga = null;
  let chapter = null;

  try {
    const appwriteManga = await getMangaBySlug(slug);
    if (appwriteManga) {
      manga = mapMangaDocumentToManga(appwriteManga);
      const appwriteChapter = await getChapterByNumber(manga.id, chapterNumber);
      if (appwriteChapter) {
        const [mappedChapter] = mapChapterDocumentsToChapters([appwriteChapter]);
        chapter = mappedChapter;
      }
    }
  } catch (error) {
    console.error("Failed to load from Appwrite, falling back to mock:", error);
  }

  // Fallback to mock
  if (!manga || !chapter) {
    manga = getMockMangaBySlug(slug);
    chapter = getChapterByMangaSlugAndNumber(slug, chapterNumber);
  }

  if (!manga || !chapter) {
    return { title: "Chapter Not Found" };
  }

  return {
    title: `${manga.title} — Ch. ${chapter.number}`,
    description: `Read ${manga.title}, Chapter ${chapter.number}: ${chapter.title}`,
  };
}

export default async function ChapterReaderPage({
  params,
}: ChapterReaderPageProps) {
  const { slug, chapterNumber: chapterNumberParam } = await params;
  const chapterNumber = parseChapterNumber(chapterNumberParam);

  if (chapterNumber === null) {
    notFound();
  }

  let manga = null;
  let chapter = null;
  let pages: ChapterPage[] = [];

  // Try Appwrite first
  try {
    const appwriteManga = await getMangaBySlug(slug);
    if (appwriteManga) {
      manga = mapMangaDocumentToManga(appwriteManga);
      const appwriteChapter = await getChapterByNumber(manga.id, chapterNumber);
      if (appwriteChapter) {
        const [mappedChapter] = mapChapterDocumentsToChapters([appwriteChapter]);
        chapter = mappedChapter;
        const appwritePages = await listChapterPages(chapter.id);
        if (appwritePages.length > 0) {
          pages = mapChapterPageDocumentsToChapterPages(appwritePages);
        }
      }
    }
  } catch (error) {
    console.error("Failed to load from Appwrite, falling back to mock:", error);
  }

  // Fallback to mock if Appwrite failed or returned no data
  if (!manga || !chapter || pages.length === 0) {
    manga = getMockMangaBySlug(slug);
    chapter = getChapterByMangaSlugAndNumber(slug, chapterNumber);
    pages = getChapterPagesForMangaChapter(slug, chapterNumber);
  }

  if (!manga || !chapter) {
    notFound();
  }

  // Use mock-based navigation for consistency
  const { prev, next } = getAdjacentChapterNumbers(slug, chapterNumber);
  const chapterNumbers = getAllChapterNumbers(slug);
  const relatedMangas = getRelatedMangas(slug, 4);

  return (
    <MangaReader
      manga={manga}
      chapterNumber={chapter.number}
      chapterTitle={chapter.title}
      pages={pages}
      chapterNumbers={chapterNumbers}
      prevChapter={prev}
      nextChapter={next}
      relatedMangas={relatedMangas}
    />
  );
}
