"use client";

import { ChapterNavigation } from "@/components/reader/ChapterNavigation";
import { cn } from "@/lib/utils";

type ReaderControlsProps = {
  mangaSlug: string;
  prevChapter: number | null;
  nextChapter: number | null;
  className?: string;
};

export function ReaderControls({
  mangaSlug,
  prevChapter,
  nextChapter,
  className,
}: ReaderControlsProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 sm:flex-row sm:justify-between",
        className,
      )}
    >
      <ChapterNavigation
        mangaSlug={mangaSlug}
        prevChapter={prevChapter}
        nextChapter={nextChapter}
        variant="inline"
      />

      <button
        type="button"
        disabled
        title="Library saving is not connected in this MVP."
        className="glass inline-flex h-9 cursor-not-allowed items-center gap-2 rounded-lg px-4 text-xs font-semibold text-muted opacity-70 sm:h-10 sm:text-sm"
      >
        <HeartIcon />
        Save Unavailable
      </button>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
