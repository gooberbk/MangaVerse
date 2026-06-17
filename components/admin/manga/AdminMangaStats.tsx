import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { formatRating } from "@/lib/utils";

type AdminMangaStatsProps = {
  totalManga: number;
  ongoing: number;
  completed: number;
  featured: number;
  averageRating: number;
};

export function AdminMangaStats({
  totalManga,
  ongoing,
  completed,
  featured,
  averageRating,
}: AdminMangaStatsProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <AdminStatCard
        label="Total Manga"
        value={totalManga}
        icon="📚"
        className="lg:col-span-1"
      />
      <AdminStatCard
        label="Ongoing"
        value={ongoing}
        icon="▶️"
        className="lg:col-span-1"
      />
      <AdminStatCard
        label="Completed"
        value={completed}
        icon="✓"
        className="lg:col-span-1"
      />
      <AdminStatCard
        label="Featured"
        value={featured}
        icon="⭐"
        className="lg:col-span-1"
      />
      <AdminStatCard
        label="Avg Rating"
        value={formatRating(averageRating)}
        icon="📊"
        className="lg:col-span-1"
      />
    </div>
  );
}
