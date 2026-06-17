import React from "react";
import { cn } from "@/lib/utils";

interface AdminSettingsToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function AdminSettingsToggle({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}: AdminSettingsToggleProps) {
  return (
    <div
      className={cn(
        "flex min-h-32 flex-col justify-between gap-4 rounded-xl border p-4 transition-colors",
        checked
          ? "border-accent-purple/30 bg-accent-purple/10"
          : "border-white/10 bg-black/15",
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-white">{label}</span>
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
              checked
                ? "border-accent-purple/40 bg-accent-purple/15 text-purple-100"
                : "border-white/10 bg-white/5 text-muted",
            )}
          >
            {checked ? "On" : "Off"}
          </span>
        </div>
        {description && <p className="mt-2 text-xs leading-5 text-muted">{description}</p>}
      </div>
      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        disabled={disabled}
        className={cn(
          "relative h-7 w-14 self-start rounded-full border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-purple/30",
          checked
            ? "border-accent-purple/60 bg-gradient-to-r from-accent-purple to-accent-pink shadow-lg shadow-purple-500/20"
            : "border-white/10 bg-white/10",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <span
          className={cn(
            "absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
            checked ? "translate-x-7" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}
