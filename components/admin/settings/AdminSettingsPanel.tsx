import React from "react";
import { cn } from "@/lib/utils";

interface AdminSettingsPanelProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  accent?: "purple" | "pink" | "blue" | "emerald" | "amber";
}

const accentStyles = {
  purple: "from-accent-purple via-accent-pink to-transparent",
  pink: "from-accent-pink via-rose-300 to-transparent",
  blue: "from-accent-blue via-cyan-300 to-transparent",
  emerald: "from-emerald-400 via-cyan-300 to-transparent",
  amber: "from-amber-300 via-accent-pink to-transparent",
};

export function AdminSettingsPanel({
  title,
  description,
  children,
  className,
  accent = "purple",
}: AdminSettingsPanelProps) {
  return (
    <section
      className={cn(
        "glass relative overflow-hidden rounded-2xl p-5 shadow-xl shadow-black/20 sm:p-6",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r",
          accentStyles[accent],
        )}
      />
      <div className="mb-5 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description && <p className="max-w-2xl text-sm leading-6 text-muted">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
