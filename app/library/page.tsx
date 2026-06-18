import { ProtectedLibraryPageClient } from "@/components/library/ProtectedLibraryPageClient";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
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
        <ProtectedLibraryPageClient
          stats={stats}
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
