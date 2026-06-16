import { Badge } from "@/components/ui/Badge";
import { cn, formatPublishedDate, formatReadTime } from "@/lib/utils";
import type { Chapter } from "@/types/chapter";
import Link from "next/link";

type ChapterCardProps = {
  mangaSlug: string;
  chapter: Chapter;
  isNew?: boolean;
  coverGradient: string;
};

export function ChapterCard({
  mangaSlug,
  chapter,
  isNew = false,
  coverGradient,
}: ChapterCardProps) {
  return (
    <Link
      href={`/manga/${mangaSlug}/chapter/${chapter.number}`}
      className={cn(
        "group glass glass-hover flex items-center gap-4 rounded-xl p-4 transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/10",
      )}
    >
      <div
        className={cn(
          "flex h-14 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-bold text-white shadow-md ring-1 ring-white/10",
          coverGradient,
        )}
      >
        {chapter.number}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate font-semibold text-white transition-colors group-hover:text-accent-pink">
            Chapter {chapter.number}
            {chapter.title ? `: ${chapter.title}` : ""}
          </h3>
          {isNew && <Badge variant="new">New</Badge>}
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
          <span>{formatPublishedDate(chapter.publishedAt)}</span>
          <span className="text-white/20">·</span>
          <span>{formatReadTime(chapter.pageCount)}</span>
          <span className="text-white/20">·</span>
          <span>{chapter.pageCount} pages</span>
        </p>
      </div>

      <ChevronIcon className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
    </Link>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
