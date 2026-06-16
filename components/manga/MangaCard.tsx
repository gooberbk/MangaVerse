import { Badge } from "@/components/ui/Badge";
import { cn, formatRating, statusColor, statusLabel } from "@/lib/utils";
import type { Manga } from "@/types/manga";
import Link from "next/link";

type MangaCardProps = {
  manga: Manga;
  className?: string;
  showTrendingBadge?: boolean;
};

export function MangaCard({
  manga,
  className,
  showTrendingBadge = true,
}: MangaCardProps) {
  return (
    <Link
      href={`/manga/${manga.slug}`}
      className={cn(
        "group relative flex w-44 shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm",
        "transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-purple-500/10",
        "sm:w-48",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[3/4] overflow-hidden bg-gradient-to-br",
          manga.coverGradient,
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-50" />

        {showTrendingBadge && manga.isTrending && (
          <div className="absolute left-2 top-2">
            <Badge variant="trending">Trending</Badge>
          </div>
        )}

        {manga.isNew && (
          <div className="absolute left-2 top-2">
            <Badge variant="new">New</Badge>
          </div>
        )}

        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
          <StarIcon />
          {formatRating(manga.rating.average)}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-accent-pink">
          {manga.title}
        </h3>

        <div className="flex flex-wrap gap-1">
          {manga.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-muted"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-1">
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[10px] font-medium",
              statusColor(manga.status),
            )}
          >
            {statusLabel(manga.status)}
          </span>
          <span className="text-[10px] text-muted">{manga.chapterCount} ch.</span>
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
