import type { MangaRating, MangaStatus } from "@/types/manga";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatRating(rating: MangaRating | number): string {
  const value = typeof rating === "number" ? rating : rating.average;
  return value.toFixed(1);
}

export function statusLabel(status: MangaStatus): string {
  const labels: Record<MangaStatus, string> = {
    ongoing: "Ongoing",
    completed: "Completed",
    hiatus: "Hiatus",
  };
  return labels[status];
}

export function statusColor(status: MangaStatus): string {
  const colors: Record<MangaStatus, string> = {
    ongoing: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    completed: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    hiatus: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  };
  return colors[status];
}

export function formatViews(views: number): string {
  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M`;
  }
  if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}K`;
  }
  return views.toString();
}

export function formatBookmarks(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toLocaleString();
}

export function formatPublishedDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Rough estimate: ~90 seconds per page */
export function formatReadTime(pageCount: number): string {
  const minutes = Math.max(1, Math.round((pageCount * 90) / 60));
  if (minutes < 60) return `${minutes} min read`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder > 0 ? `${hours}h ${remainder}m read` : `${hours}h read`;
}

export function formatUpdatedDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}
