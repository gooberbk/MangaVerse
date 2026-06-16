import { cn } from "@/lib/utils";

type AccountStatCardProps = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
};

export function AccountStatCard({
  label,
  value,
  icon,
  className,
}: AccountStatCardProps) {
  return (
    <div
      className={cn(
        "glass flex min-w-[8rem] flex-col gap-1 rounded-xl px-4 py-3 shadow-lg shadow-black/20",
        className,
      )}
    >
      <span className="flex items-center gap-2 text-xl font-bold text-white">
        {icon}
        {value}
      </span>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}
