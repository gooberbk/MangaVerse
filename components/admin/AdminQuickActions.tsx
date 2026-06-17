import Link from "next/link";
import { cn } from "@/lib/utils";

type QuickAction = {
  title: string;
  description: string;
  icon: string;
  href: string;
  gradient: string;
};

const quickActions: QuickAction[] = [
  {
    title: "Add Manga",
    description: "Create a new manga entry",
    icon: "📚",
    href: "/admin/manga",
    gradient: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  },
  {
    title: "Add Chapter",
    description: "Upload new chapters",
    icon: "📖",
    href: "/admin/chapters",
    gradient: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  },
  {
    title: "Upload Pages",
    description: "Manage file uploads",
    icon: "☁️",
    href: "/admin/uploads",
    gradient: "from-emerald-500/20 to-green-500/20 border-emerald-500/30",
  },
  {
    title: "Manage Genres",
    description: "Organize content categories",
    icon: "🏷️",
    href: "/admin/settings",
    gradient: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
  },
];

export function AdminQuickActions() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {quickActions.map((action) => (
        <Link
          key={action.title}
          href={action.href}
          className={cn(
            "glass glass-hover group relative overflow-hidden rounded-2xl border p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105",
            action.gradient,
          )}
        >
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative flex flex-col gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-2xl backdrop-blur-sm group-hover:scale-110 group-hover:from-white/20 group-hover:to-white/10 transition-transform duration-300">
              {action.icon}
            </div>
            <div>
              <h3 className="font-semibold text-white">{action.title}</h3>
              <p className="mt-1 text-xs text-muted">{action.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
