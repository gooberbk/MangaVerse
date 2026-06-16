import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "new" | "trending" | "featured";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-white/10 text-white border-white/20",
  new: "bg-accent-blue/20 text-blue-300 border-accent-blue/30",
  trending: "bg-accent-red/20 text-red-300 border-accent-red/30",
  featured: "bg-accent-purple/20 text-purple-300 border-accent-purple/30",
};

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
