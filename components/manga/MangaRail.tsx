import { MangaCard } from "@/components/manga/MangaCard";
import type { Manga } from "@/types/manga";
import Link from "next/link";

type MangaRailProps = {
  title: string;
  subtitle?: string;
  mangas: Manga[];
  viewAllHref?: string;
};

export function MangaRail({
  title,
  subtitle,
  mangas,
  viewAllHref = "#",
}: MangaRailProps) {
  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-sm text-muted">{subtitle}</p>
          )}
        </div>
        <Link
          href={viewAllHref}
          className="hidden text-sm font-medium text-accent-purple transition-colors hover:text-accent-pink sm:block"
        >
          View all →
        </Link>
      </div>

      <div className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8">
        {mangas.map((manga) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>
    </section>
  );
}
