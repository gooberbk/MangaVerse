import { MangaGrid } from "@/components/browse/MangaGrid";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StatBadge } from "@/components/ui/StatBadge";
import {
  genreGradients,
  genreToSlug,
  getAllGenres,
  getMangaCountByGenre,
  getMangasByGenre,
  slugToGenre,
} from "@/lib/mock";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type GenrePageProps = {
  params: Promise<{ genre: string }>;
};

export function generateStaticParams() {
  return getAllGenres().map((genre) => ({
    genre: genreToSlug(genre),
  }));
}

export async function generateMetadata({
  params,
}: GenrePageProps): Promise<Metadata> {
  const { genre: genreSlug } = await params;
  const genre = slugToGenre(genreSlug);

  if (!genre) {
    return { title: "Genre Not Found" };
  }

  return {
    title: `${genre} Manga`,
    description: `Browse ${genre} manga series on MangaVerse.`,
  };
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { genre: genreSlug } = await params;
  const genre = slugToGenre(genreSlug);

  if (!genre) {
    notFound();
  }

  const mangas = getMangasByGenre(genre);
  const count = getMangaCountByGenre(genre);

  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-white/5">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-30",
              genreGradients[genre],
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
          <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-accent-purple/15 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <Link
              href="/genres"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-white"
            >
              <BackIcon />
              All Genres
            </Link>

            <p className="mt-6 text-sm font-medium uppercase tracking-widest text-accent-purple">
              Genre Collection
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {genre}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Explore every {genre.toLowerCase()} series in the MangaVerse
              library — curated from our full catalog of fictional titles.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              <StatBadge label="Titles" value={count} />
              <StatBadge
                label="Top Rated"
                value={
                  mangas.length > 0
                    ? [...mangas]
                        .sort((a, b) => b.rating.average - a.rating.average)[0]
                        ?.title ?? "—"
                    : "—"
                }
              />
              <StatBadge label="In Catalog" value={`${count} series`} />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          {mangas.length > 0 ? (
            <MangaGrid mangas={mangas} />
          ) : (
            <div className="glass rounded-2xl px-6 py-16 text-center">
              <p className="text-muted">No titles found in this genre yet.</p>
              <Link
                href="/browse"
                className="mt-4 inline-flex text-sm font-medium text-accent-pink hover:text-white"
              >
                Browse full catalog →
              </Link>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

function BackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
