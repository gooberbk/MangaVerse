"use client";

import { ChapterNavigation } from "@/components/reader/ChapterNavigation";
import { EndOfChapter } from "@/components/reader/EndOfChapter";
import { ReaderControls } from "@/components/reader/ReaderControls";
import { ReaderHeader } from "@/components/reader/ReaderHeader";
import { ReaderPage } from "@/components/reader/ReaderPage";
import { ReaderSettings } from "@/components/reader/ReaderSettings";
import { cn } from "@/lib/utils";
import type { ChapterPage } from "@/types/chapter";
import type { Manga } from "@/types/manga";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PageWidth = "fit" | "wide";

type MangaReaderProps = {
  manga: Manga;
  chapterNumber: number;
  chapterTitle: string;
  pages: ChapterPage[];
  chapterNumbers: number[];
  prevChapter: number | null;
  nextChapter: number | null;
  relatedMangas: Manga[];
};

export function MangaReader({
  manga,
  chapterNumber,
  chapterTitle,
  pages,
  chapterNumbers,
  prevChapter,
  nextChapter,
  relatedMangas,
}: MangaReaderProps) {
  const router = useRouter();
  const [pageWidth, setPageWidth] = useState<PageWidth>("fit");

  function handleChapterSelect(number: number) {
    router.push(`/manga/${manga.slug}/chapter/${number}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <ReaderHeader
        mangaSlug={manga.slug}
        mangaTitle={manga.title}
        chapterNumber={chapterNumber}
        chapterTitle={chapterTitle}
        chapterNumbers={chapterNumbers}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        onChapterSelect={handleChapterSelect}
      />

      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
        <ReaderSettings
          pageWidth={pageWidth}
          onPageWidthChange={setPageWidth}
          className="mb-4 sm:mb-6"
        />

        <ReaderControls
          mangaSlug={manga.slug}
          prevChapter={prevChapter}
          nextChapter={nextChapter}
          className="mb-6"
        />
      </div>

      <div
        className={cn(
          "mx-auto flex flex-col items-center gap-1 px-2 pb-8 sm:gap-1.5 sm:px-4",
          pageWidth === "fit" ? "max-w-3xl" : "max-w-5xl",
        )}
      >
        {pages.map((page) => (
          <ReaderPage
            key={page.index}
            page={page}
            chapterNumber={chapterNumber}
            pageWidth={pageWidth}
          />
        ))}
      </div>

      <div className="sticky bottom-4 z-40 mx-auto flex justify-center px-4 pb-4 sm:hidden">
        <ChapterNavigation
          mangaSlug={manga.slug}
          prevChapter={prevChapter}
          nextChapter={nextChapter}
          variant="floating"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <EndOfChapter
          mangaSlug={manga.slug}
          mangaTitle={manga.title}
          chapterNumber={chapterNumber}
          nextChapter={nextChapter}
          relatedMangas={relatedMangas}
        />
      </div>
    </div>
  );
}
