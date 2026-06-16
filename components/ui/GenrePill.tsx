import { cn } from "@/lib/utils";
import Link from "next/link";

type GenrePillProps = {
  label: string;
  gradient: string;
  href?: string;
  className?: string;
};

export function GenrePill({ label, gradient, href = "#", className }: GenrePillProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 px-4 py-3 transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity group-hover:opacity-80",
          gradient,
        )}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <span className="relative text-sm font-semibold text-white">{label}</span>
    </Link>
  );
}
