import React from "react";
import { cn } from "@/lib/utils";

type AdminSettingsFormatChipsProps = {
  label: string;
  description?: string;
  options: readonly { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
};

export function AdminSettingsFormatChips({
  label,
  description,
  options,
  selected,
  onToggle,
}: AdminSettingsFormatChipsProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/15 p-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-white">{label}</h3>
        {description && <p className="text-xs leading-5 text-muted">{description}</p>}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggle(option.value)}
              className={cn(
                "h-10 rounded-xl border px-4 text-sm font-semibold transition-all",
                isSelected
                  ? "border-accent-purple/40 bg-accent-purple/20 text-white shadow-lg shadow-purple-500/10"
                  : "border-white/10 bg-white/5 text-muted hover:bg-white/10 hover:text-white",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
