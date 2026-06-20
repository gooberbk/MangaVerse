import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MangaCover } from "@/components/manga/MangaCover";
import { formatRating, statusColor, statusLabel } from "@/lib/utils";
import type { Manga } from "@/types/manga";
import Link from "next/link";

type HeroProps = {
  manga: Manga;
};

export function Hero({ manga }: HeroProps) {
  const author = cleanDisplayText(manga.author, "Creator TBA");

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${manga.coverGradient} opacity-20`}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-32">
        {/* Cover */}
        <div className="mx-auto shrink-0 lg:mx-0">
          <MangaCover
            manga={manga}
            className="aspect-[3/4] w-56 rounded-2xl shadow-2xl shadow-purple-500/20 sm:w-64 lg:w-72"
          >
            <div className="absolute left-3 top-3">
              <Badge variant="featured">Featured</Badge>
            </div>
          </MangaCover>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
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

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <span className="flex items-center gap-1.5 text-lg font-bold text-amber-400">
              <StarIcon />
              {formatRating(manga.rating.average)}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${statusColor(manga.status)}`}
            >
              {statusLabel(manga.status)}
            </span>
            <span className="text-sm text-muted">{manga.chapterCount} chapters</span>
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {manga.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link href={`/manga/${manga.slug}`}>
              <Button size="lg">
                <PlayIcon />
                Start Reading
              </Button>
            </Link>
            <Link href="/browse">
              <Button variant="secondary" size="lg">Browse Catalog</Button>
            </Link>
          </div>
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

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
