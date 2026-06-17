import { cn } from "@/lib/utils";

type UserBadgeProps = {
  type: "role" | "status";
  value: string;
};

const roleClasses: Record<string, string> = {
  admin: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  moderator: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  user: "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

const statusClasses: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  suspended: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  pending: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export function AdminUserBadge({ type, value }: UserBadgeProps) {
  const className = type === "role" ? roleClasses[value] : statusClasses[value];

  return (
    <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-semibold", className)}>
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </span>
  );
}
