import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminActivityList } from "@/components/admin/AdminActivityList";
import { AdminQuickActions } from "@/components/admin/AdminQuickActions";
import { AdminContentHealth } from "@/components/admin/AdminContentHealth";
import { LatestChaptersPanel } from "@/components/admin/LatestChaptersPanel";
import { adminStats } from "@/lib/mock/admin";

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Dashboard" description="Overview of your manga platform">
      <div className="space-y-8">
        {/* Stats cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <AdminStatCard
            label="Total Manga"
            value={adminStats.totalManga}
            icon="📚"
            trend={{ value: "+12%", positive: true }}
          />
          <AdminStatCard
            label="Total Chapters"
            value={adminStats.totalChapters}
            icon="📖"
            trend={{ value: "+8%", positive: true }}
          />
          <AdminStatCard
            label="Monthly Reads"
            value={adminStats.monthlyReads.toLocaleString()}
            icon="👁️"
            trend={{ value: "+23%", positive: true }}
          />
          <AdminStatCard
            label="Active Users"
            value={adminStats.activeUsers.toLocaleString()}
            icon="👥"
            trend={{ value: "+5%", positive: true }}
          />
          <AdminStatCard
            label="Storage Used"
            value={adminStats.storageUsed}
            icon="☁️"
            trend={{ value: "+2%", positive: false }}
          />
        </div>

        {/* Quick actions */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Quick Actions</h3>
          <AdminQuickActions />
        </div>

        {/* Content panels grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <LatestChaptersPanel />
            <AdminContentHealth />
          </div>
          <AdminActivityList />
        </div>
      </div>
    </AdminShell>
  );
}
