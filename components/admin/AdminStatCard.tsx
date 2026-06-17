import { cn } from "@/lib/utils";

type AdminStatCardProps = {
  label: string;
  value: string | number;
  icon: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
};

export function AdminStatCard({
  label,
  value,
  icon,
  trend,
  className,
}: AdminStatCardProps) {
  return (
    <div
      className={cn(
        "glass glass-hover relative overflow-hidden rounded-2xl p-6 shadow-lg shadow-black/20",
        className,
      )}
    >
      {/* Background gradient accent */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 blur-2xl" />

      <div className="relative flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-sm text-muted">{label}</span>
          {trend && (
            <span
              className={cn(
                "text-xs font-medium",
                trend.positive ? "text-emerald-400" : "text-rose-400",
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-2xl backdrop-blur-sm">
          {icon}
        </div>
      </div>
    </div>
  );
}
