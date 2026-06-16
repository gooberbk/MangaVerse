import type { ChapterPage } from "@/types/chapter";

const PAGE_GRADIENT_POOL = [
  "from-violet-900 via-purple-800 to-indigo-900",
  "from-slate-900 via-zinc-800 to-stone-900",
  "from-indigo-900 via-blue-900 to-slate-900",
  "from-fuchsia-900 via-purple-900 to-violet-950",
  "from-rose-900 via-red-900 to-orange-950",
  "from-cyan-900 via-teal-900 to-emerald-950",
  "from-amber-900 via-orange-900 to-red-950",
  "from-blue-900 via-indigo-900 to-purple-950",
] as const;

export function createChapterPages(
  mangaGradient: string,
  chapterNumber: number,
  pageCount: number,
): ChapterPage[] {
  return Array.from({ length: pageCount }, (_, index) => {
    const pageIndex = index + 1;
    const poolGradient =
      PAGE_GRADIENT_POOL[(chapterNumber + index) % PAGE_GRADIENT_POOL.length];
    const gradient =
      pageIndex === 1 || pageIndex === pageCount
        ? mangaGradient
        : poolGradient;

    return {
      index: pageIndex,
      gradient,
      alt: `Chapter ${chapterNumber}, page ${pageIndex}`,
    };
  });
}
