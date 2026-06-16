import type { HistoryEntry } from "@/lib/mock/library";
import { cn, formatUpdatedDate } from "@/lib/utils";
import Link from "next/link";

type ReadingHistoryListProps = {
  entries: HistoryEntry[];
};

export function ReadingHistoryList({ entries }: ReadingHistoryListProps) {
  return (
    <div className="glass divide-y divide-white/5 overflow-hidden rounded-2xl">
      {entries.map((entry) => (
        <div
          key={`${entry.mangaId}-${entry.chapterNumber}-${entry.readAt}`}
          className="flex flex-col gap-4 p-4 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-center sm:p-5"
        >
          <div
            className={cn(
              "h-16 w-12 shrink-0 rounded-lg bg-gradient-to-br shadow-md ring-1 ring-white/10 sm:h-20 sm:w-14",
              entry.manga.coverGradient,
            )}
          />

          <div className="min-w-0 flex-1">
            <Link
              href={`/manga/${entry.manga.slug}`}
              className="truncate text-base font-semibold text-white transition-colors hover:text-accent-pink"
            >
              {entry.manga.title}
            </Link>
            <p className="mt-1 text-sm text-muted">
              Chapter {entry.chapterNumber} · {formatUpdatedDate(entry.readAt)}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 max-w-xs overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-pink"
                  style={{ width: `${entry.progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted">
                {entry.progressPercent}%
              </span>
            </div>
          </div>

          <Link
            href={`/manga/${entry.manga.slug}/chapter/${entry.chapterNumber}`}
            className="glass glass-hover inline-flex h-9 shrink-0 items-center justify-center rounded-lg px-4 text-xs font-semibold text-white sm:text-sm"
          >
            Resume
          </Link>
        </div>
      ))}
    </div>
  );
}
