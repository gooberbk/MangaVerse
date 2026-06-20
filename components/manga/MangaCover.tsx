import { cn } from "@/lib/utils";
import type { Manga } from "@/types/manga";
import type { CSSProperties, ReactNode } from "react";

type MangaCoverProps = {
  manga: Pick<Manga, "title" | "coverUrl" | "coverGradient">;
  className?: string;
  compact?: boolean;
  children?: ReactNode;
};

function getInitial(title: string) {
  return title.trim().match(/[A-Za-z0-9]/)?.[0]?.toUpperCase() ?? "M";
}

function hasDisplayableCover(coverUrl?: string) {
  if (!coverUrl) return false;
  return !coverUrl.includes("placehold.co");
}

export function MangaCover({
  manga,
  className,
  compact = false,
  children,
}: MangaCoverProps) {
  const displayTitle = manga.title.trim() || "MangaVerse Series";
  const showCoverImage = hasDisplayableCover(manga.coverUrl);
  const style: CSSProperties | undefined = showCoverImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(2, 6, 23, 0.05), rgba(2, 6, 23, 0.75)), url("${manga.coverUrl}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }
    : undefined;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br ring-1 ring-white/10",
        manga.coverGradient,
        className,
      )}
      style={style}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-white/5" />

      {!showCoverImage && (
        <>
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-accent-purple/25 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(135deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:18px_18px]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
            <span
              className={cn(
                "flex items-center justify-center rounded-2xl border border-white/15 bg-black/25 font-black text-white shadow-lg shadow-black/30 backdrop-blur-sm",
                compact ? "h-8 w-8 text-lg" : "h-16 w-16 text-3xl",
              )}
            >
              {getInitial(displayTitle)}
            </span>
            {!compact && (
              <span className="mt-4 line-clamp-2 max-w-[80%] text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                {displayTitle}
              </span>
            )}
          </div>
        </>
      )}

      {children}
    </div>
  );
}
