"use client";

import { AccountProfileHeader } from "./AccountProfileHeader";
import { AccountSettingsPanel } from "./AccountSettingsPanel";
import { ReaderPreferencesPanel } from "./ReaderPreferencesPanel";
import { NotificationPreferencesPanel } from "./NotificationPreferencesPanel";
import { DangerZonePanel } from "./DangerZonePanel";
import Link from "next/link";

export function AccountPageClient() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Navigation links */}
      <div className="mb-8 flex flex-wrap items-center gap-4 text-sm">
        <Link
          href="/library"
          className="text-muted transition-colors hover:text-white"
        >
          ← Back to Library
        </Link>
        <span className="text-muted/40">|</span>
        <Link
          href="/browse"
          className="text-muted transition-colors hover:text-white"
        >
          Browse Manga
        </Link>
      </div>

      {/* Profile header */}
      <AccountProfileHeader className="mb-8" />

      {/* Settings panels grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <AccountSettingsPanel />
          <ReaderPreferencesPanel />
        </div>
        <div className="space-y-6">
          <NotificationPreferencesPanel />
          <DangerZonePanel />
        </div>
      </div>
    </div>
  );
}
