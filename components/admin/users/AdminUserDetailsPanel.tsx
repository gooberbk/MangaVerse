import type { AdminUser } from "@/lib/mock/admin";
import { AdminUserBadge } from "./AdminUserBadge";

type AdminUserDetailsPanelProps = {
  user: AdminUser | null;
};

export function AdminUserDetailsPanel({ user }: AdminUserDetailsPanelProps) {
  if (!user) {
    return (
      <div className="glass rounded-3xl border border-white/10 p-6 text-center text-sm text-muted">
        Select a user to view details.
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl border border-white/10 p-6 shadow-lg shadow-black/20">
      <div className="flex items-center gap-4">
        <div className={`flex h-16 w-16 items-center justify-center rounded-3xl text-xl font-semibold text-white ${user.avatarGradient}`}>
          {user.username
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <p className="text-xl font-semibold text-white">{user.username}</p>
          <p className="text-sm text-muted">{user.email}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <AdminUserBadge type="role" value={user.role} />
            <AdminUserBadge type="status" value={user.status} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Saved Manga</p>
          <p className="mt-2 text-2xl font-semibold text-white">{user.savedMangaCount}</p>
        </div>
        <div className="rounded-3xl bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Chapters Read</p>
          <p className="mt-2 text-2xl font-semibold text-white">{user.chaptersRead}</p>
        </div>
        <div className="rounded-3xl bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Completed Manga</p>
          <p className="mt-2 text-2xl font-semibold text-white">{user.completedManga}</p>
        </div>
        <div className="rounded-3xl bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Reading Streak</p>
          <p className="mt-2 text-2xl font-semibold text-white">{user.readingStreak} days</p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Recent activity</h4>
        <div className="mt-4 space-y-3">
          {user.recentActivity.map((activity) => (
            <div key={activity.id} className="rounded-3xl bg-white/5 p-4 text-sm text-white/80">
              <p>{activity.message}</p>
              <p className="mt-1 text-xs text-muted">{new Date(activity.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
