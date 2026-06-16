import { MangaReader } from "@/components/reader/MangaReader";
import {
  getAdjacentChapterNumbers,
  getAllChapterNumbers,
  getChapterByMangaSlugAndNumber,
  getChapterPagesForMangaChapter,
  getChaptersByMangaSlug,
  getMangaBySlug,
  getRelatedMangas,
  mockMangas,
} from "@/lib/mock";
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
  const manga = getMangaBySlug(slug);
  const chapter =
    chapterNumber !== null
      ? getChapterByMangaSlugAndNumber(slug, chapterNumber)
      : undefined;

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

  const manga = getMangaBySlug(slug);
  const chapter = getChapterByMangaSlugAndNumber(slug, chapterNumber);

  if (!manga || !chapter) {
    notFound();
  }

  const pages = getChapterPagesForMangaChapter(slug, chapterNumber);
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
