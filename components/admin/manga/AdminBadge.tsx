import { cn } from "@/lib/utils";

type AdminBadgeProps = {
  type: "status" | "featured" | "new" | "trending";
  children: React.ReactNode;
  className?: string;
};

export function AdminBadge({ type, children, className }: AdminBadgeProps) {
  const styles = {
    status: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    featured: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    new: "bg-green-500/20 text-green-300 border-green-500/30",
    trending: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border",
        styles[type],
        className,
      )}
    >
      {children}
    </span>
  );
}
