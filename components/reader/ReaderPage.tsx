"use client";

import { cn } from "@/lib/utils";
import type { ChapterPage } from "@/types/chapter";

type PageWidth = "fit" | "wide";

type ReaderPageProps = {
  page: ChapterPage;
  chapterNumber: number;
  pageWidth: PageWidth;
};

export function ReaderPage({ page, chapterNumber, pageWidth }: ReaderPageProps) {
  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden rounded-lg shadow-2xl shadow-black/40 ring-1 ring-white/10 sm:rounded-xl",
        pageWidth === "fit" ? "max-w-2xl" : "max-w-4xl",
      )}
    >
      <div
        className={cn(
          "relative aspect-[2/3] w-full bg-gradient-to-br",
          page.gradient,
        )}
        role="img"
        aria-label={page.alt}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.15] [background-image:repeating-linear-gradient(0deg,transparent,transparent_23px,rgba(255,255,255,0.04)_23px,rgba(255,255,255,0.04)_24px)]" />
        <div className="absolute inset-x-0 top-1/3 h-px bg-white/5" />
        <div className="absolute inset-x-0 top-2/3 h-px bg-white/5" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/5" />

        <div className="absolute left-4 top-4 rounded-md bg-black/30 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white/50 backdrop-blur-sm">
          Ch. {chapterNumber}
        </div>

        <div className="absolute bottom-4 right-4 rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white/50 backdrop-blur-sm">
          {page.index}
        </div>
      </div>
    </figure>
  );
}
