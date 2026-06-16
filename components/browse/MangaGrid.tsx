import { MangaCard } from "@/components/manga/MangaCard";
import type { Manga } from "@/types/manga";

type MangaGridProps = {
  mangas: Manga[];
};

export function MangaGrid({ mangas }: MangaGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {mangas.map((manga) => (
        <MangaCard key={manga.id} manga={manga} className="w-full shrink" />
      ))}
    </div>
  );
}
