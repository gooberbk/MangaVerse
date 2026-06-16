import { LibraryPageClient } from "@/components/library/LibraryPageClient";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DestinationHero } from "@/components/ui/DestinationHero";
import { StatBadge } from "@/components/ui/StatBadge";
import {
  getCompletedMangas,
  getContinueReadingEntries,
  getFavoriteMangas,
  getLibraryStats,
  getReadingHistoryEntries,
} from "@/lib/mock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Library",
  description:
    "Your personal MangaVerse library — continue reading, favorites, history, and completed series.",
};

export default function LibraryPage() {
  const stats = getLibraryStats();
  const continueReading = getContinueReadingEntries();
  const favorites = getFavoriteMangas();
  const history = getReadingHistoryEntries();
  const completed = getCompletedMangas();

  return (
    <>
      <SiteHeader />

      <main>
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
      </main>

      <SiteFooter />
    </>
  );
}
