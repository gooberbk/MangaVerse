import type { ContinueReadingEntry } from "@/lib/mock/library";
import { cn, formatUpdatedDate } from "@/lib/utils";
import Link from "next/link";

type ContinueReadingCardProps = {
  entry: ContinueReadingEntry;
};

export function ContinueReadingCard({ entry }: ContinueReadingCardProps) {
  const { manga, currentChapter, progressPercent, lastReadAt } = entry;

  return (
    <article className="glass group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-purple-500/10 sm:flex-row">
      <div
        className={cn(
          "relative aspect-[3/4] w-full shrink-0 bg-gradient-to-br sm:w-28 lg:w-32",
          manga.coverGradient,
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent sm:bg-gradient-to-r" />
        <span className="absolute left-3 top-3 rounded-lg bg-black/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          Ch. {currentChapter}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-5">
        <div>
          <Link
            href={`/manga/${manga.slug}`}
            className="line-clamp-2 text-base font-semibold text-white transition-colors hover:text-accent-pink sm:text-lg"
          >
            {manga.title}
          </Link>
          <p className="mt-1 text-xs text-muted">
            Last read {formatUpdatedDate(lastReadAt)}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted">Chapter progress</span>
            <span className="font-semibold text-white">{progressPercent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-pink transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <Link
          href={`/manga/${manga.slug}/chapter/${currentChapter}`}
          className="mt-auto inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:brightness-110"
        >
          Continue Reading
        </Link>
      </div>
    </article>
  );
}
