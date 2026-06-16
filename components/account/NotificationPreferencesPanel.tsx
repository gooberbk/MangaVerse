"use client";

import { AccountToggle } from "./AccountToggle";
import { cn } from "@/lib/utils";

type NotificationPreferencesPanelProps = {
  className?: string;
};

export function NotificationPreferencesPanel({ className }: NotificationPreferencesPanelProps) {
  return (
    <div className={cn("glass rounded-2xl p-6 shadow-lg shadow-black/20 sm:p-8", className)}>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">Notification Preferences</h2>
        <p className="mt-1 text-sm text-muted">
          Manage how you receive updates and alerts
        </p>
      </div>

      <div className="space-y-5">
        <AccountToggle
          label="New chapter alerts"
          description="Get notified when new chapters are released for manga in your library"
          defaultChecked={true}
        />
        <AccountToggle
          label="Weekly recommendations"
          description="Receive personalized manga recommendations based on your reading history"
          defaultChecked={true}
        />
        <AccountToggle
          label="Library reminders"
          description="Remind yourself to continue reading manga you haven't finished"
          defaultChecked={false}
        />
        <AccountToggle
          label="Marketing emails"
          description="Receive news, promotions, and updates from MangaVerse"
          defaultChecked={false}
        />
      </div>
    </div>
  );
}
