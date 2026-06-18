"use client";

import { AccountProfileHeader } from "./AccountProfileHeader";
import { AccountSettingsPanel } from "./AccountSettingsPanel";
import { ReaderPreferencesPanel } from "./ReaderPreferencesPanel";
import { NotificationPreferencesPanel } from "./NotificationPreferencesPanel";
import { DangerZonePanel } from "./DangerZonePanel";
import { useAuth } from "@/components/auth/AuthProvider";
import Link from "next/link";

export function AccountPageClient() {
  const { user, profile, loading } = useAuth();
  const displayName = profile?.name ?? user?.name ?? "Guest Reader";
  const email = profile?.email ?? user?.email ?? "Sign in to sync your account";
  const role = profile?.role ?? "reader";
  const joinDate = formatJoinDate(profile?.$createdAt ?? user?.$createdAt);

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
      <AccountProfileHeader
        username={loading ? "Loading account..." : displayName}
        email={loading ? "Checking your session" : email}
        joinDate={loading ? "..." : joinDate}
        role={role}
        className="mb-8"
      />

      {/* Settings panels grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <AccountSettingsPanel displayName={displayName} email={email} />
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

function formatJoinDate(value?: string) {
  if (!value) {
    return "recently";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
