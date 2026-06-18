"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { LibraryPageClient } from "@/components/library/LibraryPageClient";
import { DestinationHero } from "@/components/ui/DestinationHero";
import { StatBadge } from "@/components/ui/StatBadge";
import type {
  ContinueReadingEntry,
  HistoryEntry,
  LibraryStats,
} from "@/lib/mock/library";
import type { Manga } from "@/types/manga";

type ProtectedLibraryPageClientProps = {
  stats: LibraryStats;
  continueReading: ContinueReadingEntry[];
  favorites: Manga[];
  history: HistoryEntry[];
  completed: Manga[];
};

export function ProtectedLibraryPageClient({
  stats,
  continueReading,
  favorites,
  history,
  completed,
}: ProtectedLibraryPageClientProps) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, router, user]);

  if (loading || !user) {
    return <LibraryRedirectState />;
  }

  return (
    <>
      <DestinationHero
        eyebrow="Your Collection"
        title="My Library"
        subtitle="Saved manga, reading progress, and recent activity — your personal hub for everything you're reading on MangaVerse."
        glow="purple"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <StatBadge label="Saved Titles" value={stats.savedTitles} />
          <StatBadge
            label="Continue Reading"
            value={stats.continueReadingCount}
          />
          <StatBadge label="Completed" value={stats.completedCount} />
          <StatBadge
            label="Reading Streak"
            value={`${stats.readingStreakDays} days`}
          />
        </div>
      </DestinationHero>

      <LibraryPageClient
        continueReading={continueReading}
        favorites={favorites}
        history={history}
        completed={completed}
      />
    </>
  );
}

function LibraryRedirectState() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-4xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="glass max-w-md rounded-2xl p-6 text-center shadow-lg shadow-black/20 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-purple">
          Library
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white">
          Redirecting to sign in
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          Sign in to open your saved manga, reading progress, and history.
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
