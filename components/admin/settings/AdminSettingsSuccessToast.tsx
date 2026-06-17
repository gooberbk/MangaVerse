import React from "react";

interface AdminSettingsSuccessToastProps {
  message?: string;
  visible: boolean;
}

export function AdminSettingsSuccessToast({
  message = "Settings saved successfully",
  visible,
}: AdminSettingsSuccessToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl border border-emerald-300/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-100 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-300 shadow-lg shadow-emerald-400/40" />
      <span>{message}</span>
    </div>
  );
}
