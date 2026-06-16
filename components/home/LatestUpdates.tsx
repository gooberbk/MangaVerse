import {
  cn,
  formatUpdatedDate,
  statusColor,
  statusLabel,
} from "@/lib/utils";
import type { Manga } from "@/types/manga";
import Link from "next/link";

type LatestUpdatesProps = {
  mangas: Manga[];
};

export function LatestUpdates({ mangas }: LatestUpdatesProps) {
  return (
    <section className="space-y-5 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Latest Updates
        </h2>
        <p className="mt-1 text-sm text-muted">
          Recently updated series across the library
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {mangas.map((manga) => (
          <Link
            key={manga.id}
            href={`/manga/${manga.slug}`}
            className="glass glass-hover group flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/5"
          >
            <div
              className={cn(
                "h-16 w-12 shrink-0 rounded-lg bg-gradient-to-br shadow-md",
                manga.coverGradient,
              )}
            />
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-white transition-colors group-hover:text-accent-pink">
                {manga.title}
              </h3>
              <p className="mt-0.5 text-xs text-muted">
                Ch. {manga.chapterCount} · {formatUpdatedDate(manga.updatedAt)}
              </p>
              <span
                className={cn(
                  "mt-2 inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium",
                  statusColor(manga.status),
                )}
              >
                {statusLabel(manga.status)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
