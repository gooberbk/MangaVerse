"use client";

import { ContinueReadingCard } from "@/components/library/ContinueReadingCard";
import { LibraryEmptyState } from "@/components/library/LibraryEmptyState";
import { LibraryMangaCard } from "@/components/library/LibraryMangaCard";
import { LibraryTabs, type LibraryTab } from "@/components/library/LibraryTabs";
import { ReadingHistoryList } from "@/components/library/ReadingHistoryList";
import { MangaGrid } from "@/components/browse/MangaGrid";
import type {
  ContinueReadingEntry,
  HistoryEntry,
} from "@/lib/mock/library";
import type { Manga } from "@/types/manga";
import { useState } from "react";

type LibraryPageClientProps = {
  continueReading: ContinueReadingEntry[];
  favorites: Manga[];
  history: HistoryEntry[];
  completed: Manga[];
};

export function LibraryPageClient({
  continueReading,
  favorites: initialFavorites,
  history,
  completed,
}: LibraryPageClientProps) {
  const [activeTab, setActiveTab] = useState<LibraryTab>("continue");
  const [favorites, setFavorites] = useState(initialFavorites);

  function handleRemoveFavorite(mangaId: string) {
    setFavorites((current) => current.filter((m) => m.id !== mangaId));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <LibraryTabs activeTab={activeTab} onChange={setActiveTab} />

      <div className="mt-8">
        {activeTab === "continue" && (
          <section className="space-y-6">
            <SectionHeader
              title="Continue Reading"
              subtitle="Pick up right where you left off"
            />
            {continueReading.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
                {continueReading.map((entry) => (
                  <ContinueReadingCard key={entry.mangaId} entry={entry} />
                ))}
              </div>
            ) : (
              <LibraryEmptyState
                title="Nothing in progress"
                message="Start reading a series and it will appear here so you can continue anytime."
              />
            )}
          </section>
        )}

        {activeTab === "favorites" && (
          <section className="space-y-6">
            <SectionHeader
              title="Saved Manga"
              subtitle="Your favorite titles in one place"
            />
            {favorites.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {favorites.map((manga) => (
                  <LibraryMangaCard
                    key={manga.id}
                    manga={manga}
                    onRemove={handleRemoveFavorite}
                  />
                ))}
              </div>
            ) : (
              <LibraryEmptyState
                title="No saved manga yet"
                message="Save series you love and they'll show up here for quick access."
              />
            )}
          </section>
        )}

        {activeTab === "history" && (
          <section className="space-y-6">
            <SectionHeader
              title="Reading History"
              subtitle="Your recent chapter activity"
            />
            {history.length > 0 ? (
              <ReadingHistoryList entries={history} />
            ) : (
              <LibraryEmptyState
                title="No reading history"
                message="Chapters you've read will appear here with progress and quick resume links."
              />
            )}
          </section>
        )}

        {activeTab === "completed" && (
          <section className="space-y-6">
            <SectionHeader
              title="Completed Series"
              subtitle="Titles you've finished reading"
            />
            {completed.length > 0 ? (
              <MangaGrid mangas={completed} />
            ) : (
              <LibraryEmptyState
                title="No completed series yet"
                message="When you finish a manga, it will be collected here in your library."
              />
            )}
          </section>
        )}
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-white sm:text-xl">{title}</h2>
      <p className="mt-1 text-sm text-muted">{subtitle}</p>
    </div>
  );
}
