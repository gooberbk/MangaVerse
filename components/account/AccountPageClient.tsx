"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AccountProfileHeader } from "./AccountProfileHeader";
import { AccountSettingsPanel } from "./AccountSettingsPanel";
import { ReaderPreferencesPanel } from "./ReaderPreferencesPanel";
import { NotificationPreferencesPanel } from "./NotificationPreferencesPanel";
import { DangerZonePanel } from "./DangerZonePanel";
import { useAuth } from "@/components/auth/AuthProvider";

export function AccountPageClient() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, router, user]);

  if (loading || !user) {
    return <AccountRedirectState />;
  }

  const displayName = profile?.name ?? user.name;
  const email = profile?.email ?? user.email;
  const role = profile?.role ?? "reader";
  const joinDate = formatJoinDate(profile?.$createdAt ?? user.$createdAt);

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

function AccountRedirectState() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-4xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="glass max-w-md rounded-2xl p-6 text-center shadow-lg shadow-black/20 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-purple">
          Account
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white">
          Redirecting to sign in
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          Sign in to manage your MangaVerse account and reading preferences.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink px-5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:brightness-110"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
