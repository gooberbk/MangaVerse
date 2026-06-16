import { MangaCard } from "@/components/manga/MangaCard";
import { ChapterNavigation } from "@/components/reader/ChapterNavigation";
import type { Manga } from "@/types/manga";
import Link from "next/link";

type EndOfChapterProps = {
  mangaSlug: string;
  mangaTitle: string;
  chapterNumber: number;
  nextChapter: number | null;
  relatedMangas: Manga[];
};

export function EndOfChapter({
  mangaSlug,
  mangaTitle,
  chapterNumber,
  nextChapter,
  relatedMangas,
}: EndOfChapterProps) {
  return (
    <section className="space-y-8 border-t border-white/5 pt-12">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-purple">
          End of Chapter
        </p>
        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          You finished Chapter {chapterNumber}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Great reading session on{" "}
          <span className="text-white">{mangaTitle}</span>. Pick up where you
          left off or explore something new.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {nextChapter !== null ? (
            <Link
              href={`/manga/${mangaSlug}/chapter/${nextChapter}`}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-6 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-purple-500/50 hover:brightness-110"
            >
              Continue to Chapter {nextChapter}
              <ChevronRightIcon />
            </Link>
          ) : (
            <span className="glass inline-flex h-11 items-center rounded-xl px-6 text-sm font-medium text-muted">
              Final chapter reached
            </span>
          )}
          <Link
            href={`/manga/${mangaSlug}`}
            className="glass glass-hover inline-flex h-11 items-center rounded-xl px-6 text-sm font-semibold text-white"
          >
            Back to Details
          </Link>
        </div>
      </div>

      <ChapterNavigation
        mangaSlug={mangaSlug}
        prevChapter={chapterNumber > 1 ? chapterNumber - 1 : null}
        nextChapter={nextChapter}
        className="mx-auto"
      />

      {relatedMangas.length > 0 && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-bold text-white">Continue Exploring</h3>
            <p className="mt-1 text-sm text-muted">
              More series you might enjoy
            </p>
          </div>
          <div className="scrollbar-hide flex justify-center gap-4 overflow-x-auto pb-2">
            {relatedMangas.slice(0, 4).map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
