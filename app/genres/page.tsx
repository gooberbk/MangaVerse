import { GenreCard } from "@/components/genres/GenreCard";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DestinationHero } from "@/components/ui/DestinationHero";
import { StatBadge } from "@/components/ui/StatBadge";
import { getGenreStats, mockMangas } from "@/lib/mock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Genres",
  description:
    "Browse manga by genre — action, fantasy, romance, sci-fi, and more on MangaVerse.",
};

export default function GenresPage() {
  const genreStats = getGenreStats();
  const totalTitles = mockMangas.length;

  return (
    <>
      <SiteHeader />

      <main>
        <DestinationHero
          eyebrow="Discover"
          title="Browse by Genre"
          subtitle="Every story has a flavor. Pick a genre and dive into curated collections of fictional series built for every mood."
          glow="pink"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            <StatBadge label="Genres" value={genreStats.length} />
            <StatBadge label="Total Titles" value={totalTitles} />
            <StatBadge
              label="Most Popular"
              value={
                [...genreStats].sort((a, b) => b.count - a.count)[0]?.genre ??
                "—"
              }
            />
          </div>
        </DestinationHero>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-white sm:text-xl">
              All Genres
            </h2>
            <p className="mt-1 text-sm text-muted">
              {genreStats.length} categories across the library
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {genreStats.map(({ genre, slug, count }) => (
              <GenreCard key={genre} genre={genre} slug={slug} count={count} />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
