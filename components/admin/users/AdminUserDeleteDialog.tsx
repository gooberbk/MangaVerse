"use client";

import { Button } from "@/components/ui/Button";
import type { AdminUser } from "@/lib/mock/admin";

type AdminUserDeleteDialogProps = {
  user: AdminUser | null;
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function AdminUserDeleteDialog({ user, isOpen, isLoading, onConfirm, onCancel }: AdminUserDeleteDialogProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="glass relative w-full max-w-lg rounded-3xl p-6 shadow-2xl shadow-black/40">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-accent-red/20 to-accent-pink/20 blur-3xl pointer-events-none" />
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-accent-red/20 to-accent-pink/20 text-4xl">
            🗑️
          </div>
          <h3 className="text-xl font-semibold text-white">Preview user delete</h3>
          <p className="mt-2 text-sm text-muted">
            Real Appwrite user management is not connected yet, so this will not
            remove any account.
          </p>
          <p className="mt-3 text-sm text-white/80">{user.username} ({user.email})</p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button variant="secondary" size="md" onClick={onCancel} disabled={isLoading} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={onConfirm} disabled={isLoading} className="flex-1">
            {isLoading ? "Checking..." : "Show Notice"}
          </Button>
        </div>
      </div>
    </div>
  );
}
