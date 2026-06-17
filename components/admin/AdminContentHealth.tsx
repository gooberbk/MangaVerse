import { contentHealth } from "@/lib/mock/admin";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  healthy: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  warning: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  critical: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

const statusIcons: Record<string, string> = {
  healthy: "✓",
  warning: "⚠",
  critical: "✕",
};

export function AdminContentHealth() {
  return (
    <div className="glass rounded-2xl p-6 shadow-lg shadow-black/20">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Content Health</h3>
        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 border border-emerald-500/20">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-medium text-emerald-300">98% Healthy</span>
        </div>
      </div>

      <div className="space-y-3">
        {contentHealth.map((item) => (
          <div
            key={item.category}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg border text-sm font-bold",
                  statusColors[item.status],
                )}
              >
                {statusIcons[item.status]}
              </div>
              <div>
                <p className="font-medium text-white">{item.category}</p>
                <p className="text-xs text-muted">{item.message}</p>
              </div>
            </div>
            <div className="text-sm font-semibold text-white">{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
