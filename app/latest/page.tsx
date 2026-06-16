import { LatestUpdateCard } from "@/components/latest/LatestUpdateCard";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DestinationHero } from "@/components/ui/DestinationHero";
import { StatBadge } from "@/components/ui/StatBadge";
import { getAllLatestUpdates } from "@/lib/mock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest Updates",
  description:
    "Recently updated manga series across the MangaVerse library, sorted by newest chapter releases.",
};

export default function LatestPage() {
  const mangas = getAllLatestUpdates();
  const updatedToday = mangas.filter(
    (m) =>
      new Date(m.updatedAt).toDateString() === new Date().toDateString(),
  ).length;

  return (
    <>
      <SiteHeader />

      <main>
        <DestinationHero
          eyebrow="Fresh Chapters"
          title="Latest Updates"
          subtitle="Stay current with the most recently updated series. New chapters, continuing stories, and fresh releases across the library."
          glow="blue"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            <StatBadge label="Updated Series" value={mangas.length} />
            <StatBadge label="Updated Today" value={updatedToday} />
            <StatBadge
              label="Most Recent"
              value={
                mangas[0]
                  ? new Date(mangas[0].updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "—"
              }
            />
          </div>
        </DestinationHero>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-white sm:text-xl">
              All Recent Updates
            </h2>
            <p className="mt-1 text-sm text-muted">
              Sorted by most recently updated
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
            {mangas.map((manga) => (
              <LatestUpdateCard key={manga.id} manga={manga} />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
