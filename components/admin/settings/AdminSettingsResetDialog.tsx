import React from "react";

interface AdminSettingsResetDialogProps {
  isOpen: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function AdminSettingsResetDialog({
  isOpen,
  isLoading = false,
  onConfirm,
  onCancel,
}: AdminSettingsResetDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-settings-title"
        className="glass relative w-full max-w-md overflow-hidden rounded-2xl p-6 shadow-2xl shadow-black/40"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-red-400 via-accent-pink to-transparent" />
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-red-300/20 bg-red-400/10">
          <span className="h-3 w-3 rounded-full bg-red-300 shadow-lg shadow-red-400/40" />
        </div>
        <h3 id="reset-settings-title" className="mb-2 text-center text-lg font-semibold text-white">
          Reset all settings?
        </h3>
        <p className="mb-6 text-center text-sm leading-6 text-muted">
          This restores the local settings preview to the mock defaults. No backend data is changed.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-xl bg-red-500/80 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Defaults"}
          </button>
        </div>
      </div>
    </div>
  );
}
