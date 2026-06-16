import {
  cn,
  formatRating,
  formatUpdatedDate,
  statusColor,
  statusLabel,
} from "@/lib/utils";
import type { Manga } from "@/types/manga";
import Link from "next/link";

type LatestUpdateCardProps = {
  manga: Manga;
};

export function LatestUpdateCard({ manga }: LatestUpdateCardProps) {
  return (
    <Link
      href={`/manga/${manga.slug}`}
      className="glass glass-hover group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 sm:flex-row"
    >
      <div
        className={cn(
          "relative aspect-[3/4] w-full shrink-0 bg-gradient-to-br sm:w-28 sm:aspect-auto sm:self-stretch lg:w-32",
          manga.coverGradient,
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:bg-gradient-to-r" />
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-xs font-semibold backdrop-blur-sm sm:hidden">
          <StarIcon />
          {formatRating(manga.rating.average)}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-base font-semibold text-white transition-colors group-hover:text-accent-pink sm:text-lg">
              {manga.title}
            </h3>
            <p className="mt-1 text-xs text-muted">by {manga.author}</p>
          </div>
          <div className="hidden shrink-0 items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1 text-sm font-bold text-amber-400 sm:flex">
            <StarIcon />
            {formatRating(manga.rating.average)}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {manga.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-muted"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/5 pt-3">
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[10px] font-medium",
              statusColor(manga.status),
            )}
          >
            {statusLabel(manga.status)}
          </span>
          <span className="text-xs text-muted">
            Ch. {manga.chapterCount}
          </span>
          <span className="text-xs font-medium text-accent-purple">
            Updated {formatUpdatedDate(manga.updatedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-amber-400"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
