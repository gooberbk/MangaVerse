import { cn, formatBookmarks, formatRating, formatViews } from "@/lib/utils";
import type { Manga } from "@/types/manga";
import Link from "next/link";

type PopularTopRankingProps = {
  mangas: Manga[];
};

export function PopularTopRanking({ mangas }: PopularTopRankingProps) {
  return (
    <div className="glass overflow-hidden rounded-2xl shadow-xl shadow-purple-500/5">
      {mangas.map((manga, index) => (
        <Link
          key={manga.id}
          href={`/manga/${manga.slug}`}
          className={cn(
            "group flex items-center gap-4 border-b border-white/5 p-4 transition-all duration-300 last:border-b-0 sm:gap-6 sm:p-6",
            "hover:bg-white/[0.04]",
            index === 0 && "bg-gradient-to-r from-amber-500/5 to-transparent",
          )}
        >
          <RankBadge rank={index + 1} />

          <div
            className={cn(
              "h-20 w-14 shrink-0 rounded-xl bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-16",
              manga.coverGradient,
            )}
          />

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-white transition-colors group-hover:text-accent-pink sm:text-lg">
              {manga.title}
            </h3>
            <p className="mt-1 line-clamp-1 text-xs text-muted sm:text-sm">
              {manga.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
              <span>{formatViews(manga.views)} views</span>
              <span>{formatBookmarks(manga.totalBookmarks)} bookmarks</span>
              <span>Ch. {manga.chapterCount}</span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="flex items-center gap-1 text-base font-bold text-amber-400 sm:text-lg">
              <StarIcon />
              {formatRating(manga.rating.average)}
            </span>
            <span className="text-[10px] text-muted">
              {manga.rating.count.toLocaleString()} ratings
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  return (
    <span
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-extrabold sm:h-12 sm:w-12 sm:text-xl",
        rank === 1
          ? "bg-gradient-to-br from-amber-400 to-orange-500 text-black shadow-lg shadow-amber-500/30"
          : rank === 2
            ? "bg-gradient-to-br from-slate-300 to-slate-400 text-black shadow-lg shadow-slate-400/20"
            : rank === 3
              ? "bg-gradient-to-br from-amber-700 to-amber-900 text-white shadow-lg shadow-amber-800/20"
              : "bg-white/5 text-muted ring-1 ring-white/10",
      )}
    >
      {rank}
    </span>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
