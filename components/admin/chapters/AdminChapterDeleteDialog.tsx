"use client";

import { Button } from "@/components/ui/Button";
import type { Chapter } from "@/types/chapter";

type AdminChapterDeleteDialogProps = {
  chapter: Chapter | null;
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function AdminChapterDeleteDialog({ chapter, isOpen, isLoading, onConfirm, onCancel }: AdminChapterDeleteDialogProps) {
  if (!isOpen || !chapter) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="glass relative m-4 w-full max-w-sm rounded-2xl p-6 shadow-2xl shadow-black/40">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-accent-red/20 to-accent-pink/20 blur-2xl pointer-events-none" />
        <div className="relative">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-red/20 to-accent-pink/20 text-4xl">🗑️</div>
          </div>
          <h3 className="mb-2 text-center text-xl font-semibold text-white">Delete Chapter?</h3>
          <p className="mb-2 text-center text-sm text-muted">Are you sure you want to delete this chapter?</p>
          <p className="mb-6 text-center text-xs text-muted/75">This action cannot be undone.</p>
          <div className="flex gap-3">
            <Button variant="secondary" size="md" onClick={onCancel} disabled={isLoading} className="flex-1">Cancel</Button>
            <Button variant="primary" size="md" onClick={onConfirm} disabled={isLoading} className="flex-1">{isLoading ? "Deleting..." : "Delete"}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
