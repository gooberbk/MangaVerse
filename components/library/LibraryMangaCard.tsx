"use client";

import { MangaCard } from "@/components/manga/MangaCard";
import { cn } from "@/lib/utils";
import type { Manga } from "@/types/manga";

type LibraryMangaCardProps = {
  manga: Manga;
  onRemove?: (mangaId: string) => void;
  showRemove?: boolean;
};

export function LibraryMangaCard({
  manga,
  onRemove,
  showRemove = true,
}: LibraryMangaCardProps) {
  return (
    <div className="group relative">
      <MangaCard manga={manga} className="w-full shrink" showTrendingBadge={false} />

      {showRemove && onRemove && (
        <button
          type="button"
          onClick={() => onRemove(manga.id)}
          aria-label={`Remove ${manga.title} from favorites`}
          className={cn(
            "absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-lg",
            "border border-white/10 bg-black/60 text-muted backdrop-blur-sm",
            "opacity-0 transition-all duration-200 group-hover:opacity-100",
            "hover:border-accent-red/40 hover:bg-accent-red/20 hover:text-white",
          )}
        >
          <RemoveIcon />
        </button>
      )}
    </div>
  );
}

function RemoveIcon() {
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
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
