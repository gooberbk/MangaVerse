"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type DangerZonePanelProps = {
  className?: string;
};

export function DangerZonePanel({ className }: DangerZonePanelProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className={cn("glass-panel rounded-2xl p-6 sm:p-8", className)}>
      {/* Glow accent */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-accent-red/8 blur-3xl" />
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Danger Zone</h2>
        <p className="mt-1 text-sm text-muted">
          Irreversible actions that affect your account
        </p>
      </div>

      <div className="space-y-4">
        {/* Sign out */}
        <div className="flex flex-col gap-3 rounded-xl border border-white/5 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-medium text-white">Sign Out</h3>
            <p className="mt-1 text-xs text-muted">
              Sign out of your account on this device
            </p>
          </div>
          <Button variant="secondary" size="md">
            Sign Out
          </Button>
        </div>

        {/* Delete account */}
        <div className="rounded-xl border border-accent-red/20 bg-accent-red/5 p-4">
          {!showDeleteConfirm ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-medium text-white">Delete Account</h3>
                <p className="mt-1 text-xs text-muted">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowDeleteConfirm(true)}
                className="border-accent-red/30 text-accent-red hover:bg-accent-red/10"
              >
                Delete Account
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-accent-red">
                  Are you sure you want to delete your account?
                </h3>
                <p className="mt-2 text-xs text-muted">
                  This action cannot be undone. All your data, including library,
                  reading history, and preferences will be permanently deleted.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  className="border-accent-red/30 bg-accent-red/20 text-accent-red hover:bg-accent-red/30"
                >
                  Yes, Delete My Account
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
