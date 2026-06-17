import React from "react";
import { cn } from "@/lib/utils";

interface DangerAction {
  label: string;
  description: string;
  actionLabel: string;
  onClick: () => void;
  loading?: boolean;
  tone?: "neutral" | "danger";
}

interface AdminSettingsDangerZoneProps {
  actions: DangerAction[];
  title?: string;
  description?: string;
}

export function AdminSettingsDangerZone({
  actions,
  title = "Security actions",
  description = "Local-only maintenance controls",
}: AdminSettingsDangerZoneProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/15 p-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
      </div>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{action.label}</p>
              <p className="mt-1 text-xs leading-5 text-muted">{action.description}</p>
            </div>
            <button
              type="button"
              onClick={action.onClick}
              disabled={action.loading}
              className={cn(
                "inline-flex h-10 shrink-0 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50",
                action.tone === "danger"
                  ? "bg-red-500/15 text-red-100 ring-1 ring-red-400/30 hover:bg-red-500/25"
                  : "bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/15",
              )}
            >
              {action.actionLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
