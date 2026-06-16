import { MangaCard } from "@/components/manga/MangaCard";
import type { Manga } from "@/types/manga";

type RelatedMangaProps = {
  mangas: Manga[];
};

export function RelatedManga({ mangas }: RelatedMangaProps) {
  if (mangas.length === 0) return null;

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          You May Also Like
        </h2>
        <p className="mt-1 text-sm text-muted">
          Similar series based on shared genres
        </p>
      </div>

      <div className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {mangas.map((manga) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>
    </section>
  );
}
