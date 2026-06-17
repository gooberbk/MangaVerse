"use client";

import { Button } from "@/components/ui/Button";
import type { Manga } from "@/types/manga";
import { cn } from "@/lib/utils";

type AdminMangaDeleteDialogProps = {
  manga: Manga | null;
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function AdminMangaDeleteDialog({
  manga,
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
}: AdminMangaDeleteDialogProps) {
  if (!isOpen || !manga) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Dialog */}
      <div className="glass relative m-4 w-full max-w-sm rounded-2xl p-6 shadow-2xl shadow-black/40">
        {/* Background accent */}
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-accent-red/20 to-accent-pink/20 blur-2xl pointer-events-none" />

        <div className="relative">
          {/* Icon */}
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-red/20 to-accent-pink/20 text-4xl">
              🗑️
            </div>
          </div>

          {/* Content */}
          <h3 className="mb-2 text-center text-xl font-semibold text-white">
            Delete Manga?
          </h3>
          <p className="mb-2 text-center text-sm text-muted">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-white">{manga.title}</span>?
          </p>
          <p className="mb-6 text-center text-xs text-muted/75">
            This action cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={onConfirm}
              disabled={isLoading}
              className={cn(
                "flex-1",
                "bg-gradient-to-r from-accent-red to-accent-pink hover:brightness-110 shadow-lg shadow-red-500/25 hover:shadow-red-500/40",
              )}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
