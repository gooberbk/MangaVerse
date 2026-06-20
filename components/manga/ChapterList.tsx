import { ChapterCard } from "@/components/manga/ChapterCard";
import type { Chapter } from "@/types/chapter";

type ChapterListProps = {
  mangaSlug: string;
  coverGradient: string;
  chapters: Chapter[];
};

const NEW_CHAPTER_DAYS = 7;

function isChapterNew(publishedAt: string): boolean {
  const published = new Date(publishedAt);
  const now = new Date();
  const diffDays =
    (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= NEW_CHAPTER_DAYS;
}

export function ChapterList({
  mangaSlug,
  coverGradient,
  chapters,
}: ChapterListProps) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white sm:text-2xl">Chapters</h2>
        <p className="mt-1 text-sm text-muted">
          {chapters.length} recent chapters available to read
        </p>
      </div>

      {chapters.length === 0 ? (
        <div className="glass rounded-2xl border border-white/10 px-6 py-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <span className="text-xl font-black text-white/70">0</span>
          </div>
          <h3 className="text-lg font-semibold text-white">Chapters coming soon</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
            This series is in the catalog, but no readable chapters are published yet.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {chapters.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              mangaSlug={mangaSlug}
              chapter={chapter}
              coverGradient={coverGradient}
              isNew={isChapterNew(chapter.publishedAt)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
