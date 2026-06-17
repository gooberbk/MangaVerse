import { recentChapters } from "@/lib/mock/admin";
import { formatUpdatedDate } from "@/lib/utils";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LatestChaptersPanel() {
  return (
    <div className="glass rounded-2xl p-6 shadow-lg shadow-black/20">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Latest Uploads</h3>
        <Link
          href="/admin/chapters"
          className="text-xs font-medium text-accent-purple hover:text-accent-pink transition-colors"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {recentChapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/manga/${chapter.mangaSlug}`}
            className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-all duration-200 hover:border-white/10 hover:bg-white/10"
          >
            {/* Cover gradient preview */}
            <div
              className={cn(
                "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br",
                chapter.coverGradient,
              )}
            >
              <span className="text-lg">📖</span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="truncate font-medium text-white group-hover:text-accent-purple transition-colors">
                {chapter.mangaTitle}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span>Chapter {chapter.number}</span>
                <span>•</span>
                <span>{chapter.title}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-muted">{formatUpdatedDate(chapter.publishedAt)}</span>
              <span className="text-xs text-muted">{chapter.pageCount} pages</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
