"use client";

import { cn } from "@/lib/utils";

export type LibraryTab = "continue" | "favorites" | "history" | "completed";

const tabs: { id: LibraryTab; label: string }[] = [
  { id: "continue", label: "Continue Reading" },
  { id: "favorites", label: "Favorites" },
  { id: "history", label: "History" },
  { id: "completed", label: "Completed" },
];

type LibraryTabsProps = {
  activeTab: LibraryTab;
  onChange: (tab: LibraryTab) => void;
};

export function LibraryTabs({ activeTab, onChange }: LibraryTabsProps) {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "shrink-0 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200",
              active
                ? "border-accent-purple/40 bg-accent-purple/20 text-white shadow-sm shadow-purple-500/10"
                : "border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:bg-white/[0.06] hover:text-white",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
