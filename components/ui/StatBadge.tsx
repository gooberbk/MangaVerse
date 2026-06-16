import { cn } from "@/lib/utils";

type StatBadgeProps = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
};

export function StatBadge({ label, value, icon, className }: StatBadgeProps) {
  return (
    <div
      className={cn(
        "glass flex min-w-[7rem] flex-col gap-0.5 rounded-xl px-4 py-3 shadow-lg shadow-black/20",
        className,
      )}
    >
      <span className="flex items-center gap-1.5 text-lg font-bold text-white">
        {icon}
        {value}
      </span>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}
