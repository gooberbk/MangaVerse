import { AdminStatCard } from "@/components/admin/AdminStatCard";

type AdminChapterStatsProps = {
  totalChapters: number;
  published: number;
  drafts: number;
  scheduled: number;
  avgPages: number;
};

export function AdminChapterStats({
  totalChapters,
  published,
  drafts,
  scheduled,
  avgPages,
}: AdminChapterStatsProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <AdminStatCard label="Total Chapters" value={totalChapters} icon="📚" />
      <AdminStatCard label="Published" value={published} icon="✅" />
      <AdminStatCard label="Drafts" value={drafts} icon="📝" />
      <AdminStatCard label="Scheduled" value={scheduled} icon="⏳" />
      <AdminStatCard label="Avg Pages" value={avgPages.toFixed(1)} icon="📄" />
    </div>
  );
}
