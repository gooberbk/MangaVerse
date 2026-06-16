import { GenrePill } from "@/components/ui/GenrePill";
import { genreGradients, genreToSlug } from "@/lib/mock";
import type { MangaGenre } from "@/types/manga";

type BrowseByGenreProps = {
  genres: MangaGenre[];
};

export function BrowseByGenre({ genres }: BrowseByGenreProps) {
  return (
    <section className="space-y-5 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Browse by Genre
        </h2>
        <p className="mt-1 text-sm text-muted">
          Find your next favorite across every category
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {genres.map((genre) => (
          <GenrePill
            key={genre}
            label={genre}
            gradient={genreGradients[genre]}
            href={`/genres/${genreToSlug(genre)}`}
          />
        ))}
      </div>
    </section>
  );
}
