import { Badge } from "@/components/ui/Badge";
import { MangaCover } from "@/components/manga/MangaCover";
import { StatBadge } from "@/components/ui/StatBadge";
import {
  cn,
  formatRating,
  formatUpdatedDate,
  formatViews,
  statusColor,
  statusLabel,
} from "@/lib/utils";
import type { Manga } from "@/types/manga";
import Link from "next/link";

type MangaDetailHeroProps = {
  manga: Manga;
  readableChapterNumber: number | null;
};

export function MangaDetailHero({
  manga,
  readableChapterNumber,
}: MangaDetailHeroProps) {
  const readableChapterHref =
    readableChapterNumber !== null
      ? `/manga/${manga.slug}/chapter/${readableChapterNumber}`
      : null;
  const author = cleanDisplayText(manga.author, "Creator TBA");
  const artist = cleanDisplayText(manga.artist, "Studio TBA");
  const ratingCount =
    Number.isFinite(manga.rating.count) && manga.rating.count > 0
      ? manga.rating.count.toLocaleString()
      : "0";

  return (
    <section className="relative overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-30 blur-3xl",
          manga.coverGradient,
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,320px)_1fr]">
          <div className="relative mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none">
            <MangaCover
              manga={manga}
              className="aspect-[3/4] rounded-2xl shadow-2xl shadow-purple-500/25"
            >
              {(manga.isTrending || manga.isNew) && (
                <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5">
                  {manga.isTrending && <Badge variant="trending">Trending</Badge>}
                  {manga.isNew && <Badge variant="new">New</Badge>}
                </div>
              )}
            </MangaCover>

            <StatBadge
              label="Rating"
              value={formatRating(manga.rating.average)}
              icon={<StarIcon className="text-amber-400" />}
              className="absolute -left-3 top-10 hidden sm:flex lg:-left-6"
            />
            <StatBadge
              label="Views"
              value={formatViews(manga.views)}
              className="absolute -right-3 top-1/3 hidden sm:flex lg:-right-6"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              {manga.genres.length > 0 ? (
                manga.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted"
                  >
                    {genre}
                  </span>
                ))
              ) : (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted">
                  Genres to be announced
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {manga.title}
            </h1>

            {manga.alternativeTitles.length > 0 && (
              <p className="mt-2 text-sm text-muted/80">
                {manga.alternativeTitles.join(" · ")}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span>
                Story by <span className="text-white">{author}</span>
              </span>
              <span className="hidden text-white/20 sm:inline">|</span>
              <span>
                Art by <span className="text-white">{artist}</span>
              </span>
            </div>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {manga.synopsis}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  statusColor(manga.status),
                )}
              >
                {statusLabel(manga.status)}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-amber-400">
                <StarIcon className="text-amber-400" />
                {formatRating(manga.rating.average)}
                <span className="font-normal text-muted">
                  ({ratingCount})
                </span>
              </span>
              <span className="text-sm text-muted">
                {manga.chapterCount} chapters
              </span>
              <span className="text-sm text-muted">
                Updated {formatUpdatedDate(manga.updatedAt)}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {readableChapterHref ? (
                <>
                  <Link
                    href={readableChapterHref}
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-6 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-purple-500/50 hover:brightness-110"
                  >
                    <PlayIcon />
                    Start Reading
                  </Link>
                  <Link
                    href={readableChapterHref}
                    className="glass glass-hover inline-flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-white"
                  >
                    <BookIcon />
                    Continue Reading
                  </Link>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    disabled
                    className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-xl bg-white/10 px-6 text-sm font-semibold text-muted opacity-70"
                  >
                    <PlayIcon />
                    No Chapters Yet
                  </button>
                  <button
                    type="button"
                    disabled
                    className="glass inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-xl px-6 text-sm font-semibold text-muted opacity-70"
                  >
                    <BookIcon />
                    Continue Unavailable
                  </button>
                </>
              )}
            </div>
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

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
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

function BookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );
}
