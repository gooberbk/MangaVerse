import { cn, formatRating, formatViews } from "@/lib/utils";
import type { Manga } from "@/types/manga";
import Link from "next/link";

type PopularRankingProps = {
  mangas: Manga[];
};

export function PopularRanking({ mangas }: PopularRankingProps) {
  return (
    <section className="space-y-5 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Popular This Week
        </h2>
        <p className="mt-1 text-sm text-muted">
          Top series ranked by readership
        </p>
      </div>

      <div className="glass divide-y divide-white/5 overflow-hidden rounded-2xl">
        {mangas.map((manga, index) => (
          <Link
            key={manga.id}
            href={`/manga/${manga.slug}`}
            className="group flex items-center gap-4 p-4 transition-colors hover:bg-white/[0.04] sm:gap-5 sm:p-5"
          >
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-extrabold",
                index === 0
                  ? "bg-gradient-to-br from-amber-400 to-orange-500 text-black"
                  : index === 1
                    ? "bg-gradient-to-br from-slate-300 to-slate-400 text-black"
                    : index === 2
                      ? "bg-gradient-to-br from-amber-700 to-amber-800 text-white"
                      : "bg-white/5 text-muted",
              )}
            >
              {index + 1}
            </span>

            <div
              className={cn(
                "h-14 w-10 shrink-0 rounded-lg bg-gradient-to-br shadow-md transition-transform group-hover:scale-105",
                manga.coverGradient,
              )}
            />

            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-white transition-colors group-hover:text-accent-pink">
                {manga.title}
              </h3>
              <p className="mt-0.5 text-xs text-muted">
                {formatViews(manga.views)} views · Ch. {manga.chapterCount}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1 text-sm font-bold text-amber-400">
              <StarIcon />
              {formatRating(manga.rating.average)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
