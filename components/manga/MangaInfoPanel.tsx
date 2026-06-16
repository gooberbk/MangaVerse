import {
  formatBookmarks,
  formatRating,
  statusColor,
  statusLabel,
} from "@/lib/utils";
import type { Manga } from "@/types/manga";

type MangaInfoPanelProps = {
  manga: Manga;
};

type InfoRow = {
  label: string;
  value: string;
  highlight?: boolean;
};

export function MangaInfoPanel({ manga }: MangaInfoPanelProps) {
  const rows: InfoRow[] = [
    { label: "Status", value: statusLabel(manga.status), highlight: true },
    { label: "Release Year", value: String(manga.releaseYear) },
    { label: "Author", value: manga.author },
    { label: "Artist", value: manga.artist },
    { label: "Language", value: manga.language },
    { label: "Demographic", value: manga.demographic },
    { label: "Total Chapters", value: String(manga.chapterCount) },
    { label: "Bookmarks", value: formatBookmarks(manga.totalBookmarks) },
    {
      label: "Rating",
      value: `${formatRating(manga.rating.average)} / 10 (${manga.rating.count.toLocaleString()} votes)`,
      highlight: true,
    },
  ];

  return (
    <section className="glass overflow-hidden rounded-2xl">
      <div className="border-b border-white/5 px-5 py-4 sm:px-6">
        <h2 className="text-lg font-bold text-white">Information</h2>
        <p className="mt-1 text-sm text-muted">Series metadata and stats</p>
      </div>

      <dl className="grid gap-px bg-white/5 sm:grid-cols-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 bg-surface/80 px-5 py-4 sm:px-6"
          >
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              {row.label}
            </dt>
            <dd
              className={
                row.label === "Status"
                  ? `inline-flex w-fit rounded-full border px-2.5 py-0.5 text-sm font-medium ${statusColor(manga.status)}`
                  : row.highlight
                    ? "text-sm font-semibold text-white"
                    : "text-sm text-white/90"
              }
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
