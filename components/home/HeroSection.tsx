import { Badge } from "@/components/ui/Badge";
import { MangaCover } from "@/components/manga/MangaCover";
import { StatBadge } from "@/components/ui/StatBadge";
import {
  cn,
  formatRating,
  formatViews,
  statusColor,
  statusLabel,
} from "@/lib/utils";
import type { Manga } from "@/types/manga";
import Link from "next/link";

type HeroSectionProps = {
  manga: Manga;
};

export function HeroSection({ manga }: HeroSectionProps) {
  const author = cleanDisplayText(manga.author, "Creator TBA");
  const ratingCount =
    Number.isFinite(manga.rating.count) && manga.rating.count > 0
      ? manga.rating.count.toLocaleString()
      : "0";

  return (
    <section className="relative overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-25 blur-3xl",
          manga.coverGradient,
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-28">
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <Badge variant="featured" className="mb-4 px-3 py-1 text-xs">
            Featured Series
          </Badge>

          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            {(manga.genres.length > 0 ? manga.genres : ["Manga"]).map(
              (genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted"
                >
                  {genre}
                </span>
              ),
            )}
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {manga.title}
          </h1>

          <p className="mt-2 text-sm text-muted">by {author}</p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {manga.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <span className="flex items-center gap-1.5 text-lg font-bold text-amber-400">
              <StarIcon />
              {formatRating(manga.rating.average)}
              <span className="text-sm font-normal text-muted">
                ({ratingCount} ratings)
              </span>
            </span>
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium",
                statusColor(manga.status),
              )}
            >
              {statusLabel(manga.status)}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href={`/manga/${manga.slug}`}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-7 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-purple-500/50 hover:brightness-110"
            >
              <PlayIcon />
              Start Reading
            </Link>
            <Link
              href="/browse"
              className="glass glass-hover inline-flex h-12 items-center gap-2 rounded-xl px-7 text-sm font-semibold text-white"
            >
              Browse Catalog
            </Link>
          </div>
        </div>

        <div className="relative order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-none lg:justify-self-end">
          <MangaCover
            manga={manga}
            className="mx-auto aspect-[3/4] w-56 rounded-2xl shadow-2xl shadow-purple-500/30 sm:w-64 lg:w-72"
          />

          <StatBadge
            label="Rating"
            value={formatRating(manga.rating.average)}
            icon={<StarIcon className="text-amber-400" />}
            className="absolute -left-2 top-8 sm:-left-6 lg:-left-10"
          />
          <StatBadge
            label="Views"
            value={formatViews(manga.views)}
            className="absolute -right-2 top-1/3 sm:-right-6 lg:-right-8"
          />
          <StatBadge
            label="Chapters"
            value={manga.chapterCount}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 sm:bottom-0"
          />
        </div>
      </div>
    </section>
  );
}

function cleanDisplayText(value: string, fallback: string) {
  const text = value.trim();
  if (!text || text.toLowerCase() === "unknown") return fallback;
  return text;
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
