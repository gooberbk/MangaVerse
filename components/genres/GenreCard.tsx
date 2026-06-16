import { genreGradients } from "@/lib/mock";
import { cn } from "@/lib/utils";
import type { MangaGenre } from "@/types/manga";
import Link from "next/link";

type GenreCardProps = {
  genre: MangaGenre;
  slug: string;
  count: number;
};

export function GenreCard({ genre, slug, count }: GenreCardProps) {
  return (
    <Link
      href={`/genres/${slug}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10",
        "transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20",
        "hover:shadow-xl hover:shadow-purple-500/10",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-70 transition-opacity duration-300 group-hover:opacity-90",
          genreGradients[genre],
        )}
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-colors group-hover:bg-black/40" />
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl transition-opacity group-hover:opacity-80" />

      <div className="relative flex min-h-[7.5rem] flex-col justify-between p-5 sm:min-h-[8.5rem] sm:p-6">
        <div>
          <h3 className="text-base font-bold text-white transition-colors group-hover:text-accent-pink sm:text-lg">
            {genre}
          </h3>
          <p className="mt-1 text-xs text-white/60">
            {count} {count === 1 ? "title" : "titles"}
          </p>
        </div>

        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-white/80 transition-colors group-hover:text-white">
          Explore
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
