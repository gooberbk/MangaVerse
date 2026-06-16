import { StatBadge } from "@/components/ui/StatBadge";
import { getAllGenres, mockMangas } from "@/lib/mock";
import { formatViews } from "@/lib/utils";
import Link from "next/link";

const totalViews = mockMangas.reduce((sum, manga) => sum + manga.views, 0);

export function AuthVisualPanel() {
  return (
    <div className="relative hidden overflow-hidden rounded-3xl border border-white/10 lg:flex lg:flex-col lg:justify-between">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/40 via-fuchsia-600/30 to-indigo-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(236,72,153,0.25),transparent_55%)]" />
      <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-accent-purple/20 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-accent-pink/20 blur-3xl" />

      <div className="relative flex flex-1 flex-col justify-between p-10 xl:p-12">
        <div>
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple to-accent-pink text-base font-bold shadow-lg shadow-purple-500/30">
              M
            </span>
            <span className="text-xl font-bold">
              Manga<span className="gradient-text">Verse</span>
            </span>
          </Link>

          <p className="mt-10 max-w-sm text-lg font-semibold leading-snug text-white">
            Your premium home for discovering and reading fictional manga.
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Track your library, pick up where you left off, and explore curated
            collections — all in one cinematic reading experience.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3">
          <StatBadge label="Titles" value={mockMangas.length} />
          <StatBadge label="Genres" value={getAllGenres().length} />
          <StatBadge label="Total Reads" value={formatViews(totalViews)} />
          <StatBadge label="Reader Ready" value="100%" />
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {mockMangas.slice(0, 4).map((manga) => (
            <div
              key={manga.id}
              className={`h-16 w-12 rounded-lg bg-gradient-to-br shadow-lg ring-1 ring-white/10 ${manga.coverGradient}`}
              aria-hidden
            />
          ))}
        </div>
      </div>
    </div>
  );
}
