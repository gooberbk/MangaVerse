import { adminActivities } from "@/lib/mock/admin";
import { formatUpdatedDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const activityIcons: Record<string, string> = {
  manga_created: "📚",
  chapter_uploaded: "📖",
  user_registered: "👤",
  settings_updated: "⚙️",
};

const activityColors: Record<string, string> = {
  manga_created: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  chapter_uploaded: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  user_registered: "from-emerald-500/20 to-green-500/20 border-emerald-500/30",
  settings_updated: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
};

export function AdminActivityList() {
  return (
    <div className="glass rounded-2xl p-6 shadow-lg shadow-black/20">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <span className="text-xs text-muted">Last 24 hours</span>
      </div>

      <div className="space-y-4">
        {adminActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-all duration-200 hover:border-white/10 hover:bg-white/10"
          >
            <div
              className={cn(
                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border bg-gradient-to-br backdrop-blur-sm",
                activityColors[activity.type] || "from-slate-500/20 to-slate-500/20 border-slate-500/30",
              )}
            >
              <span className="text-lg">{activityIcons[activity.type] || "📌"}</span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="text-sm font-medium text-white">{activity.message}</p>
              <div className="flex items-center gap-2 text-xs text-muted">
                {activity.user && <span>{activity.user}</span>}
                <span>•</span>
                <span>{formatUpdatedDate(activity.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
